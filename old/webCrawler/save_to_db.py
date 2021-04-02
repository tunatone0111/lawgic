from pymongo import MongoClient
import json
from tqdm import trange, tqdm
import config
import re
from datetime import datetime
import sys
from attr import attrs, attrib, asdict


@attrs
class Issue():
    text = attrib(None, type=str)
    prec = attrib(None, type=str)
    refPrecs = attrib(None, type=list)


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('please enter the arguments')
        sys.exit()

    connection = MongoClient('localhost', 27017,
                             username='lawgic',
                             password=config.db_pwd,
                             authSource='admin')
    db = connection['lawgic']
    precs_model = db['Precs']
    issues_model = db['Issues']
    precs_model.drop()
    issues_model.drop()

    for i in trange((int(sys.argv[2])), (int(sys.argv[1]))-1, -1, desc='page'):
        with open(f'precs/precs_{i}.json', 'r', encoding='UTF-8') as f:
            precs = json.loads(f.read())

        for prec in tqdm(precs, desc='prec'):
            if prec['date'] is not None:
                prec['date'] = datetime.strptime(prec['date'], '%Y. %m. %d.')

            precs_model.insert_one(prec)
            if prec['issues'] is not None:
                for idx, issue in enumerate(prec['issues']):
                    created_issue = Issue(text=issue, prec=prec['caseNum'])
                    if prec['refPrecs'] is not None:
                        created_issue.refPrecs = prec['refPrecs'][idx]
                        if prec['refPrecs'][idx] is not None:
                            for x in prec['refPrecs'][idx]:
                                precs_model.find_one_and_update(
                                    {'caseNum': x}, {'$inc': {'citationCount': 1}})
                    issues_model.insert_one(asdict(created_issue))
