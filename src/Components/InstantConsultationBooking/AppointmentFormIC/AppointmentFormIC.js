import React, { useState } from 'react'

const AppointmentFormIC = ({ doctorName, doctorSpeciality, selectedSlot, onSubmit }) => { // *** ADDED selectedSlot PROP ***
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    // NOTE: selectedSlot state is managed by the parent, so we use the prop here.
  
    // We can remove handleSlotSelection if slots are passed as props.
    // The parent component handles slot selection and passes the current slot via props.
  
    const handleFormSubmit = (e) => {
      e.preventDefault();

      // Assuming the current date and a dummy time for simple persistence test
      const appointmentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const appointmentTime = selectedSlot || "9:00 AM"; // Use the selected slot or a default

      // 1. Save Doctor Data to localStorage (as required by Notification.js)
      const doctorData = {
          name: doctorName,
          speciality: doctorSpeciality,
          date: appointmentDate,
          time: appointmentTime
      };
      localStorage.setItem("doctorData", JSON.stringify(doctorData));

      // 2. Save Appointment Data to sessionStorage (as required by Notification.js)
      const appointmentData = {
          date: appointmentDate,
          time: appointmentTime,
          // You could also save name/phone here if needed later
          name: name,
          phone: phoneNumber
      };
      sessionStorage.setItem("appointmentData", JSON.stringify(appointmentData));


      // Call the parent onSubmit handler
      onSubmit({ name, phoneNumber });
      
      // Clear form state
      setName('');
      setPhoneNumber('');
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentFormIC