import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';
import '../styles/EmployeeForm.css';

const AddEmployee = () => {
  const [formData, setFormData] = useState({ name: "", position: "", department: "", salary: "", email: "", phone: "", joiningDate: "", address: "", experience: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      // Use environment variable if available
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      await axios.post(`${apiUrl}/api/employees`, formData, {
        headers: {
          'x-api-key': 'employee_management_api_key_2025'
        }
      });
      navigate("/employees");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add employee");
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <div className="form-header">
          <h1>Add New Employee</h1>
          <p>Enter the details of the new employee</p>
        </div>
        
        {error && <div className="form-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label htmlFor="name">Name <span className="required">*</span></label>
            <input 
              type="text"
              id="name"
              name="name" 
              value={formData.name}
              onChange={handleChange} 
              placeholder="Enter employee name"
              required
              className={!formData.name.trim() && error ? "input-error" : ""}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input 
              type="text"
              id="position"
              name="position" 
              value={formData.position}
              onChange={handleChange} 
              placeholder="Enter employee position"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input 
              type="text"
              id="department"
              name="department" 
              value={formData.department}
              onChange={handleChange} 
              placeholder="Enter employee department"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input 
              type="number"
              id="salary"
              name="salary" 
              value={formData.salary}
              onChange={handleChange} 
              placeholder="Enter employee salary in Rs."
              step="0.01"
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email"
              id="email"
              name="email" 
              value={formData.email || ""}
              onChange={handleChange} 
              placeholder="Enter employee email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input 
              type="text"
              id="phone"
              name="phone" 
              value={formData.phone || ""}
              onChange={handleChange} 
              placeholder="Enter employee phone number"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="joiningDate">Joining Date</label>
            <input 
              type="date"
              id="joiningDate"
              name="joiningDate" 
              value={formData.joiningDate || ""}
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input 
              type="text"
              id="address"
              name="address" 
              value={formData.address || ""}
              onChange={handleChange} 
              placeholder="Enter employee address"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="experience">Experience (years)</label>
            <input 
              type="number"
              id="experience"
              name="experience" 
              value={formData.experience || ""}
              onChange={handleChange} 
              placeholder="Enter employee experience in years"
              step="0.5"
              min="0"
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className={`submit-button ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Employee'}
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate("/employees")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;