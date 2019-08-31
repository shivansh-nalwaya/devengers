import os
from flask import Flask, request
from predit_model import LogModel
app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return 'Received !'


@app.route('/predict', methods=['POST'])
def predict():
    log_model = LogModel()
    resp = log_model.data_encoder(request.data)
    return log_model.log_predict(resp)


if __name__ == '__main__':
    app.run(port=80)
