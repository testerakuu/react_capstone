import React, { useState } from 'react'; // MUST import useState
import './Sign_Up.css'; 

const SignUp = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', password: ''
    });

    // State to hold validation error message
    const [phoneError, setPhoneError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Validation and Submission Handler
    const handleSubmit = (e) => {
        e.preventDefault(); // Stop default HTML submission

        // --- 10-DIGIT VALIDATION LOGIC ---
        const phone = formData.phone;
        // Check if phone has exactly 10 characters AND if they are all numbers
        if (phone.length !== 10 || isNaN(Number(phone))) {
            setPhoneError('Phone number must contain exactly 10 digits.');
            return; // Stop form submission
        } else {
            setPhoneError(''); // Clear error if valid
        }
        // ------------------------------------

        // If validation passes:
        console.log("Form data is valid and ready to submit:", formData);
        alert("Sign Up form validation passed! Proceeding with form data."); 
    };

    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-text">
                    <h1>Sign Up</h1>
                </div>
                <div className="signup-text1" style={{ textAlign: 'left' }}>
                    Already a member? <span><a href="../Login/Login.html" style={{ color: '#2190FF' }}> Login</a></span>
                </div>
                <div className="signup-form">
                    <form onSubmit={handleSubmit}> {/* ADD onSubmit handler */}
                        
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" required className="form-control" placeholder="Enter your name" value={formData.name} onChange={handleChange} /> 
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" name="phone" id="phone" required className="form-control" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
                            
                            {/* DISPLAY THE ERROR MESSAGE */}
                            {phoneError && <div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{phoneError}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" required className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" required className="form-control" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                        </div>

                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                            <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;