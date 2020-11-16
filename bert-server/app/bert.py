import torch
import numpy as np
from kobert_transformers import get_kobert_model, get_tokenizer

tokenizer = get_tokenizer()
model = get_kobert_model()
device = 'cpu'
model.eval()
model = model.to(device)


def embed(s):
    ids = tokenizer.encode(s)
    ids = torch.LongTensor(ids)[:512]
    ids = ids.to(device)
    ids = ids.unsqueeze(0)

    with torch.no_grad():
        out = model(input_ids=ids)

    return out[-1].cpu().detach().numpy().reshape(-1).astype(np.float32)
