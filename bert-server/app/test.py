from tqdm import tqdm
from app.bert import embed
from app.db import DataBase
import numpy as np
import csv
import matplotlib.pyplot as plt

# %%


def cos_sim(a, b):
    cosine = np.dot(a, b)/(np.linalg.norm(a)*np.linalg.norm(b))
    return np.square(cosine)
# %%


db = DataBase()
sim_tab = []

ev = embed('학교법인이 임차인이 주선한 신규임차인이 되려는 자와 임대차계약을 체결하는 것이 경쟁입찰의 방법으로 임차인을 선정해야 할 법령상 의무를 위반하는 것이 되는 경우, 구 상가건물 임대차보호법 제10조의4 제1항 제4호에서 정한 임대차계약 체결을 거절할 ‘정당한 사유’가 있는 경우에 해당하는지 여부(원칙적 적극)')
# %%
sim_tab = []
for issue in tqdm(db.read_issues({}, {'_id': 1, 'vector': 1})[:10000]):
    sim_tab.append((issue['_id'], cos_sim(ev, issue['vector'])))

# %%
res = np.array(sorted(sim_tab, key=lambda e: e[1]))
# %%
plt.figure(figsize=(16, 9))
plt.hist(res[:, 1])
plt.show()
