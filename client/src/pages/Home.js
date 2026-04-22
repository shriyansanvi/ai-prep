import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, Database, Shield, Layout, Cpu, 
  Cloud, Smartphone, Palette, BarChart, Server, Search 
} from 'lucide-react';
import axios from 'axios';

const domains = [
  { name: "Frontend Developer", icon: <Layout />, color: "#3B82F6" },
  { name: "Backend Developer", icon: <Server />, color: "#10B981" },
  { name: "Full Stack Developer", icon: <Code />, color: "#6366F1" },
  { name: "Data Scientist", icon: <BarChart />, color: "#F59E0B" },
  { name: "ML Engineer", icon: <Cpu />, color: "#8B5CF6" },
  { name: "Cybersecurity Analyst", icon: <Shield />, color: "#EF4444" },
  { name: "DevOps Engineer", icon: <Database />, color: "#22D3EE" },
  { name: "Android Developer", icon: <Smartphone />, color: "#A855F7" },
  { name: "UI/UX Designer", icon: <Palette />, color: "#EC4899" },
  { name: "Cloud Architect", icon: <Cloud />, color: "#06B6D4" },
];

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = domains.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  const handleCardClick = async (domainName) => {
  try {
    const response = await axios.post('http://localhost:5000/api/roadmap/generate', {
      goal: domainName // This must match the 'goal' in your controller
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    
    if (response.status === 201 || response.status === 200) {
      console.log("Roadmap ready!");
      navigate('/roadmap'); // Move to the roadmap page
    }
  } catch (err) {
    console.error("Error generating roadmap:", err);
  }
};

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Simple Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px', color: '#0F172A', fontWeight: '700' }}>Explore Career Paths</h1>
        <p style={{ color: '#64748B' }}>Select a domain to view your personalized learning roadmap.</p>
      </div>

      {/* Simple Search */}
      <div style={{ marginBottom: '30px', position: 'relative' }}>
        <Search style={{ position: 'absolute', left: '12px', top: '12px', color: '#94A3B8' }} size={18} />
        <input 
          type="text" 
          placeholder="Search domains..." 
          onChange={(e) => setSearch(e.target.value)}
          style={{ 
            width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', 
            border: '1px solid #E2E8F0', outline: 'none', fontSize: '15px' 
          }}
        />
      </div>

      {/* Clean Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {filtered.map((d, i) => (
          <div 
            key={i} 
           onClick={() => navigate('/roadmap', { state: { domain: d.name } })}
            style={{
              backgroundColor: 'white', padding: '24px', borderRadius: '12px', 
              cursor: 'pointer', border: '1px solid #E2E8F0', transition: '0.2s'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.borderColor = d.color;
                e.currentTarget.style.backgroundColor = `${d.color}05`;
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            <div style={{ color: d.color, marginBottom: '12px' }}>
              {React.cloneElement(d.icon, { size: 28 })}
            </div>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#1E293B' }}>{d.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;