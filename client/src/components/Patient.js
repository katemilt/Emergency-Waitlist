import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./styles/AdminStyle.css";

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
    <div className="Login">
      <div className='login-container'>
        <h1 className="title">Patient Login</h1>
        <p className="message">Welcome! Log in to view your estimated wait time:</p>
        <form onSubmit={handleLogin}>
            <div className="input-container">
                <div className="icon">
                    <i className="fas fa-user"></i>
                </div>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                />
            </div>
            <div className="input-container">
                <div className="icon">
                    <i className="fas fa-lock"></i>
                </div>
                <input
                    type="text"
                    placeholder="3-character Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
            </div>
            {error && <p style={{ color: "#e63946" }}>{error}</p>}
            <button type="submit">Login</button>
        </form>
      </div>
    </div>
);
}

export default Patient;
