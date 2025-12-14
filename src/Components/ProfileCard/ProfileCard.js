// src/Components/ProfileCard/ProfileCard.js - COMPLETE CODE

import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import './ProfileCard.css';

const ProfileCard = ({ onClose }) => {
    const navigate = useNavigate();

    // Function to retrieve user details from sessionStorage
    const getUserDetails = () => {
        const email = sessionStorage.getItem('email');
        const name = sessionStorage.getItem('name') || getUsernameFromEmail(email);
        const phone = sessionStorage.getItem('phone');

        return { email, name, phone };
    };

    // Helper Function: Extracts a capitalized name from the email (used as a fallback)
    const getUsernameFromEmail = (email) => {
        if (!email) return "User";
        let namePart = email.substring(0, email.indexOf('@'));
        namePart = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        return namePart.replace(/[._]/g, ' ');
    };

    const handleLogout = () => {
        // Clear all stored authentication and user details
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        
        // Clear persistent appointment data
        localStorage.removeItem("doctorData");
        sessionStorage.removeItem("appointmentData");

        // Close the card and redirect
        onClose(); 
        navigate("/");
        window.location.reload(); 
    };

    const user = getUserDetails();

    return (
        <div className="profile-card-dropdown">
            <span className="close-btn" onClick={onClose}>&times;</span>
            <div className="welcome-section">
                Welcome, **{user.name}**
            </div>
            
            <div className="profile-details-section">
                <p className="profile-title">Your Profile</p>
                <div className="detail-item">
                    <label>Email:</label>
                    <span>{user.email || 'N/A'}</span>
                </div>
                {/* Display phone only if it was stored */}
                {user.phone && (
                    <div className="detail-item">
                        <label>Phone:</label>
                        <span>{user.phone}</span>
                    </div>
                )}
            </div>

            {/* Link to the full ProfileForm page */}
            <Link 
                to="/profile" 
                className="profile-view-btn" 
                onClick={onClose} // Close the dropdown when the link is clicked
            >
                View/Edit Profile
            </Link>

            <button onClick={handleLogout} className="profile-logout-btn">
                Logout
            </button>
        </div>
    );
};

export default ProfileCard;