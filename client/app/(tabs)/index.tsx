import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Inicio</Text>
      <Button
        title="Volver a presentación"
        onPress={() => router.replace('/home')}
      />
    </View>
  );
}
