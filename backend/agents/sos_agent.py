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

class SOSState(TypedDict):
    latitude: float
    longitude: float
    contact_number: str
    location_info: str
    nearest_hospital: str
    final_response: str

# Node 1 - Process Location
def process_location(state: SOSState):
    prompt = ChatPromptTemplate.from_template("""
    Emergency location coordinates:
    Latitude: {latitude}
    Longitude: {longitude}
    Identify the city and area.
    Respond in one line only.
    """)
    chain = prompt | llm
    result = chain.invoke({
        "latitude": state["latitude"],
        "longitude": state["longitude"]
    })
    return {"location_info": result.content}

# Node 2 - Find Nearest Hospital
def find_nearest_hospital(state: SOSState):
    prompt = ChatPromptTemplate.from_template("""
    Emergency situation!
    Location: {location_info}
    Find the single nearest government hospital.
    Give name, phone number only.
    Respond in Tamil.
    """)
    chain = prompt | llm
    result = chain.invoke({"location_info": state["location_info"]})
    return {"nearest_hospital": result.content}

# Node 3 - Final Response
def final_response(state: SOSState):
    msg = f"""🚨 SOS Triggered!

📍 Location: {state['location_info']}

🏥 Nearest Hospital:
{state['nearest_hospital']}

📞 Emergency Numbers:
- Ambulance: 108
- Police: 100
- Fire: 101
- Health Helpline: 104

👤 Contact Alerted: {state['contact_number']}"""
    return {"final_response": msg}

# Build LangGraph
def build_sos_agent():
    graph = StateGraph(SOSState)

    graph.add_node("location", process_location)
    graph.add_node("hospital", find_nearest_hospital)
    graph.add_node("respond", final_response)

    graph.set_entry_point("location")
    graph.add_edge("location", "hospital")
    graph.add_edge("hospital", "respond")
    graph.add_edge("respond", END)

    return graph.compile()

sos_agent = build_sos_agent()