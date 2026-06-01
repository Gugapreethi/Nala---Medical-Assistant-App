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

def get_health_tip_chain():
    prompt = ChatPromptTemplate.from_template("""
    You are NalaAI health assistant.
    Give one short daily health tip in Tamil.
    Topic: {topic}
    Keep it under 2 sentences.
    Friendly and simple tone.
    No extra text, just the tip.
    """)
    chain = prompt | llm | StrOutputParser()
    return chain

health_tip_chain = get_health_tip_chain()