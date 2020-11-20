from pymongo import MongoClient
import json
from tqdm import trange

connection = MongoClient('localhost', 27017)
db = connection['lawgic']

for i in trange(1, 9+1):

    with open(f'precs/precs_{i}.json', 'r', encoding='UTF-8') as f:
        precs = json.loads(f.read())

    precs_model = db['Precs']
    issues_model = db['Issues']

    for prec in precs:
        prec_id = precs_model.insert_one(prec).inserted_id
        if 'issues' in prec and prec['issues'] is not None:
            for idx, issue in enumerate(prec['issues']):
                refPrecs = prec['refPrecs'][idx] if 'refPrecs' in prec else None
                issues_model.insert_one({
                    "text": issue,
                    "vector": None,
                    "prec": prec['caseNum'],
                    "refPrecs": refPrecs if refPrecs is not None and any(refPrecs) else None
                })
