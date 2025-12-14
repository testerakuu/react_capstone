// src/App.js - FINAL CORRECTED CODE (Using exact paths from your file tree)

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Components for Routing
import Login from './Components/Login/Login'; 
import Signup from './Components/Sign_Up/Sign_Up'; // Corrected path for Sign_up

import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/LandingPage/LandingPage';

// --- CRITICAL FIX: The exact path for InstantConsultation ---
// Path: Components -> InstantConsultationBooking -> FindDoctorSearchIC -> InstantConsultation
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation'; 

import ReviewForm from './Components/ReviewForm/ReviewForm';
import Reviews from './Components/Reviews/Reviews';
import ProfileForm from './Components/ProfileForm/ProfileForm';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Main Routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* INSTANT CONSULTATION ROUTE (Now using the correct component) */}
        <Route path="/instant-consultation" element={<InstantConsultation />} />
        
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/review-form" element={<ReviewForm />} />
        
        {/* Profile Routes */}
        <Route path="/profile" element={<ProfileForm />} /> 
        
        {/* NEW ROUTE for Reports */}
        <Route path="/reports" element={<ReportsLayout />} /> 
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;