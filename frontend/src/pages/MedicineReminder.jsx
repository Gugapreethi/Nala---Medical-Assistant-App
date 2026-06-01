import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMedicine, getMedicines } from "../services/apiService";

export default function MedicineReminder() {
  const [medicines, setMedicines] = useState([]);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("morning");
  const navigate = useNavigate();

  const timeEmoji = { morning: "🌅", afternoon: "☀️", night: "🌙" };

  const handleAdd = async () => {
    if (!name.trim()) return;
    try {
      await addMedicine(name, dosage, time);
      const data = await getMedicines();
      setMedicines(data.medicines);
    } catch {
      setMedicines([...medicines, { name, dosage, time }]);
    }
    setName("");
    setDosage("");
  };

  return (
    <div className="page">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <button onClick={() => navigate("/")}
          style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>
          ‹
        </button>
        <h2 style={{ fontSize: "20px", fontWeight: "800" }}>💊 Medicine Reminder</h2>
      </div>

      <div className="card">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Medicine name..."
          style={{ marginBottom: "10px" }}
        />
        <input
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          placeholder="Dosage (e.g: 1 tablet)..."
          style={{ marginBottom: "12px" }}
        />
        <div style={{ display: "flex", gap: "10px", marginBottom: "4px" }}>
          {["morning", "afternoon", "night"].map((t) => (
            <button key={t} onClick={() => setTime(t)} style={{
              flex: 1, padding: "10px",
              background: time === t ? "#00b894" : "#f0f0f0",
              color: time === t ? "white" : "#666",
              border: "none", borderRadius: "10px",
              fontWeight: "700", cursor: "pointer",
              fontFamily: "Nunito, sans-serif", fontSize: "12px"
            }}>
              {timeEmoji[t]} {t}
            </button>
          ))}
        </div>
        <button className="primary-btn" onClick={handleAdd}>
          + Add Medicine
        </button>
      </div>

      {medicines.map((m, i) => (
        <div key={i} className="card" style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span style={{ fontSize: "28px" }}>{timeEmoji[m.time]}</span>
            <div>
              <h3 style={{ fontSize: "15px", fontWeight: "800" }}>{m.name}</h3>
              <p style={{ fontSize: "12px", color: "#666" }}>{m.dosage} • {m.time}</p>
            </div>
          </div>
          <button
            onClick={() => setMedicines(medicines.filter((_, j) => j !== i))}
            style={{
              background: "#ffebee", border: "none",
              borderRadius: "8px", padding: "6px 12px",
              color: "#f44336", cursor: "pointer", fontWeight: "700"
            }}>
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}