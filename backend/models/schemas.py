from pydantic import BaseModel
from typing import Optional

class SymptomInput(BaseModel):
    message: str

class HealthTipInput(BaseModel):
    topic: str = "general health"

class HospitalInput(BaseModel):
    latitude: float
    longitude: float

class MedicineInput(BaseModel):
    name: str
    dosage: str
    time: str

class RecordInput(BaseModel):
    name: str
    age: int
    blood_group: str
    allergies: Optional[str] = ""
    medical_history: Optional[str] = ""

class SOSInput(BaseModel):
    latitude: float
    longitude: float
    contact_number: str