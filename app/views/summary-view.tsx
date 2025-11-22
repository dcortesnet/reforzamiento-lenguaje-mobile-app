import { useGameData } from "@/hooks/use-game.data.hook";
import { useDailyLevelsStore } from "@/store/use-daily-level.store";
import { useProgressStore } from "@/store/use-progress-store";
import { useStreakStore } from "@/store/use-streak-store";
import { useTrophyStore } from "@/store/use-trophy-store";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SummaryView() {
  const { score, total, id } = useLocalSearchParams();
  const games = useGameData();
  const { progress, setProgress, enableLevel } = useProgressStore();
  const router = useRouter();
  const navigation = useNavigation();

  const scoreNum = Number(score) || 0;
  const totalNum = Number(total) || 1;
  const percentage = Math.round((scoreNum / totalNum) * 100);

  const currentGame = games.find((g) =>
    g.levels.some((level) => level.id === id)
  );
  const currentIndex = currentGame?.levels.findIndex((lvl) => lvl.id === id);
  const nextLevel =
    currentGame &&
    currentIndex !== undefined &&
    currentIndex + 1 < currentGame.levels.length
      ? currentGame.levels[currentIndex + 1]
      : undefined;

  const markDayAsPlayed = useStreakStore((state) => state.markDayAsPlayed);
  const playedDays = useStreakStore((state) => state.playedDays);
  const completeDailyLevel = useDailyLevelsStore((state) => state.completeDailyLevel);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;
  const addTrophy = useTrophyStore((state) => state.addTrophy);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    if (!playedDays[todayStr]) markDayAsPlayed(todayStr);

    if (id && typeof id === "string") {
      const previous = progress[id] || 0;
      if (percentage > previous) setProgress(id, percentage);
      if (percentage >= 100 && nextLevel) { 
        enableLevel(nextLevel.id)
        addTrophy();
        completeDailyLevel();
      };
    }
  }, [navigation, id, percentage, setProgress]);

  const handleBack = () => {
    router.replace("/(tabs)");
  };

  let status = "";
  let color = "";
  let icon = "";
  let cantTrophy = 0;

  if (scoreNum === totalNum) {
    status = "Excelente";
    color = "#4CAF50";
    icon = "trophy";
    cantTrophy = 1;
  } else if (scoreNum >= totalNum / 2) {
    status = "Intermedio";
    color = "#FFD700";
    icon = "happy-outline";
  } else {
    status = "Debes mejorar";
    color = "#FF3B30";
    icon = "sad-outline";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resumen del Nivel</Text>

      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.cellHeader, styles.cellLabel]}>Puntaje final</Text>
          <Text style={styles.cell}>{scoreNum}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cellHeader, styles.cellLabel]}>Total ejercicios</Text>
          <Text style={styles.cell}>{totalNum}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cellHeader, styles.cellLabel]}>Progreso</Text>
          <Text style={styles.cell}>{percentage}%</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.cellHeader, styles.cellLabel]}>Desempeño</Text>
          <View style={[styles.cell, styles.statusCell]}>
            <Text style={[styles.statusText, { color }]}>{status}</Text>
          </View>
        </View>
         <View style={styles.row}>
          <Text style={[styles.cellHeader, styles.cellLabel]}>Trofeos obtenidos</Text>
         <Text style={styles.cell}> + {cantTrophy}</Text> 
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Ionicons name="home" size={20} color="#fff" />
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 30,
    color: "#2C7CFF",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    width: "90%",
    backgroundColor: "#fff",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cellHeader: {
    fontWeight: "700",
    backgroundColor: "#2C7CFF",
    padding: 12,
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    textAlign: "center",
    color: "#333",
  },
  cellLabel: {
    textAlign: "left",
    paddingLeft: 20,
    color: "#fff",
  },
  cell: {
    flex: 1,
    padding: 12,
    textAlign: "center",
    color: "#333",
    fontSize: 16,
  },
  statusCell: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#2C7CFF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});