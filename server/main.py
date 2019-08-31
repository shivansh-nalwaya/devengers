from flask import Flask, request
from predit_model import LogModel
import json

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return 'Received !'


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json["data"]
    log_model = LogModel()
    return str(log_model.all_predict(data))


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=4444, debug=True)
