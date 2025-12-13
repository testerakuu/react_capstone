// src/Components/ReviewForm/ReviewForm.js

import React, { useState } from 'react';
import './ReviewForm.css';

// Component for the Review Submission Form
const ReviewForm = ({ doctorName, doctorSpeciality, onClose }) => {
    // State to hold the rating (1 to 5)
    const [rating, setRating] = useState(0);
    // State to hold the review comment
    const [review, setReview] = useState('');
    // State to handle submission status/feedback
    const [submitted, setSubmitted] = useState(false);

    // Function to handle the form submission (Placeholder logic)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (rating === 0) {
            alert("Please provide a rating before submitting.");
            return;
        }

        // 1. **(Future Backend Step)**: Send the review data to the API here.
        console.log("Submitting Review:", { doctorName, rating, review });

        // 2. Update state to show success message
        setSubmitted(true);
        
        // 3. Optional: Set a timeout to automatically close the form after a delay
        setTimeout(() => {
            onClose(); // Close the modal/form after submission
        }, 2000);
    };

    // JSX for the form layout
    return (
        <div className="review-form-container">
            {/* Close button */}
            <span className="close-button" onClick={onClose}>&times;</span>
            
            <h3>Leave a Review for {doctorName}</h3>
            <p className="doctor-speciality">{doctorSpeciality}</p>

            {submitted ? (
                <div className="success-message">
                    Thank you for your feedback! It has been submitted successfully.
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    
                    {/* Rating Section */}
                    <div className="form-group rating-group">
                        <label>Rating:</label>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= rating ? 'active' : ''}`}
                                    onClick={() => setRating(star)}
                                >
                                    &#9733; {/* Unicode star character */}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Review Text Area */}
                    <div className="form-group">
                        <label htmlFor="review-comment">Review/Comment:</label>
                        <textarea
                            id="review-comment"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            rows="4"
                            placeholder="Share your experience..."
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-button">
                        Submit Review
                    </button>
                </form>
            )}
        </div>
    );
};

export default ReviewForm;