// app/auth/verify-email.tsx
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
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "../services/axios";

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [digits, setDigits] = useState<string[]>(new Array(6).fill("")); // ← 6 dígitos
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    const val = text.slice(-1).toUpperCase();
    const next = [...digits];
    next[index] = val;
    setDigits(next);
    if (val && index < digits.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const token = digits.join("").trim().toUpperCase();
    if (token.length !== 6) {
      return Alert.alert("Error", "Ingresa los 6 caracteres del código"); // ← mensaje corregido
    }
    try {
      await api.post("/verify-email", { email, token });
      Alert.alert("✓ Correo verificado", undefined, [
        {
          text: "OK",
          onPress: () => router.push("/auth/login"),
        },
      ]);
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.response?.data?.message || "Código inválido o expirado"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verificar tu correo</Text>
      <Text style={styles.subtitle}>{email}</Text>

      <View style={styles.codeContainer}>
        {digits.map((d, i) => (
          <TextInput
            key={i}
            ref={(ref): void => {
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
        <Text style={styles.buttonText}>Verificar</Text>
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
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 20,
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
