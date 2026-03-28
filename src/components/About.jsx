import React from 'react';
import { motion } from 'framer-motion';

function About() {
  return (
    <div style={styles.container}>
      
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={styles.header}
      >
        <span style={styles.badge}>Who We Are</span>
        <h2 style={styles.title}>About CarRental</h2>
        <p style={styles.subtitle}>Your trusted partner for every journey</p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        style={styles.card}
      >

        {/* Left — Image */}
        <div style={styles.imageSection}>
          <img 
            src="/image.png"
            alt="Car Rental"
            style={styles.image}
          />

          {/* Overlay */}
          <div style={styles.imageOverlay}>
            <div style={styles.overlayCard}>
              <strong style={styles.overlayNum}>10+</strong>
              <span style={styles.overlayText}>Years Experience</span>
            </div>
          </div>
        </div>

        {/* Right — Content */}
        <div style={styles.contentSection}>
          <h3 style={styles.cardTitle}>
            We Make Car Rental <span style={styles.highlight}>Simple & Affordable</span>
          </h3>

          <p style={styles.description}>
            CarRental was founded with a mission to make premium car rental 
            accessible to everyone. With over 10 years of experience, we have served 
            thousands of happy customers across multiple locations.
          </p>

          <p style={styles.description}>
            Whether you need a budget sedan or a luxury SUV, we provide well-maintained, 
            fully insured vehicles ready for your journey.
          </p>

          {/* Features */}
          <div style={styles.points}>
            {[
              '✅ 500+ Premium Cars Available',
              '✅ No Hidden Charges',
              '✅ 24/7 Customer Support',
              '✅ Instant Booking Confirmation',
            ].map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={styles.point}
              >
                {point}
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div style={styles.statsRow}>
            {[
              { number: '500+', label: 'Cars' },
              { number: '10K+', label: 'Customers' },
              { number: '50+', label: 'Locations' },
            ].map((stat, i) => (
              <div key={i} style={styles.statItem}>
                <strong style={styles.statNumber}>{stat.number}</strong>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    padding: '100px 48px',
    backgroundColor: '#f8f9fa',
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
    marginBottom: '12px',
  },
  title: {
    fontSize: '40px',
    fontWeight: '800',
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
  },
  card: {
    display: 'flex',
    gap: '48px',
    backgroundColor: 'white',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  imageSection: {
    flex: 1,
    minHeight: '500px',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: '24px',
    left: '24px',
  },
  overlayCard: {
    backgroundColor: 'white',
    padding: '16px 24px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  overlayNum: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#e94560',
  },
  overlayText: {
    fontSize: '12px',
    color: '#666',
  },
  contentSection: {
    flex: 1,
    padding: '48px 40px 48px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: '20px',
  },
  highlight: {
    color: '#e94560',
  },
  description: {
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.8',
    marginBottom: '16px',
  },
  points: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '32px',
  },
  point: {
    fontSize: '15px',
    color: '#333',
  },
  statsRow: {
    display: 'flex',
    gap: '32px',
    borderTop: '1px solid #eee',
    paddingTop: '24px',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#e94560',
  },
  statLabel: {
    fontSize: '12px',
    color: '#888',
  },
};

export default About;