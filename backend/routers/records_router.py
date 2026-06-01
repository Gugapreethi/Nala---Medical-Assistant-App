from fastapi import APIRouter
from models.schemas import RecordInput
from chains.records_chain import records_chain
import json
import os

router = APIRouter()
DB_FILE = "health_record.json"

def load_record():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            return json.load(f)
    return {}

def save_record(record):
    with open(DB_FILE, "w") as f:
        json.dump(record, f)

@router.post("/save")
async def save_health_record(data: RecordInput):
    try:
        ai_summary = records_chain.invoke({
            "name": data.name,
            "age": data.age,
            "blood_group": data.blood_group,
            "allergies": data.allergies,
            "medical_history": data.medical_history
        })
        record = {
            "name": data.name,
            "age": data.age,
            "blood_group": data.blood_group,
            "allergies": data.allergies,
            "medical_history": data.medical_history,
            "ai_summary": ai_summary
        }
        save_record(record)
        return {
            "message": "Record saved!",
            "data": record
        }
    except Exception as e:
        record = data.dict()
        save_record(record)
        return {
            "message": "Record saved!",
            "data": record
        }

@router.get("/get")
async def get_health_record():
    return {"record": load_record()}