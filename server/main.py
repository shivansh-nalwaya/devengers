import os
from flask import Flask, request

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return 'Received !'


@app.route('/new-radio', methods=['POST'])
def new_radio():
    return "Done"


if __name__ == '__main__':
    app.run()
