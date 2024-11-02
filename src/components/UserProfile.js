// src/components/UserProfile.js

import React from 'react';
import './UserProfile.css';

const UserProfile = ({ user }) => {
    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <div className="profile-details">
                <img src={user.profilePicture} alt={`${user.name}'s profile`} className="profile-picture" />
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
            </div>
        </div>
    );
};

export default UserProfile;
