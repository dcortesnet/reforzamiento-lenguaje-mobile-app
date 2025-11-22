import { useMemo } from "react";

// --- 1️⃣ Módulos base
const games = [
  {
    id: 1,
    title: "Completa la oración",
    icon: "",
    quizType: "choice",
  },
  {
    id: 2,
    title: "¿Qué puedo deducir?",
    icon: "",
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
    { id: "1e", name: "Nivel 5", difficulty: "low" },
  ],
  2: [
    { id: "2a", name: "Nivel 1", difficulty: "medium" },
    { id: "2b", name: "Nivel 2", difficulty: "medium" },
    { id: "2c", name: "Nivel 3", difficulty: "medium" },
    { id: "2d", name: "Nivel 4", difficulty: "medium" },
    { id: "2e", name: "Nivel 5", difficulty: "medium" },
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
  "2a": [
    {
      q: "Ana lleva un paraguas abierto mientras camina.",
      a: 0,
      choices: [
        "Está lloviendo",
        "Hace calor",
        "Está anocheciendo",
        "Es de madrugada",
      ],
    },
    {
      q: "El niño tiene el abrigo puesto dentro de la casa.",
      a: 3,
      choices: [
        "Tiene sueño",
        "Va a salir a jugar",
        "Está enfermo",
        "Hace frío",
      ],
    },
    {
      q: "Pedro llega a la escuela corriendo y sudando.",
      a: 1,
      choices: [
        "Viene del recreo",
        "Llegó tarde",
        "No estudió",
        "Está molesto",
      ],
    },
    {
      q: "La maestra guarda todos los libros y apaga la luz.",
      a: 2,
      choices: [
        "Empieza la clase",
        "Habrá una prueba",
        "La clase terminó",
        "Llegó la directora",
      ],
    },
    {
      q: "El gato está sentado frente a la puerta maullando.",
      a: 0,
      choices: ["Quiere salir", "Tiene sueño", "Busca comida", "Quiere jugar"],
    },
    {
      q: "María mueve sus labios mientras lee en silencio.",
      a: 1,
      choices: [
        "Está cantando",
        "Está concentrada",
        "Está asustada",
        "Está copiando",
      ],
    },
    {
      q: "Luis se tapa los oídos cuando pasa un camión grande.",
      a: 2,
      choices: [
        "Le gusta el camión",
        "Tiene frío",
        "Le molesta el ruido",
        "Tiene miedo",
      ],
    },
    {
      q: "Sofía mira el reloj varias veces.",
      a: 3,
      choices: [
        "Está triste",
        "Tiene hambre",
        "Busca su mochila",
        "Espera algo",
      ],
    },
    {
      q: "El perro mueve la cola cuando ve a su dueño.",
      a: 0,
      choices: ["Está feliz", "Tiene frío", "Quiere dormir", "Está enfermo"],
    },
    {
      q: "El niño pone la cabeza sobre la mesa y suspira.",
      a: 2,
      choices: [
        "Está comiendo",
        "Está jugando",
        "Está cansado",
        "Está leyendo",
      ],
    },
  ],
  "2b": [
    {
      q: "Carla esconde un papel detrás de su cuaderno cuando llega la profesora.",
      a: 1,
      choices: [
        "Está ordenando",
        "No quiere que lo vean",
        "Busca algo",
        "Está aburrida",
      ],
    },
    {
      q: "Javier sonríe mientras mira su celular.",
      a: 0,
      choices: [
        "Recibió un mensaje que le gusta",
        "Tiene hambre",
        "Quiere dormir",
        "Se enojó",
      ],
    },
    {
      q: "Lucas no trae su cuaderno y evita mirar al profesor.",
      a: 2,
      choices: [
        "Está enfermo",
        "Está distraído",
        "Olvidó su tarea",
        "Quiere participar",
      ],
    },
    {
      q: "La niña camina lentamente arrastrando los pies.",
      a: 3,
      choices: ["Tiene hambre", "Está feliz", "Ganó un premio", "Está cansada"],
    },
    {
      q: "Claudia abre la ventana y respira hondo.",
      a: 1,
      choices: ["Tiene sed", "Necesita aire", "Busca a alguien", "Va a salir"],
    },
    {
      q: "El profesor repite la misma instrucción varias veces.",
      a: 0,
      choices: [
        "No le están prestando atención",
        "Terminó la clase",
        "Está enfermo",
        "Quiere cantar",
      ],
    },
    {
      q: "Tomás levanta la mano muchas veces.",
      a: 2,
      choices: [
        "Está enojado",
        "Quiere salir",
        "Quiere participar",
        "Está durmiendo",
      ],
    },
    {
      q: "La niña aprieta fuerte su cuaderno contra el pecho.",
      a: 3,
      choices: ["Tiene frío", "Está jugando", "Quiere correr", "Está nerviosa"],
    },
    {
      q: "En la clase todos guardan silencio mirando la puerta.",
      a: 1,
      choices: [
        "Empieza el recreo",
        "Esperan a alguien",
        "Van a comer",
        "Hay un ruido",
      ],
    },
    {
      q: "El niño se cubre con una manta incluso con luz.",
      a: 0,
      choices: [
        "Tiene miedo",
        "Quiere jugar",
        "Está componiendo",
        "Tiene calor",
      ],
    },
  ],
  "2c": [
    {
      q: "El restaurante está lleno y la gente hace fila afuera.",
      a: 2,
      choices: [
        "Está por cerrar",
        "Cocinan mal",
        "Es muy popular",
        "Está vacío",
      ],
    },
    {
      q: "Sofía guarda dinero en un frasco todos los días.",
      a: 0,
      choices: [
        "Está ahorrando",
        "Está castigada",
        "Tiene frío",
        "No quiere salir",
      ],
    },
    {
      q: "El auto no enciende aunque giran la llave varias veces.",
      a: 3,
      choices: [
        "Está muy limpio",
        "Tiene poca gasolina",
        "El conductor está apurado",
        "Está descompuesto",
      ],
    },
    {
      q: "El niño mira por la ventana con su mochila puesta.",
      a: 1,
      choices: [
        "Tiene sueño",
        "Está esperando irse",
        "Quiere comer",
        "Perdió algo",
      ],
    },
    {
      q: "Todos llevan gorro y bufanda en la calle.",
      a: 2,
      choices: ["Es de noche", "Hace calor", "Hace frío", "Van al cine"],
    },
    {
      q: "La sala está decorada con globos y música alegre.",
      a: 0,
      choices: [
        "Habrá una celebración",
        "Hay un incendio",
        "Van a estudiar",
        "Es un funeral",
      ],
    },
    {
      q: "Martín revisa varias veces su mochila antes de salir.",
      a: 3,
      choices: [
        "Tiene miedo",
        "Está triste",
        "Quiere jugar",
        "No quiere olvidar nada",
      ],
    },
    {
      q: "La niña trae un regalo envuelto y lo esconde detrás de su espalda.",
      a: 1,
      choices: [
        "Está cansada",
        "Quiere dar una sorpresa",
        "Está enojada",
        "Lo quiere devolver",
      ],
    },
    {
      q: "El perro corre hacia la puerta apenas oye un ruido.",
      a: 2,
      choices: ["Tiene sueño", "Quiere comida", "Alguien llegó", "Está triste"],
    },
    {
      q: "Lucas revisa su reloj mientras camina rápido.",
      a: 0,
      choices: [
        "Tiene prisa",
        "Busca su casa",
        "Está perdido",
        "Quiere descansar",
      ],
    },
  ],
  "2d": [
    {
      q: "Los estudiantes miran sus cuadernos y nadie habla.",
      a: 1,
      choices: [
        "Es recreo",
        "Están en una prueba",
        "Es cumpleaños de alguien",
        "Van a salir",
      ],
    },
    {
      q: "El vendedor baja la cortina del local.",
      a: 0,
      choices: [
        "Cerró el negocio",
        "Llegó un cliente",
        "Está de vacaciones",
        "Está limpiando",
      ],
    },
    {
      q: "Una mujer corre con una bolsa bajo la lluvia.",
      a: 3,
      choices: [
        "Busca sombra",
        "Quiere pasear",
        "Va al gimnasio",
        "Quiere proteger sus cosas",
      ],
    },
    {
      q: "El hombre revisa varias veces su billetera vacía.",
      a: 1,
      choices: [
        "Tiene sueño",
        "No tiene dinero",
        "Busca un lápiz",
        "Quiere correr",
      ],
    },
    {
      q: "Hay platos sucios y comida sin terminar en la mesa.",
      a: 2,
      choices: ["Se perdieron", "Aún no comen", "Ya comieron", "Van a cocinar"],
    },
    {
      q: "Una niña sostiene un trofeo y sonríe.",
      a: 0,
      choices: [
        "Ganó un premio",
        "Tiene hambre",
        "Está molesta",
        "Quiere dormir",
      ],
    },
    {
      q: "El bus está detenido y la gente baja corriendo.",
      a: 3,
      choices: [
        "Es muy tarde",
        "Se equivocaron de bus",
        "Es un día normal",
        "Llegaron a su destino",
      ],
    },
    {
      q: "Juan trae un vendaje en la rodilla.",
      a: 1,
      choices: ["Está jugando", "Tuvo una caída", "Ganó algo", "Se mudó"],
    },
    {
      q: "Una persona busca sombra y se abanica.",
      a: 0,
      choices: ["Hace calor", "Tiene miedo", "Está enferma", "Va a llover"],
    },
    {
      q: "La biblioteca está completamente silenciosa.",
      a: 2,
      choices: [
        "Están de fiesta",
        "Están grabando",
        "Todos están leyendo o estudiando",
        "No hay personas",
      ],
    },
  ],
  "2e": [
    {
      q: "Una niña camina con un mapa abierto mientras mira los letreros de la calle.",
      a: 1,
      choices: [
        "Busca una tienda",
        "No sabe dónde está",
        "Está jugando",
        "Quiere correr",
      ],
    },
    {
      q: "Un grupo toma notas mientras observa un experimento.",
      a: 3,
      choices: [
        "Están limpiando",
        "Van a un paseo",
        "Van a pintar",
        "Están estudiando ciencias",
      ],
    },
    {
      q: "La maestra sienta a dos alumnos separados después de hablarles seriamente.",
      a: 0,
      choices: [
        "Estaban molestándose",
        "Tienen sueño",
        "Hicieron una prueba",
        "Van a ser premiados",
      ],
    },
    {
      q: "Luis revisa una lista con precios en el supermercado.",
      a: 2,
      choices: [
        "Está aburrido",
        "Busca amigos",
        "Está comparando productos",
        "Va al médico",
      ],
    },
    {
      q: "Una persona subraya partes importantes de un libro.",
      a: 3,
      choices: [
        "Tiene hambre",
        "Está jugando",
        "Busca su cuaderno",
        "Está estudiando",
      ],
    },
    {
      q: "La niña abre un paraguas aunque no hay lluvia.",
      a: 1,
      choices: ["Tiene frío", "Hace mucho sol", "Está dormida", "Va de noche"],
    },
    {
      q: "Los padres preparan mochilas y revisan uniformes por la noche.",
      a: 0,
      choices: [
        "Mañana hay clases",
        "Van al cine",
        "Es fin de semana",
        "Hay vacaciones",
      ],
    },
    {
      q: "El niño guarda silenciosamente un jarrón roto debajo de la mesa.",
      a: 2,
      choices: [
        "Está feliz",
        "Quiere comer",
        "Tiene miedo de que lo reten",
        "Está estudiando",
      ],
    },
    {
      q: "La gente corre hacia la estación justo cuando se oye un ruido fuerte.",
      a: 1,
      choices: [
        "Buscan sombra",
        "El tren llegó",
        "Van a comprar comida",
        "Están jugando",
      ],
    },
    {
      q: "Una mujer prepara maletas y revisa documentos.",
      a: 3,
      choices: [
        "Va a estudiar",
        "Busca su celular",
        "Quiere cocinar",
        "Va de viaje",
      ],
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
