from flask import Flask, make_response, request
from app.bert import embed
from app.db import DataBase
import numpy as np


def cos_sim(a, b):
    cosine = np.dot(a, b)/(np.linalg.norm(a)*np.linalg.norm(b))
    return np.square(cosine)


def create_app(config_name='prod'):
    app = Flask(__name__)

    db = DataBase()

    @app.route('/')
    def index():
        return "index"

    @app.route('/embed')
    def bert():
        q = request.args.get('q')
        embedded_q = embed(q)
        sim_tab = [(issue['prec'], cos_sim(embedded_q, issue['vector']))
                   for issue in db.read_issues({}, {'vector': 1, 'prec': 1})[:10000]]
        sim_tab = np.array(sorted(sim_tab, key=lambda e: e[1], reverse=True))
        return {'ids': list(sim_tab[:, 0].astype(str))[:100]}

    return app
