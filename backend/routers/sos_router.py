from fastapi import APIRouter
from models.schemas import SOSInput
from agents.sos_agent import sos_agent

router = APIRouter()

@router.post("/trigger")
async def trigger_sos(data: SOSInput):
    try:
        result = sos_agent.invoke({
            "latitude": data.latitude,
            "longitude": data.longitude,
            "contact_number": data.contact_number
        })
        return {
            "response": result["final_response"],
            "location": result["location_info"],
            "hospital": result["nearest_hospital"]
        }
    except Exception as e:
        return {
            "response": f"🚨 SOS Triggered!\n📞 Call 108 immediately!\nError: {str(e)}",
            "location": "Unknown",
            "hospital": "Call 108"
        }