from pymongo import MongoClient
import json


connection = MongoClient('localhost', 27017)
db = connection['lawgic']

precs_model = db['Precs']
issues_model = db['Issues']

for issue in issues_model.find({'refPrecs': {'$ne': None}}, projection=['refPrecs']):
    print(issue)
