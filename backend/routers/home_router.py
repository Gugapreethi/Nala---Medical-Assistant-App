from fastapi import APIRouter
from models.schemas import HealthTipInput
from chains.health_tip_chain import health_tip_chain

router = APIRouter()

@router.post("/tip")
async def get_health_tip(data: HealthTipInput):
    try:
        tip = health_tip_chain.invoke({"topic": data.topic})
        return {"tip": tip}
    except Exception as e:
        return {"tip": "Stay healthy! Drink 8 glasses of water daily."}

@router.get("/tip")
async def get_default_tip():
    try:
        tip = health_tip_chain.invoke({"topic": "general health"})
        return {"tip": tip}
    except Exception as e:
        return {"tip": "Stay healthy! Drink 8 glasses of water daily."}