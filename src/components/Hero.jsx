import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Car } from 'lucide-react';

function Hero() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Background Overlay */}
      <div style={styles.overlay} />

      {/* Content */}
      <div style={styles.content}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.badge}
        >
          <Car size={16} style={{ display: 'inline', marginRight: '6px' }} />
          Premium Car Rental Service
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={styles.title}
        >
          Find Your <span style={styles.highlight}>Perfect Car</span>
          <br /> For Every Journey
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={styles.subtitle}
        >
          Discover the best car rental deals at unbeatable prices.
          <br />
          Luxury, comfort and reliability — all in one place.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={styles.buttons}
        >
          <button
            style={styles.primaryBtn}
            onClick={() => navigate('/cars')}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >
            Browse Cars
          </button>
          <button
            style={styles.secondaryBtn}
            onClick={() => navigate('/register')}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          >
            Get Started
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={styles.stats}
        >
          {[
            { number: '500+', label: 'Cars' },
            { number: '10K+', label: 'Customers' },
            { number: '50+', label: 'Locations' },
            { number: '4.9★', label: 'Rating' },
          ].map((stat, i) => (
            <div key={i} style={styles.statItem}>
              <strong style={styles.statNumber}>{stat.number}</strong>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={styles.scrollDown}
      >
        ↓
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    padding: '100px 20px 60px',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at center, rgba(233,69,96,0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(233,69,96,0.15)',
    border: '1px solid rgba(233,69,96,0.4)',
    color: '#e94560',
    padding: '8px 20px',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '24px',
    letterSpacing: '1px',
  },
  title: {
    fontSize: '62px',
    fontWeight: '800',
    color: 'white',
    lineHeight: '1.2',
    marginBottom: '20px',
  },
  highlight: {
    color: '#e94560',
    position: 'relative',
  },
  subtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '1.8',
    marginBottom: '40px',
  },
  buttons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '60px',
  },
  primaryBtn: {
    padding: '16px 40px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  secondaryBtn: {
    padding: '16px 40px',
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid rgba(255,255,255,0.5)',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  stats: {
    display: 'flex',
    gap: '48px',
    justifyContent: 'center',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '32px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#e94560',
  },
  statLabel: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '1px',
  },
  scrollDown: {
    position: 'absolute',
    bottom: '30px',
    fontSize: '24px',
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
  },
};

export default Hero;