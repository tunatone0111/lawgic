from elasticsearch import Elasticsearch
import json
from crawler import crawl
from embedder import fit_vectorizer, embed_issues
from tqdm import trange

if __name__ == "__main__":

    es = Elasticsearch('http://localhost:9200')

    with open('mappings/prec.json', 'r') as f:
        mapping = json.load(f)

    if es.indices.exists(index='precs'):
        print("deleting index 'prec'...", end="")
        es.indices.delete(index="precs")
        print(" OK")
    es.indices.create(index='precs', body=mapping)
    es.indices.put_settings(body={"index": {"max_result_window": 100000}})

    for i in trange(8):
        crawl(i)
