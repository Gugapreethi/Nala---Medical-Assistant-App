import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    groq_api_key=os.getenv("GROQ_API_KEY")
)

def get_records_chain():
    prompt = ChatPromptTemplate.from_template("""
    You are NalaAI medical assistant.
    Patient Details:
    Name: {name}
    Age: {age}
    Blood Group: {blood_group}
    Allergies: {allergies}
    Medical History: {medical_history}

    Respond in Tamil:
    1. Health summary
    2. Important precautions based on history
    3. General health advice
    Keep it short and simple.
    """)
    chain = prompt | llm | StrOutputParser()
    return chain

records_chain = get_records_chain()