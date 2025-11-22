import { useDailyTip } from "@/hooks/use-daily-tip";
import { useDailyLevelsStore } from "@/store/use-daily-level.store";
import { useStreakStore } from "@/store/use-streak-store";
import { useTrophyStore } from "@/store/use-trophy-store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const dailyTip = useDailyTip();
  const streakDays = useStreakStore((state) => state.streakDays);
  const trophies = useTrophyStore((state) => state.trophies);
  const completedDailyLevel = useDailyLevelsStore(
    (state) => state.completedDailyLevel
  );

  const handlePlayPress = () => {
    router.push({
      pathname: "/(tabs)/modules",
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Bienvenido 👋</Text>
          <Text style={styles.subtitle}>Sigamos entrenando tu comprensión</Text>
        </View>
      </View>

      {/* Racha y Trofeos */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="flame" size={30} color="#FFF" />
          <Text style={styles.statNumber}>{streakDays}</Text>
          <Text style={styles.statLabel}>Días seguidos</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="trophy" size={30} color="#FFF" />
          <Text style={styles.statNumber}>{trophies}</Text>
          <Text style={styles.statLabel}>Trofeos</Text>
        </View>
      </View>

      {/* Tiempo diario de práctica */}
      <View style={styles.practiceCard}>
        <View style={styles.practiceHeader}>
          <Ionicons name="time-outline" size={26} color="#007bff" />
          <Text style={styles.practiceTitle}>Niveles diarios completados</Text>
        </View>

        {/* Barra de progreso */}
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${(completedDailyLevel / 5) * 100}%` }, // 👈 Aquí se actualiza la barra
            ]}
          />
        </View>

        <Text style={styles.practiceText}>
          {completedDailyLevel} / 5 niveles completados ⏳
        </Text>
      </View>

      {/* Recomendación */}
      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={26} color="#007bff" />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.tipTitle}>Consejo del día</Text>
          <Text style={styles.tipText}>{dailyTip}</Text>
        </View>
      </View>

      {/* Botón grande de jugar */}
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => handlePlayPress()}
      >
        <Ionicons name="play-circle" size={26} color="#fff" />
        <Text style={styles.playText}>Jugar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 70 },
  content: { padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 15,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#007bff",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  statNumber: { color: "#fff", fontSize: 22, fontWeight: "700", marginTop: 6 },
  statLabel: { color: "#E3F2FD", fontSize: 13 },
  practiceCard: {
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  practiceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1976D2",
    marginLeft: 8,
  },
  progressContainer: {
    height: 10,
    backgroundColor: "#BBDEFB",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 6,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
  practiceText: {
    textAlign: "right",
    color: "#1976D2",
    fontSize: 13,
    fontWeight: "500",
  },

  /* --- Consejo --- */
  tipCard: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 28,
  },
  tipTitle: { fontWeight: "700", color: "#007bff", marginBottom: 2 },
  tipText: { color: "#374151", fontSize: 14 },

  /* --- Botón jugar --- */
  playButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  playText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
  },
});
