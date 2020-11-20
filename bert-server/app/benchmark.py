from db import DataBase
from tqdm.contrib.concurrent import process_map
from tqdm import tqdm
from multiprocessing import Pool
import numpy as np
import matplotlib.pyplot as plt
from itertools import repeat

db = DataBase()

MAX = 20


def cos_sim(a, b):
    cosine = np.dot(a, b)/(np.linalg.norm(a)*np.linalg.norm(b))
    return np.square(cosine)


result = []
i2s = []
for i2 in tqdm(db.db['issuePprec'].find()[:20000], desc='load db'):
    i2s.append(i2)

pipeline = [
    {'$match': {'refPrecs': {'$ne': None}}},
    {'$project': {'vector': 1, 'refPrecs': 1}},
    {'$sample': {'size': MAX}}
]

for issue in tqdm(db.db['Issues'].aggregate(pipeline), total=MAX):
    def work(i2):
        return (i2['pprec'], cos_sim(issue['vector'], i2['vector']))

    pool = Pool()
    sim_tab = list(pool.map(work, i2s))
    pool.close()
    pool.join()
    # sim_tab = [work_f(issue['vector'])(i2) for i2 in i2s]

    sim_tab = np.array(sorted(sim_tab, key=lambda e: e[1], reverse=True))
    for r in issue['refPrecs']:
        idxs = np.where(sim_tab[:, 0] == r)[0]
        if any(idxs):
            result.append(idxs[0])

np.save('result.npy', np.array(result))

plt.figure(figsize=(16, 12))
plt.hist(result, bins=100)
plt.show()
plt.savefig('a.png', dpi=300)
