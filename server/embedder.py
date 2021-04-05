from konlpy.tag import Mecab
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pickle
from tqdm import tqdm, trange
import json
from db import DB
from logger import get_logger
from itertools import repeat

db = DB(timeout=120)
logger = get_logger('embed')
mecab = Mecab()


# def fit_vectorizer():
#     precs = []
#     print('Gathering issues.text from ES server...', end="")
#     precs.extend(db.client.search(
#         index='precs',
#         body={
#             "size": 100000,
#             "fields": ['issues.text'],
#             "_source": False
#         },
#     )['hits']['hits'])
#     print('OK')

#     nouns = []
#     for prec in tqdm(precs):
#         if 'fields' in prec.keys():
#             for issue in prec['fields']['issues']:
#                 nouns.append(' '.join(mecab.nouns(issue['text'][0])))

#     vectorizer = TfidfVectorizer(
#         min_df=1, max_features=2048, dtype=np.float32).fit(nouns)

#     pickle.dump(vectorizer, open('vectorizer.pickle', 'wb'))
#     with open('vocab.json', 'w') as f:
#         f.write(json.dumps(
#             [*vectorizer.vocabulary_.keys()], ensure_ascii=False))

def fit_vectorizer():
    precs = db.client.search(
        index='precs',
        body={
            "size": 100000,
            "fields": ['issues.text'],
            "_source": False
        },
    )['hits']['hits']

    nouns = []
    for prec in tqdm(precs):
        if 'fields' in prec.keys():
            for issue in prec['fields']['issues']:
                nouns.append(' '.join(mecab.nouns(issue['text'][0])))

    vectorizer = TfidfVectorizer(
        min_df=1, max_features=10000, dtype=np.float32).fit(nouns)

    pickle.dump(vectorizer, open('vectorizer.pickle', 'wb'))
    with open('vocab.json', 'w') as f:
        f.write(json.dumps(
            [*vectorizer.vocabulary_.keys()], ensure_ascii=False))

# def embed_issues():
#     vectorizer = pickle.load(open('vectorizer.pickle', 'rb'))

#     precs = db.client.search(
#         index='precs',
#         body={
#             "size": 100000,
#             "fields": ['issues.*'],
#             "_source": False
#         },
#     )['hits']['hits']
#     print('precs loaded')

#     for prec in tqdm(precs):
#         if 'fields' in prec.keys():
#             for issue in prec['fields']['issues']:
#                 raw = ' '.join(mecab.nouns(issue['text'][0]))
#                 vec = vectorizer.transform([raw]).toarray().reshape(-1)
#                 if vec.shape[0] < 2048:
#                     vec = np.pad(vec, (0, 2048-vec.shape[0]))
#                 issue['vector'] = vec

#             db.client.update(
#                 index='precs',
#                 id=prec['_id'],
#                 body={"doc": {"issues": prec['fields']['issues']}}
#             )

# def embed_issues():
#     vectorizer = pickle.load(open('vectorizer.pickle', 'rb'))

#     hits = db.client.search(
#         index='precs',
#         body={
#             "size": 100000,
#             "query": {
#                 "nested": {
#                     "path": "issues",
#                     "query": {"exists": {"field": "issues"}}
#                 }
#             },
#             "fields": ['issues.text'],
#             "_source": False
#         },
#     )['hits']['hits']
#     precs = [{
#         'id': hit['_id'],
#         'issues': [{'text': x['text'][0]} for x in hit['fields']['issues']]

#     } for hit in hits]
#     print('precs loaded')

#     for prec in tqdm(precs):
#         for issue in prec['issues']:
#             raw = ' '.join(mecab.nouns(issue['text']))
#             vec = vectorizer.transform([raw]).toarray().reshape(-1)
#             if vec.shape[0] < 2048:
#                 vec = np.pad(vec, (0, 2048-vec.shape[0]))
#             issue['vec'] = vec

#         db.client.update(
#             index='precs',
#             id=prec['id'],
#             body={
#                 "script": {
#                     "source": """
#                         for (int i=0; i<ctx._source.issues.length; i++){
#                            ctx._source.issues[i].vector = params.vectors[i]
#                         }
#                     """,
#                     "params": {"vectors": [x['vec'] for x in prec['issues']]}
#                 }
#             }
#         )


def embed_issues():
    vectorizer = pickle.load(open('vectorizer.pickle', 'rb'))

    hits = db.client.search(
        index='precs',
        body={
            "size": 100000,
            "query": {
                "nested": {
                    "path": "issues",
                    "query": {"exists": {"field": "issues"}}
                }
            },
            "fields": ['issues.text'],
            "_source": False
        },
    )['hits']['hits']
    precs = [{
        'id': hit['_id'],
        'issues': [x['text'][0] for x in hit['fields']['issues']]

    } for hit in hits]
    print('precs loaded')

    data = dict(precs=[], vector=[])
    for prec in tqdm(precs):
        issues = [' '.join(mecab.nouns(issue)) for issue in prec['issues']]
        data['vector'].extend(issues)
        data['precs'].extend(repeat(prec['id'], len(issues)))
    data['precs'] = np.array(data['precs'])
    data['vector'] = vectorizer.transform(data['vector'])

    pickle.dump(data, open('./tfidf.pickle', 'wb'))

    return data


class Vectorizer():
    def __init__(self):
        self.tokenizer = Mecab()
        self.vectorizer = pickle.load(open('vectorizer.pickle', 'rb'))
        self.tfidf_vectors = pickle.load(open('tfidf.pickle', 'rb'))

    def vectorize(self, target):
        nouns = ' '.join(self.tokenizer.nouns(target))
        vector = self.vectorizer.transform([nouns]).toarray().reshape(-1)
        if vector.shape[0] < 2048:
            vector = np.pad(vector, (0, 2048-vector.shape[0]))
        return vector

    def get_sim_precs(self, target):
        vec = self.vectorize(target)
        sim = cosine_similarity(
            [vec], self.tfidf_vectors['vector']).reshape(-1)

        idxs = sim.argsort()[::-1]
        uidxs = sorted(np.unique(
            self.tfidf_vectors['precs'][idxs], return_index=True)[1])

        ret = np.array(
            (self.tfidf_vectors['precs'][idxs][uidxs], sim[idxs][uidxs])).transpose()

        ret = ret[np.where(ret[:, 1].astype(np.float32) > 0.3)]
        return ret


if __name__ == '__main__':
    fit_vectorizer()
    embed_issues()
