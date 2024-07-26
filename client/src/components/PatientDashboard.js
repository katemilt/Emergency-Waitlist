import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    fetchPosition();
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
      <h1>Patient Dashboard</h1>
      {position !== null ? (
        <div>
          <p>Your current position in the queue is: {position}</p>
          <p>Estimated wait time: {estimatedWaitTime} minutes</p>
        </div>
      ) : (
        <p>Loading your position...</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default PatientDashboard;
