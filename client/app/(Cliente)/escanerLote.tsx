import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRouter } from 'expo-router';

export default function EscanerLote() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    Alert.alert("Código escaneado", `Lote ID: ${data}`, [
      {
        text: "Ver lote",
        onPress: () => router.push(`/detalleLote/${data}`),
      },
      {
        text: "Cancelar",
        onPress: () => setScanned(false),
        style: "cancel",
      },
    ]);
  };

  if (hasPermission === null) return <Text>Solicitando permisos para la cámara...</Text>;
  if (hasPermission === false) return <Text>No se tiene acceso a la cámara</Text>;

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
