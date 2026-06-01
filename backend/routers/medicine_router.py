from fastapi import APIRouter
from models.schemas import MedicineInput
from chains.medicine_chain import medicine_chain

router = APIRouter()

medicines_db = []

@router.post("/add")
async def add_medicine(data: MedicineInput):
    try:
        info = medicine_chain.invoke({
            "name": data.name,
            "dosage": data.dosage,
            "time": data.time
        })
        medicine = {
            "name": data.name,
            "dosage": data.dosage,
            "time": data.time,
            "info": info
        }
        medicines_db.append(medicine)
        return {
            "message": "Medicine added!",
            "data": medicine
        }
    except Exception as e:
        medicine = {
            "name": data.name,
            "dosage": data.dosage,
            "time": data.time,
            "info": ""
        }
        medicines_db.append(medicine)
        return {
            "message": "Medicine added!",
            "data": medicine
        }

@router.get("/list")
async def get_medicines():
    return {"medicines": medicines_db}

@router.delete("/delete/{index}")
async def delete_medicine(index: int):
    if 0 <= index < len(medicines_db):
        medicines_db.pop(index)
        return {"message": "Deleted!"}
    return {"message": "Not found!"}