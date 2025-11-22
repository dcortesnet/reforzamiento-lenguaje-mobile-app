import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginView() {
  const router = useRouter();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const logoImg = require("@/assets/images/reforzando-nino-1.png"); // logo principal
  // const topImage = require("@/assets/images/kid-illustration.png"); // imagen del niño o ilustración

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/(tabs)");
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* 🧒 Espacio para el niño o logo superior */}

        <Image source={logoImg} style={styles.image} contentFit="contain"/>
        <Text style={styles.appName}>Reforzando Lenguaje</Text>
        <Text style={styles.subtitle}>
         Cada ejercicio fortalece comprensión y expresión lingüística
        </Text>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Empezar</Text>
          )}
        </TouchableOpacity>

        
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  topImage: {
    width: 200,
    height: 150,
    resizeMode: "contain",
  },
  image: {
    width: 200,
    height: 300,
  },
  appName: {
    fontSize: 30,
    fontWeight: "700",
    color: "#006FD9",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#006FD9",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});
