import React from "react";
import {useNavigate} from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();
    const goToAdmin = () => {
        navigate("/admin")
    }
    const goToPatient = () => {
        navigate("/patient")
    }

    return (
        <div className="Home">
            <h1>Choose user type:</h1>
            <div className="user-btn">
                <button onClick={goToAdmin}>Admin</button>
            </div>
            <div className="user-btn">
                <button onClick={goToPatient}>Patient</button>
            </div>
        </div>
    );
}

export default LandingPage;