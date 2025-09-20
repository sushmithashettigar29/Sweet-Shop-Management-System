import API from "./axiosInstance";

export const getSweets = () => API.get("/sweets");
export const searchSweets = (params) => API.get("/sweets/search", { params });
export const addSweet = (data) => API.post("/sweets", data);
export const updateSweet = (id, data) => API.put(`/sweets/${id}`, data);
export const deleteSweet = (id) => API.delete(`/sweets/${id}`);
export const purchaseSweet = (id, quantity) =>
  API.post(`/sweets/${id}/purchase`, { quantity });
export const restockSweet = (id, quantity) =>
  API.post(`/sweets/${id}/restock`, { quantity });
