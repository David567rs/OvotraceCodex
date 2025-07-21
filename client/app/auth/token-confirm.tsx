import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import api from "../services/axios";

export default function VerifyTokenScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [digits, setDigits] = useState<string[]>(new Array(8).fill(""));
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    const val = text.slice(-1).toUpperCase();
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);
    if (val && index < 7) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    // 1. Unir, limpiar espacios y forzar mayúsculas
    const raw = digits.join("");
    const token = raw.trim().toUpperCase();

    // 2. Validar longitud exacta
    if (token.length !== 8) {
      return Alert.alert("Error", "Ingresa los 8 caracteres del código");
    }

    try {
      // 3. Hacer la petición con el token limpio
      console.log("🟢 Verificando token:", { email, token }); // ⬅️ opcional, para depurar
      await api.post("/verify-token", { email, token });

      Alert.alert("✓ Código válido", undefined, [
        {
          text: "OK",
          onPress: () =>
            router.push({
              pathname: "/auth/reset-password",
              params: { email, token },
            }),
        },
      ]);
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.response?.data?.message || "Token inválido o expirado"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verificar código</Text>
      <Text style={styles.subtitle}>Correo: {email}</Text>
      <View style={styles.codeContainer}>
        {digits.map((d, i) => (
          <TextInput
            key={i}
            ref={(ref) => {
              inputs.current[i] = ref;
            }}
            style={styles.digitInput}
            maxLength={1}
            keyboardType="default"
            autoCapitalize="characters"
            value={d}
            onChangeText={(t) => handleChange(t, i)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verificar código</Text>
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
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 24,
    textAlign: "center",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  digitInput: {
    borderWidth: 1,
    borderColor: "#b1762d",
    borderRadius: 8,
    width: 40,
    height: 50,
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#D68D3B",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
