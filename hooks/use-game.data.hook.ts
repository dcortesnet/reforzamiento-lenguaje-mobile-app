import { useMemo } from "react";

// --- 1️⃣ Módulos base
const games = [
  {
    id: 1,
    title: "Comparación y lógica",
    icon: "abacus",
    quizType: "choice",
  },
];

// --- 2️⃣ Niveles por múdulo
const levelsByModule: Record<
  number,
  { id: string; name: string; difficulty: string }[]
> = {
  1: [
    { id: "1a", name: "Nivel 1", difficulty: "low" }
  ]
};

// --- 3️⃣ Ejercicios por nivel
const quizzesByLevel: Record<
  string,
  { q: string; a: number; choices?: any[] }[]
> = {
  "1a": [
    { q: "6 > 3", a: 0, choices: ["Verdadero", "Falso"] },
    { q: "2 < 4", a: 0, choices: ["Verdadero", "Falso"] },
    { q: "7 = 7", a: 0, choices: ["Verdadero", "Falso"] },
    { q: "6 > 9", a: 1, choices: ["Verdadero", "Falso"] },
    { q: "3 < 5", a: 0, choices: ["Verdadero", "Falso"] },
    { q: "8 = 6", a: 1, choices: ["Verdadero", "Falso"] },
    { q: "4 > 2", a: 0, choices: ["Verdadero", "Falso"] },
    { q: "5 < 1", a: 1, choices: ["Verdadero", "Falso"] },
    { q: "9 = 9", a: 0, choices: ["Verdadero", "Falso"] },
    { q: "7 > 10", a: 1, choices: ["Verdadero", "Falso"] },
  ],
};

export const useGameData = () => {
  return useMemo(() => {
    return games.map((game) => ({
      ...game,
      levels: (levelsByModule[game.id] || []).map((level) => ({
        ...level,
        exercises: quizzesByLevel[level.id] || [],
      })),
    }));
  }, []);
};
