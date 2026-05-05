import React, { useState } from 'react';
import API from '../services/api';

const FeatureCard = ({ feature, refresh, statusClass }) => {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const updateStatus = async (newStatus) => {
    if (newStatus === feature.status) return;
    
    setUpdating(true);
    try {
      await API.put(`/features/${feature.id}`, { ...feature, status: newStatus });
      refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const deleteFeature = async () => {
    if (!window.confirm(`Delete "${feature.title}"?`)) return;
    
    setDeleting(true);
    try {
      await API.delete(`/features/${feature.id}`);
      refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to delete feature');
    } finally {
      setDeleting(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Low': '#10b981',
      'Medium': '#f59e0b',
      'High': '#ef4444'
    };
    return colors[priority] || '#6b7280';
  };

  return (
    <div className="feature-card">
      <h4 className="feature-title">{feature.title}</h4>
      <p className="feature-desc">{feature.description}</p>
      
      <div className="feature-meta">
        <span className={`priority-badge ${statusClass}`} style={{backgroundColor: getPriorityColor(feature.priority)}}>
          {feature.priority}
        </span>
        <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
          <span className={`status-badge ${statusClass}`}>
            {feature.status}
          </span>
          <select
            value={feature.status}
            onChange={(e) => updateStatus(e.target.value)}
            style={{padding: '0.375rem 0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.875rem'}}
            disabled={updating}
          >
            <option value="Open">🔓 Open</option>
            <option value="In Progress">⚡ In Progress</option>
            <option value="Completed">✅ Completed</option>
          </select>
          <button
            onClick={deleteFeature}
            style={{
              padding: '0.375rem 0.75rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
            disabled={deleting}
          >
            {deleting ? '🗑️...' : '🗑️'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
