import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import AdminDashboard from "./components/AdminDashboard";
import Patient from "./components/Patient";
import PatientDashboard from "./components/PatientDashboard";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/patientdashboard/:patientId" element={<PatientDashboard />} />
        <Route path="/" element={<Patient />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
