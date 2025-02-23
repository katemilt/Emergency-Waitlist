import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/ADStyle.css'; 

function AdminDashboard() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [fullname, setFullname] = useState('');
  const [severity, setSeverity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/patients', { withCredentials: true });
        setPatients(response.data);
      } catch (err) {
        console.error("Failed to fetch patients", err);
      }
    };

    fetchPatients();
  }, []);

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/patients', { fullname, severity }, { withCredentials: true });
      setPatients(prevPatients => [...prevPatients, response.data].sort((a, b) => b.severity - a.severity || new Date(a.join_time) - new Date(b.join_time)));
      setFullname('');
      setSeverity('');
    } catch (err) {
      setError("Failed to add patient, please try again.");
      console.error("Failed to add patient", err);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/patients/${id}`, { withCredentials: true });
      setPatients(patients.filter(patient => patient.id !== id));
    } catch (err) {
      console.error("Failed to delete patient", err);
    }
  };

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
    <div className="AdminDashboard">
      <h1 className="admin-title">Admin Dashboard</h1>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <h2>Add Patient</h2>
      <form onSubmit={handleAddPatient}>
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
                <i className="fas fa-list-ol"></i>
            </div>
          <input
            type="number"
            placeholder="Severity (1-10)"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            required
            min="1"
            max="10"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="add-btn" type="submit">Add Patient</button>
      </form>
      <h2>Current Patients</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Code</th>
            <th>Severity</th>
            <th>Join Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.fullname}</td>
              <td>{patient.code}</td>
              <td>{patient.severity}</td>
              <td>{new Date(patient.join_time).toLocaleString()}</td>
              <td>
                <button className="remove-btn" onClick={() => handleDeletePatient(patient.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
