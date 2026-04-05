const API_BASE_URL = 'http://localhost:5000/api';

// Cars API
export const fetchAllCars = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching cars:', error);
  }
};

export const fetchCarById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching car:', error);
  }
};

// Users API
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

// Bookings API
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating booking:', error);
  }
};

export const fetchAllBookings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};
