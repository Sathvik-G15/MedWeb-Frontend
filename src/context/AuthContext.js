// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Retrieve user from sessionStorage on initialization
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [profile, setProfile] = useState(() => {
        // Retrieve profile from sessionStorage on initialization
        const savedProfile = sessionStorage.getItem('profile');
        return savedProfile ? JSON.parse(savedProfile) : null;
    });
    const [newUser, setnewUser] = useState(() => {
        // Retrieve profile from sessionStorage on initialization
        const savednewUser = sessionStorage.getItem('profinewUserle');
        return savednewUser ? JSON.parse(savednewUser) : null;
    });

    const [search, setSearch] = useState('null');

    const login = (userData, profileData,newUser) => {
        setUser(userData); // Set user data on login
        setProfile(profileData); // Set profile data on login
        setnewUser(newUser);
        sessionStorage.setItem('user', JSON.stringify(userData)); // Save user to sessionStorage
        sessionStorage.setItem('profile', JSON.stringify(profileData)); // Save profile to sessionStorage
        sessionStorage.setItem('newUser', JSON.stringify(newUser)); // Save profile to sessionStorage

    };
    const add = (searchQuery) => {
        setSearch(searchQuery);
        console.log("see",searchQuery);
    };
    const logout = () => {
        setUser(null); // Clear user data on logout
        setProfile(null); // Clear profile data on logout
        setnewUser(null);
        sessionStorage.removeItem('user'); // Remove user from sessionStorage
        sessionStorage.removeItem('newUser'); // Remove profile from sessionStorage

    };

    return (
        <AuthContext.Provider value={{ user, login, logout, profile,newUser,add,search }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
