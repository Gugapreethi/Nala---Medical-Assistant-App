import React from 'react'
import logo from "../assets/logo.png";

export default function Logo({ size = 55 }) {
  return (
    <img
      src={logo}
      alt="NalaAI"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        borderRadius: "12px"
      }}
    />
  );
}