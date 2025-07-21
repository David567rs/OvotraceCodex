//Esto es nuevo de codex
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AdminTabsLayout() {
  const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
    index: 'home',
    management: 'list',
    politicas: 'document-text',
    profileAdmin: 'settings',
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
        name="management"
        options={{
          title: 'Gestión',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={icons.management} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="politicas"
        options={{
          title: 'Políticas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={icons.politicas} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profileAdmin"
        options={{
          title: 'Configuración',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={icons.profileAdmin} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}