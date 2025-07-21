import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { getProfile } from "../services/auth";
import { crearLoteRequest } from "../services/lote";
import { useState } from "react";
import QRGenerado from "../components/QRGenerado";
import { useRouter } from "expo-router";

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  selected,
  onPress,
}) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
    <View style={[styles.radioCircle, selected && styles.selectedRadio]}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

const ProgressIndicator: React.FC<{
  currentStep: number;
  totalSteps: number;
}> = ({ currentStep, totalSteps }) => (
  <View style={styles.progressContainer}>
    {Array.from({ length: totalSteps }, (_, i) => (
      <View
        key={i}
        style={[
          styles.progressDot,
          i < currentStep
            ? styles.progressDotActive
            : styles.progressDotInactive,
        ]}
      />
    ))}
    <Text style={styles.progressText}>
      Paso {currentStep} de {totalSteps}
    </Text>
  </View>
);

export default function LoteCreate() {
  const [step, setStep] = useState(1);

  const [productorId, setProductorId] = useState("");
  const [granja, setGranja] = useState("");
  const [vacunas, setVacunas] = useState<string[]>([]);
  const [tipoHuevo, setTipoHuevo] = useState("");
  const [numeroLote, setNumeroLote] = useState("");
  const [fechaRecoleccion, setFechaRecoleccion] = useState("");
  const [tamano, setTamano] = useState("");
  const [fechaEmpaque, setFechaEmpaque] = useState("");
  const [lugarEmpaque, setLugarEmpaque] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [puntoVenta, setPuntoVenta] = useState("");
  const [qrGenerado, setQrGenerado] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProductorId(data.id);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const toggleVacuna = (nombre: string) => {
    setVacunas((prev) =>
      prev.includes(nombre)
        ? prev.filter((v) => v !== nombre)
        : [...prev, nombre]
    );
  };

  const formatDate = (d: string) => {
    if (d.includes("/")) {
      const [day, month, year] = d.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return d;
  };
  const router = useRouter();

  const handleSubmit = async () => {
    const vacunaciones = {
      bronquitis: vacunas.includes("Bronquitis infecciosa"),
      newcastle: vacunas.includes("Newcastle"),
      refuerzo: vacunas.includes("Refuerzo"),
      viruelaAviar: vacunas.includes("Viruela Aviar"),
      otra: vacunas.includes("Otra") ? "Otra" : "",
    };

    try {
      const res = await crearLoteRequest({
        productorId,
        granja,
        vacunaciones,
        tipoHuevo,
        numeroLote,
        fechaRecoleccion: formatDate(fechaRecoleccion),
        tamano,
        fechaEmpaque: formatDate(fechaEmpaque),
        lugarEmpaque,
        cantidadPorCaja: parseInt(cantidad, 10),
        fechaSalida: formatDate(fechaSalida),
        puntoVenta,
      });

      // ✅ Mostrar QR generado en pantalla
      setQrGenerado(res.data.qr);

      Alert.alert("Éxito", "Lote registrado correctamente");
      setStep(1); // si usas pasos tipo Wizard
      router.replace("/lote");
    } catch (error: any) {
      console.error(error);
      const msg = error?.response?.data?.message || "Error al registrar lote";
      Alert.alert("Error", msg);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#D68D3B" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Registro de Lote</Text>
      </View>
      <ProgressIndicator currentStep={step} totalSteps={2} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 ? (
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Información General</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}> Nombre de la Granja o Productor</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese nombre de la granja"
                placeholderTextColor="#999"
                value={granja}
                onChangeText={setGranja}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>💉 Vacunaciones Aplicadas</Text>
              <Text style={styles.sublabel}>
                Seleccione todas las que apliquen
              </Text>
              <View style={styles.optionsGrid}>
                {[
                  "Bronquitis infecciosa",
                  "Newcastle",
                  "Refuerzo",
                  "Viruela Aviar",
                  "Otra",
                ].map((vacuna) => (
                  <RadioButton
                    key={vacuna}
                    label={vacuna}
                    selected={vacunas.includes(vacuna)}
                    onPress={() => toggleVacuna(vacuna)}
                  />
                ))}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tipo de Huevo</Text>
              <View style={styles.optionsGrid}>
                {["Orgánico", "Granja convencional", "Libre pastoreo"].map(
                  (tipo) => (
                    <RadioButton
                      key={tipo}
                      label={tipo}
                      selected={tipoHuevo === tipo}
                      onPress={() => setTipoHuevo(tipo)}
                    />
                  )
                )}
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Número de Lote</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. 001"
                  placeholderTextColor="#999"
                  value={numeroLote}
                  onChangeText={setNumeroLote}
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Fecha de Recolección</Text>
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor="#999"
                  value={fechaRecoleccion}
                  onChangeText={setFechaRecoleccion}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setStep(2)}
            >
              <Text style={styles.primaryButtonText}>Siguiente →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Empaque y Distribución</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>📏 Clasificación por Tamaño</Text>
              <View style={styles.sizeGrid}>
                {["S", "M", "L", "XL", "NE"].map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeButton,
                      tamano === size && styles.sizeButtonSelected,
                    ]}
                    onPress={() => setTamano(size)}
                  >
                    <Text
                      style={[
                        styles.sizeButtonText,
                        tamano === size && styles.sizeButtonTextSelected,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Fecha de Empaque</Text>
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor="#999"
                  value={fechaEmpaque}
                  onChangeText={setFechaEmpaque}
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.label}>Lugar de Empaque</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. Planta 1"
                  placeholderTextColor="#999"
                  value={lugarEmpaque}
                  onChangeText={setLugarEmpaque}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Cantidad de Huevos por Caja</Text>
              <View style={styles.optionsGrid}>
                {["360", "250", "180"].map((cant) => (
                  <RadioButton
                    key={cant}
                    label={`${cant} huevos`}
                    selected={cantidad === cant}
                    onPress={() => setCantidad(cant)}
                  />
                ))}
                <RadioButton label="Otro" selected={false} onPress={() => {}} />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Fecha de Salida del Almacén</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#999"
                value={fechaSalida}
                onChangeText={setFechaSalida}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>🏪 Punto de Venta</Text>
              <View style={styles.optionsGrid}>
                {["Tienda", "Mercado", "Supermercado", "Otro"].map((punto) => (
                  <RadioButton
                    key={punto}
                    label={punto}
                    selected={puntoVenta === punto}
                    onPress={() => setPuntoVenta(punto)}
                  />
                ))}
              </View>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setStep(1)}
              >
                <Text style={styles.secondaryButtonText}>← Anterior</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleSubmit}
              >
                <Text style={styles.primaryButtonText}>✓ Registrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      {qrGenerado && <QRGenerado qrData={qrGenerado} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#D68D3B",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#F4E4C1",
    textAlign: "center",
    marginTop: 4,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: "#D68D3B",
  },
  progressDotInactive: {
    backgroundColor: "#E0E0E0",
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
  },
  container: {
    padding: 20,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#b1762d",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputHalf: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  sublabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
    fontStyle: "italic",
  },
  input: {
    borderWidth: 1,
    borderColor: "#b1762d",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#F9F9F9",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  sizeGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  sizeButton: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  sizeButtonSelected: {
    backgroundColor: "#D68D3B",
    borderColor: "#D68D3B",
  },
  sizeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  sizeButtonTextSelected: {
    color: "#fff",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#b1762d",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  selectedRadio: {
    backgroundColor: "#D68D3B",
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  radioLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: "#D68D3B",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    flex: 1,
    shadowColor: "#D68D3B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#F0F0F0",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#b1762d",
  },
  secondaryButtonText: {
    color: "#b1762d",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
  },
});
