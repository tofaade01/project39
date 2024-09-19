// eslint-disable-next-line
import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class AuthService {
  // Login the user and store token in localStorage
  async login(user) {
    try {
      const response = await axios.post(`${API_URL}user/login`, {
        email: user.email,
        password: user.password,
      });
      const loginTime = new Date().getTime();
      console.log(loginTime);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('loginTime', loginTime);
      }
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : 'Login failed'
      );
    }
  }

  // Logout user and remove token from localStorage
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
  }

  // Register the user
  async register(user) {
    try {
      const response = await axios.post(`${API_URL}register`, {
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : 'Registration failed'
      );
    }
  }

  isTokenExpired() {
    const loginTime = localStorage.getItem('loginTime');
    if (loginTime) {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - loginTime; // Time elapsed since login (in milliseconds)
      const thirtyMinutes = 30 * 60 * 1000;
      return elapsedTime > thirtyMinutes;
    }
    return true; // If there's no loginTime, consider token expired
  }
  setToken(token) {
    localStorage.setItem('token', token);
  }

  // Utility to store user info in localStorage
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Retrieve token from localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Retrieve user info from localStorage
  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // Check if the user is logged in (valid token)
  isAuthenticated() {
    return !!this.getToken() && !this.isTokenExpired();
  }

  // Get axios headers with Authorization token
  getAuthHeader() {
    const token = this.getToken();
    if (token && !this.isTokenExpired()) {
      return { Authorization: `Bearer ${token}` };
    } else {
      this.logout();
      return {};
    }
  }
}
// eslint-disable-next-line
export default new AuthService();
