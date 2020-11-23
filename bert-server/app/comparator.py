from konlpy.tag import Mecab
from db import DataBase
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from tqdm import tqdm


class Comparator():
    def __init__(self):
        self.db = DataBase()
        self.precs = []


class BertComparator(Comparator):
    def __init__(self):
        print('initialize BertComparator...')
        super().__init__()
        comp_vectors = []
        for x in tqdm(self.db.issues.find(projection={"vector": True, 'prec': True})):
            comp_vectors.append(
                np.array(x['vector']) / np.linalg.norm(x['vector']))
            self.precs.append(x['prec'])
        self.comp_vectors = np.array(comp_vectors)
        self.precs = np.array(self.precs)

    def get_sim_precs_with_idxs(self, vec):
        vec = np.array(vec.reshape(-1, 1) / np.linalg.norm(vec))
        sim_tab = np.matmul(self.comp_vectors, vec) ** 2
        idxs = sim_tab.reshape(-1).argsort()[::-1]

        idx = np.unique(self.precs[idxs], return_index=True)[1]
        sim_precs = self.precs[idxs][sorted(idx)]

        return sim_precs, idxs


class TfidfComparator(Comparator):
    def __init__(self):
        print('initializing TfidfComparator...')
        super().__init__()
        self.mecab = Mecab()
        issues_noun = []
        for x in tqdm(self.db.issues.find(projection={"text": True, 'prec': True})):
            issues_noun.append(' '.join(self.mecab.nouns(x['text'])))
            self.precs.append(x['prec'])
        self.precs = np.array(self.precs)

        print('    fitting...')
        self.tfidf_vectorizer = TfidfVectorizer(
            min_df=1, max_features=10000, dtype=np.float32).fit(issues_noun)
        self.tfidf_vectors = self.tfidf_vectorizer.transform(
            issues_noun).toarray()

    def get_sim_precs_with_idxs(self, target_string):
        target_nouns = ' '.join(self.mecab.nouns(target_string))
        target_vector = self.tfidf_vectorizer.transform(
            [target_nouns]).toarray()
        sim_mat = np.matmul(self.tfidf_vectors,
                            np.transpose(target_vector)).reshape(-1)
        idxs = sim_mat.argsort()[::-1]

        idx = np.unique(self.precs[idxs], return_index=True)[1]
        sim_precs = self.precs[idxs][sorted(idx)]

        return sim_precs, idxs


if __name__ == '__main__':
    """ Example for TF-IDF comparator """
    db = DataBase()
    tfidf_comparator = TfidfComparator()

    pipeline = [{'$project': {'text': True}}, {'$sample': {'size': 10}}]

    targets = []
    for x in db.issues.aggregate(pipeline):
        targets.append(x['text'])
    targets = np.array(targets)

    for target in targets:
        print('\n\ncalculating...')
        print(f'input: {target}')
        sim_precs, _ = tfidf_comparator.get_sim_precs_with_idxs(target)
        for i in range(10):
            print(f'#{i+1}: {sim_precs[i]}')
