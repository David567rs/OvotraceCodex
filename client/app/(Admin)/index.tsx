import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D68D3B" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Panel de Control</Text>
            <Text style={styles.adminName}>Administrador</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="shield-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Métricas Principales */}
        <View style={styles.metricsSection}>
          <Text style={styles.sectionTitle}>Métricas Generales</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>12</Text>
              <Text style={styles.metricLabel}>Productores Activos</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>3,450</Text>
              <Text style={styles.metricLabel}>Huevos Hoy</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>89</Text>
              <Text style={styles.metricLabel}>Lotes Registrados</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>96%</Text>
              <Text style={styles.metricLabel}>Eficiencia</Text>
            </View>
          </View>
        </View>

        {/* Acciones Principales */}
        <View style={styles.mainActions}>
          <TouchableOpacity style={styles.primaryCard}>
            <View style={styles.cardIcon}>
              <Ionicons name="people" size={32} color="#D68D3B" />
            </View>
            <Text style={styles.primaryCardTitle}>Gestionar Productores</Text>
            <Text style={styles.primaryCardSubtitle}>
              Administrar usuarios y permisos
            </Text>
          </TouchableOpacity>

          <View style={styles.secondaryActions}>
            <TouchableOpacity style={styles.secondaryCard}>
              <View style={styles.secondaryCardIcon}>
                <Ionicons name="bar-chart-outline" size={24} color="#b1762d" />
              </View>
              <Text style={styles.secondaryCardTitle}>Reportes Generales</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryCard}>
              <View style={styles.secondaryCardIcon}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#b1762d"
                />
              </View>
              <Text style={styles.secondaryCardTitle}>Alertas</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Herramientas Administrativas */}
        <View style={styles.toolsSection}>
          <Text style={styles.sectionTitle}>Herramientas Administrativas</Text>
          <View style={styles.toolsGrid}>
            <TouchableOpacity style={styles.toolCard}>
              <View style={styles.toolIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color="#b1762d"
                />
              </View>
              <Text style={styles.toolTitle}>Auditoria</Text>
              <Text style={styles.toolSubtitle}>Registros del sistema</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolCard}>
              <View style={styles.toolIcon}>
                <Ionicons
                  name="trending-up-outline"
                  size={24}
                  color="#b1762d"
                />
              </View>
              <Text style={styles.toolTitle}>Estadísticas</Text>
              <Text style={styles.toolSubtitle}>Análisis de datos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolCard}>
              <View style={styles.toolIcon}>
                <Ionicons name="settings-outline" size={24} color="#b1762d" />
              </View>
              <Text style={styles.toolTitle}>Configuración</Text>
              <Text style={styles.toolSubtitle}>Sistema general</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolCard}>
              <View style={styles.toolIcon}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={24}
                  color="#b1762d"
                />
              </View>
              <Text style={styles.toolTitle}>Respaldos</Text>
              <Text style={styles.toolSubtitle}>Copias de seguridad</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Acciones Rápidas */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActionsList}>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="person-add-outline" size={20} color="#b1762d" />
              </View>
              <Text style={styles.quickActionText}>Nuevo Productor</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="megaphone-outline" size={20} color="#b1762d" />
              </View>
              <Text style={styles.quickActionText}>Enviar Anuncio</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="download-outline" size={20} color="#b1762d" />
              </View>
              <Text style={styles.quickActionText}>Exportar Datos</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color="#b1762d"
                />
              </View>
              <Text style={styles.quickActionText}>Seguridad</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#D68D3B",
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  adminName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 2,
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  metricsSection: {
    marginTop: 20,
    marginBottom: 25,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  metricCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#D68D3B",
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D68D3B",
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
  },
  mainActions: {
    marginBottom: 25,
  },
  primaryCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F4E4C1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  primaryCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  primaryCardSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  secondaryActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  secondaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryCardIcon: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "#F9F4ED",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  secondaryCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  toolsSection: {
    marginBottom: 25,
  },
  toolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  toolCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  toolIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9F4ED",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  toolSubtitle: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
  },
  quickActions: {
    marginBottom: 25,
  },
  quickActionsList: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  quickActionIcon: {
    width: 35,
    height: 35,
    borderRadius: 17,
    backgroundColor: "#F9F4ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  quickActionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});
