import React from 'react'
import Logo from "./Logo";

export default function TopBar({ title }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "16px 20px",
      background: "white",
      borderBottom: "1px solid #e0f7f4",
      position: "sticky",
      top: 0,
      zIndex: 50
    }}>
      <Logo size={38} />
      <h1 style={{
        fontSize: "18px",
        fontWeight: "800",
        color: "#1a1a2e"
      }}>{title}</h1>
    </div>
  );
}