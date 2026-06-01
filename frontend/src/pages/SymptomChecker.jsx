import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkSymptom } from "../services/apiService";

export default function SymptomChecker() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await checkSymptom(input);
      setResponse(result);
    } catch (err) {
      setResponse({ response: "Error connecting to server. Please try again." });
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <button onClick={() => navigate("/")}
          style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>
          ‹
        </button>
        <h2 style={{ fontSize: "20px", fontWeight: "800" }}>🤒 Symptom Checker</h2>
      </div>

      <div className="card">
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
          Describe your symptoms in English or Tamil
        </p>
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g: I have headache, fever and cough since 2 days..."
        />
        <button className="primary-btn" onClick={handleCheck}>
          {loading ? "⏳ Analyzing..." : "✅ Check Symptoms"}
        </button>
      </div>

      {response && (
        <div className="card" style={{ background: "#f0fff8" }}>
          <h3 style={{
            fontSize: "15px", fontWeight: "800",
            marginBottom: "10px", color: "#00b894"
          }}>
            🏥 NalaAI Diagnosis
          </h3>

          {response.severity === "high" && (
            <div style={{
              background: "#ffebee", borderRadius: "10px",
              padding: "10px", marginBottom: "10px",
              color: "#c62828", fontWeight: "700", fontSize: "13px"
            }}>
              🚨 High Severity — Please see a doctor immediately!
            </div>
          )}

          <p style={{
            fontSize: "14px", lineHeight: "1.8",
            whiteSpace: "pre-line", color: "#333"
          }}>
            {response.response}
          </p>
        </div>
      )}
    </div>
  );
}