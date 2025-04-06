import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/LeaveManagement.css';

const LeaveDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchLeaveDetail = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await axios.get(`${apiUrl}/api/leaves/${id}`, {
          headers: {
            'x-api-key': 'employee_management_api_key_2025'
          }
        });
        setLeave(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch leave details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchLeaveDetail();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end dates
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      await axios.put(`${apiUrl}/api/leaves/${id}/status`, 
        { 
          status: newStatus,
          approverComments: "Status updated to " + newStatus
        },
        {
          headers: {
            'x-api-key': 'employee_management_api_key_2025'
          }
        }
      );
      
      // Refresh leave data
      const response = await axios.get(`${apiUrl}/api/leaves/${id}`, {
        headers: {
          'x-api-key': 'employee_management_api_key_2025'
        }
      });
      setLeave(response.data);
      
    } catch (err) {
      setError('Failed to update leave status');
      console.error(err);
    }
  };

  if (loading) return (
    <>
      <Navbar />
      <div className="leave-loading">
        <div className="loader"></div>
        <p>Loading leave details...</p>
      </div>
    </>
  );

  if (error) return (
    <>
      <Navbar />
      <div className="leave-detail-container">
        <div className="error-banner">
          <i className="fas fa-exclamation-circle error-icon"></i>
          {error}
        </div>
        <Link to="/leaves" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Leaves
        </Link>
      </div>
    </>
  );

  if (!leave) return (
    <>
      <Navbar />
      <div className="leave-detail-container">
        <div className="error-banner">
          <i className="fas fa-exclamation-circle error-icon"></i>
          Leave request not found
        </div>
        <Link to="/leaves" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Leaves
        </Link>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="leave-detail-container">
        <div className="leave-detail-header">
          <Link to="/leaves" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Leaves
          </Link>
          <div className={`status-badge ${getStatusBadgeClass(leave.status)}`}>
            <i className={`fas ${
              leave.status === 'Approved' ? 'fa-check-circle' : 
              leave.status === 'Rejected' ? 'fa-times-circle' : 'fa-clock'
            }`}></i>
            {leave.status}
          </div>
        </div>

        <div className="leave-detail-card">
          <div className="leave-detail-title">
            <h2>
              <i className="fas fa-calendar-alt"></i>
              {leave.leaveType} Leave Request
            </h2>
          </div>

          <div className="leave-detail-content">
            <div className="leave-detail-section">
              <h3>
                <i className="fas fa-info-circle"></i>
                Basic Information
              </h3>
              <div className="leave-detail-grid">
                <div className="leave-detail-item">
                  <div className="leave-detail-label">Leave Type</div>
                  <div className="leave-detail-value">{leave.leaveType}</div>
                </div>
                <div className="leave-detail-item">
                  <div className="leave-detail-label">Status</div>
                  <div className="leave-detail-value">{leave.status}</div>
                </div>
                <div className="leave-detail-item">
                  <div className="leave-detail-label">Start Date</div>
                  <div className="leave-detail-value">{formatDate(leave.startDate)}</div>
                </div>
                <div className="leave-detail-item">
                  <div className="leave-detail-label">End Date</div>
                  <div className="leave-detail-value">{formatDate(leave.endDate)}</div>
                </div>
                <div className="leave-detail-item">
                  <div className="leave-detail-label">Duration</div>
                  <div className="leave-detail-value">
                    {calculateDays(leave.startDate, leave.endDate)} Days
                  </div>
                </div>
                <div className="leave-detail-item">
                  <div className="leave-detail-label">Applied On</div>
                  <div className="leave-detail-value">{formatDate(leave.dateApplied)}</div>
                </div>
              </div>
            </div>

            {leave.employeeId && (
              <div className="leave-detail-section">
                <h3>
                  <i className="fas fa-user"></i>
                  Employee Details
                </h3>
                <div className="leave-detail-grid">
                  <div className="leave-detail-item">
                    <div className="leave-detail-label">Name</div>
                    <div className="leave-detail-value">
                      {typeof leave.employeeId === 'object' ? leave.employeeId.name : 'N/A'}
                    </div>
                  </div>
                  <div className="leave-detail-item">
                    <div className="leave-detail-label">Position</div>
                    <div className="leave-detail-value">
                      {typeof leave.employeeId === 'object' ? leave.employeeId.position : 'N/A'}
                    </div>
                  </div>
                  <div className="leave-detail-item">
                    <div className="leave-detail-label">Department</div>
                    <div className="leave-detail-value">
                      {typeof leave.employeeId === 'object' ? leave.employeeId.department : 'N/A'}
                    </div>
                  </div>
                  <div className="leave-detail-item">
                    <div className="leave-detail-label">Email</div>
                    <div className="leave-detail-value">
                      {typeof leave.employeeId === 'object' ? leave.employeeId.email : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="leave-detail-section">
              <h3>
                <i className="fas fa-comment-alt"></i>
                Reason for Leave
              </h3>
              <p>{leave.reason}</p>
            </div>

            {leave.status === 'Pending' && (
              <div className="approval-actions">
                <button 
                  className="approval-button approve-action"
                  onClick={() => handleUpdateStatus('Approved')}
                >
                  <i className="fas fa-check"></i> Approve
                </button>
                <button 
                  className="approval-button reject-action"
                  onClick={() => handleUpdateStatus('Rejected')}
                >
                  <i className="fas fa-times"></i> Reject
                </button>
              </div>
            )}

            {leave.approverComments && (
              <div className="comments-section">
                <h3>Reviewer Comments</h3>
                <div className="comment-box">
                  <div className="comment-header">
                    <span className="comment-author">Reviewer</span>
                    <span className="comment-date">{formatDate(leave.dateReviewed)}</span>
                  </div>
                  <div className="comment-text">{leave.approverComments}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveDetail;