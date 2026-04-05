import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Car, BookOpen, Plus, Edit, Trash2, LogOut,
  CheckCircle, XCircle, Clock, Search, RefreshCw,
  TrendingUp, AlertTriangle, ShieldOff, Shield,
  ChevronDown, X, BarChart2, Eye
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

// ─── Reusable Toast ────────────────────────────────────────────
function Toast({ toasts, removeToast }) {
  return (
    <div style={ts.toastStack}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            style={{ ...ts.toast, borderLeft: `4px solid ${t.type === 'success' ? '#10b981' : t.type === 'error' ? '#ef4444' : '#f59e0b'}` }}
          >
            <span style={{ fontSize: '18px' }}>{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : '!'}</span>
            <span style={ts.toastMsg}>{t.msg}</span>
            <button style={ts.toastClose} onClick={() => removeToast(t.id)}>×</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Confirm Modal ─────────────────────────────────────────────
function ConfirmModal({ open, title, desc, onConfirm, onCancel, danger = true }) {
  if (!open) return null;
  return (
    <div style={ts.modalOverlay}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={ts.modal}>
        <div style={{ ...ts.modalIcon, background: danger ? '#fef2f2' : '#eff6ff' }}>
          {danger ? <AlertTriangle size={28} color="#ef4444" /> : <Eye size={28} color="#3b82f6" />}
        </div>
        <h3 style={ts.modalTitle}>{title}</h3>
        <p style={ts.modalDesc}>{desc}</p>
        <div style={ts.modalBtns}>
          <button style={ts.modalCancel} onClick={onCancel}>Cancel</button>
          <button style={{ ...ts.modalConfirm, background: danger ? '#ef4444' : '#3b82f6' }} onClick={onConfirm}>Confirm</button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color, sub }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={ts.statCard}>
      <div style={{ ...ts.statIconWrap, background: color + '18' }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <p style={ts.statVal}>{value ?? '—'}</p>
        <p style={ts.statLabel}>{label}</p>
        {sub && <p style={ts.statSub}>{sub}</p>}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [confirm, setConfirm] = useState(null);
  const [search, setSearch] = useState('');
  const [bookingFilter, setBookingFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');

  // ── Auth guard ────────────────────────────────────────────────
  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) navigate('/admin/login');
  }, [navigate]);

  // ── Toast helpers ─────────────────────────────────────────────
  const addToast = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  }, []);
  const removeToast = (id) => setToasts(p => p.filter(t => t.id !== id));

  // ── Fetch helpers ─────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API_URL}/users`);
      const d = await r.json();
      setUsers(Array.isArray(d) ? d : []);
    } catch { addToast('Failed to fetch users', 'error'); }
    setLoading(false);
  }, [addToast]);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API_URL}/cars`);
      const d = await r.json();
      setCars(Array.isArray(d) ? d : []);
    } catch { addToast('Failed to fetch cars', 'error'); }
    setLoading(false);
  }, [addToast]);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API_URL}/bookings`);
      const d = await r.json();
      setBookings(Array.isArray(d) ? d : []);
    } catch { addToast('Failed to fetch bookings', 'error'); }
    setLoading(false);
  }, [addToast]);

  // Initial load
  useEffect(() => {
    fetchUsers();
    fetchCars();
    fetchBookings();
  }, [fetchUsers, fetchCars, fetchBookings]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearch('');
    if (tab === 'users') fetchUsers();
    if (tab === 'cars') fetchCars();
    if (tab === 'bookings') fetchBookings();
  };

  // ── Booking: Accept / Reject ──────────────────────────────────
  const updateBookingStatus = async (id, status) => {
    try {
      const r = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!r.ok) throw new Error();
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      addToast(`Booking ${status === 'confirmed' ? 'accepted' : 'rejected'} successfully`, 'success');
    } catch {
      addToast('Failed to update booking status', 'error');
    }
  };

  // ── User: Suspend / Unsuspend ─────────────────────────────────
  const toggleUserSuspend = async (user) => {
    const newStatus = user.status === 'suspended' ? 'active' : 'suspended';
    try {
      const r = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!r.ok) throw new Error();
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
      addToast(`User ${newStatus === 'suspended' ? 'suspended' : 'unsuspended'} successfully`,
        newStatus === 'suspended' ? 'warning' : 'success');
    } catch {
      addToast('Failed to update user status', 'error');
    }
  };

  // ── Delete helpers ────────────────────────────────────────────
  const confirmAction = (title, desc, onConfirm, danger = true) => {
    setConfirm({ title, desc, onConfirm, danger });
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
      setUsers(p => p.filter(u => u.id !== id));
      addToast('User deleted', 'success');
    } catch { addToast('Failed to delete user', 'error'); }
  };

  const deleteCar = async (id) => {
    try {
      await fetch(`${API_URL}/cars/${id}`, { method: 'DELETE' });
      setCars(p => p.filter(c => c.id !== id));
      addToast('Car deleted', 'success');
    } catch { addToast('Failed to delete car', 'error'); }
  };

  const deleteBooking = async (id) => {
    try {
      await fetch(`${API_URL}/bookings/${id}`, { method: 'DELETE' });
      setBookings(p => p.filter(b => b.id !== id));
      addToast('Booking deleted', 'success');
    } catch { addToast('Failed to delete booking', 'error'); }
  };

  // ── Stats ─────────────────────────────────────────────────────
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status !== 'suspended').length,
    suspendedUsers: users.filter(u => u.status === 'suspended').length,
    totalCars: cars.length,
    availableCars: cars.filter(c => c.status === 'available').length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    revenue: bookings.filter(b => b.status === 'confirmed').reduce((s, b) => s + Number(b.total_price || 0), 0),
  };

  // ── Filtered data ─────────────────────────────────────────────
  const filteredUsers = users
    .filter(u => userFilter === 'all' || u.status === userFilter)
    .filter(u => !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));

  const filteredBookings = bookings
    .filter(b => bookingFilter === 'all' || b.status === bookingFilter)
    .filter(b => !search || String(b.id).includes(search) || String(b.user_id).includes(search));

  const filteredCars = cars.filter(c =>
    !search || c.name?.toLowerCase().includes(search.toLowerCase()) || c.brand?.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    navigate('/');
  };

  // ── Status badge ──────────────────────────────────────────────
  const BookingBadge = ({ status }) => {
    const map = {
      pending:   { bg: '#fff7ed', color: '#c2410c', icon: <Clock size={12} /> },
      confirmed: { bg: '#f0fdf4', color: '#15803d', icon: <CheckCircle size={12} /> },
      cancelled: { bg: '#fef2f2', color: '#b91c1c', icon: <XCircle size={12} /> },
      rejected:  { bg: '#fef2f2', color: '#b91c1c', icon: <XCircle size={12} /> },
      completed: { bg: '#eff6ff', color: '#1d4ed8', icon: <CheckCircle size={12} /> },
    };
    const c = map[status?.toLowerCase()] || map.pending;
    return (
      <span style={{ ...ts.badge, background: c.bg, color: c.color }}>
        {c.icon} {status}
      </span>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════
  return (
    <div style={ts.page}>
      <Toast toasts={toasts} removeToast={removeToast} />
      <ConfirmModal
        open={!!confirm}
        title={confirm?.title}
        desc={confirm?.desc}
        danger={confirm?.danger}
        onConfirm={() => { confirm?.onConfirm(); setConfirm(null); }}
        onCancel={() => setConfirm(null)}
      />

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside style={ts.sidebar}>
        <div style={ts.sidebarBrand}>
          <Car size={22} color="#e94560" />
          <span style={ts.brandText}>CarRental</span>
          <span style={ts.adminPill}>Admin</span>
        </div>

        <nav style={ts.nav}>
          {[
            { id: 'overview',  label: 'Overview',  icon: BarChart2 },
            { id: 'users',     label: 'Users',     icon: Users },
            { id: 'cars',      label: 'Cars',       icon: Car },
            { id: 'bookings',  label: 'Bookings',  icon: BookOpen },
          ].map(item => (
            <button
              key={item.id}
              style={{ ...ts.navItem, ...(activeTab === item.id ? ts.navActive : {}) }}
              onClick={() => handleTabChange(item.id)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {item.id === 'bookings' && stats.pendingBookings > 0 && (
                <span style={ts.navBadge}>{stats.pendingBookings}</span>
              )}
            </button>
          ))}
        </nav>

        <div style={ts.sidebarFooter}>
          <p style={ts.adminEmail}>{localStorage.getItem('adminEmail') || 'admin@carrental.com'}</p>
          <button style={ts.logoutBtn} onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────── */}
      <main style={ts.main}>

        {/* Top bar */}
        <div style={ts.topBar}>
          <div>
            <h1 style={ts.pageTitle}>
              {activeTab === 'overview' ? 'Overview' :
               activeTab === 'users' ? 'User Management' :
               activeTab === 'cars' ? 'Fleet Management' : 'Booking Management'}
            </h1>
            <p style={ts.pageSubtitle}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button style={ts.refreshBtn} onClick={() => { fetchUsers(); fetchCars(); fetchBookings(); }}>
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        <AnimatePresence mode="wait">

          {/* ── OVERVIEW TAB ─────────────────────────────────── */}
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

              <div style={ts.statsGrid}>
                <StatCard label="Total Users"      value={stats.totalUsers}      icon={Users}      color="#6366f1" sub={`${stats.suspendedUsers} suspended`} />
                <StatCard label="Available Cars"   value={stats.availableCars}   icon={Car}        color="#10b981" sub={`of ${stats.totalCars} total`} />
                <StatCard label="Pending Bookings" value={stats.pendingBookings} icon={Clock}      color="#f59e0b" sub="Needs action" />
                <StatCard label="Revenue (Confirmed)" value={`₹${stats.revenue.toLocaleString('en-IN')}`} icon={TrendingUp} color="#e94560" sub={`${stats.confirmedBookings} confirmed`} />
              </div>

              {/* Recent bookings needing action */}
              <div style={ts.card}>
                <div style={ts.cardHeader}>
                  <h3 style={ts.cardTitle}>Pending Bookings — Action Required</h3>
                  <button style={ts.viewAllBtn} onClick={() => handleTabChange('bookings')}>View all →</button>
                </div>
                {bookings.filter(b => b.status === 'pending').length === 0 ? (
                  <div style={ts.empty}>
                    <CheckCircle size={32} color="#10b981" />
                    <p>All bookings are up to date!</p>
                  </div>
                ) : (
                  <div style={ts.miniList}>
                    {bookings.filter(b => b.status === 'pending').slice(0, 5).map(b => (
                      <div key={b.id} style={ts.miniRow}>
                        <div>
                          <p style={ts.miniTitle}>Booking #{b.id} — User #{b.user_id}</p>
                          <p style={ts.miniSub}>{b.start_date} → {b.end_date} · ₹{b.total_price}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button style={ts.acceptBtn} onClick={() => updateBookingStatus(b.id, 'confirmed')}>
                            <CheckCircle size={14} /> Accept
                          </button>
                          <button style={ts.rejectBtn} onClick={() => updateBookingStatus(b.id, 'rejected')}>
                            <XCircle size={14} /> Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Suspended users */}
              <div style={ts.card}>
                <div style={ts.cardHeader}>
                  <h3 style={ts.cardTitle}>Suspended Users</h3>
                  <button style={ts.viewAllBtn} onClick={() => handleTabChange('users')}>Manage →</button>
                </div>
                {users.filter(u => u.status === 'suspended').length === 0 ? (
                  <div style={ts.empty}><Shield size={28} color="#10b981" /><p>No suspended users</p></div>
                ) : (
                  <div style={ts.miniList}>
                    {users.filter(u => u.status === 'suspended').map(u => (
                      <div key={u.id} style={ts.miniRow}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={ts.avatarChip}>{u.name?.[0]?.toUpperCase() || 'U'}</div>
                          <div>
                            <p style={ts.miniTitle}>{u.name}</p>
                            <p style={ts.miniSub}>{u.email}</p>
                          </div>
                        </div>
                        <button style={ts.unsuspendBtn} onClick={() => toggleUserSuspend(u)}>
                          <Shield size={14} /> Unsuspend
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── USERS TAB ─────────────────────────────────────── */}
          {activeTab === 'users' && (
            <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

              <div style={ts.toolbar}>
                <div style={ts.searchWrap}>
                  <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input style={ts.searchInput} placeholder="Search by name or email…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div style={ts.filterWrap}>
                  {['all', 'active', 'suspended'].map(f => (
                    <button key={f} style={{ ...ts.filterChip, ...(userFilter === f ? ts.filterChipActive : {}) }} onClick={() => setUserFilter(f)}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
                <span style={ts.countBadge}>{filteredUsers.length} users</span>
              </div>

              {loading ? <div style={ts.loading}><RefreshCw size={22} color="#e94560" style={{ animation: 'spin 1s linear infinite' }} /> Loading…</div> : (
                <div style={ts.card}>
                  <table style={ts.table}>
                    <thead>
                      <tr style={ts.thead}>
                        {['ID', 'User', 'Email', 'Phone', 'Status', 'Joined', 'Actions'].map(h => (
                          <th key={h} style={ts.th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr><td colSpan={7} style={ts.emptyCell}>No users found</td></tr>
                      ) : filteredUsers.map((user, i) => (
                        <tr key={user.id} style={{ ...ts.tr, background: i % 2 === 0 ? '#fafafa' : 'white' }}>
                          <td style={ts.td}><span style={ts.idChip}>#{user.id}</span></td>
                          <td style={ts.td}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ ...ts.avatarChip, background: user.status === 'suspended' ? '#fecaca' : '#dbeafe', color: user.status === 'suspended' ? '#b91c1c' : '#1d4ed8' }}>
                                {user.name?.[0]?.toUpperCase() || 'U'}
                              </div>
                              <span style={ts.userName}>{user.name}</span>
                            </div>
                          </td>
                          <td style={ts.td}>{user.email}</td>
                          <td style={ts.td}>{user.phone || '—'}</td>
                          <td style={ts.td}>
                            <span style={{
                              ...ts.badge,
                              background: user.status === 'suspended' ? '#fef2f2' : '#f0fdf4',
                              color: user.status === 'suspended' ? '#b91c1c' : '#15803d',
                            }}>
                              {user.status === 'suspended' ? <ShieldOff size={12} /> : <Shield size={12} />}
                              {user.status === 'suspended' ? 'Suspended' : 'Active'}
                            </span>
                          </td>
                          <td style={ts.td}>{user.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}</td>
                          <td style={ts.td}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              {/* Suspend / Unsuspend */}
                              <button
                                title={user.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                                style={user.status === 'suspended' ? ts.unsuspendBtn : ts.suspendBtn}
                                onClick={() => confirmAction(
                                  user.status === 'suspended' ? 'Unsuspend User' : 'Suspend User',
                                  user.status === 'suspended'
                                    ? `Restore access for ${user.name}?`
                                    : `Suspend ${user.name}? They won't be able to log in.`,
                                  () => toggleUserSuspend(user),
                                  user.status !== 'suspended'
                                )}
                              >
                                {user.status === 'suspended' ? <><Shield size={14} /> Unsuspend</> : <><ShieldOff size={14} /> Suspend</>}
                              </button>
                              {/* Delete */}
                              <button
                                title="Delete User"
                                style={ts.iconDeleteBtn}
                                onClick={() => confirmAction('Delete User', `Permanently delete ${user.name}? This cannot be undone.`, () => deleteUser(user.id))}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* ── CARS TAB ──────────────────────────────────────── */}
          {activeTab === 'cars' && (
            <motion.div key="cars" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

              <div style={ts.toolbar}>
                <div style={ts.searchWrap}>
                  <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input style={ts.searchInput} placeholder="Search by name or brand…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <span style={ts.countBadge}>{filteredCars.length} cars</span>
                <button style={ts.addBtn}>
                  <Plus size={16} /> Add Car
                </button>
              </div>

              {loading ? <div style={ts.loading}><RefreshCw size={22} color="#e94560" style={{ animation: 'spin 1s linear infinite' }} /> Loading…</div> : (
                <div style={ts.card}>
                  <table style={ts.table}>
                    <thead>
                      <tr style={ts.thead}>
                        {['ID', 'Name', 'Brand', 'Price/Day', 'Status', 'Actions'].map(h => (
                          <th key={h} style={ts.th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCars.length === 0 ? (
                        <tr><td colSpan={6} style={ts.emptyCell}>No cars found</td></tr>
                      ) : filteredCars.map((car, i) => (
                        <tr key={car.id} style={{ ...ts.tr, background: i % 2 === 0 ? '#fafafa' : 'white' }}>
                          <td style={ts.td}><span style={ts.idChip}>#{car.id}</span></td>
                          <td style={ts.td}><span style={ts.userName}>{car.name}</span></td>
                          <td style={ts.td}>{car.brand}</td>
                          <td style={ts.td}><span style={ts.priceTag}>₹{car.price_per_day}/day</span></td>
                          <td style={ts.td}>
                            <span style={{
                              ...ts.badge,
                              background: car.status === 'available' ? '#f0fdf4' : '#fff7ed',
                              color: car.status === 'available' ? '#15803d' : '#c2410c',
                            }}>
                              {car.status}
                            </span>
                          </td>
                          <td style={ts.td}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button style={ts.iconEditBtn} title="Edit"><Edit size={14} /></button>
                              <button
                                style={ts.iconDeleteBtn}
                                title="Delete"
                                onClick={() => confirmAction('Delete Car', `Delete ${car.name}? This cannot be undone.`, () => deleteCar(car.id))}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* ── BOOKINGS TAB ──────────────────────────────────── */}
          {activeTab === 'bookings' && (
            <motion.div key="bookings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

              <div style={ts.toolbar}>
                <div style={ts.searchWrap}>
                  <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input style={ts.searchInput} placeholder="Search by booking ID or user ID…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div style={ts.filterWrap}>
                  {['all', 'pending', 'confirmed', 'rejected', 'completed', 'cancelled'].map(f => (
                    <button key={f} style={{ ...ts.filterChip, ...(bookingFilter === f ? ts.filterChipActive : {}) }} onClick={() => setBookingFilter(f)}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
                <span style={ts.countBadge}>{filteredBookings.length} bookings</span>
              </div>

              {loading ? <div style={ts.loading}><RefreshCw size={22} color="#e94560" style={{ animation: 'spin 1s linear infinite' }} /> Loading…</div> : (
                <div style={ts.card}>
                  <table style={ts.table}>
                    <thead>
                      <tr style={ts.thead}>
                        {['ID', 'User', 'Car', 'Dates', 'Total', 'Status', 'Actions'].map(h => (
                          <th key={h} style={ts.th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.length === 0 ? (
                        <tr><td colSpan={7} style={ts.emptyCell}>No bookings found</td></tr>
                      ) : filteredBookings.map((b, i) => (
                        <tr key={b.id} style={{ ...ts.tr, background: i % 2 === 0 ? '#fafafa' : 'white' }}>
                          <td style={ts.td}><span style={ts.idChip}>#{b.id}</span></td>
                          <td style={ts.td}>
                            <span style={ts.userLink}>User #{b.user_id}</span>
                          </td>
                          <td style={ts.td}>Car #{b.car_id}</td>
                          <td style={ts.td}>
                            <span style={ts.datePill}>{b.start_date}</span>
                            <span style={{ color: '#9ca3af', margin: '0 4px' }}>→</span>
                            <span style={ts.datePill}>{b.end_date}</span>
                          </td>
                          <td style={ts.td}><strong>₹{b.total_price}</strong></td>
                          <td style={ts.td}><BookingBadge status={b.status} /></td>
                          <td style={ts.td}>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {/* Accept/Reject only for pending */}
                              {b.status === 'pending' && (
                                <>
                                  <button
                                    style={ts.acceptBtn}
                                    onClick={() => confirmAction(
                                      'Accept Booking',
                                      `Confirm booking #${b.id} for User #${b.user_id}?`,
                                      () => updateBookingStatus(b.id, 'confirmed'),
                                      false
                                    )}
                                  >
                                    <CheckCircle size={13} /> Accept
                                  </button>
                                  <button
                                    style={ts.rejectBtn}
                                    onClick={() => confirmAction(
                                      'Reject Booking',
                                      `Reject booking #${b.id}? The user will be notified.`,
                                      () => updateBookingStatus(b.id, 'rejected')
                                    )}
                                  >
                                    <XCircle size={13} /> Reject
                                  </button>
                                </>
                              )}
                              {/* Delete */}
                              <button
                                style={ts.iconDeleteBtn}
                                title="Delete"
                                onClick={() => confirmAction('Delete Booking', `Delete booking #${b.id}? This cannot be undone.`, () => deleteBooking(b.id))}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const ts = {
  page: { display: 'flex', minHeight: '100vh', background: '#f1f5f9', fontFamily: "'DM Sans', sans-serif" },

  // Sidebar
  sidebar: { width: '240px', background: '#0f172a', display: 'flex', flexDirection: 'column', padding: '24px 16px', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 100 },
  sidebarBrand: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '36px', paddingLeft: '4px' },
  brandText: { fontSize: '18px', fontWeight: '800', color: 'white' },
  adminPill: { fontSize: '10px', background: '#e94560', color: 'white', borderRadius: '20px', padding: '2px 8px', fontWeight: '700', letterSpacing: '0.5px' },
  nav: { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 },
  navItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '14px', fontWeight: '500', textAlign: 'left', transition: 'all 0.2s', position: 'relative' },
  navActive: { background: '#1e293b', color: 'white' },
  navBadge: { marginLeft: 'auto', background: '#e94560', color: 'white', borderRadius: '20px', fontSize: '11px', fontWeight: '700', padding: '1px 7px' },
  sidebarFooter: { borderTop: '1px solid #1e293b', paddingTop: '16px' },
  adminEmail: { fontSize: '12px', color: '#475569', marginBottom: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  logoutBtn: { display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '9px 14px', background: '#1e293b', color: '#f87171', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' },

  // Main
  main: { marginLeft: '240px', flex: 1, padding: '32px', minHeight: '100vh' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' },
  pageTitle: { fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: 0 },
  pageSubtitle: { fontSize: '13px', color: '#94a3b8', marginTop: '2px' },
  refreshBtn: { display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '8px', color: '#475569', fontSize: '13px', fontWeight: '600', cursor: 'pointer' },

  // Stats
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' },
  statCard: { background: 'white', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  statIconWrap: { width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  statVal: { fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: 0 },
  statLabel: { fontSize: '12px', color: '#64748b', margin: 0 },
  statSub: { fontSize: '11px', color: '#94a3b8', margin: 0 },

  // Card
  card: { background: 'white', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden', marginBottom: '20px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid #f1f5f9' },
  cardTitle: { fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: 0 },
  viewAllBtn: { fontSize: '13px', color: '#e94560', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' },

  // Mini list (overview)
  miniList: { padding: '8px 0' },
  miniRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #f8fafc' },
  miniTitle: { fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: 0 },
  miniSub: { fontSize: '12px', color: '#94a3b8', margin: '2px 0 0' },

  empty: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '32px', color: '#94a3b8', fontSize: '14px' },

  // Toolbar
  toolbar: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' },
  searchWrap: { position: 'relative', flex: 1, minWidth: '200px' },
  searchInput: { width: '100%', padding: '9px 12px 9px 36px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '13px', background: 'white', outline: 'none', boxSizing: 'border-box' },
  filterWrap: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  filterChip: { padding: '7px 13px', borderRadius: '20px', border: '1.5px solid #e2e8f0', background: 'white', color: '#64748b', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
  filterChipActive: { background: '#0f172a', color: 'white', border: '1.5px solid #0f172a' },
  countBadge: { fontSize: '12px', color: '#94a3b8', fontWeight: '600', whiteSpace: 'nowrap' },
  addBtn: { display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: '#e94560', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' },

  // Table
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' },
  th: { padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' },
  tr: { borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' },
  td: { padding: '13px 16px', fontSize: '13px', color: '#334155', verticalAlign: 'middle' },
  emptyCell: { padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' },
  loading: { display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', padding: '48px', color: '#94a3b8', fontSize: '15px' },

  // Chips & badges
  idChip: { background: '#f1f5f9', color: '#64748b', borderRadius: '6px', padding: '3px 8px', fontSize: '12px', fontWeight: '700' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' },
  userName: { fontWeight: '600', color: '#1e293b' },
  userLink: { color: '#6366f1', fontWeight: '600' },
  priceTag: { background: '#f0fdf4', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' },
  datePill: { background: '#f8fafc', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' },
  avatarChip: { width: '32px', height: '32px', borderRadius: '50%', background: '#dbeafe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0 },

  // Action buttons
  acceptBtn: { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' },
  rejectBtn:  { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' },
  suspendBtn: { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' },
  unsuspendBtn: { display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' },
  iconDeleteBtn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '6px 8px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: '6px', cursor: 'pointer' },
  iconEditBtn:   { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '6px 8px', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', borderRadius: '6px', cursor: 'pointer' },

  // Toast
  toastStack: { position: 'fixed', top: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 9999 },
  toast: { background: 'white', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', minWidth: '260px', maxWidth: '360px' },
  toastMsg: { flex: 1, fontSize: '13px', fontWeight: '500', color: '#1e293b' },
  toastClose: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#94a3b8', padding: 0, lineHeight: 1 },

  // Confirm modal
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998 },
  modal: { background: 'white', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' },
  modalIcon: { width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
  modalTitle: { fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' },
  modalDesc: { fontSize: '14px', color: '#64748b', margin: '0 0 24px', lineHeight: 1.6 },
  modalBtns: { display: 'flex', gap: '10px', justifyContent: 'center' },
  modalCancel: { padding: '10px 24px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' },
  modalConfirm: { padding: '10px 24px', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' },
};