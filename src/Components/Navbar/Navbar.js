// src/Components/Navbar/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // *** Added useNavigate ***
import './Navbar.css';

// Define the functional component
const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate(); // *** Initialize useNavigate for logout redirect ***

    // Function to toggle the state of the mobile menu
    const handleClick = () => {
        setIsActive(!isActive);
    };

    // *** 1. LOGOUT FUNCTION: Clears session and redirects ***
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        
        // Redirect to home page and force a reload to update the Navbar state
        navigate("/");
        window.location.reload(); 
    };

    // *** 2. CONDITIONAL CHECK: Determine if the user is logged in ***
    // This will be true if the 'auth-token' exists in sessionStorage
    const isUserLoggedIn = sessionStorage.getItem("auth-token") !== null;

    return (
        <nav>
            {/* Navigation logo section */}
            <div className="nav__logo">
              <Link to="/"> 
                StayHealthy 
                {/* SVG Icon (JSX format) */}
                <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{ fill: '#3685fb' }}>
                    <title>Doctor With Stethoscope SVG icon</title>
                    <g>
                        <g>
                            <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
                            <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
                            <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44...."></path>
                        </g>
                    </g>
                </svg>
              </Link>
              <span>.</span>
            </div>
            
            {/* Navigation icon section with an onClick event listener */}
            <div className="nav__icon" onClick={handleClick}>
              <i className={`fa ${isActive ? 'fa-times' : 'fa-bars'}`}></i>
            </div>

            {/* Unordered list for navigation links, dynamically applying the 'active' class */}
            <ul className={`nav__links ${isActive ? 'active' : ''}`}>
              
                {/* Home link */}
                <li className="link">
                    <Link to="/">Home</Link>
                </li>
              
                {/* Appointments link (Using <a> since it's an external/placeholder link) */}
                <li className="link">
                    <a href="google.com">Appointments</a> 
                </li>
              
                {/* *** CONDITIONAL RENDERING BLOCK START *** */}
                {isUserLoggedIn ? (
                    // Display LOGOUT button if user is logged in
                    <li className="link">
                        <button className="btn1" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                ) : (
                    // Display SIGN UP and LOGIN buttons if user is NOT logged in
                    <>
                        <li className="link">
                            <Link to="/signup"> 
                                <button className="btn1">Sign Up</button>
                            </Link>
                        </li>
                      
                        <li className="link">
                            <Link to="/login">
                                <button className="btn1">Login</button>
                            </Link>
                        </li>
                    </>
                )}
                {/* *** CONDITIONAL RENDERING BLOCK END *** */}
            </ul>
        </nav>
    );
};

export default Navbar;