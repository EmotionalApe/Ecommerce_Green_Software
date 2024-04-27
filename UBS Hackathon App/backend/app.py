import base64
from flask import Flask, request, jsonify
import yolov5

import pathlib
import textwrap
from io import BytesIO
import google.generativeai as genai
from PIL import Image
from IPython.display import display
from IPython.display import Markdown
import json

app = Flask(__name__)

def model():
    model = yolov5.load('best.pt')
    # set model parameters
    model.conf = 0.25  # NMS confidence threshold
    model.iou = 0.45  # NMS IoU threshold
    model.agnostic = False  # NMS class-agnostic
    model.multi_label = False  # NMS multiple labels per box
    model.max_det = 1000  # maximum number of detections per image
    return model

def compute(img,model):

    
    # set image
    # img = 'pile-plastic-garbage-waste-on-260nw-1270889335.webp'

    img_64 = img['image'].split(',')
    img_64 = img_64[1]
    img = Image.open(BytesIO(base64.decodebytes(bytes(img_64,"utf-8"))))

    # perform inference
    results = model(img, size=640)

    # inference with test time augmentation
    results = model(img, augment=True)

    # parse results
    predictions = results.pred[0]
    categories = predictions[:, 5]

    names = ['biodegradable', 'cardboard', 'glass', 'metal', 'paper', 'plastic']
    inTheImage = [names[i] for i in categories.int()]

    def to_markdown(text):
        text = text.replace('•', '  *')
        return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))
    GOOGLE_API_KEY='AIzaSyBMMBKVvq7L85w81c0qlWj-z2whsesbtuM'
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
    prompt = f"How can i effectively deal with {set(inTheImage)} waste. tell me about each individually. less words"
    response = model.generate_content(prompt)
    print(response.text)

    
    return f"* **{', '.join(str(e).capitalize() for e in set(inTheImage))}** has been detected in the image.\n\n" + response.text

@app.route('/takepicture/', methods=['POST'])
def takepicture():


    data = request.get_json()
    

    try:
  
        output = compute(data,model()) 
        response = {
            'reply': output
        }
        return jsonify(response)
    except ValueError:
        return jsonify({'Error': 'Invalid input'}), 400


if __name__ == '__main__':
    app.run()