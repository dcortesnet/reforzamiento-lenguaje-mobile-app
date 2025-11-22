import AboutAppModal from "@/components/about-app-modal";
import PrivacyPolicyModal from "@/components/privacy-policy-modal";
import { useProgressStore } from "@/store/use-progress-store";
import { useTrophyStore } from "@/store/use-trophy-store";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function SettingsView() {
  const resetProgress = useProgressStore((state) => state.resetProgress);
  const resetEnabledLevels = useProgressStore(
    (state) => state.resetEnabledLevels
  );
  const resetTrophies = useTrophyStore((state) => state.resetTrophies);
  const [modalPrivacyPolicyOpen, setModalPrivacyPolicyOpen] = useState(false);
  const [modalAboutAppOpen, setModalAboutAppOpen] = useState(false);

  const handleResetProgress = () => {
    Alert.alert("Confirmar", "¿Quieres resetear todo tu progreso?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sí, resetear",
        style: "destructive",
        onPress: () => {
          resetProgress();
          resetEnabledLevels();
          resetTrophies();
          Alert.alert("Listo", "Tu progreso ha sido reseteado");
        },
      },
    ]);
  };

  const handleOtherOption = (option: string) => {
    Alert.alert(option, "Funcionalidad pendiente...");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta y progreso</Text>

        <TouchableOpacity style={styles.item} onPress={handleResetProgress}>
          <Text style={styles.itemText}>Resetear progreso</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información</Text>

        <TouchableOpacity style={styles.item} onPress={() => setModalPrivacyPolicyOpen(true)}>
          <Text style={styles.itemText}>Políticas de privacidad</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => setModalAboutAppOpen(true)}
        >
          <Text style={styles.itemText}>Acerca de la app</Text>
        </TouchableOpacity>
      </View>

      <PrivacyPolicyModal
        visible={modalPrivacyPolicyOpen}
        onClose={() => setModalPrivacyPolicyOpen(false)}
      />
      <AboutAppModal
        visible={modalAboutAppOpen}
        onClose={() => setModalAboutAppOpen(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 5,
  },
  section: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    color: "#555",
  },
});
