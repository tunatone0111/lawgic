from datetime import datetime
import json
import re
from typing import List, Literal, Optional, TypedDict

from bs4 import BeautifulSoup
import bs4
from elasticsearch.client import Elasticsearch
import requests
import pandas as pd
import numpy as np
import xmltodict
from tqdm import tqdm
from time import sleep
from logger import get_logger
from multiprocessing import Pool
from db import DB

db = DB(timeout=60)


logger = get_logger('crawl')


class Court(TypedDict):
    name: str  # 법원명
    code: Literal[400201, 400202]  # 법원종류코드


class CaseType(TypedDict):
    name: str  # 사건종류명
    code: int  # 사건종류코드


class Issue(TypedDict):
    text: str
    yo: str
    refClauses: List[str]
    refPrecs: List[str]
    vector: List


class Prec(TypedDict):
    precId: int
    title: str
    caseNum: str
    date: datetime
    court: Court
    caseType: CaseType
    judgementType: str  # 판결 유형
    sentence: str   # 선고
    issues: Optional[List[Issue]]  # 판시사항
    wholePrec: str  # 판례내용
    judge: str  # 판사
    citationCount: int  # 참조횟수


api_key = 'aquila193015'


def rm_tags(raw):
    soup = BeautifulSoup(raw, 'lxml')
    res = ''
    for child in soup.html.body.children:
        if type(child) == bs4.element.Tag:
            if child.name in ['a', 'p', 'b']:
                res = res + child.text
        else:
            res = res + child.string
    return res


def get_prec_raw(prec_id: int) -> dict:
    while True:
        try:
            res = requests.get('http://www.law.go.kr/DRF/lawService.do', params={
                "OC": api_key,
                "target": 'prec',
                "type": "XML",
                "ID": prec_id
            })
            prec_raw = json.loads(json.dumps(xmltodict.parse(res.text)))[
                'PrecService']
        except:
            logger.warning('Connection error. Retry in 10 sec...')
            sleep(10)
            continue
        break
    return prec_raw


re_obj = re.compile('\[[0-9]\]')


def my_issue_parser(prec_raw) -> Optional[List[Issue]]:
    issue_raw = prec_raw['판시사항']
    if issue_raw == None:
        return None

    matched = [*re_obj.finditer(issue_raw)]

    result: List[Issue] = []
    if not any(matched):
        result.append(Issue(text=rm_tags(issue_raw).strip(),
                            yo='', refClauses=[], refPrecs=[]))
    else:
        idxs = [x.start() for x in matched]
        for i, j in zip(idxs, [*idxs[1:], None]):
            result.append(
                Issue(text=rm_tags(issue_raw[i+3:j].strip()), yo='', refClauses=[], refPrecs=[]))

    yo_raw = prec_raw['판결요지']
    if yo_raw == None:
        pass
    else:
        matched = [*re_obj.finditer(yo_raw)]
        if not any(matched):
            result[0]['yo'] = rm_tags(yo_raw)
        else:
            idxs = [x.start() for x in matched]
            for i, j in zip(idxs, [*idxs[1:], None]):
                result[int(yo_raw[i+1]) -
                       1]['yo'] = rm_tags(yo_raw[i+3:j].strip())

    refClauses_raw = prec_raw['참조조문']
    if refClauses_raw == None:
        pass
    else:
        matched = [*re_obj.finditer(refClauses_raw)]
        if not any(matched):
            result[0]['refClauses'] = [refClauses_raw]
        else:
            idxs = [x.start() for x in matched]
            for i, j in zip(idxs, [*idxs[1:], None]):
                result[int(refClauses_raw[i+1]) -
                       1]['refClauses'] = [refClauses_raw[i+3:j].strip()]

    refPrecs_raw = prec_raw['참조판례']
    if refPrecs_raw == None:
        pass
    else:
        matched = [*re_obj.finditer(refPrecs_raw)]
        if not any(matched):
            result[0]['refPrecs'] = [refPrecs_raw]
        else:
            idxs = [x.start() for x in matched]
            for i, j in zip(idxs, [*idxs[1:], None]):
                result[int(refPrecs_raw[i+1]) -
                       1]['refPrecs'] = [refPrecs_raw[i+3:j].strip()]

    return result


def crawl(page):
    err = 0
    res = requests.get('http://www.law.go.kr/DRF/lawSearch.do', params={
        "OC": api_key,
        "target": 'prec',
        "type": "XML",
        "display": 10000,
        "page": page
    })
    precs = pd.DataFrame(json.loads(json.dumps(xmltodict.parse(res.text)))[
        'PrecSearch']['prec'])
    for prec_id in tqdm(precs['판례일련번호'], position=page):
        try:
            prec_raw = get_prec_raw(int(prec_id))
            prec: Prec = {
                'precId': prec_raw['판례정보일련번호'],
                'title': prec_raw['사건명'],
                'caseNum': prec_raw['사건번호'],
                'date': datetime.strptime(prec_raw['선고일자'], "%Y%m%d"),
                'court': {'name': prec_raw['법원명'], 'code': prec_raw['법원종류코드']},
                'caseType': {'name': prec_raw['사건종류명'], 'code': prec_raw['사건종류코드']},
                'judgementType': prec_raw['판결유형'],  # 판결 유형
                'sentence': prec_raw['선고'],  # 선고
                'issues': my_issue_parser(prec_raw),  # 판시사항
                'wholePrec': prec_raw['판례내용'],  # 판례내용
                'judge': '잘 몰라요',  # 판사
                'citationCount': 0  # 참조횟수
            }
            db.client.index(index="precs", doc_type="_doc",
                            id=prec['precId'], body=prec)
        except Exception as e:
            logger.warning(e)
            err = err + 1
    return err


if __name__ == "__main__":
    with open('mappings/prec.json', 'r') as f:
        mapping = json.load(f)

    if db.client.indices.exists(index='precs'):
        db.client.indices.delete(index="precs")

    db.client.indices.create(index='precs', body=mapping)
    db.client.indices.put_settings(
        body={"index": {"max_result_window": 100000}})

    pool = Pool(processes=4)
    errors = pool.map(crawl, range(8))
    pool.close()
    pool.join()

    logger.warning(f'error: {errors}')
