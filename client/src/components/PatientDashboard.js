import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/PDStyle.css'; 

function PatientDashboard() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [position, setPosition] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/patients/${patientId}/position`);
        setPosition(response.data.position);
      } catch (err) {
        setError("Failed to fetch position, please try again.");
        console.error("Failed to fetch position", err);
      }
    };

    // Initial fetch
    fetchPosition();

    // Check for updates to position every 30 seconds
    const intervalId = setInterval(fetchPosition, 30000);
    return () => clearInterval(intervalId);
  }, [patientId]);

  // Calculate estimated wait time (saying 10 mins per queue pos)
  const estimatedWaitTime = position !== null ? position * 10 : null;

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
      if (response.data.message === "Logout successful") {
        navigate('/');
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="PatientDashboard">
      <h1 className="patient-title">Patient Dashboard</h1>
      {position !== null ? (
        <div className="patient-details">
          <p className="details">Your current position in the queue is: <strong>{position}</strong></p>
          <p className="details">Estimated wait time: <strong>{estimatedWaitTime} minutes</strong></p>
        </div>
      ) : (
        <p>Loading your position...</p>
      )}
      {error && <p style={{ color: "#e63946" }}>{error}</p>}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default PatientDashboard;

