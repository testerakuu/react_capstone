// Import necessary modules from React library
import React from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';

// ------------------------------------------------------------------
// THIS IS THE LINE YOU MUST ADD/FIX:
import LandingPage from './Components/LandingPage/LandingPage'; 
// ------------------------------------------------------------------

// Function component for the main App
function App() {

  // Render the main App component
  return (
    <>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
          </Routes>
        </BrowserRouter>
    </>
  );
}

// Export the App component as the default export
export default App;
