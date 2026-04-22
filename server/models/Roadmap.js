import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle2, Circle } from 'lucide-react';

const Roadmap = ({ roadmapId }) => {
    const [roadmap, setRoadmap] = useState(null);

    // Load roadmap from MongoDB on mount
    useEffect(() => {
        const fetchRoadmap = async () => {
            const res = await axios.get(`http://localhost:5000/api/roadmap/all`);
            // For demo, we find the specific one. Usually, you'd fetch by ID.
            const current = res.data.find(r => r._id === roadmapId);
            setRoadmap(current);
        };
        fetchRoadmap();
    }, [roadmapId]);

    const handleTaskToggle = async (modIdx, taskIdx, currentStatus) => {
        const newStatus = !currentStatus;

        try {
            // 1. Update MongoDB Atlas
            await axios.patch('http://localhost:5000/api/roadmap/toggle-task', {
                roadmapId: roadmap._id,
                moduleIndex: modIdx,
                taskIndex: taskIdx,
                isDone: newStatus
            });

            // 2. Update local UI state
            const updatedRoadmap = { ...roadmap };
            updatedRoadmap.modules[modIdx].tasks[taskIdx].isDone = newStatus;
            setRoadmap(updatedRoadmap);

        } catch (err) {
            console.error("Sync to MongoDB failed", err);
        }
    };

    if (!roadmap) return <div>Loading Roadmap...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>{roadmap.domain} Roadmap</h1>
            {roadmap.modules.map((module, modIdx) => (
                <div key={modIdx} style={{ marginBottom: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '10px' }}>
                    <h3>{module.title}</h3>
                    {module.tasks.map((task, taskIdx) => (
                        <div 
                            key={taskIdx} 
                            onClick={() => handleTaskToggle(modIdx, taskIdx, task.isDone)}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '8px 0' }}
                        >
                            {task.isDone ? <CheckCircle2 color="#10B981" /> : <Circle color="#94A3B8" />}
                            <span style={{ textDecoration: task.isDone ? 'line-through' : 'none', color: task.isDone ? '#94A3B8' : '#1E293B' }}>
                                {task.name}
                            </span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Roadmap;