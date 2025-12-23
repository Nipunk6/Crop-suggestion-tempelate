import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach(p => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // 🚫 Do not retry refresh endpoint itself
    if (originalRequest.url?.includes("/user/refresh-access-token")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        await api.post("/user/refresh-access-token");
        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        
        // ⚠️ REMOVE THIS LINE: await api.post("/user/logout"); 
        // (The session is likely already dead if refresh failed)
        
        // ❌ CRITICAL FIX: REMOVE THIS. 
        // window.location.reload(); 
        
        // Just reject. The App.tsx "catch" block will handle the UI state (showing login modal)
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
