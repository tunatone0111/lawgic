from bert.load_model import LawgicBertModel
from db import DataBase
from tqdm import tqdm

db = DataBase()

issues = list(db.issues.find(projection={'_id': True, 'text': True}))

model = LawgicBertModel()
for issue in tqdm(issues):
    vec = model.embed(issue['text']).tolist()
    db.issues.update_one({'_id': issue['_id']}, {'$set': {'vector': vec}})


