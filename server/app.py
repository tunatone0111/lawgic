from flask import Flask, render_template, make_response, jsonify, request, send_from_directory, redirect
from elasticsearch import Elasticsearch
from elasticsearch.exceptions import NotFoundError, ConnectionError

import embedder
vectorizer = embedder.Vectorizer()

ENV = 'dev'
app = Flask(__name__, static_folder='../lawgic-web/build', static_url_path='/')
app.config['JSON_AS_ASCII'] = False

if ENV == 'dev':
    host, port = 'localhost', 9200
    app.debug = True
else:
    pass

db = Elasticsearch(f'{host}:{port}')


def embed(q):
    return q


@app.route('/api/search')
def search():
    query = request.args.get('query')
    vec = vectorizer.vectorize(query)

    try:
        res = [{
            **{k: [{kk: vv[0] for kk, vv in vv.items()} for vv in v] if k == 'issues' else v[0] for (k, v) in x['fields'].items()},
            'sim': x['_score']
        } for x in db.search(
            index='precs',
            body={
                "query": {
                    'script_score': {
                        "query": {"match_all": {}},
                        "script": {
                            "source": """
                                def max = 0;
                                for(def i : doc['issues']){
                                    def sim = cosineSimilarity(params.vec, i.vector) + 1.0 ;
                                    if(max < sim){
                                        max=sim;
                                    }
                                }
                                return 5.0;
                            """,
                            "params": {"vec": vec}
                        },
                        'min_score': 0.5
                    },
                },
                'fields': ['precId', 'title', 'caseNum',  'date', 'court', 'caseType', 'judgementType', 'sentence', 'issues.text', 'issues.refClauses', 'issues.refPrecs', 'judge', 'citationCount']
            },
        )['hits']['hits']]
        res = jsonify(precs=res)
    except ConnectionError:
        res = redirect('/error', 500)

    return res


@app.route('/api/precs/<id>')
def get_prec(id):
    try:
        res = make_response(db.get(index='precs', id=id))
    except NotFoundError:
        res = redirect('/error', 404)
    except ConnectionError:
        res = redirect('/error', 500)

    return res


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run()
