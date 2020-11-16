from flask import Flask, make_response
from app.bert import embed
import numpy as np


def create_app(config_name='prod'):
    app = Flask(__name__)

    @app.route('/')
    def index():
        return "index"

    @app.route('/embed')
    def bert():
        data = embed('아버지가 방에 들어가신다.')
        print(data)
        res = make_response(data.tobytes())
        return res

    return app
