import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        <div className="AdminLogin">
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Admin;

