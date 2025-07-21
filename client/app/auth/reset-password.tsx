import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "../services/axios";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email, token } = useLocalSearchParams<{
    email: string;
    token: string;
  }>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Validaciones
  const isMinLength = newPassword.length >= 6;
  const hasNumber = /\d/.test(newPassword);
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      return Alert.alert("Error", "Completa todos los campos");
    }
    if (newPassword !== confirmPassword) {
      return Alert.alert("Error", "Las contraseñas no coinciden");
    }
    if (!isMinLength || !hasNumber || !hasUpper || !hasLower) {
      return Alert.alert("Error", "La contraseña no cumple los requisitos");
    }
    try {
      await api.post("/reset-password", {
        email,
        token,
        password: newPassword,
      });
      Alert.alert("Éxito", "Contraseña actualizada correctamente", [
        { text: "OK", onPress: () => router.push("/auth/login") },
      ]);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Error al restablecer contraseña"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cambiar contraseña</Text>
      <Text style={styles.emailLabel}>Correo: {email}</Text>

      {/* Campo: Nueva contraseña con ojo */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nueva contraseña"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#666"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>

      {/* Requisitos */}
      <View style={styles.requirements}>
        <Text
          style={[
            styles.requirement,
            isMinLength ? styles.valid : styles.invalid,
          ]}
        >
          • Mínimo 6 caracteres
        </Text>
        <Text
          style={[
            styles.requirement,
            hasNumber ? styles.valid : styles.invalid,
          ]}
        >
          • Contiene un número
        </Text>
        <Text
          style={[styles.requirement, hasUpper ? styles.valid : styles.invalid]}
        >
          • Letra mayúscula
        </Text>
        <Text
          style={[styles.requirement, hasLower ? styles.valid : styles.invalid]}
        >
          • Letra minúscula
        </Text>
      </View>

      {/* Campo: Confirmar contraseña con ojo */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Confirmar contraseña"
          placeholderTextColor="#999"
          secureTextEntry={!showConfirm}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Ionicons
            name={showConfirm ? "eye-off" : "eye"}
            size={24}
            color="#666"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Cambiar contraseña</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 500, // <-- aquí lo subimos para que arranque más abajo
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  emailLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#b1762d",
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
  },
  requirements: {
    marginBottom: 20,
  },
  requirement: {
    fontSize: 14,
    marginLeft: 4,
  },
  valid: {
    color: "green",
  },
  invalid: {
    color: "red",
  },
  button: {
    backgroundColor: "#D68D3B",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
