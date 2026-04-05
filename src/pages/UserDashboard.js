import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import { Car, CheckCircle, Wallet, Ticket, MapPin, Home, Building2, Calendar, Camera, Check, Lock, Plus, AlertCircle } from 'lucide-react';

// ─── API URL ─────────────────────────────────────────────────
const API_URL = 'http://localhost:5000/api';

// ─── Get User from localStorage ───────────────────────────────
const getUser = () => {
  const name = localStorage.getItem('userName') || 'User';
  return {
    id: localStorage.getItem('userId') || 'USER_12345',
    name,
    email: localStorage.getItem('userEmail') || 'user@example.com',
    phone: localStorage.getItem('userPhone') || '+91 9876543210',
    gender: localStorage.getItem('userGender') || 'Not specified',
    initials: name.split(' ').map(n => n[0]).join('').toUpperCase(),
    joined: 'January 2024',
  };
};

const bookings = [
  { id: 'BK001', car: 'Toyota Camry', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&q=80', pickup: '2026-04-01', returnDate: '2026-04-03', days: 2, total: 100, status: 'Confirmed', location: 'Airport Terminal' },
  { id: 'BK002', car: 'BMW 3 Series', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80', pickup: '2026-04-10', returnDate: '2026-04-15', days: 5, total: 450, status: 'Pending', location: 'Downtown Office' },
  { id: 'BK003', car: 'Ford Mustang', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80', pickup: '2026-03-20', returnDate: '2026-03-22', days: 2, total: 200, status: 'Completed', location: 'City Mall' },
  { id: 'BK004', car: 'Tesla Model 3', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&q=80', pickup: '2026-03-01', returnDate: '2026-03-05', days: 4, total: 440, status: 'Cancelled', location: 'Hotel Delivery' },
];

const addresses = [
  { id: 1, label: 'Home', address: '123 Main Street, Hyderabad, Telangana 500001', icon: Home },
  { id: 2, label: 'Office', address: '456 Tech Park, HITEC City, Hyderabad 500081', icon: Building2 },
  { id: 3, label: 'Other', address: '789 Beach Road, Vizag, Andhra Pradesh 530001', icon: MapPin },
];

const coupons = [
  { id: 1, code: 'FIRST20', discount: '20% OFF', desc: 'First booking discount', expiry: '2026-06-30', color: '#e94560' },
  { id: 2, code: 'SUMMER15', discount: '15% OFF', desc: 'Summer special offer', expiry: '2026-05-31', color: '#9b59b6' },
  { id: 3, code: 'LUXURY10', discount: '$10 OFF', desc: 'On luxury cars', expiry: '2026-07-15', color: '#e67e22' },
];

const walletTransactions = [
  { id: 1, type: 'credit', desc: 'Refund - BK003', amount: 200, date: '2026-03-22' },
  { id: 2, type: 'debit', desc: 'Booking BK002', amount: 450, date: '2026-04-10' },
  { id: 3, type: 'credit', desc: 'Cashback reward', amount: 50, date: '2026-03-15' },
  { id: 4, type: 'debit', desc: 'Booking BK001', amount: 100, date: '2026-04-01' },
];

const statusColors = {
  Confirmed: { bg: '#e8f5e9', color: '#2e7d32' },
  Pending: { bg: '#fff8e1', color: '#f57f17' },
  Completed: { bg: '#e3f2fd', color: '#1565c0' },
  Cancelled: { bg: '#fce4ec', color: '#c62828' },
};

const FadeIn = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    {children}
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════
// DASHBOARD HOME
// ═══════════════════════════════════════════════════════════════
function DashboardHome() {
  const [user, setUser] = useState({ name: 'User', id: '', email: '' });
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Read user from localStorage after component mounts
    setUser(getUser());
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings`);
      const allBookings = await response.json();
      const userId = localStorage.getItem('userId')?.replace('USER_', '');
      const filtered = allBookings.filter(b => String(b.user_id) === String(userId));
      setUserBookings(filtered);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setUserBookings([]);
    }
    setLoading(false);
  };

  const confirmedCount = userBookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = userBookings.filter(b => b.status === 'pending').length;

  return (
    <FadeIn>
      <h2 style={s.pageTitle}>Dashboard</h2>
      {/* ✅ Shows real name from localStorage */}
      <p style={s.pageSubtitle}>Welcome back, <strong>{user.name}</strong>!</p>

      <div style={s.statsGrid}>
        {[
          { label: 'Total Bookings', value: userBookings.length, icon: Car, color: '#e94560' },
          { label: 'Active Bookings', value: confirmedCount, icon: CheckCircle, color: '#2ecc71' },
          { label: 'Pending', value: pendingCount, icon: AlertCircle, color: '#f39c12' },
          { label: 'Your ID', value: user.id ? user.id.substring(0, 10) : '—', icon: Ticket, color: '#9b59b6' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={s.statCard}
          >
            <div style={{ ...s.statIcon, backgroundColor: stat.color + '20' }}>
              <stat.icon size={24} color={stat.color} />
            </div>
            <div>
              <p style={s.statValue}>{stat.value}</p>
              <p style={s.statLabel}>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <h3 style={s.sectionTitle}>Your Recent Bookings</h3>
      {loading ? (
        <div style={s.loading}>Loading bookings...</div>
      ) : userBookings.length === 0 ? (
        <div style={s.emptyMessage}>
          No bookings yet.{' '}
          <a href="/cars" style={{ color: '#e94560', textDecoration: 'none', fontWeight: 'bold' }}>
            Book a car
          </a>
        </div>
      ) : (
        <div style={s.bookingList}>
          {userBookings.slice(0, 3).map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={s.bookingCardDynamic}
            >
              <div style={s.bookingInfo}>
                <p style={s.bookingCar}>Booking ID: {b.id}</p>
                <p style={s.bookingDates}>{b.start_date} → {b.end_date}</p>
                <p style={s.bookingId}>Car: {b.car_id} | User: {b.user_id}</p>
              </div>
              <div style={s.bookingRight}>
                <span style={{
                  ...s.statusBadge,
                  backgroundColor: b.status === 'confirmed' ? '#e8f5e9' : '#fff8e1',
                  color: b.status === 'confirmed' ? '#2e7d32' : '#f57f17',
                }}>
                  {b.status?.toUpperCase()}
                </span>
                <p style={s.bookingTotal}>₹{b.total_price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </FadeIn>
  );
}

// ═══════════════════════════════════════════════════════════════
// MY PROFILE — ✅ Fixed to read real user data
// ═══════════════════════════════════════════════════════════════
function MyProfile() {
  const [baseUser, setBaseUser] = useState({
    id: '', name: '', email: '', phone: '', gender: '', initials: 'U', joined: '',
  });
  const [form, setForm] = useState({
    id: '', name: '', email: '', phone: '', gender: '',
  });
  const [saved, setSaved] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [uploadMsg, setUploadMsg] = useState('');

  useEffect(() => {
    // ✅ Read real user data from localStorage after mount
    const user = getUser();
    setBaseUser(user);
    setForm({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
    });
    const photo = localStorage.getItem('profilePhoto');
    if (photo) setProfilePhoto(photo);
  }, []);

  const handleSave = () => {
    // ✅ Save updated values back to localStorage
    localStorage.setItem('userName', form.name);
    localStorage.setItem('userEmail', form.email);
    localStorage.setItem('userPhone', form.phone);
    localStorage.setItem('userGender', form.gender);
    setBaseUser(prev => ({ ...prev, ...form }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadMsg({ text: 'File size must be less than 5MB', success: false });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoData = event.target.result;
        localStorage.setItem('profilePhoto', photoData);
        setProfilePhoto(photoData);
        setUploadMsg({ text: 'Photo updated successfully!', success: true });
        setTimeout(() => setUploadMsg(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    localStorage.removeItem('profilePhoto');
    setProfilePhoto(null);
    setUploadMsg({ text: 'Photo removed!', success: true });
    setTimeout(() => setUploadMsg(''), 2000);
  };

  return (
    <FadeIn>
      <h2 style={s.pageTitle}>My Profile</h2>
      <p style={s.pageSubtitle}>Manage your personal information</p>

      <div style={s.profileCard}>
        <div style={s.profileTop}>
          <div style={s.avatarWrapper}>
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" style={s.profilePhotoImg} />
            ) : (
              <div style={s.bigAvatar}>{baseUser.initials || 'U'}</div>
            )}
            <label style={s.photoUploadLabel}>
              <Camera size={16} style={{ cursor: 'pointer' }} />
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            </label>
          </div>
          <div>
            {/* ✅ Shows real name and email */}
            <p style={s.profileName}>{baseUser.name}</p>
            <p style={s.profileEmail}>{baseUser.email}</p>
            <p style={s.profileJoined}>Member since {baseUser.joined}</p>
            {profilePhoto && (
              <button style={s.removePhotoBtn} onClick={handleRemovePhoto}>
                Remove Photo
              </button>
            )}
          </div>
        </div>

        {uploadMsg && (
          <div style={{
            ...s.msgBox,
            backgroundColor: uploadMsg.success ? '#e8f5e9' : '#fce4ec',
            color: uploadMsg.success ? '#2e7d32' : '#c62828',
          }}>
            {uploadMsg.success
              ? <Check size={16} style={{ display: 'inline', marginRight: '6px' }} />
              : <AlertCircle size={16} style={{ display: 'inline', marginRight: '6px' }} />}
            {uploadMsg.text}
          </div>
        )}

        <div style={s.formGrid}>
          {[
            { label: 'User ID', key: 'id', type: 'text', disabled: true },
            { label: 'Full Name', key: 'name', type: 'text' },
            { label: 'Email Address', key: 'email', type: 'email' },
            { label: 'Phone Number', key: 'phone', type: 'tel' },
            { label: 'Gender', key: 'gender', type: 'text' },
          ].map(field => (
            <div key={field.key} style={s.inputGroup}>
              <label style={s.label}>{field.label}</label>
              <input
                style={field.disabled
                  ? { ...s.input, backgroundColor: '#f5f5f5', cursor: 'not-allowed' }
                  : s.input}
                type={field.type}
                value={form[field.key] || ''}
                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                disabled={field.disabled}
              />
            </div>
          ))}
        </div>

        {saved && (
          <div style={s.successMsg}>
            <Check size={18} style={{ display: 'inline', marginRight: '8px' }} />
            Profile updated successfully!
          </div>
        )}

        <button style={s.saveBtn} onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </FadeIn>
  );
}

// ═══════════════════════════════════════════════════════════════
// MANAGE BOOKINGS
// ═══════════════════════════════════════════════════════════════
function ManageBookings() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'];
  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <FadeIn>
      <h2 style={s.pageTitle}>Manage Bookings</h2>
      <p style={s.pageSubtitle}>View and manage all your car bookings</p>

      <div style={s.filterRow}>
        {filters.map(f => (
          <button
            key={f}
            style={{
              ...s.filterBtn,
              backgroundColor: filter === f ? '#e94560' : 'white',
              color: filter === f ? 'white' : '#555',
              border: filter === f ? '2px solid #e94560' : '2px solid #eee',
            }}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={s.bookingList}>
        {filtered.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={s.bookingCard}
          >
            <img
              src={b.image}
              alt={b.car}
              style={s.bookingImg}
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80'; }}
            />
            <div style={s.bookingInfo}>
              <p style={s.bookingCar}>{b.car}</p>
              <p style={s.bookingDates}>
                <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
                {b.pickup} → {b.returnDate} ({b.days} days)
              </p>
              <p style={s.bookingLocation}>
                <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                {b.location}
              </p>
              <p style={s.bookingId}>Booking ID: {b.id}</p>
            </div>
            <div style={s.bookingRight}>
              <span style={{ ...s.statusBadge, backgroundColor: statusColors[b.status].bg, color: statusColors[b.status].color }}>
                {b.status}
              </span>
              <p style={s.bookingTotal}>${b.total}</p>
              {b.status === 'Pending' && (
                <button style={s.cancelBtn}>Cancel</button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </FadeIn>
  );
}

// ═══════════════════════════════════════════════════════════════
// SAVED ADDRESS
// ═══════════════════════════════════════════════════════════════
function SavedAddress() {
  const [list, setList] = useState(addresses);
  const [adding, setAdding] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: '', address: '' });

  const handleAdd = () => {
    if (!newAddr.label || !newAddr.address) return;
    setList([...list, { id: list.length + 1, label: newAddr.label, address: newAddr.address, icon: MapPin }]);
    setNewAddr({ label: '', address: '' });
    setAdding(false);
  };

  return (
    <FadeIn>
      <div style={s.titleRow}>
        <div>
          <h2 style={s.pageTitle}>Saved Addresses</h2>
          <p style={s.pageSubtitle}>Manage your saved locations</p>
        </div>
        <button style={s.addBtn} onClick={() => setAdding(!adding)}>
          <Plus size={18} style={{ display: 'inline', marginRight: '4px' }} />
          Add Address
        </button>
      </div>

      {adding && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={s.addForm}>
          <input style={s.input} placeholder="Label (Home, Office...)" value={newAddr.label} onChange={e => setNewAddr({ ...newAddr, label: e.target.value })} />
          <input style={s.input} placeholder="Full address" value={newAddr.address} onChange={e => setNewAddr({ ...newAddr, address: e.target.value })} />
          <button style={s.saveBtn} onClick={handleAdd}>Save Address</button>
        </motion.div>
      )}

      <div style={s.addressList}>
        {list.map((addr, i) => (
          <motion.div
            key={addr.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            style={s.addressCardFull}
          >
            <div style={s.addressIconBig}><addr.icon size={24} /></div>
            <div style={{ flex: 1 }}>
              <p style={s.addressLabelBig}>{addr.label}</p>
              <p style={s.addressTextBig}>{addr.address}</p>
            </div>
            <div style={s.addressActions}>
              <button style={s.editBtn}>Edit</button>
              <button style={s.deleteBtn} onClick={() => setList(list.filter(a => a.id !== addr.id))}>Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
    </FadeIn>
  );
}

// ═══════════════════════════════════════════════════════════════
// MY WALLET
// ═══════════════════════════════════════════════════════════════
function MyWallet() {
  return (
    <FadeIn>
      <h2 style={s.pageTitle}>My Wallet</h2>
      <p style={s.pageSubtitle}>Manage your wallet balance and transactions</p>

      <div style={s.walletCard}>
        <div style={s.walletLeft}>
          <p style={s.walletLabel}>Available Balance</p>
          <p style={s.walletBalance}>₹{localStorage.getItem('walletBalance') || '0'}</p>
          <p style={s.walletSub}>Last updated: April 05, 2026</p>
        </div>
        <div style={s.walletIcon}><Wallet size={48} color="#9b59b6" /></div>
      </div>

      <div style={s.addMoneyRow}>
        {[50, 100, 200, 500].map(amt => (
          <button key={amt} style={s.amountBtn}>+₹{amt}</button>
        ))}
        <button style={s.addMoneyBtn}>Add Money</button>
      </div>

      <h3 style={s.sectionTitle}>Transaction History</h3>
      <div style={s.transactionList}>
        {walletTransactions.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            style={s.transactionCard}
          >
            <div style={{ ...s.transIcon, backgroundColor: t.type === 'credit' ? '#e8f5e9' : '#fce4ec' }}>
              {t.type === 'credit' ? '↓' : '↑'}
            </div>
            <div style={{ flex: 1 }}>
              <p style={s.transDesc}>{t.desc}</p>
              <p style={s.transDate}>{t.date}</p>
            </div>
            <p style={{ ...s.transAmount, color: t.type === 'credit' ? '#2e7d32' : '#c62828' }}>
              {t.type === 'credit' ? '+' : '-'}₹{t.amount}
            </p>
          </motion.div>
        ))}
      </div>
    </FadeIn>
  );
}

// ═══════════════════════════════════════════════════════════════
// MY COUPONS
// ═══════════════════════════════════════════════════════════════
function MyCoupons() {
  const [promoCode, setPromoCode] = useState('');
  const [promoMsg, setPromoMsg] = useState('');

  const applyPromo = () => {
    const found = coupons.find(c => c.code === promoCode.toUpperCase());
    if (found) {
      setPromoMsg({ text: `Code applied! You get ${found.discount}`, success: true });
    } else {
      setPromoMsg({ text: 'Invalid promo code. Please try again.', success: false });
    }
  };

  return (
    <FadeIn>
      <h2 style={s.pageTitle}>My Coupons & Promo Codes</h2>
      <p style={s.pageSubtitle}>Your available discounts and offers</p>

      <div style={s.promoBox}>
        <input
          style={{ ...s.input, flex: 1 }}
          placeholder="Enter promo code..."
          value={promoCode}
          onChange={e => setPromoCode(e.target.value)}
        />
        <button style={s.applyBtn} onClick={applyPromo}>Apply</button>
      </div>

      {promoMsg && (
        <p style={{ ...s.promoMsg, color: promoMsg.success ? '#2e7d32' : '#c62828', backgroundColor: promoMsg.success ? '#e8f5e9' : '#fce4ec' }}>
          {promoMsg.success
            ? <CheckCircle size={16} style={{ display: 'inline', marginRight: '8px' }} />
            : <span>✕ </span>}
          {promoMsg.text}
        </p>
      )}

      <h3 style={s.sectionTitle}>Available Coupons</h3>
      <div style={s.couponGrid}>
        {coupons.map((coupon, i) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            style={{ ...s.couponCard, borderLeft: `6px solid ${coupon.color}` }}
          >
            <div style={s.couponLeft}>
              <p style={{ ...s.couponDiscount, color: coupon.color }}>{coupon.discount}</p>
              <p style={s.couponDesc}>{coupon.desc}</p>
              <p style={s.couponExpiry}>Expires: {coupon.expiry}</p>
            </div>
            <div style={s.couponRight}>
              <div style={{ ...s.couponCode, borderColor: coupon.color, color: coupon.color }}>{coupon.code}</div>
              <button
                style={{ ...s.copyBtn, backgroundColor: coupon.color }}
                onClick={() => navigator.clipboard.writeText(coupon.code)}
              >
                Copy
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </FadeIn>
  );
}

// ═══════════════════════════════════════════════════════════════
// CHANGE PASSWORD
// ═══════════════════════════════════════════════════════════════
function ChangePassword() {
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = () => {
    if (!form.current || !form.newPass || !form.confirm) {
      setMsg({ text: 'Please fill all fields.', success: false });
      return;
    }
    if (form.newPass !== form.confirm) {
      setMsg({ text: 'New passwords do not match!', success: false });
      return;
    }
    if (form.newPass.length < 6) {
      setMsg({ text: 'Password must be at least 6 characters.', success: false });
      return;
    }
    setMsg({ text: 'Password changed successfully!', success: true });
    setForm({ current: '', newPass: '', confirm: '' });
  };

  return (
    <FadeIn>
      <h2 style={s.pageTitle}>Change Password</h2>
      <p style={s.pageSubtitle}>Keep your account secure</p>

      <div style={s.passwordCard}>
        <div style={s.securityIcon}><Lock size={48} color="#e94560" /></div>
        <h3 style={s.passwordCardTitle}>Update Your Password</h3>
        <p style={s.passwordCardSub}>Choose a strong password with at least 6 characters.</p>

        <div style={s.passwordForm}>
          {[
            { label: 'Current Password', key: 'current' },
            { label: 'New Password', key: 'newPass' },
            { label: 'Confirm New Password', key: 'confirm' },
          ].map(field => (
            <div key={field.key} style={s.inputGroup}>
              <label style={s.label}>{field.label}</label>
              <input
                style={s.input}
                type="password"
                placeholder={`Enter ${field.label.toLowerCase()}`}
                value={form[field.key]}
                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
              />
            </div>
          ))}

          {msg && (
            <div style={{ ...s.msgBox, backgroundColor: msg.success ? '#e8f5e9' : '#fce4ec', color: msg.success ? '#2e7d32' : '#c62828' }}>
              {msg.text}
            </div>
          )}

          <button style={s.saveBtn} onClick={handleSubmit}>Update Password</button>
        </div>
      </div>
    </FadeIn>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAYMENT SECTION
// ═══════════════════════════════════════════════════════════════
function PaymentSection() {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('credit_card');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '', cardHolder: '' });
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(parseInt(localStorage.getItem('walletBalance') || '0'));

  const handleCardChange = (e) => setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });

  const handlePayment = () => {
    if (!amount || amount <= 0) {
      setMessage({ text: 'Please enter a valid amount', success: false });
      return;
    }
    if (method === 'credit_card') {
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardHolder) {
        setMessage({ text: 'Please fill all card details', success: false });
        return;
      }
    }
    const newBalance = balance + parseInt(amount);
    localStorage.setItem('walletBalance', newBalance.toString());
    setBalance(newBalance);
    setMessage({ text: `₹${amount} added successfully! New balance: ₹${newBalance}`, success: true });
    setAmount('');
    setCardDetails({ cardNumber: '', expiryDate: '', cvv: '', cardHolder: '' });
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <FadeIn>
      <h2 style={s.pageTitle}>Add Money to Wallet</h2>
      <p style={s.pageSubtitle}>Top up your account balance</p>

      <div style={s.balanceCard}>
        <p style={s.balanceLabel}>Current Balance</p>
        <p style={s.balanceAmount}>₹{balance}</p>
      </div>

      {message && (
        <div style={{ ...s.msgBox, backgroundColor: message.success ? '#e8f5e9' : '#fce4ec', color: message.success ? '#2e7d32' : '#c62828' }}>
          {message.text}
        </div>
      )}

      <h3 style={s.sectionTitle}>Quick Add</h3>
      <div style={s.quickAmountButtons}>
        {[500, 1000, 2000, 5000].map(amt => (
          <button
            key={amt}
            style={{
              ...s.amountBtn,
              backgroundColor: amount == amt ? '#e94560' : 'white',
              color: amount == amt ? 'white' : '#333',
              border: amount == amt ? 'none' : '2px solid #e0e0e0',
            }}
            onClick={() => setAmount(amt.toString())}
          >
            ₹{amt}
          </button>
        ))}
      </div>

      <h3 style={s.sectionTitle}>Custom Amount</h3>
      <div style={s.inputGroup}>
        <label style={s.label}>Enter Amount</label>
        <input style={s.input} type="number" placeholder="Enter amount in rupees" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>

      <h3 style={s.sectionTitle}>Payment Method</h3>
      <div style={s.paymentMethods}>
        {[
          { id: 'credit_card', label: 'Credit Card' },
          { id: 'debit_card', label: 'Debit Card' },
          { id: 'upi', label: 'UPI' },
        ].map(m => (
          <button
            key={m.id}
            style={{ ...s.methodBtn, backgroundColor: method === m.id ? '#e94560' : '#f9f9f9', color: method === m.id ? 'white' : '#333' }}
            onClick={() => setMethod(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {(method === 'credit_card' || method === 'debit_card') && (
        <div style={{ marginTop: '24px' }}>
          <h3 style={s.sectionTitle}>Card Details</h3>
          <div style={s.formGrid}>
            <input style={s.input} type="text" placeholder="Card Holder Name" name="cardHolder" value={cardDetails.cardHolder} onChange={handleCardChange} />
            <input style={s.input} type="text" placeholder="1234 5678 9012 3456" name="cardNumber" maxLength="19" value={cardDetails.cardNumber} onChange={handleCardChange} />
            <input style={s.input} type="text" placeholder="MM/YY" name="expiryDate" value={cardDetails.expiryDate} onChange={handleCardChange} />
            <input style={s.input} type="text" placeholder="CVV" maxLength="4" name="cvv" value={cardDetails.cvv} onChange={handleCardChange} />
          </div>
        </div>
      )}

      <button style={{ ...s.saveBtn, marginTop: '24px', width: '100%', fontSize: '16px' }} onClick={handlePayment}>
        Pay ₹{amount || '0'}
      </button>
    </FadeIn>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
function UserDashboard() {
  const [active, setActive] = useState('dashboard');

  const renderContent = () => {
    switch (active) {
      case 'dashboard': return <DashboardHome />;
      case 'profile':   return <MyProfile />;
      case 'bookings':  return <ManageBookings />;
      case 'address':   return <SavedAddress />;
      case 'wallet':    return <MyWallet />;
      case 'payment':   return <PaymentSection />;
      case 'coupons':   return <MyCoupons />;
      case 'password':  return <ChangePassword />;
      default:          return <DashboardHome />;
    }
  };

  return (
    <div style={s.container}>
      <Sidebar active={active} setActive={setActive} />
      <div style={s.content}>{renderContent()}</div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────
const s = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa', paddingTop: '70px' },
  content: { flex: 1, padding: '40px', overflowY: 'auto' },
  pageTitle: { fontSize: '28px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 4px' },
  pageSubtitle: { fontSize: '14px', color: '#888', marginBottom: '28px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' },
  statCard: { backgroundColor: 'white', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' },
  statIcon: { width: '52px', height: '52px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  statValue: { fontSize: '24px', fontWeight: '800', color: '#1a1a2e', margin: 0 },
  statLabel: { fontSize: '13px', color: '#888', margin: 0 },
  sectionTitle: { fontSize: '18px', fontWeight: '700', color: '#1a1a2e', marginBottom: '16px' },
  bookingList: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' },
  bookingCard: { backgroundColor: 'white', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' },
  bookingImg: { width: '90px', height: '65px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 },
  bookingInfo: { flex: 1 },
  bookingCar: { fontSize: '16px', fontWeight: '700', color: '#1a1a2e', margin: '0 0 4px' },
  bookingDates: { fontSize: '13px', color: '#888', margin: '0 0 2px' },
  bookingLocation: { fontSize: '13px', color: '#888', margin: 0 },
  bookingId: { fontSize: '12px', color: '#aaa', margin: '2px 0 0' },
  bookingRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' },
  statusBadge: { padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },
  bookingTotal: { fontSize: '18px', fontWeight: '800', color: '#1a1a2e', margin: 0 },
  cancelBtn: { padding: '4px 12px', backgroundColor: '#fce4ec', color: '#c62828', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
  loading: { textAlign: 'center', padding: '40px', fontSize: '16px', color: '#888' },
  emptyMessage: { backgroundColor: '#fafafa', padding: '24px', borderRadius: '12px', textAlign: 'center', color: '#666', fontSize: '14px' },
  bookingCardDynamic: { backgroundColor: 'white', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' },
  profileCard: { backgroundColor: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' },
  profileTop: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #f0f0f0' },
  bigAvatar: { width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#e94560', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800', flexShrink: 0 },
  avatarWrapper: { position: 'relative', width: '72px', height: '72px' },
  profilePhotoImg: { width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover' },
  photoUploadLabel: { position: 'absolute', bottom: '0', right: '0', backgroundColor: '#e94560', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid white', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' },
  removePhotoBtn: { padding: '4px 8px', backgroundColor: '#fce4ec', color: '#c62828', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', marginTop: '8px' },
  msgBox: { padding: '12px 16px', borderRadius: '10px', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center' },
  profileName: { fontSize: '20px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 4px' },
  profileEmail: { fontSize: '14px', color: '#888', margin: '0 0 2px' },
  profileJoined: { fontSize: '12px', color: '#aaa', margin: 0 },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#444' },
  input: { padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e0e0e0', fontSize: '15px', outline: 'none', backgroundColor: '#fafafa' },
  successMsg: { backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', marginBottom: '16px', textAlign: 'center' },
  saveBtn: { padding: '14px 32px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
  filterRow: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' },
  filterBtn: { padding: '8px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
  titleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' },
  addBtn: { padding: '10px 20px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  addForm: { backgroundColor: 'white', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' },
  addressList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  addressCardFull: { backgroundColor: 'white', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' },
  addressIconBig: { width: '52px', height: '52px', backgroundColor: '#f8f9fa', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  addressLabelBig: { fontSize: '16px', fontWeight: '700', color: '#1a1a2e', margin: '0 0 4px' },
  addressTextBig: { fontSize: '14px', color: '#888', margin: 0 },
  addressActions: { display: 'flex', gap: '8px' },
  editBtn: { padding: '8px 16px', backgroundColor: '#e3f2fd', color: '#1565c0', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
  deleteBtn: { padding: '8px 16px', backgroundColor: '#fce4ec', color: '#c62828', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
  walletCard: { background: 'linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)', borderRadius: '20px', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', boxShadow: '0 8px 30px rgba(233,69,96,0.3)' },
  walletLeft: {},
  walletLabel: { fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: '0 0 8px' },
  walletBalance: { fontSize: '42px', fontWeight: '800', color: 'white', margin: '0 0 8px' },
  walletSub: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 },
  walletIcon: { fontSize: '64px' },
  addMoneyRow: { display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap' },
  amountBtn: { padding: '10px 20px', backgroundColor: 'white', color: '#1a1a2e', border: '2px solid #eee', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  addMoneyBtn: { padding: '10px 24px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' },
  balanceCard: { background: 'linear-gradient(135deg, #e94560 0%, #ff6b7a 100%)', borderRadius: '14px', padding: '24px', marginBottom: '28px', boxShadow: '0 4px 15px rgba(233,69,96,0.3)' },
  balanceLabel: { fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: '0 0 8px' },
  balanceAmount: { fontSize: '32px', fontWeight: '800', color: 'white', margin: 0 },
  quickAmountButtons: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' },
  paymentMethods: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' },
  methodBtn: { padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' },
  transactionList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  transactionCard: { backgroundColor: 'white', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  transIcon: { width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800', flexShrink: 0 },
  transDesc: { fontSize: '14px', fontWeight: '600', color: '#1a1a2e', margin: '0 0 2px' },
  transDate: { fontSize: '12px', color: '#aaa', margin: 0 },
  transAmount: { fontSize: '16px', fontWeight: '800', flexShrink: 0 },
  promoBox: { display: 'flex', gap: '12px', marginBottom: '12px' },
  applyBtn: { padding: '12px 24px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
  promoMsg: { padding: '12px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', marginBottom: '24px' },
  couponGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  couponCard: { backgroundColor: 'white', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' },
  couponLeft: {},
  couponDiscount: { fontSize: '22px', fontWeight: '800', margin: '0 0 4px' },
  couponDesc: { fontSize: '14px', color: '#555', margin: '0 0 4px' },
  couponExpiry: { fontSize: '12px', color: '#aaa', margin: 0 },
  couponRight: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' },
  couponCode: { padding: '8px 16px', border: '2px dashed', borderRadius: '8px', fontSize: '14px', fontWeight: '800', letterSpacing: '2px' },
  copyBtn: { padding: '6px 16px', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },
  passwordCard: { backgroundColor: 'white', borderRadius: '20px', padding: '40px', maxWidth: '500px', textAlign: 'center', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' },
  securityIcon: { fontSize: '56px', marginBottom: '16px' },
  passwordCardTitle: { fontSize: '22px', fontWeight: '800', color: '#1a1a2e', marginBottom: '8px' },
  passwordCardSub: { fontSize: '14px', color: '#888', marginBottom: '28px' },
  passwordForm: { display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' },
};

export default UserDashboard;