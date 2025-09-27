import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { HackathonDetail } from './pages/HackathonDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Toaster } from 'react-hot-toast';
import { HackathonFormPage } from './pages/admin/HackathonFormPage';
import { TeamFormPage } from './pages/admin/TeamFormPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  return user?.role === 'admin' ? <>{children}</> : <Navigate to="/hackathons" replace />;
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/hackathons" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/hackathons/:id" 
            element={
              <ProtectedRoute>
                <HackathonDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/hackathons/new" 
            element={
              <AdminRoute>
                <HackathonFormPage />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/hackathons/edit/:id" 
            element={
              <AdminRoute>
                <HackathonFormPage />
              </AdminRoute>
            } 
          />
           <Route 
            path="/admin/teams/new" 
            element={
              <AdminRoute>
                <TeamFormPage />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/teams/edit/:id" 
            element={
              <AdminRoute>
                <TeamFormPage />
              </AdminRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
