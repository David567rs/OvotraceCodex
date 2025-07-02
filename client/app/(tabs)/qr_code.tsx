import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

export default function QrCode() {
  const handleOpenCamera = () => {
    alert('Aquí se abriría la cámara (aún no implementado)');
  };

  return (
    <View style={styles.container}>
      <Text>Aquí se escaneará el código con la cámara del dispositivo</Text>
      <Button title="Abrir cámara" onPress={handleOpenCamera} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
