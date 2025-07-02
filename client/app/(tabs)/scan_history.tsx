import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-qr-code';

export default function ScanHistory() {
  return (
    
    <View style={styles.container}>
      <QRCode value='key'/>
      <Text>Lote 10817 </Text>
      <StatusBar style="auto" />
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