// ApiService.js
import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000/api', // IMPORTANT: Adjust this to your backend URL
      headers: {
        'Content-Type': 'application/json',
      },
    });

    
    this.authToken = localStorage.getItem('authToken');
    if (this.authToken) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${this.authToken}`;
    }
  }

  
  setAuthToken(token) {
    this.authToken = token;
    localStorage.setItem('authToken', token);
    this.api.defaults.headers.common['Authorization'] = `Bearer ${this.authToken}`;
  }

  
  clearAuthToken() {
    this.authToken = null;
    localStorage.removeItem('authToken');
    delete this.api.defaults.headers.common['Authorization'];
  }

  
  async registerUser(formData) {
    try {
      const response = await this.api.post('/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }

  
  async loginUser(usernameOrEmail, password) {
    try {
      const response = await this.api.post('/login', { username: usernameOrEmail, password }); 
      if (response.data && response.data.accessToken) {
        this.setAuthToken(response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }

  
  async refreshAccessToken() {
    try {
      const response = await this.api.post('/refresh-access-token');
      if (response.data && response.data.accessToken) {
        this.setAuthToken(response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }

  
  async userLogOut() {
    try {
      const response = await this.api.post('/logout');
      this.clearAuthToken(); // Clear token on successful logout
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }

  
  async changePassword(oldPassword, newPassword) {
    try {
      const response = await this.api.post('/change-password', { oldPassword, newPassword });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }

  
  async getCurrentUser() {
    try {
      const response = await this.api.get('/current-user');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }

  
  async changeAccountDetails(details) {
    try {
      const response = await this.api.patch('/change-account-details', details);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }

  
  
  
  async getUserProfile(email) {
    try {
      const response = await this.api.get(`/users/${email}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
}

const apiService = new ApiService();
export default apiService;