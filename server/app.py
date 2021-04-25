from flask import Flask, render_template, make_response, jsonify, request, send_from_directory, redirect
from elasticsearch.exceptions import NotFoundError, ConnectionError
from db import DB

import embedder
vectorizer = embedder.Vectorizer()


def create_app(ENV='dev'):
    app = Flask(__name__, static_folder='../lawgic-web/build',
                static_url_path='/')

    if ENV == 'dev':
        app.debug = True
    else:
        pass

    db = DB()

    @app.route('/api/search')
    def search():
        query = request.args.get('query')
        search_type = request.args.get('type')
        try:
            if search_type == "precNum":
                res = [{
                    **{k: [{kk: vv[0] for kk, vv in vv.items()} for vv in v] if k == 'issues' else v[0] for (k, v) in x['fields'].items()},
                    'sim': 1
                } for x in db.client.search(
                    index='precs',
                    body={
                        "size": 100,
                        "query": {
                            "match": {
                                "caseNum": query
                            }
                        },
                        'fields': ['precId', 'title', 'caseNum',  'date', 'court.*', 'caseType.*', 'judgementType', 'sentence', 'issues.text', 'issues.refClauses', 'issues.refPrecs', 'judge', 'citationCount'],
                        "_source": False
                    }
                )['hits']['hits']]
                for i in range(len(res)):
                    res[i] = {**res[i], 'court': {'name': res[i]['court.name'], 'code': res[i]['court.code']},
                              'caseType': {'name': res[i]['caseType.name'], 'code': res[i]['caseType.code']}}
                    del res[i]['court.name']
                    del res[i]['court.code']
                    del res[i]['caseType.name']
                    del res[i]['caseType.code']
                res = jsonify(precs=res)
            else:
                res = vectorizer.get_sim_precs(query)
                res = [{
                    **{k: [{kk: vv[0] for kk, vv in vv.items()} for vv in v] if k == 'issues' else v[0] for (k, v) in x['fields'].items()},
                    'sim': float(res[idx, 1])
                } for idx, x in enumerate(db.client.search(
                    index='precs',
                    body={
                        "size": 100,
                        "query": {
                            "ids": {
                                "values": res[:, 0].tolist()
                            }
                        },
                        'fields': ['precId', 'title', 'caseNum',  'date', 'court.*', 'caseType.*', 'judgementType', 'sentence', 'issues.text', 'issues.refClauses', 'issues.refPrecs', 'judge', 'citationCount'],
                        "_source": False
                    }
                )['hits']['hits'])]
                for i in range(len(res)):
                    res[i] = {**res[i], 'court': {'name': res[i]['court.name'], 'code': res[i]['court.code']},
                              'caseType': {'name': res[i]['caseType.name'], 'code': res[i]['caseType.code']}}
                    del res[i]['court.name']
                    del res[i]['court.code']
                    del res[i]['caseType.name']
                    del res[i]['caseType.code']
                res = jsonify(precs=res)
        except ConnectionError:
            res = redirect('/error', 500)
        return res

    @app.route('/api/precs/<id>')
    def get_prec(id):
        try:
            res = make_response(db.client.get(index='precs', id=id)['_source'])
        except NotFoundError:
            res = redirect('/error', 404)
        except ConnectionError:
            res = redirect('/error', 500)

        return res

    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file('index.html')

    return app
