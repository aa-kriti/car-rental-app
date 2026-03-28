import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cars', path: '/cars' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
  ];

  return (
    <nav style={{
      ...styles.navbar,
      backgroundColor: scrolled ? 'rgba(15, 15, 30, 0.95)' : 'transparent',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
    }}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        🚗 <span style={styles.logoText}>CarRental</span>
      </Link>

      {/* Desktop Links */}
      <div style={styles.links}>
        {navLinks.map(link => (
          <Link
            key={link.name}
            to={link.path}
            style={{
              ...styles.link,
              color: location.pathname === link.path ? '#e94560' : 'white',
              borderBottom: location.pathname === link.path ? '2px solid #e94560' : '2px solid transparent',
            }}
          >
            {link.name}
          </Link>
        ))}
        <Link to="/booking/1" style={styles.bookBtn}>Book Now</Link>
      </div>

      {/* Mobile Menu Button */}
      <div style={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
        <div style={styles.bar} />
        <div style={styles.bar} />
        <div style={styles.bar} />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 48px',
    transition: 'all 0.4s ease',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    fontSize: '22px',
  },
  logoText: {
    color: '#e94560',
    fontWeight: 'bold',
    fontSize: '22px',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  link: {
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    paddingBottom: '4px',
    transition: 'all 0.3s ease',
  },
  bookBtn: {
    backgroundColor: '#e94560',
    color: 'white',
    padding: '10px 24px',
    borderRadius: '25px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  menuBtn: {
    display: 'none',
    flexDirection: 'column',
    gap: '5px',
    cursor: 'pointer',
  },
  bar: {
    width: '25px',
    height: '3px',
    backgroundColor: 'white',
    borderRadius: '3px',
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15,15,30,0.98)',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 48px',
    gap: '16px',
  },
  mobileLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
  },
};

export default Navbar;