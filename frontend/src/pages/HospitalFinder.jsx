import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNearbyHospitals } from "../services/apiService";

export default function HospitalFinder() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const findHospitals = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await getNearbyHospitals(
            pos.coords.latitude,
            pos.coords.longitude
          );
          setResponse(data.response);
          setHospitals([
            { name: "Government Hospital", distance: "1.2 km", phone: "104", open: true, type: "Government" },
            { name: "PHC Centre", distance: "0.8 km", phone: "108", open: true, type: "PHC" },
            { name: "Apollo Clinic", distance: "2.5 km", phone: "044-28290200", open: false, type: "Private" },
          ]);
        } catch {
          setResponse("Error connecting to server.");
        }
        setLoading(false);
      },
      () => {
        setLoading(false);
        setResponse("Location access denied.");
      }
    );
  };

  return (
    <div className="page">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <button onClick={() => navigate("/")}
          style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>
          ‹
        </button>
        <h2 style={{ fontSize: "20px", fontWeight: "800" }}>🏥 Hospital Finder</h2>
      </div>

      {/* Find Button */}
      <button className="primary-btn" style={{ marginTop: 0, marginBottom: "20px" }}
        onClick={findHospitals}>
        {loading ? "⏳ Locating..." : "📍 Find Nearby Hospitals"}
      </button>

      {/* AI Response */}
      {response && (
        <div className="card" style={{ background: "#f0fff8", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "800", color: "#00b894", marginBottom: "10px" }}>
            🏥 NalaAI Hospital Info
          </h3>
          <p style={{ fontSize: "14px", lineHeight: "1.8", whiteSpace: "pre-line", color: "#333" }}>
            {response}
          </p>
        </div>
      )}

      {/* Hospital Cards */}
      {hospitals.map((h, i) => (
        <div key={i} className="card" style={{
          display: "flex", gap: "14px", alignItems: "center"
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "14px",
            background: h.open ? "#e8f5e9" : "#ffebee",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "22px", flexShrink: 0
          }}>🏥</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "15px", fontWeight: "800" }}>{h.name}</h3>
            <p style={{ fontSize: "12px", color: "#666" }}>{h.distance} • {h.type}</p>
            <span style={{
              fontSize: "11px", fontWeight: "700",
              color: h.open ? "#00b894" : "#f44336"
            }}>
              {h.open ? "● Open" : "● Closed"}
            </span>
          </div>
          <a href={`tel:${h.phone}`} style={{
            background: "#e8f5e9", borderRadius: "10px",
            padding: "8px 14px", color: "#00b894",
            textDecoration: "none", fontWeight: "700", fontSize: "14px"
          }}>📞</a>
        </div>
      ))}
    </div>
  );
}