import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Zap, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert("Account created! Please log in.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={logoIconStyle}><Zap size={30} color="white" fill="white" /></div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: '10px 0 5px' }}>Create Account</h2>
          <p style={{ color: '#64748B', fontSize: '14px' }}>Join CareerPath AI today.</p>
        </div>

        <form onSubmit={handleSignup}>
          {/* Full Name */}
          <div style={inputGroupStyle}>
            <label htmlFor="signup-name" style={labelStyle}>Full Name</label>
            <div style={inputWrapperStyle}>
              <User size={18} style={iconStyle} />
              <input 
                id="signup-name"
                name="name"
                type="text" 
                placeholder="John Doe" 
                style={inputStyle} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required 
              />
            </div>
          </div>

          {/* Email */}
          <div style={inputGroupStyle}>
            <label htmlFor="signup-email" style={labelStyle}>Email Address</label>
            <div style={inputWrapperStyle}>
              <Mail size={18} style={iconStyle} />
              <input 
                id="signup-email"
                name="email"
                type="email" 
                placeholder="name@company.com" 
                style={inputStyle} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                required 
              />
            </div>
          </div>

          {/* Password */}
          <div style={inputGroupStyle}>
            <label htmlFor="signup-password" style={labelStyle}>Password</label>
            <div style={inputWrapperStyle}>
              <Lock size={18} style={iconStyle} />
              <input 
                id="signup-password"
                name="password"
                type="password" 
                placeholder="••••••••" 
                style={inputStyle} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required 
              />
            </div>
          </div>

          <button type="submit" style={btnStyle} disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'} <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </button>
        </form>

        <p style={footerTextStyle}>
          Already have an account?{' '}
          <span 
            onClick={() => navigate('/login')} 
            style={linkStyle}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

// Styles (Same as Login.js)
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F8FAFC' };
const cardStyle = { background: 'white', padding: '40px', borderRadius: '24px', border: '1px solid #E2E8F0', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' };
const logoIconStyle = { backgroundColor: '#3B82F6', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' };
const inputGroupStyle = { marginBottom: '20px' };
const labelStyle = { display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' };
const inputWrapperStyle = { position: 'relative', display: 'flex', alignItems: 'center' };
const iconStyle = { position: 'absolute', left: '12px', color: '#94A3B8' };
const inputStyle = { width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '15px', outline: 'none' };
const btnStyle = { width: '100%', padding: '14px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const footerTextStyle = { fontSize: '14px', marginTop: '25px', textAlign: 'center', color: '#64748B' };
const linkStyle = { color: '#3B82F6', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none' };

export default Signup;