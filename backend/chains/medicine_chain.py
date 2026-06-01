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

def get_medicine_chain():
    prompt = ChatPromptTemplate.from_template("""
    You are NalaAI medical assistant.
    Medicine: {name}
    Dosage: {dosage}
    Time: {time}
    
    Respond in Tamil:
    1. மருந்தின் பொதுவான பயன்கள்
    2. எடுத்துக்கொள்ளும் முறை
    3. கவனிக்க வேண்டியவை
    Keep it short and simple.
    """)
    chain = prompt | llm | StrOutputParser()
    return chain

medicine_chain = get_medicine_chain()