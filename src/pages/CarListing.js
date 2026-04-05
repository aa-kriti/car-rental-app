import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Fuel, Settings, Search } from 'lucide-react';

export const cars = [
  { id: 1, name: 'Toyota Camry', brand: 'Toyota', type: 'Sedan', price: 50, seats: 5, fuel: 'Petrol', transmission: 'Automatic', rating: 4.8, reviews: 120, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', tag: 'Popular' },
  { id: 2, name: 'Honda CR-V', brand: 'Honda', type: 'SUV', price: 70, seats: 5, fuel: 'Diesel', transmission: 'Automatic', rating: 4.7, reviews: 98, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80', tag: 'Family' },
  { id: 3, name: 'Ford Mustang', brand: 'Ford', type: 'Sports', price: 100, seats: 4, fuel: 'Petrol', transmission: 'Manual', rating: 4.9, reviews: 85, image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80', tag: 'Sport' },
  { id: 4, name: 'BMW 3 Series', brand: 'BMW', type: 'Luxury', price: 90, seats: 5, fuel: 'Petrol', transmission: 'Automatic', rating: 4.9, reviews: 76, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', tag: 'Luxury' },
  { id: 5, name: 'Jeep Wrangler', brand: 'Jeep', type: 'SUV', price: 85, seats: 5, fuel: 'Diesel', transmission: 'Manual', rating: 4.6, reviews: 64, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80', tag: 'Adventure' },
  { id: 6, name: 'Hyundai Tucson', brand: 'Hyundai', type: 'SUV', price: 65, seats: 5, fuel: 'Diesel', transmission: 'Automatic', rating: 4.5, reviews: 110, image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=80', tag: 'Budget' },
  { id: 7, name: 'Mercedes C-Class', brand: 'Mercedes', type: 'Luxury', price: 120, seats: 5, fuel: 'Petrol', transmission: 'Automatic', rating: 4.9, reviews: 92, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80', tag: 'Luxury' },
  { id: 8, name: 'Tesla Model 3', brand: 'Tesla', type: 'Electric', price: 110, seats: 5, fuel: 'Electric', transmission: 'Automatic', rating: 4.9, reviews: 140, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80', tag: 'Electric' },
  { id: 9, name: 'Audi A4', brand: 'Audi', type: 'Luxury', price: 105, seats: 5, fuel: 'Petrol', transmission: 'Automatic', rating: 4.8, reviews: 88, image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80', tag: 'Luxury' },
  { id: 10, name: 'Toyota RAV4', brand: 'Toyota', type: 'SUV', price: 75, seats: 5, fuel: 'Hybrid', transmission: 'Automatic', rating: 4.7, reviews: 115, image: 'https://images.unsplash.com/photo-1625231338679-5e921a2a6d2b?w=600&q=80', tag: 'Family' },
  { id: 11, name: 'Porsche 911', brand: 'Porsche', type: 'Sports', price: 200, seats: 2, fuel: 'Petrol', transmission: 'Manual', rating: 5.0, reviews: 55, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80', tag: 'Sport' },
  { id: 12, name: 'Kia Sportage', brand: 'Kia', type: 'SUV', price: 60, seats: 5, fuel: 'Diesel', transmission: 'Automatic', rating: 4.4, reviews: 97, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80', tag: 'Budget' },
  { id: 13, name: 'Range Rover Sport', brand: 'Land Rover', type: 'Luxury SUV', price: 180, seats: 5, fuel: 'Diesel', transmission: 'Automatic', rating: 4.8, reviews: 72, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80', tag: 'Luxury' },
  { id: 14, name: 'Chevrolet Camaro', brand: 'Chevrolet', type: 'Sports', price: 95, seats: 4, fuel: 'Petrol', transmission: 'Manual', rating: 4.7, reviews: 68, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80', tag: 'Sport' },
  { id: 15, name: 'Volkswagen Golf', brand: 'Volkswagen', type: 'Hatchback', price: 45, seats: 5, fuel: 'Petrol', transmission: 'Manual', rating: 4.5, reviews: 130, image: 'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=600&q=80', tag: 'Budget' },
];

const tagColors = {
  Popular: '#e94560',
  Family: '#2ecc71',
  Sport: '#e67e22',
  Luxury: '#9b59b6',
  Adventure: '#1abc9c',
  Budget: '#3498db',
  Electric: '#00b894',
};

const filters = ['All', 'Sedan', 'SUV', 'Sports', 'Luxury', 'Electric', 'Hatchback'];

function CarListing() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');

  const filtered = cars
    .filter(car => activeFilter === 'All' || car.type === activeFilter)
    .filter(car => car.name.toLowerCase().includes(search.toLowerCase()) || car.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.title}
        >
          Available Cars
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={styles.subtitle}
        >
          {filtered.length} cars available for you
        </motion.p>
      </div>

      {/* Search + Sort */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={styles.searchRow}
      >
        <input
          style={styles.searchInput}
          placeholder="Search by name or brand..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          style={styles.sortSelect}
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={styles.filters}
      >
        {filters.map(f => (
          <button
            key={f}
            style={{
              ...styles.filterBtn,
              backgroundColor: activeFilter === f ? '#e94560' : 'white',
              color: activeFilter === f ? 'white' : '#333',
              border: activeFilter === f ? '2px solid #e94560' : '2px solid #eee',
            }}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div style={styles.grid}>
        {filtered.map((car, i) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            style={styles.card}
            onClick={() => navigate(`/cars/${car.id}`)}
          >
            {/* Tag */}
            <div style={{ ...styles.tag, backgroundColor: tagColors[car.tag] }}>
              {car.tag}
            </div>

            {/* Image */}
            <div style={styles.imageBox}>
              <img
                src={car.image}
                alt={car.name}
                style={styles.image}
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80'; }}
              />
            </div>

            {/* Info */}
            <div style={styles.info}>
              <div style={styles.topRow}>
                <div>
                  <h3 style={styles.carName}>{car.name}</h3>
                  <p style={styles.brand}>{car.brand}</p>
                </div>
                <div style={styles.ratingBox}>
                  <span style={styles.star}>★</span>
                  <span style={styles.ratingNum}>{car.rating}</span>
                </div>
              </div>

              {/* Specs */}
              <div style={styles.specs}>
                <span style={styles.spec}>
                  <Users size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  {car.seats}
                </span>
                <span style={styles.spec}>
                  <Fuel size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  {car.fuel}
                </span>
                <span style={styles.spec}>
                  <Settings size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  {car.transmission}
                </span>
              </div>

              {/* Price + Button */}
              <div style={styles.bottom}>
                <div>
                  <span style={styles.price}>${car.price}</span>
                  <span style={styles.perDay}>/day</span>
                </div>
                <button
                  style={styles.btn}
                  onClick={e => { e.stopPropagation(); navigate(`/cars/${car.id}`); }}
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={styles.noResult}>
          <p>No cars found. Try a different search or filter.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '100px 48px 60px',
  },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '42px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 8px' },
  subtitle: { fontSize: '16px', color: '#888' },
  searchRow: {
    display: 'flex',
    gap: '16px',
    maxWidth: '700px',
    margin: '0 auto 32px',
  },
  searchInput: {
    flex: 1,
    padding: '14px 20px',
    borderRadius: '30px',
    border: '2px solid #eee',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: 'white',
  },
  sortSelect: {
    padding: '14px 20px',
    borderRadius: '30px',
    border: '2px solid #eee',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  filters: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '40px',
  },
  filterBtn: {
    padding: '8px 22px',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '28px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    border: '1px solid #f0f0f0',
  },
  tag: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '700',
    zIndex: 1,
    letterSpacing: '0.5px',
  },
  imageBox: {
    height: '200px',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  info: { padding: '20px' },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  carName: { fontSize: '17px', fontWeight: '700', color: '#1a1a2e', margin: '0 0 2px' },
  brand: { fontSize: '13px', color: '#888', margin: 0 },
  ratingBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#fff8e1',
    padding: '4px 10px',
    borderRadius: '20px',
  },
  star: { color: '#f39c12', fontSize: '14px' },
  ratingNum: { fontSize: '13px', fontWeight: '700', color: '#333' },
  specs: { display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' },
  spec: {
    fontSize: '12px',
    color: '#555',
    backgroundColor: '#f5f5f5',
    padding: '4px 10px',
    borderRadius: '8px',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #f0f0f0',
    paddingTop: '14px',
  },
  price: { fontSize: '22px', fontWeight: '800', color: '#e94560' },
  perDay: { fontSize: '12px', color: '#888' },
  btn: {
    padding: '8px 18px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  noResult: {
    textAlign: 'center',
    padding: '60px',
    color: '#888',
    fontSize: '18px',
  },
};

export default CarListing;