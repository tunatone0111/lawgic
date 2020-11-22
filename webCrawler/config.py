import os

db_pwd = os.environ.get('LAWGIC_DB_PWD')
if db_pwd is None:
    print("FATAL: please set LAWGIC_DB_PWD")
    exit()
