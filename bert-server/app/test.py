from tqdm import tqdm
from db import DataBase
from bert import embed

db = DataBase()

for i in tqdm(db.read_issues({'vector': None}, {'_id': True, 'text': True})):
    vec = embed(i['text'])
    new_val = {"$set": {"vector": vec.tolist()}}
    db.db['Issues'].update_one({"_id": i["_id"]}, new_val)
