from pymongo import MongoClient


class DataBase():
    def __init__(self):
        self.connection = MongoClient('localhost', 27017)
        self.db = self.connection['lawgic']

    def read_issues(self, filt={}, projection=None):
        return self.db['Issues'].find(filt, projection)
