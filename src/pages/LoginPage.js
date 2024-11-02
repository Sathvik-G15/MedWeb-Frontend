// src/pages/LoginPage.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';
import styles from '../styles/Auth.module.css';
import { useAuth } from '../context/AuthContext'; // Custom Auth context

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Destructure login from AuthContext

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                email,
                password,
            });

            if (response.status === 200) {
                console.log('Details of user:', response.data);
                login(response.data.email,response.data.profile,response.data.newUser); // Set email in the context

                // Conditional navigation based on pharmacy data presence
                if (response.data.hasPharmacyDetails) {
                    navigate('/admin'); // Redirect to admin page
                } else {
                    navigate('/address'); // Redirect to address page
                }
            }
        } catch (err) {
            // Handle error response or default error message
            setError(err.response?.data?.message || 'Login failed. Try again.');
        }
    };

    return (
        <div className={styles.authContainer}>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin} className={styles.authForm}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
            <div className={styles.signupRedirect}>
                <p>Don’t have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    );
};

export default LoginPage;
