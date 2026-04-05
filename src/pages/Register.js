import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, AlertCircle } from 'lucide-react';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    repassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.gender || !form.password || !form.repassword) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    if (form.password !== form.repassword) {
      setError('Passwords do not match!');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        })
      });

      const data = await response.json();
      
      if (data.id) {
        // Save user data to localStorage
        localStorage.setItem('userId', 'USER_' + data.id);
        localStorage.setItem('userName', form.name);
        localStorage.setItem('userEmail', form.email);
        localStorage.setItem('userPhone', form.phone);
        localStorage.setItem('userGender', form.gender);
        localStorage.setItem('walletBalance', '500'); // Default wallet balance
        
        // Dispatch custom event to notify Navbar of login
        window.dispatchEvent(new Event('userLogin'));
        
        console.log('Registration successful:', data);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Registration failed. Try a different email.');
      }
    } catch (err) {
      setError('Registration error. Please check if the server is running.');
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      {/* Background Image */}
      <div style={styles.bgImage} />
      <div style={styles.bgOverlay} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.card}
      >
        {/* Logo */}
        <div style={styles.logo}>
          <Car size={24} style={{ marginRight: '8px', display: 'inline' }} />
          CarRental
        </div>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join us and start booking today</p>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>
            <AlertCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />
            {error}
          </div>
        )}

        {/* Form */}
        <div style={styles.form}>
          {/* Full Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

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

          {/* Phone */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              style={styles.input}
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Gender</label>
            <select
              style={styles.input}
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not">Prefer not to say</option>
            </select>
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Re-enter Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              style={{
                ...styles.input,
                borderColor: form.repassword && form.password !== form.repassword ? '#e94560' : '#e0e0e0',
              }}
              type="password"
              name="repassword"
              placeholder="Re-enter your password"
              value={form.repassword}
              onChange={handleChange}
            />
            {form.repassword && form.password !== form.repassword && (
              <span style={styles.fieldError}>Passwords do not match</span>
            )}
          </div>

          {/* Submit */}
          <button style={styles.button} onClick={handleSubmit}>
            Create Account
          </button>

          {/* Login Link */}
          <p style={styles.text}>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>Login here</Link>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '60px',
    position: 'relative',
    padding: '40px 20px',
  },
  bgImage: {
    position: 'fixed',
    inset: 0,
    backgroundImage: 'url(about.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0,
  },
  bgOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(15,15,30,0.85) 0%, rgba(233,69,96,0.4) 100%)',
    zIndex: 1,
  },
  card: {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.97)',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '480px',
  },
  logo: {
    fontSize: '22px',
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
    transition: 'border 0.3s',
    backgroundColor: '#fafafa',
  },
  fieldError: {
    fontSize: '12px',
    color: '#e94560',
    marginTop: '2px',
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
    marginTop: '8px',
    transition: 'background 0.3s',
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

export default Register;