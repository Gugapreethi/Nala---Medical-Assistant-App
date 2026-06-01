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

# State
class MediState(TypedDict):
    user_input: str
    symptoms: str
    diagnosis: str
    severity: str
    final_response: str

# Node 1 - Extract Symptoms
def extract_symptoms(state: MediState):
    prompt = ChatPromptTemplate.from_template("""
    Extract medical symptoms from this text: {user_input}
    Return as a simple English list only.
    No extra text, just the symptoms.
    """)
    chain = prompt | llm
    result = chain.invoke({"user_input": state["user_input"]})
    return {"symptoms": result.content}

# Node 2 - Diagnose
def diagnose(state: MediState):
    prompt = ChatPromptTemplate.from_template("""
    You are NalaAI medical assistant.
    Patient symptoms: {symptoms}

    Respond in Tamil language with this format:
    🔍 Possible conditions: ...
    ⚠️ Severity: Low / Medium / High
    🏠 First aid advice: ...
    👨‍⚕️ See doctor: Yes / No
    """)
    chain = prompt | llm
    result = chain.invoke({"symptoms": state["symptoms"]})
    return {"diagnosis": result.content}

# Node 3 - Check Severity
def check_severity(state: MediState):
    text = state["diagnosis"].lower()
    if "high" in text or "அதிகம்" in text or "emergency" in text:
        return {"severity": "high"}
    elif "medium" in text or "நடுத்தரம்" in text:
        return {"severity": "medium"}
    return {"severity": "low"}

# Node 4 - Final Response
def final_response(state: MediState):
    if state["severity"] == "high":
        msg = f"🚨 Emergency!\n\n{state['diagnosis']}\n\n⚠️ Please see a doctor immediately!"
    elif state["severity"] == "medium":
        msg = f"⚠️ Moderate Condition\n\n{state['diagnosis']}\n\n💊 Consider visiting a doctor."
    else:
        msg = f"✅ {state['diagnosis']}\n\n💊 Take rest and monitor symptoms."
    return {"final_response": msg}

# Build LangGraph
def build_symptom_agent():
    graph = StateGraph(MediState)

    graph.add_node("extract", extract_symptoms)
    graph.add_node("diagnose", diagnose)
    graph.add_node("severity", check_severity)
    graph.add_node("respond", final_response)

    graph.set_entry_point("extract")
    graph.add_edge("extract", "diagnose")
    graph.add_edge("diagnose", "severity")
    graph.add_edge("severity", "respond")
    graph.add_edge("respond", END)

    return graph.compile()

symptom_agent = build_symptom_agent()