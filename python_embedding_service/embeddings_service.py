from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from typing import List

app = FastAPI()
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

class TextReq(BaseModel):
    text: str

class BatchReq(BaseModel):
    texts: List[str]

@app.post("/embed")
def embed(req: TextReq):
    vec = model.encode(req.text)
    return {"embedding": vec.tolist()}

@app.post("/embed_batch")
def embed_batch(req: BatchReq):
    vecs = model.encode(req.texts)
    return {"embeddings": [v.tolist() for v in vecs]}
