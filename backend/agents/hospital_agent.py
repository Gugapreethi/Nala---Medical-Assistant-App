import os
from dotenv import load_dotenv
from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from typing import TypedDict

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    groq_api_key=os.getenv("GROQ_API_KEY")
)

class HospitalState(TypedDict):
    latitude: float
    longitude: float
    location_info: str
    hospitals: str
    final_response: str

# Node 1 - Process Location
def process_location(state: HospitalState):
    prompt = ChatPromptTemplate.from_template("""
    User location coordinates:
    Latitude: {latitude}
    Longitude: {longitude}
    
    Identify the approximate area/city for these coordinates.
    Respond in one line only.
    """)
    chain = prompt | llm
    result = chain.invoke({
        "latitude": state["latitude"],
        "longitude": state["longitude"]
    })
    return {"location_info": result.content}

# Node 2 - Find Hospitals
def find_hospitals(state: HospitalState):
    prompt = ChatPromptTemplate.from_template("""
    Location: {location_info}
    
    List 4 nearby hospitals in Tamil Nadu with:
    - Hospital name
    - Type (Government/Private/PHC)
    - Estimated distance
    - Phone number
    
    Respond in Tamil language.
    """)
    chain = prompt | llm
    result = chain.invoke({"location_info": state["location_info"]})
    return {"hospitals": result.content}

# Node 3 - Final Response
def final_response(state: HospitalState):
    msg = f"📍 உங்கள் இடம்: {state['location_info']}\n\n🏥 அருகில் உள்ள மருத்துவமனைகள்:\n\n{state['hospitals']}"
    return {"final_response": msg}

# Build LangGraph
def build_hospital_agent():
    graph = StateGraph(HospitalState)

    graph.add_node("location", process_location)
    graph.add_node("hospitals", find_hospitals)
    graph.add_node("respond", final_response)

    graph.set_entry_point("location")
    graph.add_edge("location", "hospitals")
    graph.add_edge("hospitals", "respond")
    graph.add_edge("respond", END)

    return graph.compile()

hospital_agent = build_hospital_agent()