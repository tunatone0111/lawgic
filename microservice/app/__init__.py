from flask import Flask, request, jsonify
from .db import DataBase
from .comparator import TfidfComparator
import numpy as np


def create_app(config_name='prod'):
    app = Flask(__name__)

    db = DataBase()
    comparator = TfidfComparator()

    @app.route('/')
    def get_precs():
        q = request.args.get('q')
        return jsonify(precs=comparator.get_sim_precs(q))

    return app
