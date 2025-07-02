import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function PantallaPresentacion() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/img/logo.png')} style={styles.logo} />
        <Text style={styles.slogan}>Escanea Conoce Confía</Text>
        <Image source={require('../assets/img/pantallaInicio.png')} style={styles.image} />
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.boton} onPress={() => router.push('./auth/login')}>
          <Text style={styles.botonTexto}>Inicia Sesión</Text>
        </TouchableOpacity>
        <Text style={styles.textoSecundario}>
          No tienes una cuenta?{' '}
          <Text style={styles.link} onPress={() => console.log('Registro')}>
            Regístrate
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef9ec',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 30,
  },
  logo: {
    width: 300, 
    height: 100,
    resizeMode: 'contain',
  },
  slogan: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  image: {
    width: 350, 
    height: 280, 
    resizeMode: 'contain',
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
    gap: 16,
    paddingBottom: 20,
  },
  boton: {
    backgroundColor: '#D68D3B',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 280,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textoSecundario: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
