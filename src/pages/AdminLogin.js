import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Admin credentials (you can change these)
    const ADMIN_EMAIL = 'admin@carrental.com';
    const ADMIN_PASSWORD = 'admin123';

    if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminEmail', ADMIN_EMAIL);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.bgOverlay} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={styles.card}
      >
        <div style={styles.header}>
          <Lock size={40} color="#e94560" />
          <h1 style={styles.title}>Admin Portal</h1>
          <p style={styles.subtitle}>Manage your car rental business</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Admin Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="admin@carrental.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button style={styles.button} type="submit">
            Login as Admin
          </button>
        </form>

        <div style={styles.note}>
          <p style={styles.noteText}>Demo Credentials:</p>
          <p style={styles.noteText}>Email: admin@carrental.com</p>
          <p style={styles.noteText}>Password: admin123</p>
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
  },
  bgOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    position: 'relative',
    zIndex: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#1a1a2e',
    margin: '12px 0 4px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
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
    transition: 'border-color 0.3s',
  },
  error: {
    backgroundColor: '#fce4ec',
    color: '#c62828',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    textAlign: 'center',
  },
  button: {
    padding: '14px 24px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  note: {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    textAlign: 'center',
  },
  noteText: {
    fontSize: '12px',
    color: '#666',
    margin: '4px 0',
  },
};

export default AdminLogin;
