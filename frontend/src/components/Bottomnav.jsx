import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { icon: "🏠", label: "Home", path: "/" },
  { icon: "🤒", label: "Symptoms", path: "/symptom" },
  { icon: "🏥", label: "Hospital", path: "/hospital" },
  { icon: "💊", label: "Medicine", path: "/medicine" },
  { icon: "📋", label: "Records", path: "/records" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      width: "100%",
      maxWidth: "430px",
      background: "white",
      borderTop: "2px solid #e0f7f4",
      display: "flex",
      justifyContent: "space-around",
      padding: "10px 0 14px",
      zIndex: 100
    }}>
      {tabs.map((tab, i) => {
        const active = location.pathname === tab.path;
        return (
          <div
            key={i}
            onClick={() => navigate(tab.path)}
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            <div style={{
              fontSize: "22px",
              background: active ? "#e0f7f4" : "transparent",
              borderRadius: "10px",
              padding: "4px 10px"
            }}>
              {tab.icon}
            </div>
            <div style={{
              fontSize: "10px",
              marginTop: "2px",
              color: active ? "#00b894" : "#aaa",
              fontWeight: active ? "800" : "400"
            }}>
              {tab.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}