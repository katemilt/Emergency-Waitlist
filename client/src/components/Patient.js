import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Patient() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/patient-login', { fullname, code });
      if (response.data.message === "Login successful") {
        navigate(`/patientdashboard/${response.data.patientId}`);
      }
    } catch (err) {
      setError("Invalid credentials, please try again.");
      console.error("Failed to login", err);
    }
  };

  return (
    <div className="PatientLogin">
      <h1>Patient Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Code:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Patient;
