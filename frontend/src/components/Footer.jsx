// filepath: d:\raghulLivesHere\employee-management\frontend\src\components\Footer.jsx
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h3><i className="fas fa-users-cog"></i> Employee Manager</h3>
          <p>Your complete employee management solution</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>Navigation</h4>
            <ul>
              <li><a href="/">Dashboard</a></li>
              <li><a href="/employees">Employees</a></li>
              <li><a href="/employees/add">Add Employee</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Employee Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;