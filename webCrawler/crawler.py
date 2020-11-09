import requests
from bs4 import NavigableString
from bs4 import BeautifulSoup
import json
from tqdm import tqdm
import re


def parse_statements(raw):
    ss = re.split('\[[0-9]\]', raw)
    ss = [s.strip() for s in ss]
    n = len(ss)
    if len(ss) != 1:
        ss = ss[1:]
    return ss, n if n == 1 else n-1


N = 10

source = requests.get(
    f"http://www.law.go.kr/precScListR.do?q=*&section=bdyText&outmax={N}&pg=1&fsort=21,10,30&precSeq=0&dtlYn=N").text

soup = BeautifulSoup(source, "lxml")

anchors = soup.select("td.tl > a")

ids = [anchor["onclick"].split("'")[1] for anchor in anchors]

precs = list()
for id in tqdm(ids):
    text = requests.get(
        f"https://www.law.go.kr/precInfoR.do?precSeq={id}&vSct=*").text
    soup = BeautifulSoup(text, "lxml")

    prec = dict()
    try:
        sa = soup.select_one(".subtit1")
        prec['caseNum'] = re.findall('[0-9]{4}.[0-9]{4,6}', sa.text.strip())[0]

        sa = soup.select_one("#sa")
        p = sa.find_next("p")
        prec['issues'], prec['order'] = parse_statements(p.text)

        sa = soup.select_one("#yo")
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
            prec['refPrecs'] = [re.findall(
                '[0-9]{4}.[0-9]{4,6}', prec) for prec in parse_statements(p.text)[0]]

        sa = soup.select_one("#jun")
        junmun = ""
        for sibling in sa.next_siblings:
            if isinstance(sibling, NavigableString):
                continue
            junmun += sibling.text

        prec['wholePrec'] = re.sub('\\n.*', '', junmun)
        prec['judge'] = re.findall('\\n.*', junmun)[0].strip()

        precs.append(prec)

    except:
        continue

with open('precTot.json', 'w', encoding='UTF-8') as f:
    f.write(json.dumps(precs, indent=2, ensure_ascii=False))
