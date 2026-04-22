import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Layout, BookOpen, Trophy, BarChart3, Zap, LogOut } from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const sidebarStyle = {
    width: '280px',
    backgroundColor: '#0F172A',
    color: '#94A3B8',
    padding: '40px 24px',
    position: 'fixed',
    height: '100vh', // Critical for vertical alignment
    display: 'flex', // Enable flex
    flexDirection: 'column', // Stack items vertically
    boxShadow: '4px 0 10px rgba(0,0,0,0.1)',
    zIndex: 10
  };

  const navLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    textDecoration: 'none',
    marginBottom: '8px',
    transition: '0.3s',
    fontSize: '15px',
    fontWeight: isActive ? '600' : '500',
    backgroundColor: isActive ? '#1E293B' : 'transparent',
    color: isActive ? '#3B82F6' : '#94A3B8',
  });

  const logoutButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    marginTop: 'auto', // This pushes the button to the very bottom
    marginBottom: '40px', // Space from the bottom edge
    borderRadius: '12px',
    cursor: 'pointer',
    color: '#F87171',
    border: 'none',
    background: 'none',
    fontSize: '15px',
    fontWeight: '600',
    transition: '0.3s',
    textAlign: 'left',
    width: '100%'
  };

  return (
    <nav style={sidebarStyle}>
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '50px' }}>
        <div style={{ backgroundColor: '#3B82F6', padding: '8px', borderRadius: '10px' }}>
            <Zap size={24} color="white" fill="white" />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'white', margin: 0 }}>CareerPath AI</h2>
      </div>

      {/* Navigation Menu */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <NavLink to="/" style={navLinkStyle}>
          <Layout size={20}/> Home
        </NavLink>
        <NavLink to="/roadmap" style={navLinkStyle}>
          <BookOpen size={20}/> My Roadmap
        </NavLink>
        <NavLink to="/interview-prep" style={navLinkStyle}>
          <Trophy size={20}/> Interview Prep
        </NavLink>
        <NavLink to="/analytics" style={navLinkStyle}>
          <BarChart3 size={20}/> Analytics
        </NavLink>
      </div>

      {/* Logout Button at bottom */}
      <button 
        onClick={() => {
          onLogout(); // Clears localStorage and redirects via App.js state
          navigate('/login');
        }} 
        style={logoutButtonStyle}
        onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(248, 113, 113, 0.1)'}
        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        <LogOut size={20}/> Logout
      </button>
    </nav>
  );
};

export default Sidebar;