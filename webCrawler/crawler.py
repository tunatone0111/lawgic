import requests
from bs4 import BeautifulSoup
import json
from tqdm import tqdm, trange
from tqdm.contrib.concurrent import process_map
import re
import sys
from time import sleep
from attr import attrs, attrib, asdict
from multiprocessing import Process, Pool


@attrs
class Prec(object):
    title = attrib(None, type=str)
    date = attrib(None, type=str)
    caseNum = attrib(None, type=str)
    courtOrder = attrib(None, type=int)
    isEnBanc = attrib(False, type=bool)
    issues = attrib(None, type=list)
    order = attrib(None, type=int)
    yo = attrib(None, type=list)
    refClauses = attrib(None, type=list)
    refPrecs = attrib(None, type=list)
    wholePrec = attrib(None, type=str)
    judge = attrib(None, type=str)
    citationCount = attrib(0, type=int)


def parse_statements(raw):
    ss = re.split('\[[0-9]\]', raw)
    ss = [s.strip() for s in ss]
    n = len(ss)
    if len(ss) != 1:
        ss = ss[1:]
    return ss, n if n == 1 else n-1


def work(id):
    while True:
        try:
            text = requests.get(
                f"https://www.law.go.kr/precInfoR.do?precSeq={id}&vSct=*").text
            soup = BeautifulSoup(text, "lxml")
        except:
            print("connection error. retry in 10 secs...")
            sleep(10)
            continue
        break

    prec = Prec()
    try:
        title = soup.select_one('h2').text.strip()
        prec.title = title

        subtitle = soup.select_one(".subtit1").text.strip()
        prec.date = re.findall(
            '[0-9]{4}\. [0-9]{1,2}\. [0-9]{1,2}\.', subtitle)[0]
        prec.caseNum = re.findall(
            '[0-9]{2,4}[가-힣]{1,2}[0-9]{1,6}', subtitle)[0]

        if any(re.findall('.*[가-깋].*', prec.caseNum)):
            prec.courtOrder = 1
        elif any(re.findall('.*[나-닣].*', prec.caseNum)):
            prec.courtOrder = 2
        elif any(re.findall('.*[다-딯].*', prec.caseNum)):
            prec.courtOrder = 3
        else:
            prec.courtOrder = 0

        prec.isEnBanc = any(re.findall('.*합.*', prec.caseNum))

        sa = soup.select_one("#sa")
        if sa != None:
            p = sa.find_next("p")
            prec.issues, prec.order = parse_statements(p.text)

        sa = soup.select_one("#yo")
        if sa != None:
            p = sa.find_next("p")
            prec.yo, _ = parse_statements(p.text)

        sa = soup.select_one("#conLsJo")
        if sa != None:
            p = sa.find_next("p")
            prec.refClauses = [[j.strip() for j in jo.split(',')]
                               for jo in parse_statements(p.text)[0]]

        sa = soup.select_one("#conPrec")
        if sa != None:
            p = sa.find_next("p")
            prec.refPrecs = [[] for _ in range(prec.order)]
            for i in p.text.split('/'):
                tmp = re.findall('[0-9]{4}.[0-9]{4,6}', i.strip())
                for j in re.findall('\[[0-9]\]', i.strip()):
                    prec.refPrecs[int(j[1])-1].extend(tmp)
            prec.refPrecs = [x if any(x) else None for x in prec.refPrecs]

        sa = soup.select_one("#jun")
        sa = [sa, *list(sa.next_siblings)][::2]
        prec.wholePrec = ''.join([str(x) for x in sa[:-2]])
        prec.judge = sa[-2].text.strip()

    except:
        pass

    return asdict(prec)


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('please enter the arguments')
        sys.exit()
    pages = [(int(sys.argv[1])), (int(sys.argv[2]))]

    for page in trange(pages[0], pages[1]+1, desc="page"):
        source = requests.get(
            f"http://www.law.go.kr/precScListR.do?q=*&section=bdyText&outmax=10000&pg={page}&fsort=21,10,30&precSeq=0&dtlYn=N").text

        soup = BeautifulSoup(source, "lxml")
        anchors = soup.select("td.tl > a")
        ids = [anchor["onclick"].split("'")[1] for anchor in anchors]

        pool = Pool()
        precs = process_map(work, ids, chunksize=1,
                            max_workers=8, desc="precs")
        pool.close()
        pool.join()

        with open(f'precs/precs_{page}.json', 'w', encoding='UTF-8') as f:
            f.write(json.dumps(precs[::-1], indent=2, ensure_ascii=False))
