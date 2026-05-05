import React, { useState } from 'react';
import API from '../services/api';

const FeatureList = ({ features, statusFilter, onRefresh }) => {
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await API.put(`/features/${id}`, { status: newStatus });
      onRefresh();
    } catch (err) {
      alert('Failed to update');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteFeature = async (id) => {
    if (!confirm('Delete feature?')) return;
    setDeletingId(id);
    try {
      await API.delete(`/features/${id}`);
      onRefresh();
    } catch (err) {
      alert('Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredFeatures = features.filter(f => !statusFilter || f.status === statusFilter);

  if (filteredFeatures.length === 0) {
    return (
      <div style={{textAlign: 'center', padding: '2rem', color: '#6b7280'}}>
        <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📭</div>
        <h3>No features match filter</h3>
      </div>
    );
  }

  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem'}}>
      {filteredFeatures.map((feature) => (
        <div key={feature.id} style={{
          background: '#fafbfc',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem'}}>{feature.title}</h4>
          <p style={{color: '#6b7280', marginBottom: '1rem'}}>{feature.description}</p>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '600',
              background: feature.priority === 'High' ? '#ef4444' : feature.priority === 'Medium' ? '#f59e0b' : '#10b981',
              color: 'white'
            }}>
              {feature.priority}
            </span>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <span className={`status-badge status-${feature.status.toLowerCase().replace(' ', '-')}`} style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                {feature.status}
              </span>
              <select
                value={feature.status}
                onChange={(e) => updateStatus(feature.id, e.target.value)}
                disabled={updatingId === feature.id}
                style={{padding: '0.25rem 0.5rem', borderRadius: '6px', border: '1px solid #d1d5db'}}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                onClick={() => deleteFeature(feature.id)}
                disabled={deletingId === feature.id}
                style={{
                  padding: '0.25rem 0.75rem',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                {deletingId === feature.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;

