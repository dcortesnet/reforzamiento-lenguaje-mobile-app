import { useGameData } from "@/hooks/use-game.data.hook";
import { useProgressStore } from "@/store/use-progress-store";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LevelsView() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const games = useGameData();
  const game = games.find((g) => g.id === Number(id));

  const { progress, enabledLevels } = useProgressStore();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  
  const handleSelectLevelCalculator = (levelId: string, isEnabled: boolean) => {
    if (!isEnabled) return;
    /*
    router.push({
      pathname: `/views/quiz-calculator-view`,
      params: { id: levelId },
    });
    */
  };

  const handleSelectLevelChoice = (levelId: string, isEnabled: boolean) => {
    if (!isEnabled) return;
    router.push({
      pathname: `/views/quiz-choice-view`,
      params: { id: levelId },
    });
  };

  const handleBack = () => {
    router.back();
  };

  if (!game) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#007bff" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Juego no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={28} color="#007bff" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.subtitle}>Selecciona un nivel</Text>
      <ScrollView>
        {game.levels.map((level) => {
          const percent = progress[level.id] ?? 0;
          const isEnabled = enabledLevels.includes(level.id);
          const quizType = game.quizType;

          const handleSelectLevel = () => {
            if (!isEnabled) return;
            if (quizType === "calculator") {
              handleSelectLevelCalculator(level.id, isEnabled);
            } else if (quizType === "choice") {
              handleSelectLevelChoice(level.id, isEnabled);
            } else {
              console.warn("Tipo de quiz desconocido:", quizType);
            }
          };

          return (
            <TouchableOpacity
              key={level.id}
              style={[styles.levelCard, !isEnabled && styles.levelCardLocked]}
              activeOpacity={isEnabled ? 0.7 : 1}
              onPress={isEnabled ? handleSelectLevel : undefined}
            >
              <Text
                style={[styles.levelText, !isEnabled && styles.levelTextLocked]}
              >
                {level.name}
              </Text>
              <Text
                style={[styles.levelText, !isEnabled && styles.levelTextLocked]}
              >
                {percent}%
              </Text>

              <View
                style={[
                  styles.playIconWrapper,
                  !isEnabled && styles.playIconWrapperLocked,
                ]}
              >
                <Ionicons
                  name={isEnabled ? "play" : "lock-closed"}
                  size={20}
                  color={isEnabled ? "#007bff" : "#999"}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 60 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backText: { color: "#007bff", marginLeft: 5, fontSize: 16 },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
    color: "#000",
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  levelCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#007bff",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  levelCardLocked: {
    backgroundColor: "#ddd",
  },
  levelText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  levelTextLocked: { color: "#777" },
  playIconWrapper: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  playIconWrapperLocked: {
    backgroundColor: "#eee",
  },
  statsContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  statsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  statsText: {
    color: "#007bff",
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 8,
  },
});
