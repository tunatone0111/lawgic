import os
from pymongo import MongoClient


class DataBase():
    def __init__(self):
        db_pwd = os.environ.get('LAWGIC_DB_PWD')
        if db_pwd is None:
            print("FATAL: please set LAWGIC_DB_PWD")
            exit()

        self.connection = MongoClient(
            host='localhost', port=27017, username='lawgic', password=db_pwd, authSource='admin')
        self.db = self.connection['lawgic']
        self.issues = self.db['Issues']
        self.precs = self.db['Precs']
