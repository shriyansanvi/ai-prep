import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'; 
import Analytics from './pages/Analytics';
import InterviewPrep from './pages/InterviewPrep';

// Components
import Sidebar from './components/Sidebar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            /* --- PRIVATE ROUTES --- */
            <Route
              path="/*"
              element={
                <div style={{ display: 'flex', minHeight: '100vh' }}>
                  {/* 1. Sidebar stays outside the inner Routes */}
                  <Sidebar onLogout={handleLogout} />
                  
                  <main style={{ 
                    flex: 1, 
                    marginLeft: '280px', 
                    padding: '40px', 
                    backgroundColor: '#F8FAFC' 
                  }}>
                    {/* 2. Content Routes live here */}
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/roadmap" element={<Dashboard />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/interview-prep" element={<InterviewPrep />} />
                      
                      {/* Security Redirects */}
                      <Route path="/login" element={<Navigate to="/" replace />} />
                      <Route path="/signup" element={<Navigate to="/" replace />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </div>
              }
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;