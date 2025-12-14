// src/Components/ReportsLayout/ReportsLayout.js - COMPLETE CODE (Final Version)

import React from 'react';
import './ReportsLayout.css'; 

// Mock data to simulate reports fetched from an API
const mockReports = [
    { id: 1, type: 'Blood Test Results', date: '2025-09-15', doctor: 'Dr. Jiao Yang', specialty: 'Cardiology' },
    { id: 2, type: 'X-Ray Scan Summary', date: '2025-10-01', doctor: 'Dr. Jane Smith', specialty: 'Dermatology' },
    { id: 3, type: 'Annual Checkup Summary', date: '2025-11-20', doctor: 'Dr. John Doe', specialty: 'General Practice' },
];

const ReportsLayout = () => {

    // Note: Removed the handleView and handleDownload functions 
    // as we are now using simple anchor tags for functionality.

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
                                    
                                    {/* 1. View Report: Opens the PDF in a new tab */}
                                    <a 
                                        href="/patient_report.pdf" // Path to the file in the public folder
                                        target="_blank" // Opens in a new tab
                                        rel="noopener noreferrer" 
                                        className="btn-view"
                                    >
                                        View Report
                                    </a>
                                    
                                    {/* 2. Download Report: Forces the browser to download the file */}
                                    <a 
                                        href="/patient_report.pdf" // Path to the file in the public folder
                                        download={`patient_report_ID_${report.id}.pdf`} // Dynamic filename for download
                                        className="btn-download"
                                    >
                                        Download Report
                                    </a>
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