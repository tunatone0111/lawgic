import torch
import numpy as np
from transformers import BertConfig, BertModel
from kobert_transformers import get_tokenizer
import os


class LawgicBertModel():
    def __init__(self, model_path='app/bert/models/orig'):
        self.tokenizer = get_tokenizer()
        model = BertModel.from_pretrained(model_path)
        self.device = 'cpu'
        model.eval()
        self.model = model.to(self.device)

    def tokenize(self, s):
        return self.tokenizer.tokenize(s)

    def embed(self, s):
        ids = self.tokenizer.encode(s)
        ids = torch.LongTensor(ids)[:512]
        ids = ids.to(self.device)
        ids = ids.unsqueeze(0)

        with torch.no_grad():
            out = self.model(input_ids=ids)

        return out[-1].cpu().detach().numpy().reshape(-1).astype(np.float32)
