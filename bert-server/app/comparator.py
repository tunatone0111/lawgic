from app.db import DataBase
import numpy as np


class Comparator():
    def __init__(self):
        print('initialize comparator...')
        db = DataBase()
        comp_vectors = []
        comp_precs = []
        for x in db.issues.find(projection={"vector": True, 'prec': True}):
            comp_vectors.append(
                np.array(x['vector']) / np.linalg.norm(x['vector']))
            comp_precs.append(x['prec'])
        self.comp_vectors = np.array(comp_vectors)
        self.comp_precs = np.array(comp_precs)

    def get_sim_precs(self, vec):
        vec = np.array(vec.reshape(-1, 1) / np.linalg.norm(vec))
        sim_tab = np.matmul(self.comp_vectors, vec) ** 2
        sim_tab_sorted_idxs = sim_tab.reshape(-1).argsort()[::-1]

        print(sim_tab_sorted_idxs.shape, sim_tab_sorted_idxs.dtype)
        return self.comp_precs[sim_tab_sorted_idxs]
