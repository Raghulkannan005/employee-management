// filepath: d:\raghulLivesHere\employee-management\frontend\src\components\EmployeeDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/EmployeeDetail.css';

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        // Use environment variable if available
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await axios.get(`${apiUrl}/api/employees/${id}`, {
          headers: {
            'x-api-key': 'employee_management_api_key_2025'
          }
        });
        setEmployee(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch employee details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return (
    <>
      <Navbar />
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading employee details...</p>
      </div>
    </>
  );

  if (error) return (
    <>
      <Navbar />
      <div className="employee-detail-container">
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
        <Link to="/employees" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Employees
        </Link>
      </div>
    </>
  );

  if (!employee) return (
    <>
      <Navbar />
      <div className="employee-detail-container">
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> Employee not found
        </div>
        <Link to="/employees" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Employees
        </Link>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="employee-detail-container">
        <div className="employee-detail-header">
          <Link to="/employees" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Employees
          </Link>
          <div className="header-actions">
            <Link to={`/employees/edit/${employee._id}`} className="edit-button">
              <i className="fas fa-edit"></i> Edit
            </Link>
          </div>
        </div>

        <div className="employee-profile">
          <div className="employee-avatar-large">
            {employee.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="employee-profile-info">
            <h1>{employee.name}</h1>
            <div className="employee-position-large">
              {employee.position || 'No Position'}
            </div>
            <div className="employee-tags">
              <span className="department-tag">
                {employee.department || 'No Department'}
              </span>
            </div>
          </div>
        </div>

        <div className="employee-detail-cards">
          <div className="detail-card">
            <div className="detail-card-header">
              <i className="fas fa-id-card"></i>
              <h3>Basic Information</h3>
            </div>
            <div className="detail-card-content">
              <div className="detail-item">
                <div className="detail-label">Name</div>
                <div className="detail-value">{employee.name}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Position</div>
                <div className="detail-value">{employee.position || 'Not specified'}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Department</div>
                <div className="detail-value">{employee.department || 'Not specified'}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Email</div>
                <div className="detail-value">{employee.email || 'Not specified'}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Phone</div>
                <div className="detail-value">{employee.phone || 'Not specified'}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Address</div>
                <div className="detail-value">{employee.address || 'Not specified'}</div>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-card-header">
              <i className="fas fa-briefcase"></i>
              <h3>Professional Details</h3>
            </div>
            <div className="detail-card-content">
              <div className="detail-item">
                <div className="detail-label">Salary</div>
                <div className="detail-value salary">
                  Rs.{employee.salary ? employee.salary.toLocaleString() : '0'}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Experience</div>
                <div className="detail-value">
                  {employee.experience ? `${employee.experience} years` : 'Not specified'}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Joining Date</div>
                <div className="detail-value">
                  {employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : 'Not specified'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetail;