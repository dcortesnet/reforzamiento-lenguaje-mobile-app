import { useMemo } from "react";

// --- 1️⃣ Módulos base
const games = [
  {
    id: 1,
    title: "Completa la frase",
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
    { id: "1a", name: "Nivel 1", difficulty: "low" },
    { id: "1b", name: "Nivel 2", difficulty: "low" },
    { id: "1c", name: "Nivel 3", difficulty: "low" },
    { id: "1d", name: "Nivel 4", difficulty: "low" },
    { id: "1r", name: "Nivel 5", difficulty: "low" },
  ],
};

// --- 3️⃣ Ejercicios por nivel
const quizzesByLevel: Record<
  string,
  { q: string; a: number; choices?: any[] }[]
> = {
  "1a": [
    {
      q: "El perro duerme en el __.",
      a: 0,
      choices: ["sofá", "cielo", "cuchara", "nieve"],
    },
    {
      q: "Juan bebe agua cuando tiene __.",
      a: 1,
      choices: ["sueño", "sed", "hambre", "miedo"],
    },
    {
      q: "María perdió su __ en el pasillo.",
      a: 2,
      choices: ["zapato", "lápiz", "cuaderno", "sombrero"],
    },
    {
      q: "El sol aparece por la __.",
      a: 3,
      choices: ["noche", "montaña", "lluvia", "mañana"],
    },
    {
      q: "Los pájaros pueden __ en el cielo.",
      a: 0,
      choices: ["volar", "nadar", "correr", "pintar"],
    },
    {
      q: "A Pedro le duele la __.",
      a: 1,
      choices: ["cama", "cabeza", "silla", "hoja"],
    },
    {
      q: "El niño escribe con un __.",
      a: 2,
      choices: ["vaso", "papel", "lápiz", "árbol"],
    },
    {
      q: "La clase comienza a las __.",
      a: 3,
      choices: ["nubes", "flores", "vueltas", "ocho"],
    },
    {
      q: "El gato juega con una __.",
      a: 1,
      choices: ["taza", "pelota", "ropa", "llave"],
    },
    {
      q: "Para leer un libro necesitas tus __.",
      a: 0,
      choices: ["ojos", "pies", "manos", "orejas"],
    },
  ],
  "1b": [
    {
      q: "La mesa está hecha de __.",
      a: 2,
      choices: ["agua", "nube", "madera", "humo"],
    },
    {
      q: "Para escuchar usamos los __.",
      a: 3,
      choices: ["ojos", "pies", "manos", "oídos"],
    },
    {
      q: "El carro se mueve con __.",
      a: 1,
      choices: ["plumas", "gasolina", "pintura", "tierra"],
    },
    {
      q: "El helado está muy __.",
      a: 0,
      choices: ["frío", "caliente", "duro", "salado"],
    },
    {
      q: "El bebé está __ porque tiene hambre.",
      a: 2,
      choices: ["feliz", "dormido", "llorando", "saltando"],
    },
    {
      q: "Necesito una __ para abrir la puerta.",
      a: 1,
      choices: ["cuerda", "llave", "taza", "flor"],
    },
    {
      q: "El tren avanza por las __.",
      a: 3,
      choices: ["calles", "nubes", "montañas", "vías"],
    },
    {
      q: "Mi mamá prepara una sopa muy __.",
      a: 0,
      choices: ["rica", "dura", "seca", "triste"],
    },
    {
      q: "En el cielo se ven muchas __.",
      a: 2,
      choices: ["mesas", "zapatillas", "estrellas", "cuadernos"],
    },
    {
      q: "La abeja produce __.",
      a: 1,
      choices: ["pan", "miel", "arroz", "piedras"],
    },
    {
      q: "El gato se esconde debajo de la __.",
      a: 0,
      choices: ["cama", "canción", "palabra", "luz"],
    },
    {
      q: "En la playa jugamos con __.",
      a: 3,
      choices: ["lluvia", "hojas", "papeles", "arena"],
    },
    {
      q: "Para caminar usamos los __.",
      a: 1,
      choices: ["ojos", "pies", "dientes", "orejas"],
    },
    {
      q: "El pez vive en el __.",
      a: 0,
      choices: ["agua", "árbol", "cielo", "pasto"],
    },
    {
      q: "El sol brilla durante el __.",
      a: 2,
      choices: ["coche", "frío", "día", "techo"],
    },
  ],
  "1c": [
    {
      q: "Rápido significa __.",
      a: 1,
      choices: ["largo", "veloz", "pálido", "roto"],
    },
    {
      q: "Feliz es parecido a __.",
      a: 2,
      choices: ["serio", "fuerte", "contento", "duro"],
    },
    {
      q: "Pequeño es lo mismo que __.",
      a: 0,
      choices: ["chico", "alto", "brillante", "cansado"],
    },
    {
      q: "Enojado significa __.",
      a: 3,
      choices: ["tranquilo", "alegre", "débil", "molesto"],
    },
    {
      q: "Hermoso es igual a __.",
      a: 1,
      choices: ["feo", "lindo", "viejo", "raro"],
    },
    {
      q: "Oscuro es parecido a __.",
      a: 2,
      choices: ["claro", "feliz", "sin luz", "suave"],
    },
    {
      q: "Cansado significa __.",
      a: 0,
      choices: ["agotado", "joven", "rápido", "frío"],
    },
    {
      q: "Ruidoso es similar a __.",
      a: 3,
      choices: ["tranquilo", "limpio", "pequeño", "escandaloso"],
    },
    {
      q: "Valiente quiere decir __.",
      a: 1,
      choices: ["tímido", "atrevido", "aburrido", "débil"],
    },
    {
      q: "Triste significa __.",
      a: 2,
      choices: ["feliz", "fuerte", "apenado", "rápido"],
    },
    {
      q: "Caliente es igual a __.",
      a: 0,
      choices: ["ardiente", "frío", "lento", "amargo"],
    },
    {
      q: "Limpio quiere decir __.",
      a: 1,
      choices: ["sucio", "ordenado", "alto", "raro"],
    },
    {
      q: "Sabio significa __.",
      a: 3,
      choices: ["fuerte", "rápido", "raro", "inteligente"],
    },
    {
      q: "Difícil es parecido a __.",
      a: 2,
      choices: ["simple", "suave", "complicado", "corto"],
    },
    {
      q: "Roto significa __.",
      a: 0,
      choices: ["quebrado", "nuevo", "limpio", "feliz"],
    },
  ],
  "1d": [
    {
      q: "Alto es lo contrario de __.",
      a: 3,
      choices: ["fuerte", "viejo", "suave", "bajo"],
    },
    {
      q: "Frío es opuesto a __.",
      a: 2,
      choices: ["suave", "oscuro", "caliente", "amargo"],
    },
    {
      q: "Rápido es contrario a __.",
      a: 1,
      choices: ["joven", "lento", "nuevo", "suave"],
    },
    {
      q: "Feliz es opuesto a __.",
      a: 0,
      choices: ["triste", "alto", "duro", "viejo"],
    },
    {
      q: "Limpio es contrario de __.",
      a: 2,
      choices: ["nuevo", "pequeño", "sucio", "fácil"],
    },
    {
      q: "Encender es lo opuesto a __.",
      a: 3,
      choices: ["saltar", "comer", "correr", "apagar"],
    },
    {
      q: "Duro es opuesto a __.",
      a: 1,
      choices: ["alto", "blando", "fuerte", "claro"],
    },
    {
      q: "Abrir es contrario de __.",
      a: 0,
      choices: ["cerrar", "romper", "gritar", "subir"],
    },
    {
      q: "Grande es opuesto a __.",
      a: 2,
      choices: ["fuerte", "ruidoso", "pequeño", "claro"],
    },
    {
      q: "Ligero es lo contrario de __.",
      a: 3,
      choices: ["feliz", "roto", "caliente", "pesado"],
    },
    {
      q: "Viejo es opuesto a __.",
      a: 0,
      choices: ["nuevo", "alto", "duro", "amargo"],
    },
    {
      q: "Entrar es lo contrario de __.",
      a: 1,
      choices: ["beber", "salir", "cantar", "jugar"],
    },
    {
      q: "Subir es opuesto a __.",
      a: 2,
      choices: ["caminar", "leer", "bajar", "pensar"],
    },
    {
      q: "Cerca es lo contrario de __.",
      a: 3,
      choices: ["triste", "amargo", "alto", "lejos"],
    },
    {
      q: "Ruidoso es opuesto a __.",
      a: 1,
      choices: ["largo", "silencioso", "fuerte", "claro"],
    },
  ],
  "1e": [
    {
      q: "El pan se corta con un __.",
      a: 2,
      choices: ["lápiz", "camión", "cuchillo", "planta"],
    },
    {
      q: "La maestra escribe en la __.",
      a: 0,
      choices: ["pizarra", "silla", "ventana", "carta"],
    },
    {
      q: "El avión vuela por el __.",
      a: 3,
      choices: ["agua", "piso", "bosque", "cielo"],
    },
    {
      q: "El niño juega en el __.",
      a: 1,
      choices: ["cajón", "patio", "árbol", "teléfono"],
    },
    {
      q: "Guardamos la comida en el __.",
      a: 0,
      choices: ["refrigerador", "cuadro", "baño", "techo"],
    },
    {
      q: "Para dibujar uso __.",
      a: 2,
      choices: ["zapatos", "libros", "lápices", "frutas"],
    },
    {
      q: "Las flores crecen en el __.",
      a: 3,
      choices: ["cielo", "mar", "lago", "jardín"],
    },
    {
      q: "La lluvia cae del __.",
      a: 1,
      choices: ["pasto", "cielo", "piso", "árbol"],
    },
    {
      q: "Usamos una __ para ver la hora.",
      a: 0,
      choices: ["reloj", "mochila", "puerta", "cuerda"],
    },
    {
      q: "Me siento en la __.",
      a: 2,
      choices: ["nube", "ventana", "silla", "pelota"],
    },
    {
      q: "La mariposa tiene dos __.",
      a: 3,
      choices: ["colas", "alas", "patas", "alas"],
    },
    {
      q: "El caballo corre muy __.",
      a: 0,
      choices: ["rápido", "suave", "frío", "vacío"],
    },
    {
      q: "En el recreo como una __.",
      a: 1,
      choices: ["silla", "manzana", "lámpara", "hoja"],
    },
    {
      q: "Las estrellas brillan por la __.",
      a: 3,
      choices: ["mañana", "tarde", "lluvia", "noche"],
    },
    {
      q: "El tigre es un animal muy __.",
      a: 2,
      choices: ["pequeño", "lento", "fuerte", "claro"],
    },
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
