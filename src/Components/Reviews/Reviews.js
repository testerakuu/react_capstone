// src/Components/Reviews/Reviews.js - COMPLETE CODE (with communication fix)

import React, { useState } from 'react';
import ReviewForm from '../ReviewForm/ReviewForm';
import './Reviews.css';

// Hardcoded dummy data to simulate past appointments
const mockAppointments = [
    { id: 1, doctorName: 'Dr. John Doe', doctorSpeciality: 'Cardiology', reviewed: false },
    { id: 2, doctorName: 'Dr. Jane Smith', doctorSpeciality: 'Dermatology', reviewed: true },
    { id: 3, doctorName: 'Dr. Alice Johnson', doctorSpeciality: 'Pediatrics', reviewed: false },
];

const Reviews = () => {
    // State to track the appointment selected for review
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    // State to manage which appointments have been reviewed (for disabling the button)
    const [appointments, setAppointments] = useState(mockAppointments); // Initialized with mock data

    // Function to open the ReviewForm modal/view
    const openReviewForm = (appointment) => {
        setSelectedAppointment(appointment);
    };

    // Function to close the ReviewForm modal/view
    const closeReviewForm = () => {
        setSelectedAppointment(null);
    };

    // *** CRITICAL FUNCTION: Updates the state of the appointments array ***
    const handleReviewSubmitted = (appointmentId) => {
        // 1. Map over the appointments state
        setAppointments(prevAppointments => 
            prevAppointments.map(app => 
                // 2. If the ID matches the one submitted, set reviewed: true
                app.id === appointmentId ? { ...app, reviewed: true } : app
            )
        );
        // The closeReviewForm call is now handled by the ReviewForm after the timeout
    };

    return (
        <div className="reviews-page-container">
            <h2>Reviews</h2>
            <div className="appointments-table">
                <table>
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Doctor Name</th>
                            <th>Doctor Speciality</th>
                            <th>Provide Feedback</th>
                            <th>Review Given</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment.id}>
                                <td>{index + 1}</td>
                                <td>{appointment.doctorName}</td>
                                <td>{appointment.doctorSpeciality}</td>
                                <td>
                                    <button 
                                        onClick={() => openReviewForm(appointment)}
                                        disabled={appointment.reviewed} // Disabled if true
                                        className={appointment.reviewed ? 'btn-disabled' : 'btn-active'}
                                    >
                                        {appointment.reviewed ? 'Feedback Submitted' : 'Click Here'}
                                    </button>
                                </td>
                                <td>{appointment.reviewed ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Conditional Rendering of the ReviewForm */}
            {selectedAppointment && (
                <div className="review-form-modal">
                    <ReviewForm 
                        doctorName={selectedAppointment.doctorName}
                        doctorSpeciality={selectedAppointment.doctorSpeciality}
                        onClose={closeReviewForm}
                        
                        // *** CRITICAL STEP: Pass the update handler down ***
                        onReviewSubmit={() => handleReviewSubmitted(selectedAppointment.id)} 
                    />
                </div>
            )}
        </div>
    );
};

export default Reviews;