import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { triggerSOS } from "../services/apiService";

export default function EmergencySOS() {
  const [triggered, setTriggered] = useState(false);
  const [contact, setContact] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSOS = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const result = await triggerSOS(
            pos.coords.latitude,
            pos.coords.longitude,
            contact
          );
          setResponse(result.response);
          setTriggered(true);
          setTimeout(() => setTriggered(false), 5000);
        } catch {
          setResponse("🚨 SOS Triggered!\n📞 Call 108 immediately!");
          setTriggered(true);
        }
        setLoading(false);
      },
      () => {
        setResponse("🚨 SOS Triggered!\n📞 Call 108 immediately!");
        setTriggered(true);
        setLoading(false);
      }
    );
  };

  const emergencyNumbers = [
    { name: "Ambulance", number: "108", icon: "🚑" },
    { name: "Police", number: "100", icon: "👮" },
    { name: "Fire", number: "101", icon: "🚒" },
    { name: "Health Helpline", number: "104", icon: "🏥" },
  ];

  return (
    <div className="page">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <button onClick={() => navigate("/")}
          style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>
          ‹
        </button>
        <h2 style={{ fontSize: "20px", fontWeight: "800" }}>🚨 Emergency SOS</h2>
      </div>

      {/* Contact Input */}
      <div className="card">
        <label style={{
          fontSize: "13px", fontWeight: "700",
          color: "#555", display: "block", marginBottom: "6px"
        }}>
          Emergency Contact Number
        </label>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="+91xxxxxxxxxx"
        />
      </div>

      {/* SOS Button */}
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div onClick={handleSOS} style={{
          width: 180, height: 180,
          background: triggered
            ? "linear-gradient(135deg, #ff6b6b, #ee5a24)"
            : "linear-gradient(135deg, #ff4444, #cc0000)",
          borderRadius: "50%",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          margin: "0 auto", cursor: "pointer",
          boxShadow: "0 8px 32px rgba(255,68,68,0.4)",
          color: "white", transition: "all 0.3s"
        }}>
          <span style={{ fontSize: "48px" }}>🆘</span>
          <span style={{ fontWeight: "900", fontSize: "18px", marginTop: "8px" }}>
            {loading ? "⏳..." : triggered ? "Alerting..." : "SOS"}
          </span>
        </div>
      </div>

      {/* AI Response */}
      {response && (
        <div className="card" style={{ background: "#ffebee", marginBottom: "16px" }}>
          <p style={{
            fontSize: "14px", lineHeight: "1.8",
            whiteSpace: "pre-line", color: "#c62828",
            fontWeight: "600"
          }}>
            {response}
          </p>
        </div>
      )}

      {/* Emergency Numbers */}
      <div className="card">
        <h3 style={{ fontWeight: "800", marginBottom: "14px", fontSize: "15px" }}>
          Emergency Numbers
        </h3>
        {emergencyNumbers.map((c, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", padding: "10px 0",
            borderBottom: i < emergencyNumbers.length - 1
              ? "1px solid #f0f0f0" : "none"
          }}>
            <span style={{ fontSize: "15px" }}>{c.icon} {c.name}</span>
            <a href={`tel:${c.number}`} style={{
              background: "#ffebee", color: "#f44336",
              padding: "8px 16px", borderRadius: "10px",
              textDecoration: "none", fontWeight: "800", fontSize: "14px"
            }}>
              {c.number}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}