import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const cars = [
  { id: 1, name: 'Toyota Camry', type: 'Sedan', price: 50, seats: 5, fuel: 'Petrol', transmission: 'Automatic' },
  { id: 2, name: 'Honda CR-V', type: 'SUV', price: 70, seats: 5, fuel: 'Diesel', transmission: 'Automatic' },
  { id: 3, name: 'Ford Mustang', type: 'Sports', price: 100, seats: 4, fuel: 'Petrol', transmission: 'Manual' },
  { id: 4, name: 'Hyundai Tucson', type: 'SUV', price: 65, seats: 5, fuel: 'Diesel', transmission: 'Automatic' },
  { id: 5, name: 'BMW 3 Series', type: 'Sedan', price: 90, seats: 5, fuel: 'Petrol', transmission: 'Automatic' },
  { id: 6, name: 'Jeep Wrangler', type: 'SUV', price: 85, seats: 5, fuel: 'Diesel', transmission: 'Manual' },
];

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find(c => c.id === parseInt(id));

  if (!car) return <h2 style={{ padding: '32px' }}>Car not found!</h2>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.image}>🚗</div>
        <h2 style={styles.name}>{car.name}</h2>
        <div style={styles.specs}>
          <div style={styles.spec}><span style={styles.label}>Type</span><span>{car.type}</span></div>
          <div style={styles.spec}><span style={styles.label}>Seats</span><span>{car.seats}</span></div>
          <div style={styles.spec}><span style={styles.label}>Fuel</span><span>{car.fuel}</span></div>
          <div style={styles.spec}><span style={styles.label}>Transmission</span><span>{car.transmission}</span></div>
          <div style={styles.spec}><span style={styles.label}>Price</span><span style={styles.price}>${car.price} / day</span></div>
        </div>
        <div style={styles.buttons}>
          <button style={styles.backButton} onClick={() => navigate('/cars')}>
            Back
          </button>
          <button style={styles.bookButton} onClick={() => navigate(`/booking/${car.id}`)}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '32px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: '500px',
    textAlign: 'center',
    height: 'fit-content',
  },
  image: { fontSize: '80px', marginBottom: '16px' },
  name: { fontSize: '28px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '24px' },
  specs: { textAlign: 'left', marginBottom: '24px' },
  spec: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' },
  label: { fontWeight: 'bold', color: '#666' },
  price: { color: '#e94560', fontWeight: 'bold', fontSize: '18px' },
  buttons: { display: 'flex', gap: '16px', justifyContent: 'center' },
  backButton: { padding: '12px 32px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' },
  bookButton: { padding: '12px 32px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' },
};

export default CarDetail;