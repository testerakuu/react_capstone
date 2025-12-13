// src/App.js

// Import necessary modules from React library
import React from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom components
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/LandingPage/LandingPage'; // Updated to PascalCase without underscore
import SignUp from './Components/Sign_Up/Sign_Up';               // New component import
import Login from './Components/Login/Login';                   // New component import


// Function component for the main App
function App() {

  // Render the main App component
  return (
    // Use the fragment syntax <> </>
    <>
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component outside of Routes so it shows on every page */}
          <Navbar/>

          {/* Set up the Routes for different pages */}
          <Routes>
            
            {/* 1. Define the Home route */}
            <Route path="/" element={<LandingPage/>}/>
            
            {/* 2. Define the Sign Up route, matching the Link to="/signup" */}
            <Route path="/signup" element={<SignUp/>}/>
            
            {/* 3. Define the Login route, matching the Link to="/login" */}
            <Route path="/login" element={<Login/>}/>

          </Routes>
        </BrowserRouter>
    </>
  );
}

// Export the App component as the default export
export default App;
