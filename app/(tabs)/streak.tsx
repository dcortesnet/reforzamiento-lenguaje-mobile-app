import { useStreakStore } from "@/store/use-streak-store";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function StreakView() {
  const streakDays = useStreakStore((state) => state.streakDays);
  const playedDays = useStreakStore((state) => state.playedDays);
  const markDayAsPlayed = useStreakStore((state) => state.markDayAsPlayed);

  const [calendarKey, setCalendarKey] = useState<number>(0);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const getMarkedDates = () => {
    const marked: any = {};
    Object.keys(playedDays).forEach((date) => {
      marked[date] = {
        customStyles: {
          container: { backgroundColor: "#007bff", borderRadius: 20 },
          text: { color: "white", fontWeight: "bold" },
        },
      };
    });
    return marked;
  };

  useFocusEffect(
    useCallback(() => {
      setCalendarKey((prev) => prev + 1);
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Días de racha</Text>

      <View style={styles.streakContainer}>
        <Ionicons name="flame" size={50} color="#FF9800" />
        
        <Text style={styles.streakNumber}>{streakDays}</Text>
      </View>

      <Text style={styles.calendarTitle}>Calendario de racha</Text>
      <Calendar
        key={calendarKey}
        markingType={"custom"}
        markedDates={getMarkedDates()}
        current={todayStr}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  streakNumber: {
    fontSize: 50,
    fontWeight: "bold",
    marginLeft: 10,
  },
  playButton: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  playButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
