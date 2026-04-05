import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, X } from 'lucide-react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));
  const location = useLocation();

  // Pages that have dark background — navbar stays transparent
  const darkPages = ['/'];

  // Check if current page needs dark navbar always
  const isLightPage = !darkPages.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check login status on component mount and when storage changes
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('userId'));
    
    // Listen for login/logout events
    const handleLoginEvent = () => {
      setIsLoggedIn(!!localStorage.getItem('userId'));
    };
    
    window.addEventListener('userLogin', handleLoginEvent);
    window.addEventListener('userLogout', handleLoginEvent);
    
    return () => {
      window.removeEventListener('userLogin', handleLoginEvent);
      window.removeEventListener('userLogout', handleLoginEvent);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cars', path: '/cars' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
  ];

  const isDark = isLightPage || scrolled;

  return (
    <nav style={{
      ...styles.navbar,
      backgroundColor: isDark
        ? 'rgba(15, 15, 30, 0.97)'
        : 'transparent',
      boxShadow: isDark
        ? '0 4px 30px rgba(0,0,0,0.3)'
        : 'none',
      backdropFilter: isDark ? 'blur(10px)' : 'none',
    }}>

      {/* Logo */}
      <Link to="/" style={styles.logo}>
        <Car size={24} style={{ display: 'inline', marginRight: '6px' }} />
        <span style={styles.logoText}>CarRental</span>
      </Link>

      {/* Desktop Links */}
      <div style={styles.links}>
        {navLinks.map(link => (
          <Link
            key={link.name}
            to={link.path}
            style={{
              ...styles.link,
              color: location.pathname === link.path
                ? '#e94560'
                : 'white',
              borderBottom: location.pathname === link.path
                ? '2px solid #e94560'
                : '2px solid transparent',
            }}
          >
            {link.name}
          </Link>
        ))}
        <Link to="/booking/1" style={styles.bookBtn}>
          Book Now
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div
        style={styles.menuBtn}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div style={{
          ...styles.bar,
          transform: menuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none',
          transition: 'all 0.3s',
        }} />
        <div style={{
          ...styles.bar,
          opacity: menuOpen ? 0 : 1,
          transition: 'all 0.3s',
        }} />
        <div style={{
          ...styles.bar,
          transform: menuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none',
          transition: 'all 0.3s',
        }} />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                ...styles.mobileLink,
                color: location.pathname === link.path
                  ? '#e94560'
                  : 'white',
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/booking/1"
            style={styles.mobileBookBtn}
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </Link>
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
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  mobileLink: {
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '8px 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  mobileBookBtn: {
    backgroundColor: '#e94560',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '25px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '8px',
  },
};

export default Navbar;