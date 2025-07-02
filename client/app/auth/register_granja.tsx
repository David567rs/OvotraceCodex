import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RegisterClient() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Flechita suelta arriba */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={22} color="#D68D3B" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Título centrado */}
        <View style={styles.header}>
          <Text style={styles.title}>Registro Cliente</Text>
          <Text style={styles.subtitle}>Crea tu cuenta para continuar</Text>
        </View>

        {/* Campos */}
        <View style={styles.form}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            placeholder="Castro"
            placeholderTextColor="#d3a679"
            style={styles.input}
          />

          <Text style={styles.label}>Correo</Text>
          <TextInput
            placeholder="emailmu@mail.com"
            placeholderTextColor="#d3a679"
            keyboardType="email-address"
            style={styles.input}
          />

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="6+ karakter"
              placeholderTextColor="#d3a679"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#666"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirmar contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="6+ karakter"
              placeholderTextColor="#d3a679"
              secureTextEntry={!showConfirm}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons
                name={showConfirm ? 'eye-off' : 'eye'}
                size={22}
                color="#666"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>

          {/* Botón */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.link}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 20,
    padding: 8,
    zIndex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 8,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#b1762d',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b1762d',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#D68D3B',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 280,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    color: '#000',
    fontSize: 14,
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
