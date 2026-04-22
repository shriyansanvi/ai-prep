import React, { useState } from 'react';
import { Plus, Search, X } from 'lucide-react';

const initialProblems = [
  { id: 1, name: "Two Sum", category: "Arrays", difficulty: "Easy", status: "Solved" },
  { id: 2, name: "Binary Search Tree", category: "Trees", difficulty: "Medium", status: "Solved" },
  { id: 3, name: "Merge Two Sorted Lists", category: "Linked Lists", difficulty: "Easy", status: "Solved" },
  { id: 4, name: "Maximum Subarray", category: "Dynamic Programming", difficulty: "Medium", status: "Attempted" },
  { id: 5, name: "Valid Parentheses", category: "Stack", difficulty: "Easy", status: "Solved" },
  { id: 6, name: "Word Break", category: "Dynamic Programming", difficulty: "Medium", status: "Attempted" },
  { id: 7, name: "Median of Two Sorted Arrays", category: "Arrays", difficulty: "Hard", status: "Unsolved" },
  { id: 8, name: "LRU Cache", category: "Design", difficulty: "Medium", status: "Unsolved" },
  { id: 9, name: "Trapping Rain Water", category: "Arrays", difficulty: "Hard", status: "Attempted" },
  { id: 10, name: "Clone Graph", category: "Graphs", difficulty: "Medium", status: "Solved" },
  { id: 11, name: "Serialize and Deserialize Binary Tree", category: "Trees", difficulty: "Hard", status: "Unsolved" },
];

const difficultyColor = { Easy: '#10B981', Medium: '#F59E0B', Hard: '#EF4444' };
const statusColor = { Solved: '#10B981', Attempted: '#F59E0B', Unsolved: '#94A3B8' };
const statusEmoji = { Solved: '✅', Attempted: '🔄', Unsolved: '❌' };

const InterviewPrep = () => {
  const [problems, setProblems] = useState(initialProblems);
  const [search, setSearch] = useState('');
  const [filterDiff, setFilterDiff] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', difficulty: 'Easy', status: 'Unsolved' });

  const filtered = problems.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchDiff = filterDiff === 'All' || p.difficulty === filterDiff;
    return matchSearch && matchDiff;
  });

  const addProblem = () => {
    if (!form.name || !form.category) return;
    setProblems([...problems, { ...form, id: Date.now() }]);
    setForm({ name: '', category: '', difficulty: 'Easy', status: 'Unsolved' });
    setShowModal(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#0F172A' }}>Interview Prep Tracker</h1>
          <p style={{ color: '#64748B', margin: '4px 0 0' }}>{problems.filter(p => p.status === 'Solved').length} / {problems.length} solved</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ backgroundColor: '#3B82F6', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}
        >
          <Plus size={20} /> Add Problem
        </button>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search style={{ position: 'absolute', left: '12px', top: '11px', color: '#94A3B8' }} size={16} />
          <input
            placeholder="Search problems or categories..."
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        {['All', 'Easy', 'Medium', 'Hard'].map(d => (
          <button
            key={d}
            onClick={() => setFilterDiff(d)}
            style={{
              padding: '10px 18px', borderRadius: '8px', border: '1px solid #E2E8F0',
              background: filterDiff === d ? '#3B82F6' : 'white',
              color: filterDiff === d ? 'white' : '#64748B',
              cursor: 'pointer', fontSize: '14px', fontWeight: '500'
            }}
          >{d}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #F1F5F9', textAlign: 'left' }}>
              <th style={{ padding: '15px', color: '#64748B', fontWeight: '600' }}>#</th>
              <th style={{ padding: '15px', color: '#64748B', fontWeight: '600' }}>Problem</th>
              <th style={{ padding: '15px', color: '#64748B', fontWeight: '600' }}>Category</th>
              <th style={{ padding: '15px', color: '#64748B', fontWeight: '600' }}>Difficulty</th>
              <th style={{ padding: '15px', color: '#64748B', fontWeight: '600' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}
                onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'}
                onMouseOut={(e) => e.currentTarget.style.background = 'white'}
              >
                <td style={{ padding: '15px', color: '#94A3B8', fontSize: '13px' }}>{i + 1}</td>
                <td style={{ padding: '15px', fontWeight: '500', color: '#1E293B' }}>{p.name}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ background: '#F1F5F9', color: '#475569', padding: '4px 10px', borderRadius: '20px', fontSize: '13px' }}>
                    {p.category}
                  </span>
                </td>
                <td style={{ padding: '15px', color: difficultyColor[p.difficulty], fontWeight: '600' }}>{p.difficulty}</td>
                <td style={{ padding: '15px', color: statusColor[p.status], fontWeight: '500' }}>
                  {statusEmoji[p.status]} {p.status}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: '#94A3B8' }}>No problems found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Problem Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '30px', width: '420px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, color: '#0F172A' }}>Add New Problem</h2>
              <button onClick={() => setShowModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                <X size={20} />
              </button>
            </div>

            {[
              { label: 'Problem Name', key: 'name', type: 'input' },
              { label: 'Category', key: 'category', type: 'input' },
            ].map(({ label, key }) => (
              <div key={key} style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#475569', fontWeight: '500' }}>{label}</label>
                <input
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}

            {[
              { label: 'Difficulty', key: 'difficulty', options: ['Easy', 'Medium', 'Hard'] },
              { label: 'Status', key: 'status', options: ['Unsolved', 'Attempted', 'Solved'] },
            ].map(({ label, key, options }) => (
              <div key={key} style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#475569', fontWeight: '500' }}>{label}</label>
                <select
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none', background: 'white' }}
                >
                  {options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}

            <button
              onClick={addProblem}
              style={{ width: '100%', padding: '12px', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}
            >
              Add Problem
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;