import requests
from bs4 import NavigableString
from bs4 import BeautifulSoup
import json

N = 3

source = requests.get(
    f"http://www.law.go.kr/precScListR.do?q=*&section=bdyText&outmax={N}&pg=1&fsort=21,10,30&precSeq=0&dtlYn=N").text

soup = BeautifulSoup(source, "lxml")

anchors = soup.select("td.tl > a")

ids = []
for anchor in anchors:
    ids.append(anchor["onclick"].split("'")[1])

precs = list()
for id in ids:
    text = requests.get(
        f"https://www.law.go.kr/precInfoR.do?precSeq={id}&vSct=*").text
    soup = BeautifulSoup(text, "lxml")

    prec = dict()

    sa = soup.select_one("#sa")
    p = sa.find_next("p")
    prec['issue'] = p.text  # <p> {p.text} </p>

    sa = soup.select_one("#yo")
    p = sa.find_next("p")
    prec['yo'] = p.text  # <p> {p.text} </p>

    sa = soup.select_one("#conLsJo")
    p = sa.find_next("p")
    prec['refClause'] = p.text  # <p> {p.text} </p>

    sa = soup.select_one("#jun")
    junmun = ""
    for sibling in sa.next_siblings:
        if isinstance(sibling, NavigableString):
            continue
        junmun += sibling.text

    prec['wholePrec'] = junmun

    precs.append(prec)

with open('precTot.json', 'w', encoding='UTF-8') as f:
    f.write(json.dumps(precs, indent=2, ensure_ascii=False))
