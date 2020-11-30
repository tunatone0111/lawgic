import numpy as np


def cos_sim(a, b):
    cosine = np.dot(a, b)/(np.linalg.norm(a)*np.linalg.norm(b))
    return np.square(cosine)
