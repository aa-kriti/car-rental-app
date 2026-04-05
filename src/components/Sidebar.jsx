import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Car, MapPin, Wallet, Ticket, Lock, LogOut, CreditCard } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'profile', icon: User, label: 'My Profile' },
  { id: 'bookings', icon: Car, label: 'Manage Bookings' },
  { id: 'address', icon: MapPin, label: 'Saved Address' },
  { id: 'wallet', icon: Wallet, label: 'My Wallet' },
  { id: 'payment', icon: CreditCard, label: 'Add Money' },
  { id: 'coupons', icon: Ticket, label: 'My Coupons & Promo' },
  { id: 'password', icon: Lock, label: 'Change Password' },
];

function Sidebar({ active, setActive }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    
    // Dispatch logout event
    window.dispatchEvent(new Event('userLogout'));
    
    // Redirect to home
    navigate('/');
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.sidebar}
    >
      {/* User Avatar */}
      <div style={styles.userSection}>
        <div style={styles.avatar}>JD</div>
        <div>
          <p style={styles.userName}>John Doe</p>
          <p style={styles.userEmail}>john@example.com</p>
        </div>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Menu Items */}
      <div style={styles.menu}>
        {menuItems.map(item => (
          <div
            key={item.id}
            style={{
              ...styles.menuItem,
              backgroundColor: active === item.id
                ? 'rgba(233,69,96,0.12)'
                : 'transparent',
              color: active === item.id ? '#e94560' : '#555',
              borderLeft: active === item.id
                ? '4px solid #e94560'
                : '4px solid transparent',
            }}
            onClick={() => setActive(item.id)}
          >
            <span style={styles.menuIcon}>
              <item.icon size={18} />
            </span>
            <span style={styles.menuLabel}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Logout */}
      <div 
        style={styles.logout}
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </div>
    </motion.div>
  );
}

const styles = {
  sidebar: {
    width: '260px',
    minHeight: '100vh',
    backgroundColor: 'white',
    boxShadow: '2px 0 20px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
    flexShrink: 0,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0 20px 20px',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#e94560',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '800',
    flexShrink: 0,
  },
  userName: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: 0,
  },
  userEmail: {
    fontSize: '12px',
    color: '#888',
    margin: 0,
  },
  divider: {
    height: '1px',
    backgroundColor: '#f0f0f0',
    margin: '8px 0',
  },
  menu: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 0',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '13px 20px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    fontWeight: '500',
  },
  menuIcon: {
    fontSize: '18px',
    width: '24px',
    textAlign: 'center',
  },
  menuLabel: {
    fontSize: '14px',
  },
  logout: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '13px 20px',
    margin: '0 12px',
    cursor: 'pointer',
    color: 'white',
    fontWeight: '600',
    fontSize: '14px',
    backgroundColor: '#e94560',
    borderRadius: '10px',
    border: 'none',
    transition: 'all 0.3s ease',
  },
};

export default Sidebar;