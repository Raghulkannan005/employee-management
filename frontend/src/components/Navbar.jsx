import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  // Check if navbar is already rendered by a parent component
  if (window.navbarRendered) {
    return null; // Don't render navbar again
  }
  
  // Set flag to indicate navbar is rendered
  window.navbarRendered = true;
  
  // Clear the flag when component unmounts
  useEffect(() => {
    return () => {
      window.navbarRendered = false;
    };
  }, []);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close mobile menu when clicking on a link
  const closeMenu = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2><i className="fas fa-users-cog"></i> Employee Manager</h2>
      </div>

      <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
            onClick={closeMenu}
          >
            <i className="fas fa-home"></i> Home
          </Link>
          <Link 
            to="/employees" 
            className={`nav-link ${location.pathname.includes('/employees') ? 'active' : ''}`} 
            onClick={closeMenu}
          >
            <i className="fas fa-users"></i> Employees
          </Link>
          <Link 
            to="/employees/add" 
            className="nav-link" 
            onClick={closeMenu}
          >
            <i className="fas fa-user-plus"></i> Add Employee
          </Link>
          <Link 
            to="/leaves" 
            className={`nav-link ${location.pathname.includes('/leaves') ? 'active' : ''}`} 
            onClick={closeMenu}
          >
            <i className="fas fa-calendar-alt"></i> Leave Management
          </Link>
        </div>

        <div className="user-section">
          <ThemeSwitcher />
          <div className="user-info">
            <span className="user-email">{user?.email}</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;