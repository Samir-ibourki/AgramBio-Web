import api from "./axios";

export const loginUser = async (credentials) => {
  return await api.post("/auth/login", credentials);
};

export const registerUser = async (userData) => {
  return await api.post("/auth/register", userData);
};

export const getMe = async (token) => {
  return await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getUserOrders = async (token) => {
  return await api.get("/orders", {
    headers: { Authorization: `Bearer ${token}` }
  });
};
