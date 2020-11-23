from db import DataBase
from tqdm.contrib.concurrent import process_map
from tqdm import tqdm
import numpy as np
import matplotlib.pyplot as plt
from comparator import BertComparator, TfidfComparator

db = DataBase()

MAX = 1000

# bert_comparator = BertComparator()
tfidf_comparator = TfidfComparator()


# def get_rank_bert(test_issue):
#     test_vector = np.array(test_issue['vector']).reshape(-1, 1) / \
#         np.linalg.norm(test_issue['vector'])

#     sim_precs, idxs = bert_comparator.get_sim_precs_with_idxs(test_vector)

#     ranks = []
#     for ref_prec in test_issue['refPrecs']:
#         try:
#             rank = np.where(sim_precs == ref_prec)[0][0]
#             ranks.append(rank)
#         except:
#             pass

#     return (np.min(ranks) if any(ranks) else -1)


def get_rank_tfidf(test_issue):
    sim_precs, idxs = tfidf_comparator.get_sim_precs_with_idxs(
        test_issue['text'])

    ranks = []
    for ref_prec in test_issue['refPrecs']:
        try:
            rank = np.where(sim_precs == ref_prec)[0][0]
            ranks.append(rank)
        except:
            pass

    return (np.min(ranks) if any(ranks) else -1)


pipeline = [
    {'$match': {'refPrecs': {'$ne': None}}},
    {'$project': {'text': 1, 'vector': 1, 'refPrecs': 1}},
    {'$sample': {'size': MAX}}
]

result = process_map(get_rank_tfidf, list(
    db.issues.aggregate(pipeline)), max_workers=8, chunksize=1)

plt.figure(figsize=(16, 12))
plt.hist(result, bins=100)
plt.show()
plt.savefig('tmp.png', dpi=300)
