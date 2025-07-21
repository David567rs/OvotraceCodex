// src/services/auth.ts
import api from "./axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "token";

/**
 * Inicia sesión con email y contraseña.
 * Almacena el token devuelto en AsyncStorage.
 *
 * @param email - Correo del usuario
 * @param password - Contraseña del usuario
 * @returns Los datos de la respuesta (incluyendo token)
 */
export const loginRequest = async (
  email: string,
  password: string
): Promise<any> => {
  console.log("📡 loginRequest =>", { email, password });
  const res = await api.post("/login", { email, password });
  console.log("🔑 loginResponse =>", res.status, res.data);

  const token: string | undefined = res.data.token;
  if (token) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log("Token guardado en AsyncStorage");
  }

  return res.data;
};

/**
 * Registra un nuevo usuario (cliente o granja).
 * No guarda token automáticamente (descomenta si tu API lo devuelve).
 *
 * @param username - Nombre del usuario o razón social
 * @param email - Correo del usuario
 * @param password - Contraseña deseada
 * @param role - "cliente" o "granja"
 * @returns Los datos de la respuesta
 */
export const registerRequest = async (
  username: string,
  email: string,
  password: string,
  role: "cliente" | "productor"
): Promise<any> => {
  console.log(" registerRequest =>", { username, email, role });
  // elegimos la ruta adecuada
  const endpoint = role === "productor"
    ? "/register/productor"
    : "/register/cliente";
  
    const res = await api.post(endpoint, {
    username,
    email,
    password,
    // ya no es necesario enviar role aquí porque la ruta lo asigna
  });

  console.log(" registerResponse =>", res.status, res.data);


  return res.data;
};

/**
 * Obtiene el perfil del usuario autenticado.
 * Usa el interceptor para añadir el token al header.
 *
 * @returns Los datos de perfil
 */
export const getProfile = async (): Promise<any> => {
  console.log(" getProfile => llamando a /profile");
  const res = await api.get("/profile");
  console.log(" profileResponse =>", res.status, res.data);
  return res.data;
};

/**
 * Cierra sesión:
 * - Elimina el token local
 * - Notifica al backend
 */
export const logoutRequest = async (): Promise<void> => {
  console.log(" logoutRequest => eliminando token local");
  await AsyncStorage.removeItem(TOKEN_KEY);
  try {
    const res = await api.post("/logout");
    console.log(" logoutResponse =>", res.status);
  } catch (err) {
    console.warn(
      "⚠️ logoutRequest aviso: error notificando al backend, token ya eliminado",
      err
    );
  }
};
