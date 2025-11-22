import React from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PrivacyPolicyModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ visible, onClose }: PrivacyPolicyModalProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>Política de privacidad</Text>
            <Text style={styles.subtitle}>Última actualización: 08/11/2025</Text>

            <Text style={styles.sectionTitle}>1. Información que recopilamos</Text>
            <Text style={styles.text}>
              Nuestra aplicación no recopila información personal de los usuarios. No solicitamos nombres, correos, números de teléfono ni datos de contacto en esta versión.
            </Text>

            <Text style={styles.sectionTitle}>2. Tienda de aplicaciones</Text>
            <Text style={styles.text}>
              Al descargar la aplicación desde Google Play Store o Apple App Store, la tienda puede recopilar información mínima, como:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>• Número de descargas</Text>
              <Text style={styles.listItem}>• Estadísticas de uso y rendimiento</Text>
              <Text style={styles.listItem}>• Información del dispositivo (modelo, sistema operativo, etc.)</Text>
            </View>
            <Text style={styles.text}>
              Esta información es administrada exclusivamente por la tienda de aplicaciones.
            </Text>

            <Text style={styles.sectionTitle}>3. Uso de la información</Text>
            <Text style={styles.text}>
              La información obtenida por la tienda se utiliza únicamente para estadísticas y métricas de uso, y no se comparte con terceros fuera de la plataforma de la tienda.
            </Text>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 5 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginTop: 15, marginBottom: 5 },
  text: { fontSize: 15, color: "#333", marginBottom: 10 },
  list: { paddingLeft: 10, marginBottom: 10 },
  listItem: { fontSize: 15, color: "#333", marginBottom: 5 },
  closeButton: { marginTop: 20, alignSelf: "flex-end" },
  closeText: { color: "#1e90ff", fontSize: 16, fontWeight: "600" },
});