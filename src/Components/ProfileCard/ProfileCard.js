// src/Components/ProfileCard/ProfileCard.js - COMPLETE CODE

import React, { useState, useEffect } from 'react';
import './ProfileCard.css';
import { Link, useNavigate } from 'react-router-dom';

// Utility function to get user details from session storage
const getUserDetails = () => {
    return {
        name: sessionStorage.getItem('name'),
        email: sessionStorage.getItem('email'),
        phone: sessionStorage.getItem('phone'),
    };
};

const ProfileCard = ({ toggleProfileCard }) => {
    // State to hold the current user details
    const [userDetails, setUserDetails] = useState(getUserDetails());
    const navigate = useNavigate();

    // Effect to re-fetch details when the card is mounted/re-rendered 
    // This keeps the displayed name updated if it was just changed in ProfileForm
    useEffect(() => {
        setUserDetails(getUserDetails());
    }, []);

    // Function to handle the logout process
    const handleLogout = () => {
        // Clear all session storage items related to user and auth
        sessionStorage.clear(); 
        
        // Navigate the user to the login page
        navigate('/login'); 
    };

    return (
        <div className="profile-card">
            <div className="profile-card__details">
                <h3 className="profile-card__name">Welcome, {userDetails.name || 'User'}</h3>
                <p className="profile-card__email">{userDetails.email}</p>
                <p className="profile-card__phone">{userDetails.phone}</p>
            </div>
            
            <div className="profile-card__items">
                {/* 1. View/Edit Profile Link (Existing) */}
                <Link 
                    to="/profile" 
                    className="profile-card__item" 
                    onClick={toggleProfileCard}
                >
                    View/Edit Profile
                </Link>
                
                {/* 2. Your Reports Link (NEW - Required by Lab) */}
                <Link 
                    to="/reports" 
                    className="profile-card__item" 
                    onClick={toggleProfileCard}
                >
                    Your Reports
                </Link>

                {/* 3. Logout Button */}
                <button className="profile-card__item logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;