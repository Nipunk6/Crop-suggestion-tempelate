// ApiService.js
import api from "../api/axios.ts";

class ApiService {
  constructor() {
    this.api = api; 
  }

  async registerUser(formData) {
    const res = await this.api.post("/user/register", formData);
    return res.data;
  }

  async loginUser(email, password) {
    const res = await this.api.post("/user/login", {
      email,
      password,
    });
    return res.data;
  }

  async refreshAccessToken() {
    const res = await this.api.post("/user/refresh-access-token");
    return res.data;
  }

  async userLogOut() {
    const res = await this.api.post("/user/logout");
    return res.data;
  }

  async changePassword(oldPassword, newPassword) {
    const res = await this.api.post("/user/change-password", {
      oldPassword,
      newPassword,
    });
    return res.data;
  }

  async getCurrentUser() {
    const res = await this.api.get("/user/current-user");
    return res.data;
  }

  async changeAccountDetails(details) {
    const res = await this.api.patch(
      "/user/change-account-details",
      details
    );
    return res.data;
  }

  async changeAvatar(formData) {
    const res = await this.api.patch(
      "/user/change-avatar",
      formData
    );
    return res.data;
  }

  async forgotPassword(email) {
    const res = await this.api.post("/user/forgot-password", {
      email,
    });
    return res.data;
  }

  async resetPassword(token, newPassword) {
    const res = await this.api.post("/user/reset-password", {
      token,
      newPassword,
    });
    return res.data;
  }
}

export default new ApiService();
