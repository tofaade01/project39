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
      console.log(response.data)
      if (response.data.accessToken) {
        this.setToken(response.data.accessToken);
        this.setUser(user);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Login failed');
    }
  }

  // Logout user and remove token from localStorage
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  // Register the user
  async register(user) {
    try {
      const response = await axios.post(`${API_URL}users`, {
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Registration failed');
    }
  }

  // Utility to store token in localStorage
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
    return !!this.getToken();
  }

  // Get axios headers with Authorization token
  getAuthHeader() {
    const token = this.getToken();
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  }
}
// eslint-disable-next-line
export default new AuthService();
