import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default function DetalleLote() {
  const router = useRouter();
  const { id, granja, numeroLote, fechaRecoleccion, fechaEmpaque, tipoHuevo, tamano, lugarEmpaque, cantidadPorCaja, fechaSalida, puntoVenta, qr } = useLocalSearchParams();

  const guardarImagen = async () => {
    try {
      const filename = FileSystem.documentDirectory + 'codigo_qr.png';
      const base64Data = qr?.toString().replace('data:image/png;base64,', '');

      await FileSystem.writeAsStringAsync(filename, base64Data!, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se pudo guardar la imagen');
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(filename);
      await MediaLibrary.createAlbumAsync('Ovotrace', asset, false);
      Alert.alert('Éxito', 'Código QR guardado en tu galería');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al guardar la imagen');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalles del Lote</Text>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Granja:</Text>
        <Text style={styles.value}>{granja}</Text>

        <Text style={styles.label}>Número de Lote:</Text>
        <Text style={styles.value}>{numeroLote}</Text>

        <Text style={styles.label}>Tipo de Huevo:</Text>
        <Text style={styles.value}>{tipoHuevo}</Text>

        <Text style={styles.label}>Tamaño:</Text>
        <Text style={styles.value}>{tamano}</Text>

        <Text style={styles.label}>Cantidad por Caja:</Text>
        <Text style={styles.value}>{cantidadPorCaja}</Text>

        <Text style={styles.label}>Lugar de Empaque:</Text>
        <Text style={styles.value}>{lugarEmpaque}</Text>

        <Text style={styles.label}>Punto de Venta:</Text>
        <Text style={styles.value}>{puntoVenta}</Text>

        <Text style={styles.label}>Fecha de Recolección:</Text>
        <Text style={styles.value}>{fechaRecoleccion}</Text>

        <Text style={styles.label}>Fecha de Empaque:</Text>
        <Text style={styles.value}>{fechaEmpaque}</Text>

        <Text style={styles.label}>Fecha de Salida:</Text>
        <Text style={styles.value}>{fechaSalida}</Text>
      </View>

      <Text style={styles.subtitle}>Código QR generado:</Text>
      <Image
        source={{ uri: qr?.toString() }}
        style={styles.qrImage}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.button} onPress={guardarImagen}>
        <Text style={styles.buttonText}>Guardar QR en galería</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#D68D3B',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  detailBox: {
    marginBottom: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    borderColor: '#eee',
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  qrImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 16,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#D68D3B',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backButtonText: {
    color: '#666',
    fontSize: 14,
  },
});
