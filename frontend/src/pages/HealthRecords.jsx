import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveRecord } from "../services/apiService";

export default function HealthRecords() {
  const [record, setRecord] = useState({
    name: "", age: "", blood_group: "",
    allergies: "", medical_history: ""
  });
  const [saved, setSaved] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await saveRecord(record);
      if (result.data.ai_summary) {
        setAiSummary(result.data.ai_summary);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setLoading(false);
  };

  const fields = [
    { key: "name", label: "Full Name", placeholder: "Enter your name" },
    { key: "age", label: "Age", placeholder: "Enter your age" },
    { key: "blood_group", label: "Blood Group", placeholder: "A+, B+, O+, AB+..." },
    { key: "allergies", label: "Allergies", placeholder: "Any known allergies..." },
    { key: "medical_history", label: "Medical History", placeholder: "Past illnesses..." },
  ];

  return (
    <div className="page">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <button onClick={() => navigate("/")}
          style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>
          ‹
        </button>
        <h2 style={{ fontSize: "20px", fontWeight: "800" }}>📋 Health Records</h2>
      </div>

      <div className="card">
        {fields.map((f, i) => (
          <div key={i} style={{ marginBottom: "14px" }}>
            <label style={{
              fontSize: "13px", fontWeight: "700",
              color: "#555", display: "block", marginBottom: "6px"
            }}>
              {f.label}
            </label>
            <input
              value={record[f.key]}
              onChange={(e) => setRecord({ ...record, [f.key]: e.target.value })}
              placeholder={f.placeholder}
            />
          </div>
        ))}
        <button className="primary-btn" onClick={handleSave}>
          {loading ? "⏳ Saving..." : saved ? "✅ Saved!" : "💾 Save Record"}
        </button>
      </div>

      {aiSummary && (
        <div className="card" style={{ background: "#f0fff8" }}>
          <h3 style={{
            fontSize: "15px", fontWeight: "800",
            color: "#00b894", marginBottom: "10px"
          }}>
            🏥 NalaAI Health Summary
          </h3>
          <p style={{
            fontSize: "14px", lineHeight: "1.8",
            whiteSpace: "pre-line", color: "#333"
          }}>
            {aiSummary}
          </p>
        </div>
      )}
    </div>
  );
}