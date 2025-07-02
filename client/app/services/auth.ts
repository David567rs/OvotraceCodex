// src/services/auth.ts
import api from "./axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "token";

// Login
export const loginRequest = async (email: string, password: string) => {
  console.log("📡 loginRequest ejecutándose...");
  const res = await api.post("/login", { email, password });
  const token: string | undefined = res.data.token;
  if (token) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log("Token guardado en AsyncStorage");
  }
  return res.data;
};

// Registro
export const registerRequest = async (
  username: string,
  email: string,
  password: string
) => {
  console.log("📡 registerRequest ejecutándose...");
  const res = await api.post("/register", { username, email, password });
  const token: string | undefined = res.data.token;
  if (token) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log("Token guardado en AsyncStorage");
  }
  return res.data;
};

// Obtener perfil (usa el interceptor para añadir el token)
export const getProfile = async () => {
  // Si quieres validar antes de la llamada:
  // const token = await AsyncStorage.getItem(TOKEN_KEY);
  // if (!token) throw new Error("Token no encontrado");
  const res = await api.get("/profile");
  return res.data;
};

// Logout
export const logoutRequest = async () => {
  console.log("🔒 logoutRequest ejecutándose...");
  await AsyncStorage.removeItem(TOKEN_KEY);
  try {
    await api.post("/logout");
    console.log("Notificado al backend y token eliminado");
  } catch (err) {
    console.warn("Error notificando logout al backend, pero el token ya se eliminó");
  }
};
