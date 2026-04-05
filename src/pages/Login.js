import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, CheckCircle, AlertCircle } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        })
      });

      const data = await response.json();

      if (data.user && data.user.id) {
        // Store user details in localStorage
        localStorage.setItem('userId', 'USER_' + data.user.id);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userPhone', data.user.phone || '');
        localStorage.setItem('walletBalance', '500'); // Default wallet balance
        
        // Dispatch custom event to notify Navbar of login
        window.dispatchEvent(new Event('userLogin'));
        
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please check if the server is running.');
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      {/* Background Image */}
      <div style={styles.bgImage} />
      <div style={styles.bgOverlay} />

      {/* Left Side — Branding */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        style={styles.leftSide}
      >
        <div style={styles.brandLogo}>
          <Car size={28} style={{ marginRight: '8px', display: 'inline' }} />
          CarRental
        </div>
        <h1 style={styles.brandTitle}>
          Welcome <br /> Back!
        </h1>
        <p style={styles.brandSubtitle}>
          Login to access your bookings, manage your trips and explore the best car deals.
        </p>
        <div style={styles.features}>
          {[
            '500+ Premium Cars',
            'Instant Booking',
            '24/7 Support',
            'Best Prices Guaranteed',
          ].map((f, i) => (
            <div key={i} style={styles.featureItem}>
              <CheckCircle size={16} style={{ display: 'inline', marginRight: '6px', color: '#2ecc71' }} />
              {f}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Side — Form */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        style={styles.card}
      >
        {/* Logo */}
        <div style={styles.logo}>
          <Car size={24} style={{ marginRight: '8px', display: 'inline' }} />
          CarRental
        </div>
        <h2 style={styles.title}>Login</h2>
        <p style={styles.subtitle}>Enter your credentials to continue</p>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>
            <AlertCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />
            {error}
          </div>
        )}

        {/* Form */}
        <div style={styles.form}>
          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Forgot Password */}
          <div style={styles.forgotRow}>
            <a href="#" style={styles.forgotLink}>Forgot Password?</a>
          </div>

          {/* Submit */}
          <button
            style={styles.button}
            onClick={handleSubmit}
            onMouseEnter={e => e.target.style.backgroundColor = '#c73652'}
            onMouseLeave={e => e.target.style.backgroundColor = '#e94560'}
          >
            Login
          </button>

          {/* Divider */}
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>or</span>
            <div style={styles.dividerLine} />
          </div>

          {/* Register Link */}
          <p style={styles.text}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.link}>Register here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '40px 20px',
    gap: '60px',
  },
  bgImage: {
    position: 'fixed',
    inset: 0,
    backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0,
  },
  bgOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(15,15,30,0.88) 0%, rgba(233,69,96,0.35) 100%)',
    zIndex: 1,
  },
  leftSide: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '400px',
    color: 'white',
  },
  brandLogo: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#e94560',
    marginBottom: '24px',
  },
  brandTitle: {
    fontSize: '52px',
    fontWeight: '800',
    color: 'white',
    lineHeight: '1.2',
    marginBottom: '20px',
  },
  brandSubtitle: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '1.8',
    marginBottom: '32px',
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  featureItem: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  card: {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.97)',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '420px',
  },
  logo: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#e94560',
    textAlign: 'center',
    marginBottom: '8px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#1a1a2e',
    textAlign: 'center',
    margin: '0 0 6px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
    textAlign: 'center',
    marginBottom: '24px',
  },
  errorBox: {
    backgroundColor: '#fff0f3',
    border: '1px solid #e94560',
    color: '#e94560',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#444',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1.5px solid #e0e0e0',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: '#fafafa',
    transition: 'border 0.3s',
  },
  forgotRow: {
    textAlign: 'right',
    marginTop: '-8px',
  },
  forgotLink: {
    fontSize: '13px',
    color: '#e94560',
    textDecoration: 'none',
    fontWeight: '600',
  },
  button: {
    padding: '14px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#eee',
  },
  dividerText: {
    fontSize: '13px',
    color: '#aaa',
  },
  text: {
    textAlign: 'center',
    color: '#666',
    fontSize: '14px',
  },
  link: {
    color: '#e94560',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Login;