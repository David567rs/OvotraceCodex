import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';

export default function QRGenerado({ qrData }: { qrData: string }) {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const guardarQR = async () => {
    try {
      const filename = FileSystem.documentDirectory + 'qr.png';
      await FileSystem.writeAsStringAsync(filename, qrData.split(',')[1], {
        encoding: FileSystem.EncodingType.Base64,
      });
      await MediaLibrary.saveToLibraryAsync(filename);
      Alert.alert('Éxito', 'Código QR guardado en tu galería.');
    } catch (err) {
      console.error('Error al guardar QR:', err);
      Alert.alert('Error', 'No se pudo guardar el QR.');
    }
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Código QR generado</Text>

      <Image
        source={{ uri: qrData }}
        style={{ width: 220, height: 220, marginVertical: 20 }}
        resizeMode="contain"
      />

      <TouchableOpacity
        onPress={guardarQR}
        style={{
          backgroundColor: '#D68D3B',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Guardar QR</Text>
      </TouchableOpacity>
    </View>
  );
}
