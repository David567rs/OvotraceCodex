import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { obtenerLotesRequest } from "../services/lote";

interface Lote {
  _id: string;
  granja: string;
  numeroLote: string;
  tipoHuevo: string;
  tamano: string;
  lugarEmpaque: string;
  cantidadPorCaja: number;
  puntoVenta: string;
  fechaRecoleccion: string;
  fechaEmpaque: string;
  fechaSalida: string;
  qrCode: string;
}

export default function Lote() {
  const router = useRouter();
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadLotes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await obtenerLotesRequest(); // debe devolver Lote[]
      setLotes(data);
    } catch (e) {
      console.error("Error cargando lotes:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadLotes();
  }, [loadLotes]);

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#D68D3B" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={lotes}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadLotes();
            }}
            colors={["#D68D3B"]}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>Lote #{item.numeroLote}</Text>
            <Text style={styles.date}>
              {new Date(item.fechaRecoleccion).toLocaleDateString()}
            </Text>

            <Image
              source={{ uri: item.qrCode }}
              style={styles.qrThumb}
              resizeMode="contain"
            />

            <TouchableOpacity
              style={styles.detailsBtn}
              onPress={() =>
                router.push({
                  pathname: "/detalleLote",
                  params: {
                    id: item._id,
                    granja: item.granja,
                    numeroLote: item.numeroLote,
                    tipoHuevo: item.tipoHuevo,
                    tamano: item.tamano,
                    lugarEmpaque: item.lugarEmpaque,
                    cantidadPorCaja: item.cantidadPorCaja.toString(),
                    puntoVenta: item.puntoVenta,
                    fechaRecoleccion: item.fechaRecoleccion,
                    fechaEmpaque: item.fechaEmpaque,
                    fechaSalida: item.fechaSalida,
                    qr: item.qrCode,
                  },
                })
              }
            >
              <Text style={styles.detailsText}>Ver Detalles</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No tienes lotes aún.</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#333" },
  date: { fontSize: 12, color: "#666", marginBottom: 8 },
  qrThumb: { width: 80, height: 80, alignSelf: "center", marginVertical: 8 },
  detailsBtn: {
    backgroundColor: "#D68D3B",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  detailsText: { color: "#fff", fontWeight: "600" },
  emptyText: { textAlign: "center", marginTop: 20, color: "#666" },
});
