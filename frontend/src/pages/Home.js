import React, { useEffect, useState } from "react";
import API from "../services/api";
import FeatureForm from "../components/FeatureForm";
import FeatureCard from "../components/FeatureCard";

const Home = () => {
  const [features, setFeatures] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get(`/features${status ? `?status=${status}` : ''}`);
      setFeatures(res.data);
    } catch (err) {
      setError('Failed to fetch features. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status, refreshing]);

  const refresh = () => setRefreshing(prev => prev + 1);

  const getStatusClass = (status) => {
    const classes = {
      'Open': 'status-open',
      'In Progress': 'status-progress',
      'Completed': 'status-completed'
    };
    return classes[status] || '';
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading features...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <main className="main-card">
        {/* Gradient Header */}
        <div className="form-header">
          <h1>
            ✨ Add New Feature
          </h1>
        </div>

        {/* Form Content */}
        <div className="card-content">
          <FeatureForm refresh={refresh} />

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {/* Filter Section */}
          {features.length > 0 && (
            <div className="filter-group">
              <label>Filter by Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Features</option>
                <option value="Open">🔓 Open</option>
                <option value="In Progress">⚡ In Progress</option>
                <option value="Completed">✅ Completed</option>
              </select>
            </div>
          )}

          {/* Features Grid */}
          {features.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No features yet</h3>
              <p>Create your first feature using the form above to get started!</p>
            </div>
          ) : (
            <div className="features-grid">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  refresh={refresh}
                  statusClass={getStatusClass(feature.status)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="footer">
          © 2026 Feature Tracker | Add your features, track your progress
        </footer>
      </main>
    </div>
  );
};

export default Home;
