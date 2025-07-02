/*This file defines the icons for tab-based navigation. */
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
    index: 'home',
    qr_code: 'qr-code',
    scan_history: 'time',
    profile: 'person-circle',
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8B4513', 
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={icons.index} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qr_code"
        options={{
          title: 'Escáner QR',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={icons.qr_code} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan_history"
        options={{
          title: 'Historial QR',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={icons.scan_history} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={icons.profile} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
