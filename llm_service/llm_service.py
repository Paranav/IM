from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from transformers import pipeline

app = FastAPI()

# text2text-generation pipeline; model small for CPU-friendly demo
pipe = pipeline("text2text-generation", model="google/flan-t5-small")

class AskReq(BaseModel):
    query: str
    incidents: List[str]  # list of task texts

@app.post("/ask")
def ask(req: AskReq):
    context = "\n".join(f"- {t}" for t in req.incidents)
    print(context)
    prompt = f"Answer the query using ONLY the Incident record below.\n\nQuery: {req.query}\n\nIncidents:\n{context}\n\nAnswer concisely:"
    print(prompt)
    out = pipe(prompt, max_length=256, truncation=True)[0]["generated_text"]
    return {"answer": out}
