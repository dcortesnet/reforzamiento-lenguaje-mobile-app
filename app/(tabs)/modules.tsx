import { useGameData } from "@/hooks/use-game.data.hook";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ModulesView() {
  const router = useRouter();
  const games = useGameData();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSelectGame = (id: string) => {
    router.push({
      pathname: "/views/levels-view",
      params: { id },
    });
  };

  return (
    <LinearGradient colors={["#F7F9FF", "#E3EEFF"]} style={styles.gradient}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Entrenemos tu compresión</Text>
        <Text style={styles.subtitle}>
          Fortalece tu capacidad para leer, comprender y comunicar eficazmente
        </Text>
        {games.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => handleSelectGame(String(game.id))}
          >
            {/* Contenido izquierdo */}
            <View style={styles.leftContent}>
              <MaterialCommunityIcons
                name={game.icon as any}
                size={22}
                color="#fff"
              />
              <Text style={styles.cardTitle}>{game.title}</Text>
            </View>

            {/* Ícono de jugar */}
            <View style={styles.playButton}>
              <Ionicons name="play" size={20} color="#007bff" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: "#777",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#007bff",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  playButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center", // ✅ centra el ícono dentro
    alignItems: "center",
  },
});
