// De codex
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { getProfile, logoutRequest } from '../services/auth';

interface UserProfile {
  username: string;
  email: string;
  // Agrega aquí más campos si vienen del backend
}

export default function ProfileAdmin() {
  const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
  
    useFocusEffect(
      useCallback(() => {
        const fetchProfile = async () => {
          try {
            const data = await getProfile();
            if (!data) return;
            setUser(data);
          } catch (error) {
            console.error(error);
            Alert.alert('Sesión expirada', 'Por favor inicia sesión nuevamente');
            router.replace('../auth/login'); // ✅ Ruta relativa corregida
          }
        };
        fetchProfile();
      }, [])
    );
  
    const handleLogout = async () => {
      await logoutRequest();
      router.replace('../auth/login');
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}>Perfil</Text>
  
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.profileBox}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150' }}
              style={styles.avatar}
            />
            <View style={styles.profileText}>
              <Text style={styles.name}>{user?.username || 'Nombre...'}</Text>
              <Text style={styles.email}>{user?.email || 'Correo...'}</Text>
              <Text style={styles.phone}>+52 55-0000-0000</Text>
            </View>
          </View>
  
          <View style={styles.separator} />
  
          <Text style={styles.sectionLabel}>PENGATURAN</Text>
  
          <MenuRow
            label="Información Personal"
            icon={<Ionicons name="person-outline" size={20} color="#000" />}
            onPress={() => router.push('../personal-info')}
          />
          <MenuRow
            label="Cambiar Contraseña"
            icon={<Feather name="lock" size={20} color="#000" />}
            onPress={() => router.push('../change-password')}
          />
          <MenuRow
            label="ID Card"
            icon={<MaterialIcons name="credit-card" size={20} color="#000" />}
            onPress={() => router.push('../id-card')}
          />
  
          <Text style={[styles.sectionLabel, { marginTop: 24 }]}>TENTANG</Text>
  
          <MenuRow
            label="Tentang kami"
            icon={<Ionicons name="information-circle-outline" size={20} color="#000" />}
            onPress={() => router.push('../about-us')}
          />
          <MenuRow
            label="Acerca de OvoTrace"
            icon={<Ionicons name="help-circle-outline" size={20} color="#000" />}
            onPress={() => router.push('../about-app')}
          />
  
          <MenuRow
            label="Cerrar Sesión"
            icon={<Feather name="log-out" size={20} color="#D68D3B" />}
            onPress={handleLogout}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  type RowProps = {
    label: string;
    icon: React.ReactNode;
    onPress: () => void;
  };
  
  const MenuRow = ({ label, icon, onPress }: RowProps) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        {icon}
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#ccc" />
    </TouchableOpacity>
  );
  
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    headerTitle: { fontSize: 24, fontWeight: '700', marginTop: 10, marginLeft: 16 },
    scroll: { paddingHorizontal: 16, paddingBottom: 40 },
    profileBox: { flexDirection: 'row', alignItems: 'center', marginTop: 12, marginBottom: 12 },
    avatar: { width: 72, height: 72, borderRadius: 36 },
    profileText: { marginLeft: 12 },
    name: { fontSize: 18, fontWeight: '600' },
    email: { color: '#777', marginTop: 2 },
    phone: { color: '#777', marginTop: 2 },
    separator: { height: 1, backgroundColor: '#0A84FF', marginVertical: 8 },
    sectionLabel: { fontSize: 12, color: '#d3a679', marginBottom: 6, marginTop: 4 },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowLabel: {
      marginLeft: 10,
      fontSize: 15,
      color: '#000',
    },
  });