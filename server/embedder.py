from konlpy.tag import Mecab
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from pprint import pprint
import pickle
from tqdm import tqdm, trange
import json
from db import db

mecab = Mecab()


def fit_vectorizer():
    precs = db.search(
        index='precs',
        body={
            "fields": ['issues.text'],
            "_source": False
        },
        size=10000
    )['hits']['hits']

    nouns = []
    for prec in tqdm(precs):
        if 'fields' in prec.keys():
            for issue in prec['fields']['issues']:
                nouns.append(' '.join(mecab.nouns(issue['text'][0])))

    vectorizer = TfidfVectorizer(
        min_df=1, max_features=2048, dtype=np.float32).fit(nouns)

    pickle.dump(vectorizer, open('vectorizer.pickle', 'wb'))
    with open('vocab.json', 'w') as f:
        f.write(json.dumps(
            [*vectorizer.vocabulary_.keys()], ensure_ascii=False))


def embed_issues():
    vectorizer = pickle.load(open('vectorizer.pickle', 'rb'))
    for i in trange(1):
        precs = db.search(
            index='precs',
            body={
                "from": 100*i,
                "size": 100,
                "fields": ['issues.*'],
                "_source": False
            },
        )['hits']['hits']

        for prec in tqdm(precs, leave=False):
            if 'fields' in prec.keys():
                for issue in prec['fields']['issues']:
                    vec = vectorizer.transform(
                        [' '.join(mecab.nouns(issue['text'][0]))])[0].toarray().tolist()[0]
                    if len(vec) < 2048:
                        vec = np.pad(vec, (0, 2048-len(vec)))
                    issue['vector'] = vec
                db.update(
                    index='precs',
                    id=prec['_id'],
                    body={
                        "doc": {
                            "issues": prec['fields']['issues']
                        }
                    }
                )


class Vectorizer():
    def __init__(self):
        self.tokenizer = Mecab()
        self.vectorizer = pickle.load(open('vectorizer.pickle', 'rb'))

    def vectorize(self, target):
        nouns = ' '.join(self.tokenizer.nouns(target))
        vector = self.vectorizer.transform([nouns]).toarray().tolist()[0]
        return vector


if __name__ == '__main__':
    # fit_vectorizer()
    embed_issues()

# pprint(nouns)


# issues = db.get('precs', 212645)['_source']['issues']


# for issue in issues:
#     issue['vec'] = [0, 2, 3, 1, 3]

# db.update('precs', 212645, body={
#     "doc": {
#         "issues": issues
#     }
# })
