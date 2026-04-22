import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Zap, AlertCircle } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.user.name);
      onLogin(); 
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={logoIconStyle}><Zap size={30} color="white" fill="white" /></div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', margin: '10px 0 5px' }}>Welcome Back</h2>
          <p style={{ color: '#64748B', fontSize: '14px' }}>Please enter your details to sign in.</p>
        </div>

        {error && (
          <div style={errorStyle}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email Group */}
          <div style={inputGroupStyle}>
            <label htmlFor="login-email" style={labelStyle}>Email Address</label>
            <div style={inputWrapperStyle}>
              <Mail size={18} style={iconStyle} />
              <input 
                id="login-email"
                name="email"
                type="email" 
                placeholder="name@company.com" 
                style={inputStyle} 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          {/* Password Group */}
          <div style={inputGroupStyle}>
            <label htmlFor="login-password" style={labelStyle}>Password</label>
            <div style={inputWrapperStyle}>
              <Lock size={18} style={iconStyle} />
              <input 
                id="login-password"
                name="password"
                type="password" 
                placeholder="••••••••" 
                style={inputStyle} 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
          </div>

          <button type="submit" style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p style={footerTextStyle}>
          Don't have an account?{' '}
          <span 
            onClick={() => navigate('/signup')} 
            style={linkStyle}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

// Reusable Styles (Shared with Signup)
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F8FAFC' };
const cardStyle = { background: 'white', padding: '40px', borderRadius: '24px', border: '1px solid #E2E8F0', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' };
const logoIconStyle = { backgroundColor: '#3B82F6', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' };
const inputGroupStyle = { marginBottom: '20px' };
const labelStyle = { display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' };
const inputWrapperStyle = { position: 'relative', display: 'flex', alignItems: 'center' };
const iconStyle = { position: 'absolute', left: '12px', color: '#94A3B8' };
const inputStyle = { width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '15px', outline: 'none' };
const btnStyle = { width: '100%', padding: '14px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '16px', marginTop: '10px' };
const errorStyle = { backgroundColor: '#FEF2F2', color: '#DC2626', padding: '12px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' };
const footerTextStyle = { fontSize: '14px', marginTop: '25px', textAlign: 'center', color: '#64748B' };
const linkStyle = { color: '#3B82F6', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none' };

export default Login;