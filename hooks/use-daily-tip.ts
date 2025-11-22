import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const TIPS = [
  "Practica multiplicaciones mentales rápidas para mejorar tu velocidad cognitiva ⚡",
  "Cambia de mano al cepillarte los dientes para activar tu cerebro 🪥",
  "Haz una pausa de 5 minutos para respirar y concentrarte 🧘",
  "Juega un minijuego de memoria para fortalecer tu atención 🧠",
  "Trata de recordar los nombres de las calles por donde caminas 🚶",
  "Cuenta hacia atrás desde 100 en intervalos de 3 para enfocar tu mente 🔢",
];

const STORAGE_KEY = "daily_tip";

export function useDailyTip() {
  const [tip, setTip] = useState<string>("");

  useEffect(() => {
    const fetchTip = async () => {
      const today = new Date().toDateString();
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        const { date, tip } = JSON.parse(stored);
        if (date === today) {
          setTip(tip);
          return;
        }
      }

      const newTip = TIPS[Math.floor(Math.random() * TIPS.length)];
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ date: today, tip: newTip })
      );
      setTip(newTip);
    };

    fetchTip();
  }, []);

  return tip;
}