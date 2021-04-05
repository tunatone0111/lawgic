from elasticsearch import Elasticsearch


class DB():
    def __init__(self, host='localhost', port=9200, timeout=10):
        self.client = Elasticsearch(f'{host}:{port}', timeout=timeout)
