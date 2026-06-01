import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { getHealthTip } from "../services/apiService";

const modules = [
  { icon: "🤒", title: "Symptom Checker", desc: "Describe your symptoms for AI diagnosis", path: "/symptom", color: "#e3f2fd", accent: "#2196f3" },
  { icon: "🏥", title: "Hospital Finder", desc: "Find nearby hospitals and clinics", path: "/hospital", color: "#e8f5e9", accent: "#00b894" },
  { icon: "💊", title: "Medicine Reminder", desc: "Set your daily medicine reminders", path: "/medicine", color: "#fff3e0", accent: "#ff9800" },
  { icon: "📋", title: "Health Records", desc: "Store your personal health info", path: "/records", color: "#f3e5f5", accent: "#9c27b0" },
  { icon: "🚨", title: "Emergency SOS", desc: "One tap emergency alert", path: "/sos", color: "#ffebee", accent: "#f44336" },
];

export default function Home() {
  const navigate = useNavigate();
  const [tip, setTip] = useState("Stay hydrated! Drink 8 glasses of water daily.");

  useEffect(() => {
    getHealthTip()
      .then((data) => { if (data.tip) setTip(data.tip); })
      .catch(() => {});
  }, []);

  return (
    <div className="page">

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #00b894, #00cec9)",
        borderRadius: "24px",
        padding: "24px",
        marginBottom: "24px",
        color: "white"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <Logo size={52} />
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "900" }}>NalaAI</h1>
            <p style={{ fontSize: "13px", opacity: 0.9 }}>Your AI Medical Assistant</p>
          </div>
        </div>
        <div style={{
          marginTop: "16px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "14px",
          padding: "12px 16px",
          fontSize: "13px"
        }}>
          💡 {tip}
        </div>
      </div>

      {/* Services */}
      <h2 style={{
        fontSize: "16px",
        color: "#666",
        marginBottom: "14px",
        fontWeight: "700"
      }}>
        Services
      </h2>

      {modules.map((m, i) => (
        <div
          key={i}
          onClick={() => navigate(m.path)}
          style={{
            background: m.color,
            borderRadius: "20px",
            padding: "18px 20px",
            marginBottom: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}
        >
          <div style={{
            fontSize: "32px",
            background: "white",
            borderRadius: "14px",
            width: 52, height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}>
            {m.icon}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#1a1a2e" }}>
              {m.title}
            </h3>
            <p style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
              {m.desc}
            </p>
          </div>
          <div style={{ color: m.accent, fontSize: "20px" }}>›</div>
        </div>
      ))}
    </div>
  );
}