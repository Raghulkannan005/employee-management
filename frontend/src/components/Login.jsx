import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the intended destination if there is one
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple validation
    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    // Simulate API call for login
    setTimeout(() => {
      // For demo, we'll accept any email with a valid format and any password
      if (credentials.email.includes('@') && credentials.password.length >= 6) {
        // Use the login method from AuthContext
        login({ email: credentials.email });
        
        // Navigate to the intended destination
        navigate(from, { replace: true });
      } else {
        setError('Invalid credentials. Email should be valid and password should be at least 6 characters.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Employee Management</h1>
          <p>Login to access your dashboard</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Demo credentials:</p>
          <p>Email: demo@example.com | Password: password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;