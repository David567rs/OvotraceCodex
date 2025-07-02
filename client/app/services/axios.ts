import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { InternalAxiosRequestConfig } from "axios";

const TOKEN_KEY = "token";

const api = axios.create({
  baseURL: "http://192.168.206.217:4000/api",
  headers: { "Content-Type": "application/json" },
});

// INTERCEPTOR
api.interceptors.request.use(
  // deja que TS infiera o usa el tipo interno correcto:
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem(TOKEN_KEY);
      console.warn("Token inválido o expirado – usuario deslogueado");
    }
    return Promise.reject(error);
  }
);

export default api;

