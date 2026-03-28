import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        {/* Top Section */}
        <div style={styles.top}>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={styles.brand}
          >
            <h2 style={styles.logo}>🚗 CarRental</h2>
            <p style={styles.brandDesc}>
              Your trusted car rental partner for every journey.
              Premium cars, best prices, and 24/7 support.
            </p>
            <div style={styles.socials}>
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((s, i) => (
                <a key={i} href="#" style={styles.socialBtn}>{s[0]}</a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 style={styles.colTitle}>Quick Links</h3>
            <div style={styles.links}>
              {[
                { name: 'Home', path: '/' },
                { name: 'Browse Cars', path: '/cars' },
                { name: 'My Dashboard', path: '/dashboard' },
                { name: 'Login', path: '/login' },
                { name: 'Register', path: '/register' },
              ].map((link, i) => (
                <Link key={i} to={link.path} style={styles.link}>
                  → {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Car Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 style={styles.colTitle}>Car Types</h3>
            <div style={styles.links}>
              {['Sedan', 'SUV', 'Sports', 'Luxury', 'Electric', 'Budget'].map((type, i) => (
                <span key={i} style={styles.link}>→ {type}</span>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 style={styles.colTitle}>Contact Us</h3>
            <div style={styles.contactList}>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📍</span>
                <span style={styles.contactText}>123 Main Street, City, India</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📞</span>
                <span style={styles.contactText}>+91 98765 43210</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>✉️</span>
                <span style={styles.contactText}>support@carrental.com</span>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>🕐</span>
                <span style={styles.contactText}>24/7 Support Available</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Bottom */}
        <div style={styles.bottom}>
          <p style={styles.copyright}>
            © 2026 CarRental. All rights reserved.
          </p>
          <div style={styles.bottomLinks}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
              <a key={i} href="#" style={styles.bottomLink}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#0f0f1e',
    color: 'white',
    paddingTop: '80px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 48px',
  },
  top: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
    gap: '48px',
    paddingBottom: '60px',
  },
  brand: {},
  logo: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#e94560',
    margin: '0 0 16px',
  },
  brandDesc: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: '1.8',
    marginBottom: '24px',
  },
  socials: {
    display: 'flex',
    gap: '12px',
  },
  socialBtn: {
    width: '36px',
    height: '36px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: 'bold',
    lineHeight: '36px',
    textAlign: 'center',
    transition: 'background 0.3s',
  },
  colTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #e94560',
    display: 'inline-block',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  link: {
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'color 0.3s',
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  contactIcon: {
    fontSize: '16px',
    flexShrink: 0,
  },
  contactText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: '1.5',
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 0',
  },
  copyright: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)',
    margin: 0,
  },
  bottomLinks: {
    display: 'flex',
    gap: '24px',
  },
  bottomLink: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
};

export default Footer;