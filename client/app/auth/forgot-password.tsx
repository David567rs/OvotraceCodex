import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { enviarCorreoRecuperacion } from "../services/recovery";
import { router } from "expo-router";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const handleEnviar = async () => {
    if (!email.trim()) return Alert.alert("Error", "Ingresa un correo válido");
    try {
      await enviarCorreoRecuperacion(email.trim());
      Alert.alert("Éxito", "Revisa tu correo");
      router.push({ pathname: "/auth/token-confirm", params: { email } });
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "No se pudo enviar");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="usuario@ejemplo.com"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar código</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  label: { fontSize: 16, marginBottom: 8, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#b1762d",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#D68D3B",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
