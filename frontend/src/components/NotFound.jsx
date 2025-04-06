// filepath: d:\raghulLivesHere\employee-management\frontend\src\components\NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
        <Link to="/" className="home-button">
          <i className="fas fa-home"></i> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;