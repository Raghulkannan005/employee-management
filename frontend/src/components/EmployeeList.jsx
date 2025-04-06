import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Use environment variable if available
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await axios.get(`${apiUrl}/api/employees`, {
          headers: {
            'x-api-key': 'employee_management_api_key_2025'
          }
        });
        setEmployees(response.data);
        
        // Extract unique departments for filter
        const uniqueDepartments = [...new Set(response.data.map(emp => emp.department).filter(Boolean))];
        setDepartments(uniqueDepartments);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch employees');
        setLoading(false);
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Use environment variable if available
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      await axios.delete(`${apiUrl}/api/employees/${id}`, {
        headers: {
          'x-api-key': 'employee_management_api_key_2025'
        }
      });
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (err) {
      setError('Failed to delete employee');
      console.error(err);
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (employee.position && employee.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (employee.department && employee.department.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || employee.department === filter;
    
    return matchesSearch && matchesFilter;
  });

  if (loading) return (
    <>
      <Navbar />
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading employees...</p>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="employee-container">
        <div className="employee-header">
          <h1>Employee Directory</h1>
          <Link to="/employees/add" className="add-employee-button">
            <span>+</span> Add New Employee
          </Link>
        </div>
        
        {error && <div className="error-banner">{error}</div>}
        
        <div className="search-filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="search-icon">🔍</i>
          </div>
          
          <div className="filter-dropdown">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
        
        {filteredEmployees.length === 0 ? (
          <div className="no-employees">
            <p>No employees found. {searchTerm || filter !== 'all' ? 'Try different search or filter.' : ''}</p>
            <Link to="/employees/add" className="add-link">Add your first employee</Link>
          </div>
        ) : (
          <div className="employee-grid">
            {filteredEmployees.map((employee, index) => (
              <div 
                className="employee-card" 
                key={employee._id}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="employee-avatar">
                  {employee.name.charAt(0).toUpperCase()}
                </div>
                <div className="employee-info">
                  <h3>{employee.name}</h3>
                  <div className="employee-details">
                    <p className="employee-position">{employee.position || 'No Position'}</p>
                    <p className="employee-department">{employee.department || 'No Department'}</p>
                    <p className="employee-salary">{employee.salary?.toLocaleString() || '0'}</p>
                  </div>
                </div>
                <div className="employee-actions">
                  <Link to={`/employees/edit/${employee._id}`} className="edit-button">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(employee._id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeList;