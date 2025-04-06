import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/LeaveManagement.css';

const LeaveRequest = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await axios.get(`${apiUrl}/api/employees`, {
          headers: {
            'x-api-key': 'employee_management_api_key_2025'
          }
        });
        setEmployees(response.data);
      } catch (err) {
        console.error('Failed to fetch employees', err);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formData.employeeId) {
      setError('Please select an employee');
      return;
    }
    
    if (!formData.leaveType) {
      setError('Please select a leave type');
      return;
    }
    
    if (!formData.startDate || !formData.endDate) {
      setError('Please select both start and end dates');
      return;
    }
    
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setError('End date must be after start date');
      return;
    }
    
    if (!formData.reason.trim()) {
      setError('Please provide a reason for the leave');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      await axios.post(`${apiUrl}/api/leaves`, formData, {
        headers: {
          'x-api-key': 'employee_management_api_key_2025'
        }
      });
      navigate('/leaves');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit leave request');
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="leave-form-container">
        <div className="leave-form-header">
          <h1>Request Leave</h1>
          <p>Fill out the form to submit a leave request</p>
        </div>
        
        {error && (
          <div className="form-error">
            <i className="fas fa-exclamation-circle error-icon"></i>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="leave-form">
          <div className="form-group">
            <label htmlFor="employeeId">Employee <span className="required">*</span></label>
            <select
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee</option>
              {employees.map(employee => (
                <option key={employee._id} value={employee._id}>
                  {employee.name} ({employee.position})
                </option>
              ))}
            </select>
          </div>
          
          <div className="leave-form-row">
            <div className="form-group">
              <label htmlFor="leaveType">Leave Type <span className="required">*</span></label>
              <select
                id="leaveType"
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Casual">Casual Leave</option>
                <option value="Sick">Sick Leave</option>
                <option value="Vacation">Vacation Leave</option>
                <option value="Maternity/Paternity">Maternity/Paternity Leave</option>
                <option value="Bereavement">Bereavement Leave</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="startDate">Start Date <span className="required">*</span></label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>
          
          <div className="leave-form-row">
            <div className="form-group">
              <label htmlFor="endDate">End Date <span className="required">*</span></label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="form-group">
              {formData.startDate && formData.endDate && (
                <div className="leave-duration-info">
                  <label>Duration</label>
                  <div className="duration-value">
                    {Math.ceil(
                      (new Date(formData.endDate) - new Date(formData.startDate)) / 
                      (1000 * 60 * 60 * 24)
                    ) + 1} days
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="reason">Reason <span className="required">*</span></label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              placeholder="Provide detailed reason for your leave request"
              required
            ></textarea>
          </div>
          
          <div className="leave-form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Request'}
              {!loading && <i className="fas fa-paper-plane button-icon"></i>}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/leaves')}
            >
              Cancel
              <i className="fas fa-times button-icon"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LeaveRequest;