from fastapi import APIRouter
from models.schemas import HospitalInput
from agents.hospital_agent import hospital_agent

router = APIRouter()

@router.post("/nearby")
async def find_hospitals(data: HospitalInput):
    try:
        result = hospital_agent.invoke({
            "latitude": data.latitude,
            "longitude": data.longitude
        })
        return {
            "response": result["final_response"],
            "location": result["location_info"]
        }
    except Exception as e:
        return {
            "response": f"Error: {str(e)}",
            "location": "Unknown"
        }