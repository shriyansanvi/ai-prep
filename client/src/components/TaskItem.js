import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const TaskItem = ({ task, onToggle }) => {
  return (
    <div 
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        cursor: 'pointer',
        borderBottom: '1px solid #eee',
        backgroundColor: task.isDone ? '#f0fff4' : 'transparent',
        transition: '0.2s'
      }}
    >
      {task.isDone ? 
        <CheckCircle color="#48bb78" size={20} /> : 
        <Circle color="#cbd5e0" size={20} />
      }
      <span style={{ 
        marginLeft: '10px', 
        textDecoration: task.isDone ? 'line-through' : 'none',
        color: task.isDone ? '#718096' : '#2d3748'
      }}>
        {task.name}
      </span>
    </div>
  );
};

export default TaskItem;