import numpy as np
import requests
from bs4 import BeautifulSoup

class Crawler():
  def __init__(self):
    self.uri = 'http://www.law.go.kr/precScListR.do'
    self.query = {'q': '*',
                  'section': 'bdyText',
                  'outmax': 10,
                  'pg': 1,
                  'sort': [21,10,30],
                  'precSeq': 0,
                  'dtlYn': 'N'}
    
  def _parse(self, ps):
    pans = []
    for i in range(len(ps)//2):
      pan = {}
      pan['title'], pan['tag'] = ps[2*i].text.split('\xa0 ')
      pan['content'] = ps[2*i+1].text
      pans.append(pan)
    return pans

  def gather(self, max, pg):
    self.query['outmax'] = max
    self.query['pg'] = pg
    source = requests.get(self.uri, self.query).text
    soup = BeautifulSoup(source, "html.parser")
    ps = soup.select('tbody a')
    return self._parse(ps)

crawler = Crawler()

res = np.array(crawler.gather(max=10, pg=1))
print(res)