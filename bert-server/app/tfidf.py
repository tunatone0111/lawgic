from konlpy.tag import Mecab
from db import DataBase
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from tqdm import tqdm


class TfidfComparator():
    def __init__(self):
        print('initializing TfidfComparator...')
        db = DataBase()
        self.mecab = Mecab()
        issues_noun = []
        self.precs = []
        for x in tqdm(db.issues.find(projection={"text": True, 'prec': True})):
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
        idxs = sim_mat.argsort()

        return self.precs[idxs[::-1]], idxs


if __name__ == '__main__':
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


# plt.figure()
# sns.heatmap(data=noun_comp(issues).toarray(), cmap='Blues')
# plt.show()
# plt.savefig('nouns.png', dpi=300)
