import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const cars = [
  { id: 1, name: 'Toyota Camry', price: 50 },
  { id: 2, name: 'Honda CR-V', price: 70 },
  { id: 3, name: 'Ford Mustang', price: 100 },
  { id: 4, name: 'Hyundai Tucson', price: 65 },
  { id: 5, name: 'BMW 3 Series', price: 90 },
  { id: 6, name: 'Jeep Wrangler', price: 85 },
];

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find(c => c.id === parseInt(id));
  const [form, setForm] = useState({ pickup: '', return: '', name: '', phone: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateDays = () => {
    if (!form.pickup || !form.return) return 0;
    const diff = new Date(form.return) - new Date(form.pickup);
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const totalPrice = calculateDays() * (car?.price || 0);

  const handleSubmit = () => {
    if (!form.pickup || !form.return || !form.name || !form.phone) {
      alert('Please fill all fields!');
      return;
    }
    alert(`Booking confirmed! Total: $${totalPrice}`);
    navigate('/dashboard');
  };

  if (!car) return <h2 style={{ padding: '32px' }}>Car not found!</h2>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Book {car.name}</h2>
        <p style={styles.price}>${car.price} / day</p>
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <label style={styles.label}>Pickup Date</label>
        <input
          style={styles.input}
          type="date"
          name="pickup"
          value={form.pickup}
          onChange={handleChange}
        />
        <label style={styles.label}>Return Date</label>
        <input
          style={styles.input}
          type="date"
          name="return"
          value={form.return}
          onChange={handleChange}
        />
        {calculateDays() > 0 && (
          <div style={styles.summary}>
            <p>{calculateDays()} days x ${car.price} = <strong>${totalPrice}</strong></p>
          </div>
        )}
        <div style={styles.buttons}>
          <button style={styles.backButton} onClick={() => navigate(`/cars/${id}`)}>
            Back
          </button>
          <button style={styles.bookButton} onClick={handleSubmit}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: '480px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  title: { fontSize: '24px', fontWeight: 'bold', color: '#1a1a2e', textAlign: 'center' },
  price: { color: '#e94560', fontWeight: 'bold', fontSize: '18px', textAlign: 'center' },
  label: { fontSize: '14px', color: '#666', fontWeight: 'bold' },
  input: { padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px', outline: 'none' },
  summary: { backgroundColor: '#f0f0f0', padding: '12px 16px', borderRadius: '8px', textAlign: 'center' },
  buttons: { display: 'flex', gap: '16px', marginTop: '8px' },
  backButton: { flex: 1, padding: '12px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' },
  bookButton: { flex: 1, padding: '12px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' },
};

export default Booking;