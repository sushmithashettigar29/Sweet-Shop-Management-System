import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-nine-zeta-55.vercel.app/api", // your backend base URL
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
