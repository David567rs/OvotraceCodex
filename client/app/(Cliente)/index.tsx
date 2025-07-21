import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D68D3B" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>¡Hola!</Text>
            <Text style={styles.producerName}>Cliente</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Acciones principales */}
        <View style={styles.mainActions}>
          <TouchableOpacity
            style={styles.primaryCard}
            onPress={() => router.push('/(Cliente)/escanerLote')}
          >
            <View style={styles.cardIcon}>
              <Ionicons name="qr-code-outline" size={32} color="#D68D3B" />
            </View>
            <Text style={styles.primaryCardTitle}>Escanear Código</Text>
            <Text style={styles.primaryCardSubtitle}>Consulta trazabilidad del lote</Text>
          </TouchableOpacity>

          <View style={styles.secondaryActions}>
            <TouchableOpacity style={styles.secondaryCard}>
              <View style={styles.secondaryCardIcon}>
                <Ionicons name="leaf-outline" size={24} color="#b1762d" />
              </View>
              <Text style={styles.secondaryCardTitle}>Sobre el Producto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryCard}>
              <View style={styles.secondaryCardIcon}>
                <Ionicons name="star-outline" size={24} color="#b1762d" />
              </View>
              <Text style={styles.secondaryCardTitle}>Favoritos</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Resumen */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Mi Actividad</Text>
          <View style={styles.summaryCards}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>3</Text>
              <Text style={styles.summaryLabel}>Códigos Escaneados</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>1</Text>
              <Text style={styles.summaryLabel}>Favoritos Guardados</Text>

            </View>
          </View>
        </View>

        {/* Acciones adicionales */}
        <View style={styles.additionalActions}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIcon}>
              <Ionicons name="settings-outline" size={20} color="#b1762d" />
            </View>
            <Text style={styles.actionText}>Configuración</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionIcon}>
              <Ionicons name="help-circle-outline" size={20} color="#b1762d" />
            </View>
            <Text style={styles.actionText}>Ayuda</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#D68D3B',
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  producerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainActions: {
    marginTop: 20,
    marginBottom: 25,
  },
  primaryCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F4E4C1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  primaryCardSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  secondaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryCardIcon: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#F9F4ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  summarySection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#D68D3B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D68D3B',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  additionalActions: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionIcon: {
    width: 35,
    height: 35,
    borderRadius: 17,
    backgroundColor: '#F9F4ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
