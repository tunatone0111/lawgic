# import MeCab
# m = MeCab.Tagger('-d /usr/local/lib/mecab/dic/mecab-ko-dic/')
# print(m.parse('테스트입니다.').split())
from bs4 import BeautifulSoup
import bs4
from pprint import pprint
t = "<a href=\"#AJAX\" class=\"link\" onclick=\"javascript:fncLawPop('\ub300\ud1b5\ub839\uae30\ub85d\ubb3c \uad00\ub9ac\uc5d0 \uad00\ud55c \ubc95\ub960','JO','000200','prec20100204');\" >\uad6c \ub300\ud1b5\ub839\uae30\ub85d\ubb3c \uad00\ub9ac\uc5d0 \uad00\ud55c \ubc95\ub960(2010. 2. 4. \ubc95\ub960 \uc81c10009\ud638\ub85c \uac1c\uc815\ub418\uae30 \uc804\uc758 \uac83) \uc81c2\uc870</a>, <a href=\"#AJAX\" class=\"link\" onclick=\"javascript:fncLawPop('\ub300\ud1b5\ub839\uae30\ub85d\ubb3c \uad00\ub9ac\uc5d0 \uad00\ud55c \ubc95\ub960','JO','000100','prec');\" >\ub300\ud1b5\ub839\uae30\ub85d\ubb3c \uad00\ub9ac\uc5d0 \uad00\ud55c \ubc95\ub960 \uc81c1\uc870</a>, <a href=\"#AJAX\" class=\"link\" onclick=\"javascript:fncLawPop('\ub300\ud1b5\ub839\uae30\ub85d\ubb3c \uad00\ub9ac\uc5d0 \uad00\ud55c \ubc95\ub960','JO','000800','prec');\" >\uc81c8\uc870</a>, <a href=\"#AJAX\" class=\"link\" onclick=\"javascript:fncLawPop('\ub300\ud1b5\ub839\uae30\ub85d\ubb3c \uad00\ub9ac\uc5d0 \uad00\ud55c \ubc95\ub960','JO','001000','prec');\" >\uc81c10\uc870 \uc81c1\ud56d</a>, <a href=\"#AJAX\" class=\"link\" onclick=\"javascript:fncLawPop('\ub300\ud1b5\ub839\uae30\ub85d\ubb3c \uad00\ub9ac\uc5d0 \uad00\ud55c \ubc95\ub960','JO','001100','prec');\" >\uc81c11\uc870 \uc81c1\ud56d</a>, <a href=\"#AJAX\" class=\"link\" onclick=\"javascript:fncLawPop('\ub300\ud1b5\ub839\uae30\ub85d\ubb3c \uad00\ub9ac\uc5d0 \uad00\ud55c \ubc95\ub960','JO','001100','prec');\" >\uc81c3\ud56d</a>, <a href=\"#AJAX\" class=\"link\" onclick=\"javascript:fncLawPop('\ub300\ud1b5\ub839\uae30\ub85d\ubb3c \uad00\ub9ac\uc5d0 \uad00\ud55c \ubc95\ub960','JO','001100','prec');\" >\uc81c4\ud56d</a>, <a href=\"#AJAX\" class=\"link\" onclick=\"javascript:fncLawPop('\uacf5\uacf5\uae30\ub85d\ubb3c \uad00\ub9ac\uc5d0 \uad00\ud55c \ubc95\ub960 \uc2dc\ud589\ub839','JO','002000','prec20111221');\" >\uad6c \uacf5\uacf5\uae30\ub85d\ubb3c \uad00\ub9ac\uc5d0 \uad00\ud55c \ubc95\ub960 \uc2dc\ud589\ub839(2011. 12. 21. \ub300\ud1b5\ub839\ub839 \uc81c23383\ud638\ub85c \uac1c\uc815\ub418\uae30 \uc804\uc758 \uac83) \uc81c20\uc870 \uc81c1\ud56d</a>, <a href=\"#AJAX\" class=\"link\" onclick=\"javascript:fncLawPop('\uc0ac\ubb34\uad00\ub9ac\uaddc\uc815','JO','002400','prec20080902');\" >\uad6c \uc0ac\ubb34\uad00\ub9ac\uaddc\uc815(2008. 9. 2. \ub300\ud1b5\ub839\ub839 \uc81c20982\ud638\ub85c \uac1c\uc815\ub418\uae30 \uc804\uc758 \uac83) \uc81c24\uc870</a>(<a href=\"#AJAX\" class=\"link\" onclick=\"javascript:fncLawPop('\ud589\uc815 \ud6a8\uc728\uacfc \ud611\uc5c5 \ucd09\uc9c4\uc5d0 \uad00\ud55c \uaddc\uc815','JO','001100','prec');\" >\ud604\ud589 \ud589\uc815 \ud6a8\uc728\uacfc \ud611\uc5c5 \ucd09\uc9c4\uc5d0 \uad00\ud55c \uaddc\uc815 \uc81c11\uc870 \uc81c1\ud56d</a> \ucc38\uc870) /"
# t = "<a href=\"#AJAX\" class=\"link\" onclick=\"javascript:fncLawPop('\ub18d\uc9c0\uac1c\ud601\ubc95','JO','000200','prec');\" >\ub18d\uc9c0\uac1c\ud601\ubc95 \uc81c2\uc870 \uc81c1\ud56d</a>, \n        <a href=\"#AJAX\" class=\"link\" onclick=\"javascript:fncLawPop('\uadc0\uc18d\uc7ac\uc0b0\ucc98\ub9ac\ubc95','JO','000200','prec');\" >\uadc0\uc18d\uc7ac\uc0b0\ucc98\ub9ac\ubc95 \uc81c2\uc870 \uc81c1\ud56d</a>, \n        <a href=\"#AJAX\" class=\"link\" onclick=\"javascript:fncLawPop('\uadc0\uc18d\uc7ac\uc0b0\ucc98\ub9ac\ubc95\uc2dc\ud589\ub839','JO','000100','prec');\" >\uadc0\uc18d\uc7ac\uc0b0\ucc98\ub9ac\ubc95 \uc2dc\ud589\ub839 \uc81c1\uc870</a><br/>"

# def rm_tags(raw):
#     soup = BeautifulSoup(raw, 'lxml')
#     res = ''
#     for child in soup.html.body.children:
#         if type(child) == bs4.element.Tag:
#             if child.name == 'a':
#                 res = res + child.text
#         else:
#             res = res + child.string
#     return res


# print(rm_tags(t))
soup = BeautifulSoup(t, 'lxml')
res = []
for child in soup.html.body.children:
    if type(child) == bs4.element.Tag:
        if child.name == 'a':
            res.append(child.text)
    else:
        res.append(child.string.strip())
pprint(res)
