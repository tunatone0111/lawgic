from db import DataBase
from tqdm.contrib.concurrent import process_map
from tqdm import tqdm
import numpy as np
import matplotlib.pyplot as plt

db = DataBase()

MAX = 10000

comp_vectors = []
comp_precs = []
for x in tqdm(db.issues.find(projection={"vector": True, 'prec': True}), desc='loading issues'):
    comp_vectors.append(np.array(x['vector']) / np.linalg.norm(x['vector']))
    comp_precs.append(x['prec'])
comp_vectors = np.array(comp_vectors)


def get_rank(test_issue):
    test_vector = np.array(test_issue['vector']).reshape(-1, 1) / \
        np.linalg.norm(test_issue['vector'])

    sim_tab = np.matmul(comp_vectors, test_vector) ** 2
    sim_tab_sorted_idxs = sim_tab.reshape(-1).argsort()[::-1]

    ranks = []
    for ref_prec in test_issue['refPrecs']:
        try:
            idx = comp_precs.index(ref_prec)
            rank = np.where(sim_tab_sorted_idxs == idx)[0][0]
            ranks.append(rank)
        except:
            pass

    return (np.min(ranks) if any(ranks) else -1)


pipeline = [
    {'$match': {'refPrecs': {'$ne': None}}},
    {'$project': {'vector': 1, 'refPrecs': 1}},
    {'$sample': {'size': MAX}}
]

result = process_map(get_rank, list(
    db.issues.aggregate(pipeline)), max_workers=8, chunksize=1)

plt.figure(figsize=(16, 12))
plt.hist(result, bins=100)
plt.show()
plt.savefig('tmp.png', dpi=300)
