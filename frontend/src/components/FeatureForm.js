import React, { useState } from 'react';
import API from '../services/api';

const FeatureForm = ({ refresh }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Low',
    status: 'Open'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert('Title is required');
      return;
    }

    setSubmitting(true);
    try {
      await API.post('/features', form);
      setForm({ title: '', description: '', priority: 'Low', status: 'Open' });
      refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to create feature');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          placeholder="Enter a descriptive title for your feature"
          value={form.title}
          onChange={handleChange('title')}
          required
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          rows="4"
          placeholder="Provide details about what this feature should do..."
          value={form.description}
          onChange={handleChange('description')}
          disabled={submitting}
        />
      </div>

      <div className="form-group" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
        <div>
          <label>Priority</label>
          <select value={form.priority} onChange={handleChange('priority')} disabled={submitting}>
            <option value="Low">📊 Low</option>
            <option value="Medium">⚡ Medium</option>
            <option value="High">🔥 High</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select value={form.status} onChange={handleChange('status')} disabled={submitting}>
            <option value="Open">🔓 Open</option>
            <option value="In Progress">⚡ In Progress</option>
            <option value="Completed">✅ Completed</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={submitting}
      >
        {submitting ? '🎯 Creating Feature...' : '+ Create Feature'}
      </button>
    </form>
  );
};

export default FeatureForm;
