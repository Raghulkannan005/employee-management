import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/LeaveManagement.css';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        // Use environment variable if available
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await axios.get(`${apiUrl}/api/leaves${statusFilter ? `?status=${statusFilter}` : ''}`, {
          headers: {
            'x-api-key': 'employee_management_api_key_2025'
          }
        });
        setLeaves(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch leave requests');
        setLoading(false);
        console.error(err);
      }
    };

    fetchLeaves();
  }, [statusFilter]);

  const getStatusClass = (status) => {
    switch(status) {
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end dates
  };

  if (loading) return (
    <>
      <Navbar />
      <div className="leave-loading">
        <div className="loader"></div>
        <p>Loading leave requests...</p>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="leave-container">
        <div className="leave-header">
          <h1>Leave Management</h1>
          <Link to="/leaves/request" className="request-leave-button">
            <i className="fas fa-plus"></i> Request Leave
          </Link>
        </div>

        <div className="filter-container">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {error && (
          <div className="error-banner">
            <i className="fas fa-exclamation-circle error-icon"></i>
            {error}
          </div>
        )}

        {!loading && leaves.length === 0 ? (
          <div className="no-leaves">
            <div className="no-leaves-icon">
              <i className="fas fa-calendar-times"></i>
            </div>
            <p>No leave requests found</p>
            <Link to="/leaves/request" className="add-link">
              <i className="fas fa-plus"></i> Request Leave
            </Link>
          </div>
        ) : (
          <div className="leave-grid">
            {leaves.map((leave) => (
              <div key={leave._id} className="leave-card">
                <div className={`leave-status ${getStatusClass(leave.status)}`}>
                  {leave.status}
                </div>
                <div className="leave-header-content">
                  <div className="leave-type">{leave.leaveType}</div>
                  <div className="leave-dates">
                    <i className="fas fa-calendar-alt"></i>
                    {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                  </div>
                </div>
                <div className="leave-details">
                  <div className="leave-info-item">
                    <div className="leave-info-label">Duration</div>
                    <div className="leave-info-value">
                      {calculateDays(leave.startDate, leave.endDate)} Days
                    </div>
                  </div>
                  <div className="leave-info-item">
                    <div className="leave-info-label">Applied On</div>
                    <div className="leave-info-value">
                      {formatDate(leave.dateApplied)}
                    </div>
                  </div>
                  {leave.employeeId && typeof leave.employeeId === 'object' && (
                    <div className="leave-info-item">
                      <div className="leave-info-label">Employee</div>
                      <div className="leave-info-value">
                        {leave.employeeId.name}
                      </div>
                    </div>
                  )}
                  <div className="leave-reason">
                    <div className="leave-reason-label">Reason</div>
                    <div className="leave-reason-text">
                      {leave.reason.length > 100 
                        ? `${leave.reason.substring(0, 100)}...` 
                        : leave.reason}
                    </div>
                  </div>
                </div>
                <div className="leave-actions">
                  <Link 
                    to={`/leaves/${leave._id}`} 
                    className="leave-action-button"
                  >
                    <i className="fas fa-eye"></i> View Details
                  </Link>
                  {leave.status === 'Pending' && (
                    <Link 
                      to={`/leaves/${leave._id}/review`} 
                      className="leave-action-button"
                    >
                      <i className="fas fa-clipboard-check"></i> Review
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LeaveList;