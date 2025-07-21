import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(Cliente)" />
      <Stack.Screen name="(Productor)" />
      <Stack.Screen name="(Admin)" />
    </Stack>
  );
}

// Stack.Screen name="home" no lo borro porque no quiero 