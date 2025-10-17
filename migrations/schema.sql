CREATE DATABASE IF NOT EXISTS community_health;
USE community_health;

-- users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(120),
  dob DATE,
  gender ENUM('male','female','other') DEFAULT 'other',
  address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- roles (optional: admin, worker, citizen)
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE
);
INSERT INTO roles (name) VALUES ('admin'),('worker'),('citizen');

CREATE TABLE user_roles (
  user_id INT,
  role_id INT,
  PRIMARY KEY(user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- vaccinations
CREATE TABLE vaccinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  vaccine_name VARCHAR(150) NOT NULL,
  dose_number INT DEFAULT 1,
  vaccination_date DATE,
  next_due_date DATE,
  administered_by VARCHAR(150),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (next_due_date)
);

-- hygiene logs (daily/weekly)
CREATE TABLE hygiene (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  habit VARCHAR(150) NOT NULL, -- e.g., 'handwash','toilet_use'
  status ENUM('good','poor','unknown') DEFAULT 'unknown',
  logged_at DATE DEFAULT CURDATE(),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY (user_id, habit, logged_at)
);

-- nutrition logs
CREATE TABLE nutrition (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  meal_type ENUM('breakfast','lunch','dinner','snack'),
  description VARCHAR(255),
  calories INT,
  logged_at DATE DEFAULT CURDATE(),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- alerts / scheduled reminders
CREATE TABLE alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  scheduled_for DATETIME,    -- when to send
  sent_at DATETIME NULL,
  status ENUM('pending','sent','failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX (scheduled_for)
);

