import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle2, Circle, Clock, BookOpen, ExternalLink, ArrowLeft, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [roadmap, setRoadmap] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const domain = location.state?.domain || "Frontend Developer";

  useEffect(() => {
    const fetchPath = async () => {
      try {
        setLoading(true);
        const res = await axios.post('http://localhost:5000/api/roadmap/generate', { goal: domain });
        setRoadmap(res.data);
        localStorage.setItem(`roadmap_${domain}`, JSON.stringify(res.data)); // ✅ moved here
        setError(null);
      } catch (err) {
        console.error("Failed to fetch roadmap:", err);
        setError("Connection failed. Ensure the backend is running on port 5000.");
      } finally {
        setLoading(false);
      }
    };
    fetchPath(); // ✅ clean call, no arguments
  }, [domain]);

  const onToggle = async (e, mIdx, tIdx) => {
    e.stopPropagation();
    try {
      const res = await axios.put('http://localhost:5000/api/roadmap/update', {
        id: roadmap._id, mIdx, tIdx
      });
      setRoadmap(res.data);
      localStorage.setItem(`roadmap_${domain}`, JSON.stringify(res.data)); // ✅ moved here after res exists
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  if (error) return (
    <div style={messageContainer}>
      <p style={{ color: '#EF4444' }}>{error}</p>
      <button onClick={() => navigate('/')} style={backButtonStyle}>Return to Home</button>
    </div>
  );

  if (loading) return (
    <div style={messageContainer}>
      <p>Generating your {domain} roadmap...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px' }}>

      {/* HEADER */}
      <header style={headerStyle}>
        <div>
          <button onClick={() => navigate('/')} style={backButtonStyle}>
            <ArrowLeft size={18} /> Back to Careers
          </button>
          <h1 style={{ fontSize: '32px', color: '#0F172A', marginTop: '10px' }}>{roadmap.title}</h1>
        </div>
        <button
          onClick={() => navigate('/analytics', { state: { roadmap } })}
          style={analyticsButtonStyle}
        >
          <BarChart3 size={18} /> View Analytics
        </button>
      </header>

      {/* MODULES */}
      {roadmap.modules.map((mod, mIdx) => (
        <div key={mIdx} style={{ marginBottom: '40px' }}>
          <div style={moduleHeaderStyle}>
            <BookOpen size={22} color="#3B82F6" />
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>{mod.title}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mod.tasks.map((task, tIdx) => (
              <div key={tIdx} style={taskCardStyle}>
                <div
                  style={taskRowStyle}
                  onClick={() => setExpandedTask(expandedTask === `${mIdx}-${tIdx}` ? null : `${mIdx}-${tIdx}`)}
                >
                  <div onClick={(e) => onToggle(e, mIdx, tIdx)} style={{ cursor: 'pointer' }}>
                    {task.isDone ? <CheckCircle2 color="#10B981" /> : <Circle color="#CBD5E0" />}
                  </div>
                  <span style={{
                    marginLeft: '15px', fontWeight: '600', flex: 1,
                    textDecoration: task.isDone ? 'line-through' : 'none',
                    color: task.isDone ? '#94A3B8' : '#1E293B'
                  }}>
                    {task.name}
                  </span>
                  <div style={timeTagStyle}>
                    <Clock size={14} /> {task.time}
                  </div>
                </div>

                {expandedTask === `${mIdx}-${tIdx}` && (
                  <div style={expandedContentStyle}>
                    <div style={{ marginBottom: '10px' }}>
                      <strong style={{ fontSize: '13px', color: '#64748B' }}>WHY LEARN THIS?</strong>
                      <p style={detailTextStyle}>{task.info}</p>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <strong style={{ fontSize: '13px', color: '#64748B' }}>PROJECT GOAL</strong>
                      <p style={detailTextStyle}>{task.desc}</p>
                    </div>
                    <a href={task.resource} target="_blank" rel="noreferrer" style={resourceLinkStyle}>
                      <ExternalLink size={14} /> Access Learning Resources
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '50px' };
const backButtonStyle = { display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#64748B', cursor: 'pointer', fontWeight: '500' };
const analyticsButtonStyle = { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', backgroundColor: '#0F172A', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' };
const moduleHeaderStyle = { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #F1F5F9' };
const taskCardStyle = { backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' };
const taskRowStyle = { display: 'flex', padding: '20px', cursor: 'pointer', alignItems: 'center', transition: 'background 0.2s' };
const timeTagStyle = { display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '13px', backgroundColor: '#F1F5F9', padding: '4px 10px', borderRadius: '6px' };
const expandedContentStyle = { padding: '20px 20px 20px 58px', backgroundColor: '#F8FAFC', borderTop: '1px solid #F1F5F9' };
const detailTextStyle = { margin: '4px 0 0 0', fontSize: '15px', color: '#334155', lineHeight: '1.5' };
const resourceLinkStyle = { display: 'flex', alignItems: 'center', gap: '6px', color: '#3B82F6', textDecoration: 'none', fontSize: '14px', fontWeight: '700' };
const messageContainer = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '20px' };

export default Dashboard;