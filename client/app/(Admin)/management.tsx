import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { fetchUsers, deleteUser } from '../services/user';

export default function ManagementScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const ITEMS_PER_PAGE = 10;

  const loadUsers = async (page = 1, refresh = false) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await fetchUsers(); // Aquí deberías modificar tu API para soportar paginación
      
      // Simulación de paginación (adapta según tu API)
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedData = data.slice(startIndex, endIndex);
      const totalPagesCalc = Math.ceil(data.length / ITEMS_PER_PAGE);

      if (refresh || page === 1) {
        setUsers(paginatedData);
      } else {
        setUsers(prev => [...prev, ...paginatedData]);
      }

      setTotalPages(totalPagesCalc);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUsers(1, true);
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadUsers(1, true);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loadingMore) {
      loadUsers(currentPage + 1);
    }
  };

  const handleDelete = (id: string, username: string) => {
    Alert.alert(
      'Eliminar Usuario',
      `¿Estás seguro de que deseas eliminar a ${username}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser(id);
              setUsers((prev) => prev.filter((u) => u._id !== id));
              Alert.alert('Éxito', 'Usuario eliminado correctamente');
            } catch (err) {
              Alert.alert('Error', 'No se pudo eliminar el usuario');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <View style={styles.roleContainer}>
          <Text style={styles.roleText}>{item.role}</Text>
        </View>
        {item.email && (
          <Text style={styles.email}>{item.email}</Text>
        )}
      </View>
      <TouchableOpacity 
        onPress={() => handleDelete(item._id, item.username)} 
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        {loadingMore && (
          <View style={styles.footerLoader}>
            <ActivityIndicator size="small" color="#D68D3B" />
            <Text style={styles.footerText}>Cargando más usuarios...</Text>
          </View>
        )}
        
        {/* Botones de paginación */}
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.paginationButtonDisabled
            ]}
            onPress={() => currentPage > 1 && loadUsers(currentPage - 1, true)}
            disabled={currentPage === 1 || loading}
          >
            <Text style={[
              styles.paginationButtonText,
              currentPage === 1 && styles.paginationButtonTextDisabled
            ]}>
              ← Anterior
            </Text>
          </TouchableOpacity>

          <View style={styles.pageIndicator}>
            <Text style={styles.pageIndicatorText}>
              {currentPage} de {totalPages}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === totalPages && styles.paginationButtonDisabled
            ]}
            onPress={() => currentPage < totalPages && loadUsers(currentPage + 1, true)}
            disabled={currentPage === totalPages || loading}
          >
            <Text style={[
              styles.paginationButtonText,
              currentPage === totalPages && styles.paginationButtonTextDisabled
            ]}>
              Siguiente →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Selector de página directa */}
        <View style={styles.pageSelector}>
          <Text style={styles.pageSelectorLabel}>Ir a página:</Text>
          <View style={styles.pageSelectorButtons}>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <TouchableOpacity
                  key={pageNumber}
                  style={[
                    styles.pageNumberButton,
                    currentPage === pageNumber && styles.pageNumberButtonActive
                  ]}
                  onPress={() => pageNumber !== currentPage && loadUsers(pageNumber, true)}
                >
                  <Text style={[
                    styles.pageNumberText,
                    currentPage === pageNumber && styles.pageNumberTextActive
                  ]}>
                    {pageNumber}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No hay usuarios registrados</Text>
      <TouchableOpacity onPress={() => loadUsers(1, true)} style={styles.retryButton}>
        <Text style={styles.retryButtonText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D68D3B" />
        <Text style={styles.loadingText}>Cargando usuarios...</Text>
      </View>
    );
  }

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestión de Usuarios</Text>
        <Text style={styles.headerSubtitle}>Administra los usuarios del sistema</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{users.length}</Text>
          <Text style={styles.statLabel}>Usuarios Mostrados</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{currentPage}</Text>
          <Text style={styles.statLabel}>Página Actual</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalPages}</Text>
          <Text style={styles.statLabel}>Total Páginas</Text>
        </View>
      </View>

      <View style={styles.container}>
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#D68D3B']}
              tintColor="#D68D3B"
            />
          }
          onEndReached={null} // Deshabilitamos infinite scroll
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={users.length === 0 ? styles.emptyListContainer : undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#D68D3B',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#F4E4C1',
    textAlign: 'center',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D68D3B',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  roleContainer: {
    backgroundColor: '#F4E4C1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  roleText: {
    fontSize: 12,
    color: '#b1762d',
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerContainer: {
    paddingVertical: 20,
    backgroundColor: '#F8F9FA',
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  paginationButton: {
    backgroundColor: '#D68D3B',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
    shadowColor: '#D68D3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  paginationButtonDisabled: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationButtonTextDisabled: {
    color: '#999',
  },
  pageIndicator: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D68D3B',
  },
  pageIndicatorText: {
    color: '#D68D3B',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pageSelector: {
    alignItems: 'center',
    marginTop: 15,
  },
  pageSelectorLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  pageSelectorButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  pageNumberButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D68D3B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumberButtonActive: {
    backgroundColor: '#D68D3B',
  },
  pageNumberText: {
    fontSize: 14,
    color: '#D68D3B',
    fontWeight: 'bold',
  },
  pageNumberTextActive: {
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#D68D3B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});