// src/Components/Sign_Up/Sign_Up.js
import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setShowerr(''); // Clear previous errors

        // Simple client-side check to ensure fields are filled
        if (!name || !email || !password || !phone) {
            setShowerr('Please fill in all fields.');
            return;
        }

        try {
            // API Call to register user
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                }),
            });

            const json = await response.json(); // Parse the response JSON

            if (json.authtoken) {
                // SUCCESS: Store token and redirect
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("phone", phone);
                sessionStorage.setItem("email", email);

                // Redirect user to home page
                navigate("/");
                window.location.reload(); // Refresh the page to update Navbar
            } else {
                // FAILURE: Handle error messages from the backend
                if (json.errors) {
                    // 1. Handle validation errors (array of objects)
                    // We display the message from the first error object
                    setShowerr(json.errors[0].msg);
                } else if (json.error) {
                    // 2. Handle general backend errors (e.g., "User already exists")
                    // This is the FIX for the "Objects are not valid" error:
                    if (typeof json.error === 'object') {
                        setShowerr(json.error.msg || "An unexpected error occurred.");
                    } else {
                        setShowerr(json.error); // Display if it's a simple string error
                    }
                } else {
                    // Fallback for unexpected response structure
                    setShowerr("An unknown response error occurred.");
                }
            }
        } catch (error) {
            // Handle network errors (like 'Failed to fetch' if server is down)
            setShowerr("Failed to connect to the server. Please check the backend terminal.");
            console.error("Fetch error:", error);
        }
    };

    // JSX to render the Sign Up form
    return (
        <div className="container" style={{marginTop:'5%'}}>
            <div className="signup-grid">
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>

                        {/* Name Input */}
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                type="text" 
                                name="name" 
                                id="name" 
                                className="form-control" 
                                placeholder="Enter your name" 
                            />
                        </div>

                        {/* Email Input */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="form-control" 
                                placeholder="Enter your email" 
                            />
                        </div>
                        
                        {/* Phone Input */}
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                                type="tel" 
                                name="phone" 
                                id="phone" 
                                className="form-control" 
                                placeholder="Enter your phone number" 
                            />
                        </div>

                        {/* Password Input */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                name="password" 
                                id="password" 
                                className="form-control" 
                                placeholder="Enter your password" 
                            />
                        </div>

                        {/* Error Message Display */}
                        {showerr && <div className="err" style={{ color: 'red', marginTop: '10px' }}>{showerr}</div>}

                        {/* Submit Button */}
                        <div className="form-group text-center">
                            <input type="submit" className="btn btn-primary" value="Submit" style={{marginTop: '20px'}}/>
                        </div>
                        
                        <p className="forgot-password text-right">
                           Already registered <Link to="/login">Sign in?</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sign_Up;