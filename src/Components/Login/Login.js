// src/Components/Login/Login.js - Complete and Corrected

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css'; // Assuming you have a Login.css

const Login = () => {

  // State variables for form data and error messages
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [showerr, setShowerr] = useState(''); // State to show error messages

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]); // Added navigate to dependency array for best practice

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    setShowerr(''); // Clear previous errors

    // Simple client-side check to ensure fields are filled
    if (!email || !password) {
        setShowerr('Please enter both email and password.');
        return;
    }

    try {
        // Send a POST request to the login API endpoint
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        // Parse the response JSON
        const json = await res.json();
        
        if (json.authtoken) {
            // SUCCESS: If authentication token is received, store it in session storage
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('email', email); 
            // Note: The backend should return the name/phone if you want to store them too,
            // but we'll stick to what the lab code suggests: email.
            
            // Redirect to home page and reload the window
            navigate('/');
            window.location.reload();
        } else {
            // FAILURE: Handle error messages from the backend
            if (json.errors) {
                // 1. Handle validation errors (array of objects)
                setShowerr(json.errors[0].msg);
            } else if (json.error) {
                // 2. Handle general backend errors (e.g., "Invalid Credentials")
                // FIX for the "Objects are not valid" crash:
                if (typeof json.error === 'object') {
                    setShowerr(json.error.msg || "An unexpected error occurred during login.");
                } else {
                    setShowerr(json.error); // Display if it's a simple string error
                }
            } else {
                // Fallback for unexpected response structure
                setShowerr("An unknown login error occurred.");
            }
        }
    } catch (error) {
        // Handle network errors (like 'Failed to fetch' if server is down)
        setShowerr("Failed to connect to the server. Please check the backend terminal.");
        console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <div className="container" style={{marginTop:'5%'}}>
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member? 
            <span>
              <Link to="/signup" style={{ color: '#2190FF' }}>
                Sign Up Here
              </Link>
            </span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={login}>
              
              {/* Email Input Field */}
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
                  aria-describedby="helpId" 
                />
              </div>
              
              {/* Password Input Field (FIXED/COMPLETED) */}
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
                    aria-describedby="helpId"
                />
              </div>

              {/* Error Message Display */}
              {showerr && <div className="err" style={{ color: 'red', marginTop: '10px' }}>{showerr}</div>}
              
              <div className="btn-group">
                {/* Login button */}
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;