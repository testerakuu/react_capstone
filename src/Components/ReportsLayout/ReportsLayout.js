// src/Components/ReportsLayout/ReportsLayout.js - Exercise 5

import React from 'react';
import './ReportsLayout.css'; // Don't forget to import the CSS!

// Mock data to simulate reports fetched from an API
const mockReports = [
    { id: 1, type: 'Blood Test Results', date: '2025-09-15', doctor: 'Dr. Jiao Yang', specialty: 'Cardiology' },
    { id: 2, type: 'X-Ray Scan Summary', date: '2025-10-01', doctor: 'Dr. Jane Smith', specialty: 'Dermatology' },
    { id: 3, type: 'Annual Checkup Summary', date: '2025-11-20', doctor: 'Dr. John Doe', specialty: 'General Practice' },
];

const ReportsLayout = () => {

    const handleView = (reportId) => {
        alert(`Viewing Report ID: ${reportId}`);
    };

    const handleDownload = (reportType) => {
        alert(`Downloading Report: ${reportType}`);
    };

    return (
        <div className="reports-layout-container">
            <h2>Your Medical Reports</h2>
            
            <div className="reports-table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Report Type</th>
                            <th>Issuing Doctor</th>
                            <th>Doctor Speciality</th>
                            <th>Date Issued</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockReports.map((report, index) => (
                            <tr key={report.id}>
                                <td>{index + 1}</td>
                                <td>{report.type}</td>
                                <td>{report.doctor}</td>
                                <td>{report.specialty}</td>
                                <td>{report.date}</td>
                                <td className="reports-actions">
                                    <button 
                                        className="btn-view"
                                        onClick={() => handleView(report.id)}
                                    >
                                        View Report
                                    </button>
                                    <button 
                                        className="btn-download"
                                        onClick={() => handleDownload(report.type)}
                                    >
                                        Download Report
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {mockReports.length === 0 && (
                <p className="no-reports">No medical reports available at this time.</p>
            )}
        </div>
    );
};

export default ReportsLayout;