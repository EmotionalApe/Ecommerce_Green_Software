from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import pymongo

from bson import ObjectId  

from bcrypt import hashpw, gensalt, checkpw
from jwt import encode, decode


CONNECTION_STRING = "mongodb+srv://maruf1611khan:maruf1611khan@cluster0.5fkcwee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('ecommerce')

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret'


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/products", methods=['GET'])
def get_products():
    # Retrieve products from the inventory collection
    products = list(db.inventory.find({}, {"_id": 1, "itemName": 1, "description": 1, "price": 1, "image": 1}))

    # Convert ObjectId to string for each product
    for product in products:
        product['_id'] = str(product['_id'])

    # Return products as JSON response
    return jsonify(products)


@app.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    
    existing_user = db.users.find_one({"username": username})
    if existing_user:
        return jsonify({"message": "User already exists!"}), 400
    
    hashed_password = hashpw(password.encode('utf-8'), gensalt())
    new_user = {"username": username, "password": hashed_password}
    db.users.insert_one(new_user)
    
    return jsonify({"message": "User registered successfully"}), 201


@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    
    user = db.users.find_one({"username": username})
    if not user:
        return jsonify({"message": "User doesn't exist!"}), 401
    
    if not checkpw(password.encode('utf-8'), user['password']):
        return jsonify({"message": "Username or password is incorrect"}), 401
    
    token = encode({'username': str(user['username'])}, app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({"token": token, "userID": str(user['_id'])}), 200
    # return jsonify({"message": "User logged in successfully"}), 201

@app.route("/add_to_cart", methods=['POST'])
def add_to_cart():
    data = request.get_json()
    token = data['token']
    productId = data['productId'] 

    try:
        decoded_token = decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        username = decoded_token['username']
    except Exception as e:
        return jsonify({"message": "Invalid token"}), 401

    # Check if the user's cart exists, create it if not
    user_cart = db.cart.find_one({"username": username})
    if not user_cart:
        user_cart = {"username": username, "items": []}

    # Add the product ID to the user's cart
    user_cart['items'].append(productId)  # Append the productId to the 'items' list

    # Upsert the user's cart
    db.cart.replace_one({"username": username}, user_cart, upsert=True)

    return jsonify({"message": "Item added to cart successfully"}), 200

@app.route("/get_cart", methods=['POST'])
def get_cart():
    data = request.get_json()
    token = data.get('token')

    try:
        decoded_token = decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        username = decoded_token['username']
    except Exception as e:
        return jsonify({"message": "Invalid token"}), 401
    
    # Check if the user's cart exists
    user_cart = db.cart.find_one({"username": username},{"_id": 0, "items": 1})
    print("userCart:" , user_cart)
    # products = list(db.inventory.find({}, {"_id": 1, "itemName": 1, "description": 1, "price": 1, "image": 1}))
    if not user_cart:
        return jsonify({"message": "No items in cart"}), 200
    else:
        # Return the user's cart
        return jsonify(user_cart), 200

@app.route("/get_product", methods=['POST']) 
def get_product():
    data = request.get_json()
    product = data.get('productId')
    # Check if the user's cart exists
    prodDetails = db.inventory.find_one({"_id": product})
    return jsonify(prodDetails), 200


if __name__ == "__main__":
    app.run(debug=True)
