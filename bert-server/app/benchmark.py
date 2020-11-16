from db import DataBase
import numpy as np

db = DataBase()


def cos_sim(a, b):
    cosine = np.dot(a, b)/(np.linalg.norm(a)*np.linalg.norm(b))
    return np.square(cosine)


for issue in db.read_issues({'refPrecs': {'$ne': None}}, {'vector': 1, 'refPrecs': 1})[:10]:
    sim_tab = []
    for i2 in db.db['issuePprec'].find():
        sim_tab.append((i2['pprec'], cos_sim(issue['vector'], i2['vector'])))
    sim_tab = np.array(sorted(sim_tab, key=lambda e: e[1], reverse=True))
    for r in issue['refPrecs']:
        print(np.where(sim_tab[:, 0] == r))
    # print(sim_tab)
