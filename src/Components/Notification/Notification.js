// src/Components/Notification/Notification.js

// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react'; 
import './Notification.css'; // **CONFIRMED: CSS Import is needed**
import { Link } from 'react-router-dom'; // **ADDED: Link for Appointment Page**

// Function component notification to display user notifications
const Notification = ({children}) => { // Passed children as a prop
    
    // State variables for notification visibility, username, doctor data, and appointment data
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if user is logged in
    const [storedUsername, setStoredUsername] = useState("");
    const [storedDoctorData, setStoredDoctorData] = useState(null);
    const [storedAppointmentData, setStoredAppointmentData] = useState(null);
    const [isNotificationVisible, setIsNotificationVisible] = useState(true); // Control notification display

    // **NEW FUNCTION: Handles hiding/closing the notification**
    const handleNotification = () => {
        // This will hide the notification when a user clicks close
        setIsNotificationVisible(false);
    };

    // useEffect hook to perform side effects in the component
    useEffect(() => {
        // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
        const storedUsername = sessionStorage.getItem("name") || sessionStorage.getItem("email");
        const doctorData = JSON.parse(localStorage.getItem("doctorData"));
        const appointmentData = JSON.parse(sessionStorage.getItem("appointmentData"));

        // If isLoggedIn is true, try to update username if storedUsername exists
        if (sessionStorage.getItem("auth-token")) {
            setIsLoggedIn(true);
            if(storedUsername) {
                // Extracts the part before @ and capitalizes the first letter
                let namePart = storedUsername.substring(0, storedUsername.indexOf('@'));
                namePart = namePart.charAt(0).toUpperCase() + namePart.slice(1);
                setStoredUsername(namePart.replace(/[._]/g, ' '));
            }
        } else {
            // If user is logged out, clear the state
            setIsLoggedIn(false);
        }

        // Set doctor data if it exists
        if (doctorData) {
            setStoredDoctorData(doctorData);
        } else {
            setStoredDoctorData(null);
        }

        // Set appointment data if it exists
        if (appointmentData) {
            setStoredAppointmentData(appointmentData);
        } else {
            setStoredAppointmentData(null);
        }

    }, []); // Empty dependency array ensures useEffect runs only once after initial render

    // Conditional render: If user is not logged in OR notification is hidden, return only children
    if (!isLoggedIn || !isNotificationVisible) {
        return <>{children}</>;
    }
    
    // **Render the notification only if both doctor and appointment data exist**
    if (isLoggedIn && storedDoctorData && storedAppointmentData) {
        return (
            <div className='notification-container'>
                {/* Close button for the notification */}
                <span className="close-btn" onClick={handleNotification}>&times;</span>

                {/* Notification Content */}
                <div className="alert alert-success appointment-card_content">
                    <p>
                        <strong className='p-bold'>Appointment Details</strong>
                    </p>
                    <p>Doctor: {storedDoctorData.name}</p>
                    <p>Speciality: {storedDoctorData.speciality}</p>
                    <p>Date: {storedAppointmentData.date}</p>
                    <p>Time: {storedAppointmentData.time}</p>

                    {/* Button to cancel/manage appointment (Placeholder) */}
                    <Link to="/appointments">
                        <button className='btn btn-sm btn-danger' style={{ marginTop: '10px' }}>
                            Cancel Appointment
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
    
    // If logged in but no appointment data, just render children
    return <>{children}</>;
};

export default Notification; // Export Notification component for use in other parts of the application