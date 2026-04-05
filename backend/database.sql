-- Create Database
CREATE DATABASE IF NOT EXISTS car_rental;
USE car_rental;

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Cars table
CREATE TABLE IF NOT EXISTS cars (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  brand VARCHAR(50),
  model VARCHAR(50),
  price_per_day DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255),
  description TEXT,
  status ENUM('available', 'booked') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  car_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price DECIMAL(10, 2),
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (car_id) REFERENCES cars(id)
);

-- Insert sample cars
INSERT INTO cars (name, brand, model, price_per_day, image, description) VALUES
('Honda City', 'Honda', 'City 2024', 2500, '/images/car1.jpg', 'Compact sedan, perfect for city driving'),
('Toyota Fortuner', 'Toyota', 'Fortuner 2023', 5000, '/images/car2.jpg', 'SUV, great for families'),
('Maruti Swift', 'Maruti', 'Swift 2024', 2000, '/images/car3.jpg', 'Hatchback, fuel efficient'),
('Hyundai Creta', 'Hyundai', 'Creta 2023', 3500, '/images/car4.jpg', 'Compact SUV, modern features');
