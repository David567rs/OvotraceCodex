// app/(Productor)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProducerTabsLayout() {
  const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
    index: 'home',
    loteCreate: 'add',
    lote: 'albums',
    profileProducer: 'settings',
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8B4513',
        tabBarInactiveTintColor: 'gray',

        // 1. Asegura que cada tab sea flex:1
        tabBarItemStyle: {
          flex: 1,
        },
        // 2. Reparte las tabs a lo largo de todo el ancho
        tabBarStyle: {
          justifyContent: 'space-around',
          height: 60,            // opcional: ajustar alto de la barra
          paddingBottom: 5,      // opcional: espaciar un poco
        },

        headerShown: false,      // oculta el header por defecto en tabs
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
        name="loteCreate"
        options={{
          title: 'Crear',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={icons.loteCreate} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lote"
        options={{
          title: 'Lotes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={icons.lote} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profileProducer"
        options={{
          title: 'Config',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={icons.profileProducer} size={size} color={color} />
          ),
        }}
      />

      {/* Pantalla oculta: desaparece de la barra */}
      <Tabs.Screen
        name="detalleLote"
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
