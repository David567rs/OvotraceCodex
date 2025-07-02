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

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const data = await getProfile();
          setUser(data);
        } catch (error) {
          console.error(error);
          Alert.alert('Sesión expirada', 'Por favor inicia sesión nuevamente');
          router.replace('/login');
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
          onPress={() => router.push('/personal-info')}
        />
        <MenuRow
          label="Cambiar Contraseña"
          icon={<Feather name="lock" size={20} color="#000" />}
          onPress={() => router.push('/change-password')}
        />
        <MenuRow
          label="ID Card"
          icon={<MaterialIcons name="credit-card" size={20} color="#000" />}
          onPress={() => router.push('/id-card')}
        />

        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>TENTANG</Text>

        <MenuRow
          label="Tentang kami"
          icon={<Ionicons name="information-circle-outline" size={20} color="#000" />}
          onPress={() => router.push('/about-us')}
        />
        <MenuRow
          label="Acerca de OvoTrace"
          icon={<Ionicons name="help-circle-outline" size={20} color="#000" />}
          onPress={() => router.push('/about-app')}
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
  iconColor?: string;
};

const MenuRow = ({ label, icon, onPress, iconColor = '#000' }: RowProps) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <Text style={styles.rowLabel}>{label}</Text>
    <View style={styles.rowIcon}>{icon}</View>
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
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rowLabel: { flex: 1, fontSize: 15, color: '#000' },
  rowIcon: { width: 24, alignItems: 'flex-end' },
});
