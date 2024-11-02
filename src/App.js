// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddAddress from './pages/AddPharamacyPage';
import ProtectedRoute from './components/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage/>} />
                    <Route path="/user" element={<UserPage />} />
                    {/* <Route path="/admin" element={<AdminPage />} /> */}
                    <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={< RegisterPage/>} />
                    <Route path="/address" element={< AddAddress/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
