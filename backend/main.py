from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import (
    symptom_router,
    home_router,
    hospital_router,
    medicine_router,
    records_router,
    sos_router
)

app = FastAPI(title="NalaAI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Module 1 - Home
app.include_router(
    home_router.router,
    prefix="/health-tip",
    tags=["Health Tip"]
)

# Module 2 - Symptom Checker
app.include_router(
    symptom_router.router,
    prefix="/symptom",
    tags=["Symptom Checker"]
)

# Module 3 - Hospital Finder
app.include_router(
    hospital_router.router,
    prefix="/hospital",
    tags=["Hospital Finder"]
)

# Module 4 - Medicine Reminder
app.include_router(
    medicine_router.router,
    prefix="/medicine",
    tags=["Medicine Reminder"]
)

# Module 5 - Health Records
app.include_router(
    records_router.router,
    prefix="/records",
    tags=["Health Records"]
)

# Module 6 - Emergency SOS
app.include_router(
    sos_router.router,
    prefix="/sos",
    tags=["Emergency SOS"]
)

@app.get("/")
def root():
    return {"status": "NalaAI Running! 🚀"}