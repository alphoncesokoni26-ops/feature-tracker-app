-- Create features table if not exists
CREATE DATABASE IF NOT EXISTS feature_tracker;
USE feature_tracker;

CREATE TABLE IF NOT EXISTS features (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('Low', 'Medium', 'High') DEFAULT 'Low',
  status ENUM('Open', 'In Progress', 'Completed') DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO features (title, description, priority, status) VALUES
('User Authentication', 'Implement secure login/register with JWT tokens', 'High', 'Open'),
('Dashboard Analytics', 'Create feature tracking dashboard with charts', 'Medium', 'In Progress'),
('API Documentation', 'Comprehensive API docs with Swagger', 'Low', 'Completed')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;
