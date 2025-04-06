# Employee Management System

A full-stack web application for managing employee data, with features for listing, adding, editing, and deleting employee records.

## Features

- Employee Dashboard: View all employees with search and filter functionality
- Add, edit, and delete employees
- Authentication system
- Theme switching (light/dark mode)
- Responsive design

## Project Structure

The project is divided into two main parts:

- `/frontend`: React application built with Vite
- `/backend`: Express.js API with MongoDB integration

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Rename `.env.example` to `.env` (if it exists) or create a new `.env` file
   - Update the MongoDB connection string with your actual credentials
   - Set a strong API_KEY for securing API endpoints

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file with `VITE_API_URL=http://localhost:5000` (or the URL where your backend is running)

4. Start the frontend development server:
   ```
   npm run dev
   ```

5. Access the application at `http://localhost:5173` (or the port provided by Vite)

## Authentication

For demo purposes, the authentication system accepts:
- Any valid email format (contains @)
- Password with minimum 6 characters

In a production environment, this should be replaced with a proper authentication system.

## API Endpoints

- `GET /employees`: Fetch all employees
- `GET /employees/:id`: Fetch a single employee by ID
- `POST /employees`: Add a new employee
- `PUT /employees/:id`: Update an employee
- `DELETE /employees/:id`: Delete an employee

All endpoints (except for the test endpoint) require an API key to be passed in the `x-api-key` header.

## Technologies Used

- **Frontend**: React, React Router, Axios, CSS
- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Development**: Vite, Nodemon, ESLint

## Security Notes

- Never commit sensitive information like MongoDB connection strings or API keys to version control
- Use environment variables for sensitive information
- In production, implement proper authentication with JWT or similar
- Implement CORS properly for production
