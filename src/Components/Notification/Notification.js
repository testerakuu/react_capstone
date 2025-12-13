// src/Components/Notification/Notification.js - CORRECTION FOR CANCEL BUTTON

import React, { useState, useEffect } from 'react'; 
import './Notification.css'; 
import { Link } from 'react-router-dom';

const Notification = ({children}) => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [storedUsername, setStoredUsername] = useState("");
    const [storedDoctorData, setStoredDoctorData] = useState(null);
    const [storedAppointmentData, setStoredAppointmentData] = useState(null);
    const [isNotificationVisible, setIsNotificationVisible] = useState(true);

    const handleNotification = () => {
        setIsNotificationVisible(false);
    };

    // *** NEW FUNCTION: Clears stored appointment data and reloads page ***
    const handleCancel = () => {
        // 1. Clear the persistent data
        localStorage.removeItem("doctorData");
        sessionStorage.removeItem("appointmentData");

        // 2. Hide the notification immediately and refresh the page
        setIsNotificationVisible(false);
        window.location.reload(); 
    };
    // *** END NEW FUNCTION ***


    useEffect(() => {
        const storedUsername = sessionStorage.getItem("name") || sessionStorage.getItem("email");
        const doctorData = JSON.parse(localStorage.getItem("doctorData"));
        const appointmentData = JSON.parse(sessionStorage.getItem("appointmentData"));

        if (sessionStorage.getItem("auth-token")) {
            setIsLoggedIn(true);
            if(storedUsername) {
                let namePart = storedUsername.substring(0, storedUsername.indexOf('@'));
                namePart = namePart.charAt(0).toUpperCase() + namePart.slice(1);
                setStoredUsername(namePart.replace(/[._]/g, ' '));
            }
        } else {
            setIsLoggedIn(false);
        }

        if (doctorData) {
            setStoredDoctorData(doctorData);
        } else {
            setStoredDoctorData(null);
        }

        if (appointmentData) {
            setStoredAppointmentData(appointmentData);
        } else {
            setStoredAppointmentData(null);
        }

    }, []);

    if (!isLoggedIn || !isNotificationVisible) {
        return <>{children}</>;
    }
    
    if (isLoggedIn && storedDoctorData && storedAppointmentData) {
        return (
            <div className='notification-container'>
                <span className="close-btn" onClick={handleNotification}>&times;</span>

                <div className="alert alert-success appointment-card_content">
                    <p>
                        <strong className='p-bold'>Appointment Details</strong>
                    </p>
                    <p>Doctor: {storedDoctorData.name}</p>
                    <p>Speciality: {storedDoctorData.speciality}</p>
                    <p>Date: {storedAppointmentData.date}</p>
                    <p>Time: {storedAppointmentData.time}</p>

                    {/* *** UPDATED BUTTON TO CALL handleCancel *** */}
                    <button 
                        className='btn btn-sm btn-danger' 
                        style={{ marginTop: '10px' }}
                        onClick={handleCancel} // Calls the function to clear storage
                    >
                        Cancel Appointment
                    </button>
                    {/* *** REMOVED <Link> WRAPPER *** */}
                </div>
            </div>
        );
    }
    
    return <>{children}</>;
};

export default Notification;