import torch
import numpy as np
from transformers import BertConfig, BertModel
from kobert_transformers import get_tokenizer
import os

tokenizer = get_tokenizer()
model = BertModel.from_pretrained('app/bert/models/orig')
device = 'cpu'
model = model.to(device)
model.train()
