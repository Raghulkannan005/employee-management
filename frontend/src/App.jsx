import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import NotFound from './components/NotFound';
import LeaveList from './components/LeaveList';
import LeaveDetail from './components/LeaveDetail';
import LeaveRequest from './components/LeaveRequest';
import './index.css';
import './styles/App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <div className="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/employees" element={
                <ProtectedRoute>
                  <EmployeeList />
                </ProtectedRoute>
              } />
              
              <Route path="/employees/:id" element={
                <ProtectedRoute>
                  <EmployeeDetail />
                </ProtectedRoute>
              } />
              
              <Route path="/employees/add" element={
                <ProtectedRoute>
                  <AddEmployee />
                </ProtectedRoute>
              } />
              
              <Route path="/employees/edit/:id" element={
                <ProtectedRoute>
                  <EditEmployee />
                </ProtectedRoute>
              } />
              
              {/* Leave Management Routes */}
              <Route path="/leaves" element={
                <ProtectedRoute>
                  <LeaveList />
                </ProtectedRoute>
              } />
              
              <Route path="/leaves/:id" element={
                <ProtectedRoute>
                  <LeaveDetail />
                </ProtectedRoute>
              } />
              
              <Route path="/leaves/request" element={
                <ProtectedRoute>
                  <LeaveRequest />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;