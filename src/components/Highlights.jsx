import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const cars = [
  { id: 1, name: 'Toyota Camry', type: 'Sedan', price: 50, seats: 5, fuel: 'Petrol', emoji: '🚗', tag: 'Popular' },
  { id: 2, name: 'Honda CR-V', type: 'SUV', price: 70, seats: 5, fuel: 'Diesel', emoji: '🚙', tag: 'Family' },
  { id: 3, name: 'Ford Mustang', type: 'Sports', price: 100, seats: 4, fuel: 'Petrol', emoji: '🏎️', tag: 'Sport' },
  { id: 4, name: 'BMW 3 Series', type: 'Luxury', price: 90, seats: 5, fuel: 'Petrol', emoji: '🚘', tag: 'Luxury' },
  { id: 5, name: 'Jeep Wrangler', type: 'SUV', price: 85, seats: 5, fuel: 'Diesel', emoji: '🛻', tag: 'Adventure' },
  { id: 6, name: 'Hyundai Tucson', type: 'SUV', price: 65, seats: 5, fuel: 'Diesel', emoji: '🚐', tag: 'Budget' },
];

const tagColors = {
  Popular: '#e94560',
  Family: '#2ecc71',
  Sport: '#e67e22',
  Luxury: '#9b59b6',
  Adventure: '#1abc9c',
  Budget: '#3498db',
};

function Highlights() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={styles.header}
      >
        <span style={styles.badge}>Our Fleet</span>
        <h2 style={styles.title}>Featured Cars</h2>
        <p style={styles.subtitle}>
          Hand-picked cars for every need and budget
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div style={styles.grid}>
        {cars.map((car, i) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            style={styles.card}
          >
            {/* Tag */}
            <div style={{ ...styles.tag, backgroundColor: tagColors[car.tag] }}>
              {car.tag}
            </div>

            {/* Car Image */}
            <div style={styles.imageBox}>
              <div style={styles.emoji}>{car.emoji}</div>
            </div>

            {/* Car Info */}
            <div style={styles.info}>
              <h3 style={styles.carName}>{car.name}</h3>
              <p style={styles.carType}>{car.type}</p>

              {/* Specs */}
              <div style={styles.specs}>
                <span style={styles.spec}>💺 {car.seats} seats</span>
                <span style={styles.spec}>⛽ {car.fuel}</span>
              </div>

              {/* Price + Button */}
              <div style={styles.bottom}>
                <div>
                  <span style={styles.price}>${car.price}</span>
                  <span style={styles.perDay}>/day</span>
                </div>
                <button
                  style={styles.btn}
                  onClick={() => navigate(`/cars/${car.id}`)}
                  onMouseEnter={e => {
                    e.target.style.backgroundColor = '#c73652';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.backgroundColor = '#e94560';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        style={styles.viewAllWrapper}
      >
        <button
          style={styles.viewAllBtn}
          onClick={() => navigate('/cars')}
          onMouseEnter={e => {
            e.target.style.backgroundColor = '#e94560';
            e.target.style.color = 'white';
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#e94560';
          }}
        >
          View All Cars →
        </button>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    padding: '100px 48px',
    backgroundColor: '#ffffff',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(233,69,96,0.1)',
    color: '#e94560',
    padding: '6px 18px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '1px',
    marginBottom: '12px',
  },
  title: {
    fontSize: '40px',
    fontWeight: '800',
    color: '#1a1a2e',
    margin: '8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '28px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    border: '1px solid #f0f0f0',
  },
  tag: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    zIndex: 1,
  },
  imageBox: {
    backgroundColor: '#f8f9fa',
    padding: '40px 20px',
    textAlign: 'center',
    borderBottom: '1px solid #f0f0f0',
  },
  emoji: {
    fontSize: '80px',
  },
  info: {
    padding: '20px',
  },
  carName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: '0 0 4px',
  },
  carType: {
    fontSize: '13px',
    color: '#888',
    margin: '0 0 12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  specs: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
  },
  spec: {
    fontSize: '13px',
    color: '#555',
    backgroundColor: '#f5f5f5',
    padding: '4px 10px',
    borderRadius: '8px',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #f0f0f0',
    paddingTop: '16px',
  },
  price: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#e94560',
  },
  perDay: {
    fontSize: '13px',
    color: '#888',
  },
  btn: {
    padding: '8px 20px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  viewAllWrapper: {
    textAlign: 'center',
    marginTop: '48px',
  },
  viewAllBtn: {
    padding: '14px 40px',
    backgroundColor: 'transparent',
    color: '#e94560',
    border: '2px solid #e94560',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default Highlights;