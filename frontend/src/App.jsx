import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SymptomChecker from "./pages/SymptomChecker";
import HospitalFinder from "./pages/HospitalFinder";
import MedicineReminder from "./pages/MedicineReminder";
import HealthRecords from "./pages/HealthRecords";
import EmergencySOS from "./pages/EmergencySOS";
import BottomNav from "./components/BottomNav";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptom" element={<SymptomChecker />} />
          <Route path="/hospital" element={<HospitalFinder />} />
          <Route path="/medicine" element={<MedicineReminder />} />
          <Route path="/records" element={<HealthRecords />} />
          <Route path="/sos" element={<EmergencySOS />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}