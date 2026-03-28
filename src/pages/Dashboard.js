import React from 'react';
import { useNavigate } from 'react-router-dom';

const bookings = [
  { id: 1, car: 'Toyota Camry', pickup: '2026-04-01', return: '2026-04-03', total: 150, status: 'Confirmed' },
  { id: 2, car: 'Honda CR-V', pickup: '2026-04-10', return: '2026-04-15', total: 350, status: 'Pending' },
  { id: 3, car: 'Ford Mustang', pickup: '2026-03-20', return: '2026-03-22', total: 200, status: 'Completed' },
];

const statusColors = {
  Confirmed: '#2ecc71',
  Pending: '#f39c12',
  Completed: '#3498db',
};

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Dashboard</h2>
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>{bookings.length}</h3>
          <p style={styles.statLabel}>Total Bookings</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>
            {bookings.filter(b => b.status === 'Confirmed').length}
          </h3>
          <p style={styles.statLabel}>Confirmed</p>
        </div>
        <div style={styles.statCard}>
          <h3 style={styles.statNumber}>
            {bookings.filter(b => b.status === 'Completed').length}
          </h3>
          <p style={styles.statLabel}>Completed</p>
        </div>
      </div>
      <h3 style={styles.subHeading}>My Bookings</h3>
      <div style={styles.bookingList}>
        {bookings.map(booking => (
          <div key={booking.id} style={styles.bookingCard}>
            <div style={styles.bookingInfo}>
              <h4 style={styles.carName}>{booking.car}</h4>
              <p style={styles.dates}>{booking.pickup} → {booking.return}</p>
              <p style={styles.total}>Total: <strong>${booking.total}</strong></p>
            </div>
            <span style={{ ...styles.status, backgroundColor: statusColors[booking.status] }}>
              {booking.status}
            </span>
          </div>
        ))}
      </div>
      <button style={styles.button} onClick={() => navigate('/cars')}>
        Book Another Car
      </button>
    </div>
  );
}

const styles = {
  container: { padding: '32px', backgroundColor: '#f5f5f5', minHeight: '100vh' },
  heading: { fontSize: '32px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '24px' },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' },
  statCard: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  statNumber: { fontSize: '36px', fontWeight: 'bold', color: '#e94560', margin: 0 },
  statLabel: { color: '#666', marginTop: '8px' },
  subHeading: { fontSize: '24px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '16px' },
  bookingList: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' },
  bookingCard: { backgroundColor: 'white', padding: '20px 24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  bookingInfo: {},
  carName: { fontSize: '18px', fontWeight: 'bold', color: '#1a1a2e', margin: '0 0 4px' },
  dates: { color: '#666', margin: '0 0 4px' },
  total: { color: '#333', margin: 0 },
  status: { padding: '6px 16px', borderRadius: '20px', color: 'white', fontWeight: 'bold', fontSize: '14px' },
  button: { padding: '14px 32px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' },
};

export default Dashboard;