// src/components/UserProfile.js

import React from 'react';
import './UserProfile.css';

const UserProfile = ({ user }) => {
    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            {user ? (
                <>
                    <img src={user.profilePicture} alt="Profile" className="profile-picture" />
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </>
            ) : (
                <p>No user information available. Please log in.</p>
            )}
        </div>
    );
};

export default UserProfile;
