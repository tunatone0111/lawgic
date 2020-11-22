from flask import Flask, request
from app.db import DataBase
from .bert.load_model import LawgicBertModel
from app.comparator import Comparator
import numpy as np


def create_app(config_name='prod'):
    app = Flask(__name__)

    db = DataBase()
    lawgic_bert_model = LawgicBertModel()
    comparator = Comparator()

    @app.route('/')
    def bert():
        q = request.args.get('q')
        embedded_q = lawgic_bert_model.embed(q)
        return {"data": comparator.get_sim_precs(embedded_q).tolist()}

    return app
