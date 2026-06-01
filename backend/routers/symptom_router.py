from fastapi import APIRouter
from models.schemas import SymptomInput
from agents.symptom_agent import symptom_agent

router = APIRouter()

@router.post("/check")
async def check_symptom(data: SymptomInput):
    try:
        result = symptom_agent.invoke({
            "user_input": data.message
        })
        return {
            "response": result["final_response"],
            "severity": result["severity"]
        }
    except Exception as e:
        return {
            "response": f"Error: {str(e)}",
            "severity": "unknown"
        }