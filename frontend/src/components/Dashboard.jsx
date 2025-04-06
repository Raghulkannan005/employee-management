// filepath: d:\raghulLivesHere\employee-management\frontend\src\components\Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    newEmployees: 0,
    departments: 0
  });
  
  const [leaveStats, setLeaveStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        
        // Fetch employee statistics
        const employeeResponse = await axios.get(`${apiUrl}/api/employees/stats`, {
          headers: {
            'x-api-key': 'employee_management_api_key_2025'
          }
        });
        
        // Fetch leave statistics
        let leaveData = { total: 0, pending: 0, approved: 0, rejected: 0 };
        try {
          const leaveResponse = await axios.get(`${apiUrl}/api/leaves/statistics`, {
            headers: {
              'x-api-key': 'employee_management_api_key_2025'
            }
          });
          leaveData = leaveResponse.data;
        } catch (leaveErr) {
          console.log('Leave stats not available yet');
        }
        
        setStats(employeeResponse.data);
        setLeaveStats(leaveData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading dashboard data...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Employee Dashboard</h1>
          <p>Overview of your organization's workforce and activities</p>
        </div>

        {error && (
          <div className="error-banner">
            <i className="fas fa-exclamation-circle error-icon"></i>
            {error}
          </div>
        )}

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-details">
              <h3>Total Employees</h3>
              <div className="stat-value">{stats.totalEmployees}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="stat-details">
              <h3>New Employees</h3>
              <div className="stat-value">{stats.newEmployees}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-building"></i>
            </div>
            <div className="stat-details">
              <h3>Departments</h3>
              <div className="stat-value">{stats.departments}</div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-header">
          <h1>Leave Management</h1>
          <p>Overview of leave requests and their status</p>
        </div>
        
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)' }}>
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="stat-details">
              <h3>Total Leaves</h3>
              <div className="stat-value">{leaveStats.total}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #F6D365 0%, #FDA085 100%)' }}>
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-details">
              <h3>Pending Leaves</h3>
              <div className="stat-value">{leaveStats.pending}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #0CEBEB 0%, #20E3B2 100%)' }}>
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-details">
              <h3>Approved Leaves</h3>
              <div className="stat-value">{leaveStats.approved}</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)' }}>
              <i className="fas fa-times-circle"></i>
            </div>
            <div className="stat-details">
              <h3>Rejected Leaves</h3>
              <div className="stat-value">{leaveStats.rejected}</div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-cards">
            <Link to="/employees/add" className="action-card">
              <i className="fas fa-user-plus"></i>
              <h3>Add Employee</h3>
              <p>Create a new employee record</p>
            </Link>
            <Link to="/employees" className="action-card">
              <i className="fas fa-users"></i>
              <h3>View Employees</h3>
              <p>Manage your employees</p>
            </Link>
            <Link to="/leaves/request" className="action-card">
              <i className="fas fa-calendar-plus"></i>
              <h3>Request Leave</h3>
              <p>Create a new leave request</p>
            </Link>
            <Link to="/leaves" className="action-card">
              <i className="fas fa-clipboard-list"></i>
              <h3>Manage Leaves</h3>
              <p>Review and approve leave requests</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;