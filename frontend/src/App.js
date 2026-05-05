import React, { useState, useEffect } from 'react';
import './App.css';
import FeatureForm from './components/FeatureForm';
import FeatureList from './components/FeatureList';
import API from './services/api';

function App() {
  const [features, setFeatures] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeatures = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await API.get(`/features${statusFilter ? `?status=${statusFilter}` : ''}`);
      setFeatures(data);
    } catch (err) {
      setError('Failed to fetch features. Is backend running on port 5000?');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, [statusFilter]);

  const refresh = () => fetchFeatures();

  if (loading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'system-ui'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #2a5298', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem'}}></div>
          <p>Loading features...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <main className="main-card">
        <div className="form-header">
          <h1>✨ Feature Tracker</h1>
          <p style={{margin: '0.5rem 0 0', opacity: 0.9}}>Add, track, and manage your product features</p>
        </div>
        
        <div className="card-content">
          <FeatureForm refresh={refresh} />
          
          {error && (
            <div className="error" style={{marginBottom: '1.5rem'}}>
              {error}
              <br />
              <small>Backend: http://localhost:5000 | Run: cd backend && npm start</small>
            </div>
          )}

          <div className="filter-group">
            <label>Filter by Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Features</option>
              <option value="Open">🔓 Open</option>
              <option value="In Progress">⚡ In Progress</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>

          <FeatureList 
            features={features} 
            statusFilter={statusFilter} 
            onRefresh={refresh} 
          />
        </div>
        
        <footer className="footer">
          © 2026 Feature Tracker | Full-stack React + Express + MySQL
        </footer>
      </main>
    </div>
  );
}

export default App;

