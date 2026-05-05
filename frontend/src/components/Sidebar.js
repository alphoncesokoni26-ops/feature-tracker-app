import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>🚀 Features</h2>
      </div>
      <nav>
        <ul>
          <li className="active">
            📋 All Features
          </li>
          <li>
            🔓 Open
          </li>
          <li>
            ⚡ In Progress
          </li>
          <li>
            ✅ Completed
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

