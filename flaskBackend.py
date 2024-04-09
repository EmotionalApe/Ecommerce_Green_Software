from flask import Flask, jsonify, request
from flask_pymongo import pymongo

CONNECTION_STRING = "mongodb+srv://maruf1611khan:maruf1611khan@cluster0.5fkcwee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('ecommerce')

app = Flask(__name__)


@app.route("/")
def hello_world():
    db.inventory.insert_one({"bruh": 2})
    return "<p>Hello, World!</p>"

@app.route("/products", methods=['GET'])
def get_products():
    products = list(db.inventory.find({}, {"_id": 0}))  
    return jsonify(products)

@app.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']
    
    if db.users.find_one({"username": username}):
        return jsonify({"message": "Username already exists"}), 400
    
    db.users.insert_one({"username": username, "email": email, "password": password})
    return jsonify({"message": "User registered successfully"}), 201

@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    
    user = db.users.find_one({"username": username, "password": password})
    
    if not user:
        return jsonify({"message": "Invalid username or password"}), 401
    
    return jsonify({"message": "Login successful"}), 200

if __name__ == "__main__":
    app.run(debug=True)
