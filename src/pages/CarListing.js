import React from 'react';
import { useNavigate } from 'react-router-dom';

const cars = [
  { id: 1, name: 'Toyota Camry', type: 'Sedan', price: 50, seats: 5 },
  { id: 2, name: 'Honda CR-V', type: 'SUV', price: 70, seats: 5 },
  { id: 3, name: 'Ford Mustang', type: 'Sports', price: 100, seats: 4 },
  { id: 4, name: 'Hyundai Tucson', type: 'SUV', price: 65, seats: 5 },
  { id: 5, name: 'BMW 3 Series', type: 'Sedan', price: 90, seats: 5 },
  { id: 6, name: 'Jeep Wrangler', type: 'SUV', price: 85, seats: 5 },
];

function CarListing() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Cars</h2>
      <div style={styles.grid}>
        {cars.map(car => (
          <div key={car.id} style={styles.card}>
            <div style={styles.image}>🚗</div>
            <h3 style={styles.carName}>{car.name}</h3>
            <p style={styles.info}>Type: {car.type}</p>
            <p style={styles.info}>Seats: {car.seats}</p>
            <p style={styles.price}>${car.price} / day</p>
            <button
              style={styles.button}
              onClick={() => navigate(`/cars/${car.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '32px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '32px',
    marginBottom: '24px',
    color: '#1a1a2e',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  image: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  carName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: '8px',
  },
  info: {
    color: '#666',
    marginBottom: '4px',
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#e94560',
    margin: '12px 0',
  },
  button: {
    padding: '10px 24px',
    backgroundColor: '#1a1a2e',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default CarListing;