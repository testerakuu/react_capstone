// src/App.js - COMPLETE AND UPDATED CODE

// Import necessary modules from React library
import React from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom components
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/LandingPage/LandingPage';
import SignUp from './Components/Sign_Up/Sign_Up';               
import Login from './Components/Login/Login';                   

// Import the Instant Consultation component
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';

// *** NEW IMPORT ***
import Notification from './Components/Notification/Notification';
import Reviews from './Components/Reviews/Reviews'; 


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

          {/* *** WRAP ROUTES WITH NOTIFICATION COMPONENT *** */}
          <Notification> 
              {/* Set up the Routes for different pages */}
              <Routes>
                
                {/* 1. Define the Home route */}
                <Route path="/" element={<LandingPage/>}/>
                
                {/* 2. Define the Sign Up route */}
                <Route path="/signup" element={<SignUp/>}/>
                
                {/* 3. Define the Login route */}
                <Route path="/login" element={<Login/>}/>

                {/* 4. Define the Instant Consultation route */}
                <Route path="/instant-consultation" element={<InstantConsultation/>}/>

                {/* 5. Define the Reviews route */}
                <Route path="/reviews" element={<Reviews/>}/>

              </Routes>
          </Notification>
        </BrowserRouter>
    </>
  );
}

// Export the App component as the default export
export default App;
