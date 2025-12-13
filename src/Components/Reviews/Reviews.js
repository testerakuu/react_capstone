// src/Components/Reviews/Reviews.js

import React, { useState } from 'react';
import ReviewForm from '../ReviewForm/ReviewForm'; // Import the ReviewForm component
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
    const [appointments, setAppointments] = useState(mockAppointments);

    // Function to open the ReviewForm modal/view
    const openReviewForm = (appointment) => {
        setSelectedAppointment(appointment);
    };

    // Function to close the ReviewForm modal/view
    const closeReviewForm = () => {
        setSelectedAppointment(null);
    };

    // Function to handle submission confirmation (to disable the button)
    const handleReviewSubmitted = (appointmentId) => {
        setAppointments(prevAppointments => 
            prevAppointments.map(app => 
                app.id === appointmentId ? { ...app, reviewed: true } : app
            )
        );
        closeReviewForm(); // Close the form after submission
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
                                        disabled={appointment.reviewed} // Disable if already reviewed
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
                        // Pass a handler to update the table after submission
                        onReviewSubmit={() => handleReviewSubmitted(selectedAppointment.id)} 
                    />
                </div>
            )}
        </div>
    );
};

export default Reviews;