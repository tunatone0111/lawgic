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
        vector = None
        precs = None
        is_cached, cached_id = comparator.find_for_cache(q)
        if not is_cached:
            vector, precs = comparator.get_sim_precs(q)
        return jsonify(vector=vector,
                       precs=precs,
                       isCached=is_cached,
                       cachedId=cached_id)

    return app
