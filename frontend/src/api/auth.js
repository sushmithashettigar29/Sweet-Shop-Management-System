import API from "./axiosInstance";

export const registerUser = (username, password, role = "user") =>
  API.post("/auth/register", { username, password, role });

export const loginUser = (username, password) =>
  API.post("/auth/login", { username, password });
