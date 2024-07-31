import React from "react";
import {useNavigate} from "react-router-dom";
import "./styles/LPStyle.css";
import "../index.css";

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
            <div className="background-image"></div>
            <div class="content">
                <h1 className="inter-bold">Hospital Triage Application</h1>
                <p className="inter-regular">Select a user type below to continue</p>
                <div className="user-btn-container">
                    <div className="user-btn">
                        <button className="inter-regular" onClick={goToAdmin}>Admin</button>
                    </div>
                    <div className="user-btn">
                        <button className="inter-regular" onClick={goToPatient}>Patient</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;