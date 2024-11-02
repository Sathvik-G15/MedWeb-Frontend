// src/pages/LandingPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Import CSS file for styling

const LandingPage = () => {
    return (
        <div className="landing-container">
            <h1>Welcome to MedWeb</h1>
            <p>Your one-stop solution for finding medicines and nearby pharmacies.</p>
            <div className="button-container">
                <Link to="/user" className="button user-button">User</Link>
                <Link to="/login" className="button admin-button">Admin</Link>
            </div>
        </div>
    );
};

export default LandingPage;
