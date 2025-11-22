import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AboutAppModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AboutAppModal({ visible, onClose }: AboutAppModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>Acerca de la App</Text>
            <Text style={styles.subtitle}>Versión: BETA</Text>

            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.text}>
              Esta aplicación tiene como objetivo brindar una experiencia
              educativa interactiva y divertida, ayudando a los usuarios a
              aprender y practicar diferentes habilidades y conocimientos.
            </Text>

            <Text style={styles.sectionTitle}>Funcionalidades principales</Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • Ejercicios matemáticos
              </Text>
              <Text style={styles.listItem}>
                • Seguimiento del progreso del usuario
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Contacto</Text>
            <Text style={styles.text}>
              Para dudas, sugerencias o soporte, contactar a: dcortes.net@gmail.com
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
  },
  text: { fontSize: 15, color: "#333", marginBottom: 10 },
  list: { paddingLeft: 10, marginBottom: 10 },
  listItem: { fontSize: 15, color: "#333", marginBottom: 5 },
  closeButton: { marginTop: 20, alignSelf: "flex-end" },
  closeText: { color: "#1e90ff", fontSize: 16, fontWeight: "600" },
});
