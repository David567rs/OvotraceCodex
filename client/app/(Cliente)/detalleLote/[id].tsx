import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import api from "../../services/axios"; // asegúrate de que este archivo esté bien configurado
import { Image } from "react-native";

type Lote = {
  _id: string;
  productorId: string;
  granja: string;
  tipoHuevo: string;
  numeroLote: string;
  fechaRecoleccion: string;
  fechaEmpaque: string;
  fechaSalida: string;
  tamano: string;
  lugarEmpaque: string;
  cantidadPorCaja: number;
  puntoVenta: string;
  qrCode: string;
};

export default function DetalleLote() {
  const { id } = useLocalSearchParams();
  const [lote, setLote] = useState<Lote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api
        .get(`/lotes/${id}`)
        .then((res) => {
          setLote(res.data); // <-- asegúrate que tu backend devuelva { lote: {...} }
        })
        .catch((err) => {
          console.error("Error al obtener lote:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D68D3B" />
        <Text style={{ marginTop: 10 }}>Cargando datos del lote...</Text>
      </View>
    );
  }

  if (!lote) {
    return (
      <View style={styles.container}>
        <Text>No se encontró el lote.</Text>
      </View>
    );
  }
  console.log("QR desde backend:", lote.qrCode);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalle del Lote</Text>

      <Text style={styles.label}>Número de Lote:</Text>
      <Text>{lote.numeroLote}</Text>

      <Text style={styles.label}>Granja:</Text>
      <Text>{lote.granja}</Text>

      <Text style={styles.label}>Tipo de Huevo:</Text>
      <Text>{lote.tipoHuevo}</Text>

      <Text style={styles.label}>Tamaño:</Text>
      <Text>{lote.tamano}</Text>

      <Text style={styles.label}>Cantidad por Caja:</Text>
      <Text>{lote.cantidadPorCaja}</Text>

      <Text style={styles.label}>Punto de Venta:</Text>
      <Text>{lote.puntoVenta}</Text>

      <Text style={styles.label}>Fecha de Recolección:</Text>
      <Text>{new Date(lote.fechaRecoleccion).toLocaleDateString()}</Text>

      <Text style={styles.label}>Fecha de Empaque:</Text>
      <Text>{new Date(lote.fechaEmpaque).toLocaleDateString()}</Text>

      <Text style={styles.label}>Fecha de Salida:</Text>
      <Text>{new Date(lote.fechaSalida).toLocaleDateString()}</Text>

      {/* Aquí mostramos el código QR */}
      <Text style={styles.label}>Código QR generado:</Text>
      <Image source={{ uri: lote.qrCode }} style={styles.qrImage} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
  },
  qrImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
