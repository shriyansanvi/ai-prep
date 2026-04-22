import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { BarChart3, CheckCircle, Clock, Target, BookOpen, ArrowRight } from 'lucide-react';

const COLORS = ['#3B82F6', '#E2E8F0'];
const BAR_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#22D3EE', '#6366F1', '#A855F7'];

const Analytics = () => {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // Load all saved roadmaps from localStorage
    const saved = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('roadmap_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          saved.push(data);
        } catch (e) {}
      }
    }
    setRoadmaps(saved);
    if (saved.length > 0) setSelected(saved[0]);
  }, []);

  if (roadmaps.length === 0) return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px', textAlign: 'center' }}>
      <BarChart3 size={48} color="#CBD5E0" style={{ marginBottom: '16px' }} />
      <h2 style={{ color: '#64748B' }}>No learning paths started yet</h2>
      <p style={{ color: '#94A3B8' }}>Go to the home page and start a learning path to see your analytics.</p>
      <button
        onClick={() => navigate('/')}
        style={{ marginTop: '20px', padding: '12px 24px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '15px' }}
      >
        Explore Paths
      </button>
    </div>
  );

  // Overall stats across ALL paths
  const allTasks = roadmaps.flatMap(r => r.modules.flatMap(m => m.tasks));
  const totalDone = allTasks.filter(t => t.isDone).length;
  const overallPct = Math.round((totalDone / allTasks.length) * 100) || 0;

  // Bar chart data — one bar per roadmap
  const barData = roadmaps.map(r => {
    const tasks = r.modules.flatMap(m => m.tasks);
    const done = tasks.filter(t => t.isDone).length;
    return {
      name: r.title.replace(' Learning Path', ''),
      Completed: done,
      Total: tasks.length,
    };
  });

  // Selected path pie data
  const selectedTasks = selected ? selected.modules.flatMap(m => m.tasks) : [];
  const selectedDone = selectedTasks.filter(t => t.isDone).length;
  const selectedPending = selectedTasks.length - selectedDone;
  const pieData = [
    { name: 'Completed', value: selectedDone },
    { name: 'Pending', value: selectedPending || 1 },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <BarChart3 size={32} color="#3B82F6" /> Learning Analytics
      </h1>
      <p style={{ color: '#64748B', marginBottom: '30px' }}>Tracking {roadmaps.length} learning path{roadmaps.length > 1 ? 's' : ''}</p>

      {/* Overall stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <StatCard icon={<CheckCircle color="#10B981" />} label="Total Tasks Done" value={totalDone} />
        <StatCard icon={<Target color="#3B82F6" />} label="Total Tasks" value={allTasks.length} />
        <StatCard icon={<Clock color="#F59E0B" />} label="Overall Progress" value={`${overallPct}%`} />
      </div>

      {/* Progress across all paths - bar chart */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 24px', color: '#0F172A' }}>Progress Across All Paths</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="name" angle={-30} textAnchor="end" tick={{ fontSize: 12, fill: '#64748B' }} />
            <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="Total" fill="#E2E8F0" radius={[4,4,0,0]} />
            <Bar dataKey="Completed" fill="#3B82F6" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Per-path selector + pie chart */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 20px', color: '#0F172A' }}>Path Breakdown</h3>

        {/* Path selector tabs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {roadmaps.map((r, i) => (
            <button
              key={r._id}
              onClick={() => setSelected(r)}
              style={{
                padding: '8px 16px', borderRadius: '20px', border: '1px solid #E2E8F0',
                background: selected?._id === r._id ? '#3B82F6' : 'white',
                color: selected?._id === r._id ? 'white' : '#64748B',
                cursor: 'pointer', fontSize: '13px', fontWeight: '500'
              }}
            >
              {r.title.replace(' Learning Path', '')}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center' }}>
            {/* Pie chart */}
            <div style={{ height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={95} paddingAngle={5} dataKey="value">
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Module breakdown */}
            <div>
              {selected.modules.map((mod, i) => {
                const done = mod.tasks.filter(t => t.isDone).length;
                const pct = Math.round((done / mod.tasks.length) * 100);
                return (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', color: '#1E293B', fontWeight: '500' }}>{mod.title}</span>
                      <span style={{ fontSize: '13px', color: '#64748B' }}>{done}/{mod.tasks.length}</span>
                    </div>
                    <div style={{ background: '#F1F5F9', borderRadius: '10px', height: '8px' }}>
                      <div style={{ background: BAR_COLORS[i % BAR_COLORS.length], width: `${pct}%`, height: '8px', borderRadius: '10px', transition: '0.4s' }} />
                    </div>
                  </div>
                );
              })}
              <p style={{ color: '#64748B', fontSize: '13px', marginTop: '20px' }}>
                {selectedDone === selectedTasks.length && selectedTasks.length > 0
                  ? "🎉 Path complete! You're a pro."
                  : `${selectedTasks.length - selectedDone} task${selectedTasks.length - selectedDone !== 1 ? 's' : ''} remaining`}
              </p>
              <button
                onClick={() => navigate('/roadmap', { state: { domain: selected.title.replace(' Learning Path', '') } })}
                style={{ marginTop: '10px', padding: '10px 18px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}
              >
                Continue Path <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '15px' }}>
    <div style={{ background: '#F8FAF9', padding: '12px', borderRadius: '12px' }}>{icon}</div>
    <div>
      <div style={{ fontSize: '14px', color: '#64748B' }}>{label}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E293B' }}>{value}</div>
    </div>
  </div>
);

export default Analytics;