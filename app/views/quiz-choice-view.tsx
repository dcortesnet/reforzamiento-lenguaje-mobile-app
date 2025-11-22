import { useGameData } from "@/hooks/use-game.data.hook";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GAME_TIMER_DURATION = 65;

export default function QuizChoiceView() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(GAME_TIMER_DURATION);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [score, setScore] = useState(0);
  const timerRef = useRef<number | null>(null);
  const gameData = useGameData();
  const exercises = useMemo(() => {
    for (const game of gameData) {
      for (const level of game.levels) {
        if (level.id === id) {
          return level.exercises;
        }
      }
    }
    return [{ q: "Nivel no encontrado", a: 0 }];
  }, [id, gameData]);

  useFocusEffect(
    useCallback(() => {
      setTimeLeft(GAME_TIMER_DURATION);
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => (t > 0 ? t - 1 : 0));
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }, [id])
  );

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (timeLeft === 0) {
      const total = exercises.length;
      router.push({
        pathname: "/views/summary-view",
        params: { score, total, id },
      });
    }
  }, [timeLeft]);

  const handleBack = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    router.back();
  };

  const handleChoice = (choice: string) => {
    const correctIndex = exercises[currentQuestion].a;
    const answerChoices = exercises[currentQuestion].choices as any[];
    const correct = answerChoices[correctIndex];

    if (choice === correct) {
      setScore((prev) => prev + 1);
      setErrorMessage("");
      if (currentQuestion + 1 < exercises.length) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        const total = exercises.length;
        router.push({
          pathname: "/views/summary-view",
          params: { score: score + 1, total, id },
        });
      }
    } else {
      setErrorMessage("Incorrecto ¡Intenta nuevamente!");
    }
  };

  const progressPercent = Math.round(
    (currentQuestion / exercises.length) * 100
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            handleBack();
          }}
        >
          <Ionicons name="arrow-back" size={22} color="#2C7CFF" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.timer}>
            <Ionicons name="time-outline" size={24} color="#FF9500" />{" "}
            {timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
          </Text>
          <Text style={styles.score}>
            {score}/{exercises.length}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View
            style={[styles.progressBar, { width: `${progressPercent}%` }]}
          />
        </View>

        {/* Feedback box */}
        <View
          style={[
            styles.feedbackBox,
            errorMessage === "" ? styles.neutralBox : styles.incorrectBox,
          ]}
        >
          <Text style={styles.feedbackText}>
            {errorMessage !== "" ? errorMessage : ""}
          </Text>
        </View>

        {/* Question */}
        <View style={styles.questionBox}>
          <Text style={styles.question}>{exercises[currentQuestion].q}</Text>
        </View>

        {/* Choices */}
        <View style={styles.choicesContainer}>
          {exercises[currentQuestion]?.choices?.map((choice) => (
            <TouchableOpacity
              key={choice}
              style={styles.choiceButton}
              onPress={() => handleChoice(choice)}
            >
              <Text style={styles.choiceText}>{choice}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backText: {
    color: "#2C7CFF",
    fontSize: 18,
    marginLeft: 8,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#F4F7FF",
    borderRadius: 12,
  },
  timer: { fontSize: 24, color: "#FF8000", fontWeight: "700" },
  score: { fontSize: 24, color: "#2C7CFF", fontWeight: "700" },
  progressContainer: {
    height: 14,
    backgroundColor: "#E3EEFF",
    borderRadius: 7,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBar: { height: "100%", backgroundColor: "#2C7CFF" },
  questionBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E9F1FF",
    borderRadius: 14,
    paddingVertical: 40,
    marginBottom: 20,
  },
  question: { fontSize: 30, fontWeight: "800", color: "#333" },
  choicesContainer: { flex: 1, justifyContent: "center" },
  choiceButton: {
    backgroundColor: "#2C7CFF",
    padding: 20,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: "center",
  },
  choiceText: { fontSize: 28, color: "#fff", fontWeight: "700" },
  feedbackBox: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    paddingVertical: 25,
    marginBottom: 15,
    backgroundColor: "#E9F1FF",
  },
  incorrectBox: {
    backgroundColor: "#FFEAEA",
    borderWidth: 2,
    borderColor: "#FF3B30",
  },
  feedbackText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  neutralBox: {
    backgroundColor: "#E9F1FF",
    borderWidth: 2,
    borderColor: "#E9F1FF",
  },
});
