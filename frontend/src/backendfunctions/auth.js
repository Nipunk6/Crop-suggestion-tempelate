// ApiService.js
import axios from "axios";

const BASE_PROXY = "/api/v1/user"; // use Vite proxy in dev
const BASE_FALLBACK = import.meta.env.VITE_API_URL || "http://localhost:7007/api/v1/user";

class ApiService {
  constructor() {
    // If you want to use custom VITE_API_URL in prod, set it in .env
    const baseURL = import.meta.env.DEV ? BASE_PROXY : BASE_FALLBACK;

    this.api = axios.create({
      baseURL,
      withCredentials: true, // send & receive cookies (if backend sets httpOnly cookies)
      // Do not force Content-Type here — let requests (esp. FormData) set it when needed.
    });

    // If you want to include a stored auth token in Authorization header too:
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    }
  }

  setAuthToken(token) {
    if (!token) return;
    localStorage.setItem("authToken", token);
    this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  clearAuthToken() {
    localStorage.removeItem("authToken");
    delete this.api.defaults.headers.common["Authorization"];
  }

  async registerUser(formData) {
    try {
      // IMPORTANT: do NOT set Content-Type manually for FormData.
      const response = await this.api.post("/register", formData);
      return response.data;
    } catch (error) {
      // Normalize errors: return server response body if present, else message
      if (error?.response?.data) throw error.response.data;
      throw { message: error.message || "Network or request error" };
    }
  }

  async loginUser(usernameOrEmail, password) {
    try {
      const response = await this.api.post("/login", {
        email: usernameOrEmail,
        password,
      });
      // If server returns tokens in JSON, store them
      if (response?.data?.accessToken) {
        this.setAuthToken(response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: error.message || "Network or request error" };
    }
  }

  async refreshAccessToken() {
    try {
      const response = await this.api.post("/refresh-access-token");
      if (response?.data?.accessToken) {
        this.setAuthToken(response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: error.message || "Network or request error" };
    }
  }

  async userLogOut() {
    try {
      const response = await this.api.post("/logout");
      this.clearAuthToken();
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: error.message || "Network or request error" };
    }
  }

  async changePassword(oldPassword, newPassword) {
    try {
      const response = await this.api.post("/change-password", {
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: error.message || "Network or request error" };
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.api.get("/current-user");
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: error.message || "Network or request error" };
    }
  }

  async changeAccountDetails(details) {
    try {
      const response = await this.api.patch("/change-account-details", details);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: error.message || "Network or request error" };
    }
  }

  async changeAvatar(formData) {
    try {
      const response = await this.api.patch("/change-avatar", formData);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: error.message || "Network or request error" };
    }
  }

  async getUserProfile(email) {
    try {
      const response = await this.api.get(`/users/${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: error.message || "Network or request error" };
    }
  }
}

const apiService = new ApiService();
export default apiService;
