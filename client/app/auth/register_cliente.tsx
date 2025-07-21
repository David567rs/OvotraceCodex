// app/auth/register_cliente.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { registerRequest } from "../../app/services/auth";

export default function RegisterClient() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Validaciones de contraseña
  const isMinLength = password.length >= 6;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirm) {
      return Alert.alert("Error", "Por favor completa todos los campos.");
    }
    if (password !== confirm) {
      return Alert.alert("Error", "Las contraseñas no coinciden.");
    }
    if (!isMinLength || !hasNumber || !hasUppercase || !hasLowercase) {
      return Alert.alert("Error", "La contraseña no cumple los requisitos.");
    }
    try {
      await registerRequest(name, email, password, "cliente");
      Alert.alert("¡Listo!", "Revisa tu correo para verificar tu cuenta.", [
        {
          text: "OK",
          onPress: () =>
            router.push({
              pathname: "/auth/verify-email",
              params: { email },
            }),
        },
      ]);
    } catch (err: any) {
      console.error(err.response || err);
      const msg = err.response?.data?.message || "Error registrando cliente.";
      Alert.alert("Error", msg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Flecha atrás */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={22} color="#D68D3B" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header centrado */}
        <View style={styles.header}>
          <Text style={styles.title}>Registro Cliente</Text>
          <Text style={styles.subtitle}>Crea tu cuenta para continuar</Text>
        </View>

        {/* Nombre */}
        <Text style={styles.label}>Nombre</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Tu nombre"
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        {/* Correo */}
        <Text style={styles.label}>Correo</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="email@dominio.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        {/* Contraseña */}
        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="6+ caracteres"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Requisitos */}
        <View style={styles.requirements}>
          <Text
            style={[styles.req, isMinLength ? styles.valid : styles.invalid]}
          >
            • Mínimo 6 caracteres
          </Text>
          <Text style={[styles.req, hasNumber ? styles.valid : styles.invalid]}>
            • Contiene un número
          </Text>
          <Text
            style={[styles.req, hasUppercase ? styles.valid : styles.invalid]}
          >
            • Letra mayúscula
          </Text>
          <Text
            style={[styles.req, hasLowercase ? styles.valid : styles.invalid]}
          >
            • Letra minúscula
          </Text>
        </View>

        {/* Confirmar contraseña */}
        <Text style={styles.label}>Confirmar contraseña</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={confirm}
            onChangeText={setConfirm}
            placeholder="Repite la contraseña"
            placeholderTextColor="#999"
            secureTextEntry={!showConfirm}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowConfirm((v) => !v)}>
            <Ionicons
              name={showConfirm ? "eye-off" : "eye"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Botón */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Text style={styles.link}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  backButton: {
    position: "absolute",
    top: 48,
    left: 20,
    padding: 8,
    zIndex: 1,
  },
  scroll: { paddingHorizontal: 24, paddingTop: 80, paddingBottom: 40 },

  header: { alignItems: "center", marginBottom: 32 },
  title: { fontSize: 26, fontWeight: "600" },
  subtitle: { fontSize: 16, color: "#888", marginTop: 8, textAlign: "center" },

  label: { fontSize: 14, color: "#333", marginBottom: 4 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#b1762d",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
  },

  requirements: { marginBottom: 16 },
  req: { fontSize: 14 },
  valid: { color: "green" },
  invalid: { color: "red" },

  button: {
    backgroundColor: "#D68D3B",
    paddingVertical: 16,
    borderRadius: 30,
    alignSelf: "center",
    minWidth: 280,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { fontSize: 14, color: "#333" },
  link: { color: "#007bff", fontWeight: "bold", fontSize: 14 },
});
