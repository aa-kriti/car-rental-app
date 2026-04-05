import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Fuel, Settings, Calendar } from 'lucide-react';

const cars = [
  { id: 1, name: 'Toyota Camry', brand: 'Toyota', type: 'Sedan', price: 50, seats: 5, fuel: 'Petrol', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80' },
  { id: 2, name: 'Honda CR-V', brand: 'Honda', type: 'SUV', price: 70, seats: 5, fuel: 'Diesel', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80' },
  { id: 3, name: 'Ford Mustang', brand: 'Ford', type: 'Sports', price: 100, seats: 4, fuel: 'Petrol', transmission: 'Manual', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80' },
  { id: 4, name: 'BMW 3 Series', brand: 'BMW', type: 'Luxury', price: 90, seats: 5, fuel: 'Petrol', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80' },
  { id: 5, name: 'Jeep Wrangler', brand: 'Jeep', type: 'SUV', price: 85, seats: 5, fuel: 'Diesel', transmission: 'Manual', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80' },
  { id: 6, name: 'Hyundai Tucson', brand: 'Hyundai', type: 'SUV', price: 65, seats: 5, fuel: 'Diesel', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=80' },
  { id: 7, name: 'Mercedes C-Class', brand: 'Mercedes', type: 'Luxury', price: 120, seats: 5, fuel: 'Petrol', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80' },
  { id: 8, name: 'Tesla Model 3', brand: 'Tesla', type: 'Electric', price: 110, seats: 5, fuel: 'Electric', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80' },
  { id: 9, name: 'Audi A4', brand: 'Audi', type: 'Luxury', price: 105, seats: 5, fuel: 'Petrol', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80' },
  { id: 10, name: 'Toyota RAV4', brand: 'Toyota', type: 'SUV', price: 75, seats: 5, fuel: 'Hybrid', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1625231338679-5e921a2a6d2b?w=600&q=80' },
  { id: 11, name: 'Porsche 911', brand: 'Porsche', type: 'Sports', price: 200, seats: 2, fuel: 'Petrol', transmission: 'Manual', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80' },
  { id: 12, name: 'Kia Sportage', brand: 'Kia', type: 'SUV', price: 60, seats: 5, fuel: 'Diesel', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80' },
  { id: 13, name: 'Range Rover Sport', brand: 'Land Rover', type: 'Luxury SUV', price: 180, seats: 5, fuel: 'Diesel', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80' },
  { id: 14, name: 'Chevrolet Camaro', brand: 'Chevrolet', type: 'Sports', price: 95, seats: 4, fuel: 'Petrol', transmission: 'Manual', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80' },
  { id: 15, name: 'Volkswagen Golf', brand: 'Volkswagen', type: 'Hatchback', price: 45, seats: 5, fuel: 'Petrol', transmission: 'Manual', image: 'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=600&q=80' },
];

const extras = [
  { id: 'gps', label: 'GPS Navigation', price: 10 },
  { id: 'insurance', label: 'Premium Insurance', price: 20 },
  { id: 'driver', label: 'Personal Driver', price: 50 },
  { id: 'child_seat', label: 'Child Seat', price: 8 },
];

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find(c => c.id === parseInt(id));

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    pickup: '',
    returnDate: '',
    pickupLocation: '',
    selectedExtras: [],
  });
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  // Redirect to cars if car not found
  if (!car) {
    return (
      <div style={styles.notFound}>
        <h2>Car not found!</h2>
        <button style={styles.redirectBtn} onClick={() => navigate('/cars')}>
          Browse Available Cars
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleExtra = (extraId) => {
    setForm(prev => ({
      ...prev,
      selectedExtras: prev.selectedExtras.includes(extraId)
        ? prev.selectedExtras.filter(e => e !== extraId)
        : [...prev.selectedExtras, extraId],
    }));
  };

  const calculateDays = () => {
    if (!form.pickup || !form.returnDate) return 0;
    const diff = new Date(form.returnDate) - new Date(form.pickup);
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const extrasTotal = form.selectedExtras.reduce((sum, id) => {
    const extra = extras.find(e => e.id === id);
    return sum + (extra ? extra.price * calculateDays() : 0);
  }, 0);

  const days = calculateDays();
  const carTotal = days * car.price;
  const grandTotal = carTotal + extrasTotal;

  const handleConfirm = () => {
    if (!form.name || !form.email || !form.phone || !form.pickup || !form.returnDate || !form.pickupLocation) {
      alert('Please fill all required fields!');
      return;
    }
    setConfirmed(true);
  };

  // Confirmation Screen
  if (confirmed) {
    return (
      <div style={styles.confirmContainer}>
        <div style={styles.bgImage} />
        <div style={styles.bgOverlay} />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={styles.confirmCard}
        >
          <div style={styles.checkIcon}>
            <CheckCircle size={64} color="#2ecc71" />
          </div>
          <h2 style={styles.confirmTitle}>Booking Confirmed!</h2>
          <p style={styles.confirmSub}>Your booking has been successfully placed.</p>
          <div style={styles.confirmDetails}>
            <div style={styles.confirmRow}>
              <span style={styles.confirmLabel}>Car</span>
              <span style={styles.confirmValue}>{car.name}</span>
            </div>
            <div style={styles.confirmRow}>
              <span style={styles.confirmLabel}>Name</span>
              <span style={styles.confirmValue}>{form.name}</span>
            </div>
            <div style={styles.confirmRow}>
              <span style={styles.confirmLabel}>Pickup</span>
              <span style={styles.confirmValue}>{form.pickup}</span>
            </div>
            <div style={styles.confirmRow}>
              <span style={styles.confirmLabel}>Return</span>
              <span style={styles.confirmValue}>{form.returnDate}</span>
            </div>
            <div style={styles.confirmRow}>
              <span style={styles.confirmLabel}>Days</span>
              <span style={styles.confirmValue}>{days} days</span>
            </div>
            <div style={{ ...styles.confirmRow, borderTop: '2px solid #e94560', paddingTop: '12px', marginTop: '4px' }}>
              <span style={{ ...styles.confirmLabel, fontWeight: '700', color: '#1a1a2e' }}>Total Paid</span>
              <span style={{ ...styles.confirmValue, color: '#e94560', fontSize: '20px', fontWeight: '800' }}>${grandTotal}</span>
            </div>
          </div>
          <div style={styles.confirmButtons}>
            <button style={styles.dashBtn} onClick={() => navigate('/user-dashboard')}>
              Go to Dashboard
            </button>
            <button style={styles.browseBtn} onClick={() => navigate('/cars')}>
              Browse More Cars
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.bgImage} />
      <div style={styles.bgOverlay} />

      <div style={styles.wrapper}>

        {/* Left — Car Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.carPanel}
        >
          <img
            src={car.image}
            alt={car.name}
            style={styles.carImage}
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80'; }}
          />
          <div style={styles.carInfo}>
            <h2 style={styles.carName}>{car.name}</h2>
            <p style={styles.carBrand}>{car.brand} • {car.type}</p>
            <div style={styles.carSpecs}>
              <span style={styles.specBadge}>
                <Users size={14} style={{ display: 'inline', marginRight: '4px' }} />
                {car.seats} Seats
              </span>
              <span style={styles.specBadge}>
                <Fuel size={14} style={{ display: 'inline', marginRight: '4px' }} />
                {car.fuel}
              </span>
              <span style={styles.specBadge}>
                <Settings size={14} style={{ display: 'inline', marginRight: '4px' }} />
                {car.transmission}
              </span>
            </div>
            <div style={styles.priceBox}>
              <span style={styles.priceLabel}>Price per day</span>
              <span style={styles.priceValue}>${car.price}</span>
            </div>

            {/* Summary Box */}
            {days > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={styles.summaryBox}
              >
                <h4 style={styles.summaryTitle}>Booking Summary</h4>
                <div style={styles.summaryRow}>
                  <span>Car rental ({days} days)</span>
                  <span>${carTotal}</span>
                </div>
                {form.selectedExtras.map(eid => {
                  const extra = extras.find(e => e.id === eid);
                  return (
                    <div key={eid} style={styles.summaryRow}>
                      <span>{extra.label}</span>
                      <span>${extra.price * days}</span>
                    </div>
                  );
                })}
                <div style={styles.summaryTotal}>
                  <span>Total</span>
                  <span style={styles.totalAmount}>${grandTotal}</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.formPanel}
        >
          <h2 style={styles.formTitle}>Complete Your Booking</h2>
          <p style={styles.formSubtitle}>Fill in your details to confirm</p>

          {/* Steps */}
          <div style={styles.steps}>
            {['Personal Info', 'Trip Details', 'Extras'].map((s, i) => (
              <div
                key={i}
                style={{
                  ...styles.step,
                  backgroundColor: step === i + 1 ? '#e94560' : step > i + 1 ? '#2ecc71' : '#eee',
                  color: step >= i + 1 ? 'white' : '#888',
                  cursor: step > i + 1 ? 'pointer' : 'default',
                }}
                onClick={() => step > i + 1 && setStep(i + 1)}
              >
                {step > i + 1 ? '✓' : i + 1}
              </div>
            ))}
          </div>

          {/* Step 1 — Personal Info */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={styles.stepContent}
            >
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name *</label>
                <input style={styles.input} type="text" name="name" placeholder="Enter your full name" value={form.name} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address *</label>
                <input style={styles.input} type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input style={styles.input} type="tel" name="phone" placeholder="Enter your phone number" value={form.phone} onChange={handleChange} />
              </div>
              <button
                style={styles.nextBtn}
                onClick={() => {
                  if (!form.name || !form.email || !form.phone) {
                    alert('Please fill all personal details!');
                    return;
                  }
                  setStep(2);
                }}
              >
                Next →
              </button>
            </motion.div>
          )}

          {/* Step 2 — Trip Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={styles.stepContent}
            >
              <div style={styles.inputGroup}>
                <label style={styles.label}>Pickup Location *</label>
                <select style={styles.input} name="pickupLocation" value={form.pickupLocation} onChange={handleChange}>
                  <option value="">Select pickup location</option>
                  <option value="airport">Airport Terminal</option>
                  <option value="downtown">Downtown Office</option>
                  <option value="mall">City Mall</option>
                  <option value="hotel">Hotel Delivery</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Pickup Date *</label>
                <input style={styles.input} type="date" name="pickup" value={form.pickup} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Return Date *</label>
                <input style={styles.input} type="date" name="returnDate" value={form.returnDate} onChange={handleChange} min={form.pickup || new Date().toISOString().split('T')[0]} />
              </div>
              {days > 0 && (
                <div style={styles.daysInfo}>
                  <Calendar size={16} style={{ display: 'inline', marginRight: '6px' }} />
                  {days} day{days > 1 ? 's' : ''} rental — ${carTotal} base price
                </div>
              )}
              <div style={styles.rowBtns}>
                <button style={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                <button
                  style={styles.nextBtn}
                  onClick={() => {
                    if (!form.pickup || !form.returnDate || !form.pickupLocation) {
                      alert('Please fill all trip details!');
                      return;
                    }
                    if (days === 0) {
                      alert('Return date must be after pickup date!');
                      return;
                    }
                    setStep(3);
                  }}
                >
                  Next →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3 — Extras */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={styles.stepContent}
            >
              <p style={styles.extrasTitle}>Select optional add-ons:</p>
              {extras.map(extra => (
                <div
                  key={extra.id}
                  style={{
                    ...styles.extraCard,
                    border: form.selectedExtras.includes(extra.id)
                      ? '2px solid #e94560'
                      : '2px solid #eee',
                    backgroundColor: form.selectedExtras.includes(extra.id)
                      ? '#fff0f3'
                      : 'white',
                  }}
                  onClick={() => toggleExtra(extra.id)}
                >
                  <div>
                    <p style={styles.extraName}>{extra.label}</p>
                    <p style={styles.extraPrice}>+${extra.price}/day</p>
                  </div>
                  <div style={{
                    ...styles.checkbox,
                    backgroundColor: form.selectedExtras.includes(extra.id) ? '#e94560' : 'white',
                    border: form.selectedExtras.includes(extra.id) ? '2px solid #e94560' : '2px solid #ddd',
                  }}>
                    {form.selectedExtras.includes(extra.id) && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                  </div>
                </div>
              ))}

              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Grand Total</span>
                <span style={styles.grandTotal}>${grandTotal}</span>
              </div>

              <div style={styles.rowBtns}>
                <button style={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
                <button style={styles.confirmBtn} onClick={handleConfirm}>
                  Confirm Booking ✓
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px 48px 60px',
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
    background: 'rgba(15,15,30,0.75)',
    zIndex: 1,
  },
  wrapper: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    gap: '32px',
    maxWidth: '1100px',
    width: '100%',
  },
  carPanel: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  carImage: {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
  },
  carInfo: {
    padding: '24px',
  },
  carName: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#1a1a2e',
    margin: '0 0 4px',
  },
  carBrand: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '12px',
  },
  carSpecs: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  specBadge: {
    fontSize: '12px',
    backgroundColor: '#f5f5f5',
    padding: '4px 10px',
    borderRadius: '8px',
    color: '#555',
  },
  priceBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff0f3',
    padding: '12px 16px',
    borderRadius: '10px',
    marginBottom: '16px',
  },
  priceLabel: {
    fontSize: '14px',
    color: '#888',
  },
  priceValue: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#e94560',
  },
  summaryBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '16px',
  },
  summaryTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '12px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#555',
    padding: '4px 0',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
    marginTop: '8px',
    fontWeight: '700',
    fontSize: '15px',
  },
  totalAmount: {
    color: '#e94560',
    fontSize: '18px',
  },
  formPanel: {
    flex: 1.2,
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '36px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  formTitle: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: '4px',
  },
  formSubtitle: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '24px',
  },
  steps: {
    display: 'flex',
    gap: '8px',
    marginBottom: '28px',
    alignItems: 'center',
  },
  step: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '700',
    transition: 'all 0.3s',
  },
  stepContent: {
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
  },
  daysInfo: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
  },
  nextBtn: {
    padding: '14px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
  },
  backBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  rowBtns: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  extrasTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#444',
    marginBottom: '4px',
  },
  extraCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  extraName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a2e',
    margin: 0,
  },
  extraPrice: {
    fontSize: '13px',
    color: '#888',
    margin: '2px 0 0',
  },
  checkbox: {
    width: '24px',
    height: '24px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff0f3',
    padding: '16px',
    borderRadius: '10px',
    marginTop: '8px',
  },
  totalLabel: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#1a1a2e',
  },
  grandTotal: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#e94560',
  },
  confirmBtn: {
    flex: 2,
    padding: '14px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  notFound: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    backgroundColor: '#f8f9fa',
  },
  redirectBtn: {
    padding: '14px 32px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  confirmContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '40px 20px',
  },
  confirmCard: {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '48px 40px',
    maxWidth: '480px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
  },
  checkIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  confirmTitle: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: '8px',
  },
  confirmSub: {
    fontSize: '15px',
    color: '#888',
    marginBottom: '24px',
  },
  confirmDetails: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '24px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  confirmRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
  },
  confirmLabel: {
    color: '#888',
  },
  confirmValue: {
    fontWeight: '600',
    color: '#1a1a2e',
  },
  confirmButtons: {
    display: 'flex',
    gap: '12px',
  },
  dashBtn: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  browseBtn: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Booking;