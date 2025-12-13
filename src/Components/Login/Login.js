import React, { useState } from 'react';
import './Login.css'; // Import the associated CSS file

const Login = () => {
    // State to hold form data (for controlled inputs)
    const [formData, setFormData] = useState({
        email: '', password: ''
    });
    
    // Function to handle changes in input fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle form submission (for validation demonstration)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default browser form submission

        // Basic check to demonstrate control (browser's 'required' still runs first)
        if (formData.email && formData.password) {
            console.log("Login data is valid and ready to submit:", formData);
            alert("Login form submitted successfully!");
        } else {
             // This else block usually isn't hit due to required attribute, but good for custom validation
             console.log("Please fill in all fields.");
        }
    };

    return (
        // Main container div for the page content
        <div className="container">
            {/* Div for login grid layout */}
            <div className="login-grid">
              {/* Div for login text */}
              <div className="login-text">
                <h2>Login</h2>
              </div>
              {/* Additional login text with a link to Sign Up page */}
              <div className="login-text">
                Are you a new member? 
                <span>
                    <a href="../Sign_Up/Sign_Up.html" style={{ color: '#2190FF' }}> Sign Up Here</a> {/* CHANGE: inline style to JSX object */}
                </span>
              </div>
              <br />
              {/* Div for login form */}
              <div className="login-form">
                <form onSubmit={handleSubmit}> {/* ADD onSubmit handler */}
                  {/* Form group for email input */}
                  <div className="form-group">
                    <label htmlFor="email">Email</label> {/* CHANGE: for to htmlFor */}
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      required // Added 'required' attribute for basic validation
                      className="form-control" // CHANGE: class to className
                      placeholder="Enter your email" 
                      aria-describedby="helpId"
                      value={formData.email}
                      onChange={handleChange}
                    /> 
                  </div>
                  {/* Form group for password input */}
                  <div className="form-group">
                    <label htmlFor="password">Password</label> {/* CHANGE: for to htmlFor */}
                    <input
                      type="password" // Added type="password"
                      name="password"
                      id="password"
                      required // Added 'required' attribute for basic validation
                      className="form-control" // CHANGE: class to className
                      placeholder="Enter your password"
                      aria-describedby="helpId"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Button group for login and reset buttons */}
                  <div className="btn-group">
                    <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button> {/* CHANGE: class to className */}
                    <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button> {/* CHANGE: class to className */}
                  </div>
                  <br />
                  {/* Additional login text for 'Forgot Password' option */}
                  <div className="login-text">
                    Forgot Password?
                  </div>
                </form>
              </div>
            </div>
          </div>
    );
};

export default Login;