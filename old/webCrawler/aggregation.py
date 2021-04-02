# %%
from attr import attrs, attrib, asdict
from datetime import datetime
# %%


@attrs
class PrecSchema(object):
    title = attrib(None, type=str)
    date = attrib(None, type=datetime.datetime)
    caseNum = attrib(None, type=str)
    courtOrder = attrib(None, type=int)
    issues = attrib(None, type=list)
    order = attrib(None, type=int)
    yo = attrib(None, type=list)
    refClauses = attrib(None, type=list)
    refPrecs = attrib(None, type=list)
    wholePrec = attrib(None, type=str)
    judge = attrib(None, type=str)


# %%
a = asdict(PrecSchema(title='hi'))

# %%
