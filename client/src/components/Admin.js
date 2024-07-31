import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/AdminStyle.css";

function Admin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth/login", 
                { username, password }, 
                { withCredentials: true }
            );
            if (response.data.message === "Login successful") {
                navigate("/admindashboard"); // Redirect on successful login
            } else {
                setError("Invalid credentials, please try again.");
            }
        } catch (err) {
            setError("Invalid credentials, please try again.");
        }
    };

    return (
        <div className="Login">
            <div className="login-container">
            <h1 className="title">Admin Login</h1>
            <p className="message">Welcome back! Log in to add and view today's patients:</p>
            <form onSubmit={handleLogin}>
                <div className="input-container">
                    <div className="icon">
                        <i className="fas fa-user"></i>
                    </div>
                    <input className="inter-regular"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <div className="icon">
                        <i className="fas fa-lock"></i>
                    </div>
                    <input className="inter-regular"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

export default Admin;

