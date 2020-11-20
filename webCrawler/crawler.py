import requests
from bs4 import NavigableString
from bs4 import BeautifulSoup
import json
from tqdm import tqdm, trange
from tqdm.contrib.concurrent import process_map
import re
import sys
from time import sleep

from multiprocessing import Process, Pool


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

    prec = dict()
    try:
        title = soup.select_one('h2').text.strip()
        prec['title'] = title

        subtitle = soup.select_one(".subtit1").text.strip()
        prec['date'] = re.findall(
            '[0-9]{4}\. [0-9]{1,2}\. [0-9]{1,2}\.', subtitle)[0]
        prec['caseNum'] = re.findall(
            '[0-9]{2,4}[가-힣]{1,2}[0-9]{1,6}', subtitle)[0]

        sa = soup.select_one("#sa")
        prec['issues'] = None
        if sa != None:
            p = sa.find_next("p")
            prec['issues'], prec['order'] = parse_statements(p.text)

        sa = soup.select_one("#yo")
        prec['yo'] = None
        if sa != None:
            p = sa.find_next("p")
            prec['yo'], _ = parse_statements(p.text)

        sa = soup.select_one("#conLsJo")
        if sa != None:
            p = sa.find_next("p")
            prec['refClauses'] = [[j.strip() for j in jo.split(',')]
                                  for jo in parse_statements(p.text)[0]]

        sa = soup.select_one("#conPrec")
        if sa != None:
            p = sa.find_next("p")
            prec['refPrecs'] = [[] for _ in range(prec['order'])]
            for i in p.text.split('/'):
                tmp = re.findall('[0-9]{4}.[0-9]{4,6}', i.strip())
                for j in re.findall('\[[0-9]\]', i.strip()):
                    prec['refPrecs'][int(j[1])-1].extend(tmp)

        sa = soup.select_one("#jun")
        junmun = ""
        for sibling in sa.next_siblings:
            if isinstance(sibling, NavigableString):
                continue
            junmun += sibling.text + '\n'

        prec['wholePrec'] = re.sub('\\n\\n.*', '', junmun).strip()
        prec['judge'] = re.findall('\\n\\n.*', junmun)[0].strip()

    except:
        pass

    return prec


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
            f.write(json.dumps(precs, indent=2, ensure_ascii=False))
