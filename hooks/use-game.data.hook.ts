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
    title: "Lee y deduce",
    icon: "",
    quizType: "choice",
  },
  {
    id: 3,
    title: "Encuentra la intención del texto",
    icon: "",
    quizType: "choice",
  },
  {
    id: 4,
    title: "Clasifica la palabra",
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
  3: [
    { id: "3a", name: "Nivel 1", difficulty: "medium" },
    { id: "3b", name: "Nivel 2", difficulty: "medium" },
    { id: "3c", name: "Nivel 3", difficulty: "medium" },
    { id: "3d", name: "Nivel 4", difficulty: "medium" },
    { id: "3e", name: "Nivel 5", difficulty: "medium" },
  ],
  4: [
    { id: "4a", name: "Nivel 1", difficulty: "medium" },
    { id: "4b", name: "Nivel 2", difficulty: "medium" },
    { id: "4c", name: "Nivel 3", difficulty: "medium" },
    { id: "4d", name: "Nivel 4", difficulty: "medium" },
    { id: "4e", name: "Nivel 5", difficulty: "medium" },
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
  "3a": [
    {
      q: "Este cartel indica que mañana no habrá clases por mantenimiento.",
      a: 0,
      choices: ["Informar", "Advertir", "Invitar", "Felicitar"],
    },
    {
      q: "¡No toques la estufa! Está muy caliente.",
      a: 1,
      choices: ["Contar algo", "Advertir", "Enseñar", "Felicitar"],
    },
    {
      q: "Ven a la actividad deportiva este sábado en la plaza central.",
      a: 2,
      choices: ["Explicar", "Advertir", "Invitar", "Ordenar"],
    },
    {
      q: "Gracias por participar en el proyecto de ciencias.",
      a: 3,
      choices: ["Invitar", "Advertir", "Informar", "Agradecer"],
    },
    {
      q: "El libro explica cómo cuidar mejor el medio ambiente.",
      a: 2,
      choices: ["Ordenar", "Advertir", "Enseñar", "Felicitar"],
    },
    {
      q: "Se ruega mantener silencio durante la presentación.",
      a: 1,
      choices: ["Felicitar", "Pedir algo", "Informar", "Invitar"],
    },
    {
      q: "Este texto cuenta cómo se formaron los volcanes.",
      a: 0,
      choices: ["Informar", "Invitar", "Ordenar", "Agradecer"],
    },
    {
      q: "Recuerda reciclar tus botellas para ayudar al planeta.",
      a: 1,
      choices: ["Felicitar", "Advertir", "Agradecer", "Invitar"],
    },
    {
      q: "Hoy celebramos el cumpleaños de nuestra maestra.",
      a: 3,
      choices: ["Enseñar", "Advertir", "Invitar", "Felicitar"],
    },
    {
      q: "Sigue los pasos para armar el rompecabezas correctamente.",
      a: 2,
      choices: ["Advertir", "Felicitar", "Enseñar", "Invitar"],
    },
  ],
  "3b": [
    {
      q: "El siguiente texto describe los síntomas de la deshidratación.",
      a: 3,
      choices: ["Invitar", "Advertir", "Felicitar", "Informar"],
    },
    {
      q: "Por favor, apaga las luces al salir del salón.",
      a: 1,
      choices: ["Agradecer", "Pedir algo", "Ordenar", "Invitar"],
    },
    {
      q: "No olvides revisar tu mochila antes de venir a clases.",
      a: 0,
      choices: ["Recordar", "Advertir", "Felicitar", "Enseñar"],
    },
    {
      q: "Este afiche te invita a participar en la feria de ciencias.",
      a: 2,
      choices: ["Contar algo", "Advertir", "Invitar", "Pedir algo"],
    },
    {
      q: "Cuidado: el piso está mojado y puedes resbalar.",
      a: 1,
      choices: ["Agradecer", "Advertir", "Felicitar", "Informar"],
    },
    {
      q: "El texto explica el ciclo del agua paso a paso.",
      a: 3,
      choices: ["Advertir", "Pedir", "Felicitar", "Enseñar"],
    },
    {
      q: "Gracias por tu apoyo en este proyecto escolar.",
      a: 0,
      choices: ["Agradecer", "Invitar", "Advertir", "Ordenar"],
    },
    {
      q: "Este anuncio informa que el parque estará cerrado esta semana.",
      a: 2,
      choices: ["Advertir", "Felicitación", "Informar", "Pedir"],
    },
    {
      q: "Ven a conocer las novedades de la biblioteca este mes.",
      a: 1,
      choices: ["Enseñar", "Invitar", "Advertir", "Ordenar"],
    },
    {
      q: "Por tu seguridad, cruza la calle solo con luz verde.",
      a: 3,
      choices: ["Invitar", "Agradecer", "Pedir", "Advertir"],
    },
  ],
  "3c": [
    {
      q: "Este folleto explica cómo actuar en caso de un incendio.",
      a: 2,
      choices: ["Invitar", "Felicitar", "Enseñar", "Agradecer"],
    },
    {
      q: "¡No olvides hidratarte si haces ejercicio al sol!",
      a: 1,
      choices: ["Invitar", "Advertir", "Enseñar", "Agradecer"],
    },
    {
      q: "Se prohíbe ingresar con mascotas al gimnasio.",
      a: 0,
      choices: ["Ordenar", "Invitar", "Informar", "Felicitar"],
    },
    {
      q: "Este mensaje es para contar los logros del mes en el club.",
      a: 3,
      choices: ["Advertir", "Agradecer", "Invitar", "Informar"],
    },
    {
      q: "Por favor, completa la encuesta para mejorar el servicio.",
      a: 1,
      choices: ["Advertir", "Pedir", "Felicitar", "Invitar"],
    },
    {
      q: "La guía enseña cómo ahorrar energía en el hogar.",
      a: 2,
      choices: ["Invitar", "Advertir", "Enseñar", "Agradecer"],
    },
    {
      q: "Este cartel advierte sobre objetos pesados en movimiento.",
      a: 1,
      choices: ["Informar", "Advertir", "Invitar", "Agradecer"],
    },
    {
      q: "¡Ven a celebrar nuestro aniversario escolar!",
      a: 2,
      choices: ["Enseñar", "Advertir", "Invitar", "Ordenar"],
    },
    {
      q: "Este mensaje agradece la participación de los voluntarios.",
      a: 0,
      choices: ["Agradecer", "Invitar", "Advertir", "Enseñar"],
    },
    {
      q: "El texto describe cómo funciona la fotosíntesis en las plantas.",
      a: 3,
      choices: ["Advertir", "Pedir", "Felicitar", "Informar"],
    },
  ],
  "3d": [
    {
      q: "Un informe detalla el impacto del uso excesivo de plásticos.",
      a: 3,
      choices: ["Advertir", "Felicitar", "Agradecer", "Informar"],
    },
    {
      q: "Este anuncio busca que te unas al club de lectura.",
      a: 1,
      choices: ["Informar", "Invitar", "Agradecer", "Advertir"],
    },
    {
      q: "El texto explica cómo mejorar tus hábitos de estudio.",
      a: 2,
      choices: ["Agradecer", "Felicitar", "Enseñar", "Invitar"],
    },
    {
      q: "Cuidado: animales peligrosos en esta zona.",
      a: 3,
      choices: ["Agradecer", "Invitar", "Informar", "Advertir"],
    },
    {
      q: "La maestra pide entregar las tareas antes del viernes.",
      a: 0,
      choices: ["Pedir", "Advertir", "Informar", "Agradecer"],
    },
    {
      q: "Este cartel invita a una charla sobre salud mental.",
      a: 1,
      choices: ["Advertir", "Invitar", "Agradecer", "Felicitar"],
    },
    {
      q: "El artículo describe cómo se formó el sistema solar.",
      a: 3,
      choices: ["Agradecer", "Invitar", "Advertir", "Informar"],
    },
    {
      q: "Por favor, mantén tus pertenencias siempre a la vista.",
      a: 1,
      choices: ["Enseñar", "Pedir", "Agradecer", "Invitar"],
    },
    {
      q: "Gracias por tu ayuda en la actividad comunitaria.",
      a: 0,
      choices: ["Agradecer", "Advertir", "Invitar", "Informar"],
    },
    {
      q: "Este texto pretende concientizar sobre el cuidado del agua.",
      a: 1,
      choices: ["Invitar", "Advertir", "Agradecer", "Felicitar"],
    },
  ],
  "3e": [
    {
      q: "El artículo pretende motivar a los jóvenes a participar en proyectos científicos.",
      a: 2,
      choices: ["Informar", "Advertir", "Invitar", "Felicitar"],
    },
    {
      q: "Este folleto advierte sobre los riesgos de usar audífonos a volumen alto.",
      a: 1,
      choices: ["Invitar", "Advertir", "Enseñar", "Agradecer"],
    },
    {
      q: "El texto enseña cómo mejorar la convivencia escolar.",
      a: 2,
      choices: ["Advertir", "Felicitar", "Enseñar", "Agradecer"],
    },
    {
      q: "Este mensaje busca promover la lectura diaria en casa.",
      a: 1,
      choices: ["Agradecer", "Invitar", "Advertir", "Enseñar"],
    },
    {
      q: "Se informa a los estudiantes que mañana habrá prueba.",
      a: 0,
      choices: ["Informar", "Agradecer", "Felicitar", "Advertir"],
    },
    {
      q: "Este aviso pide mantener el aula limpia.",
      a: 3,
      choices: ["Invitar", "Informar", "Felicitar", "Pedir"],
    },
    {
      q: "El texto felicita a quienes completaron el trimestre sin atrasos.",
      a: 0,
      choices: ["Felicitar", "Informar", "Advertir", "Invitar"],
    },
    {
      q: "La guía explica cómo construir un huerto escolar.",
      a: 2,
      choices: ["Felicitar", "Advertir", "Enseñar", "Invitar"],
    },
    {
      q: "Se advierte a los visitantes no acercarse demasiado al borde del mirador.",
      a: 1,
      choices: ["Felicitar", "Advertir", "Informar", "Agradecer"],
    },
    {
      q: "Este texto invita a reflexionar sobre el uso responsable de la tecnología.",
      a: 1,
      choices: ["Advertir", "Invitar", "Enseñar", "Felicitar"],
    },
  ],
  "4a": [
    {
      q: "correr",
      a: 0,
      choices: ["Verbo", "Sustantivo", "Adjetivo", "Adverbio"],
    },
    {
      q: "casa",
      a: 1,
      choices: ["Verbo", "Sustantivo", "Adjetivo", "Adverbio"],
    },
    {
      q: "rápido",
      a: 2,
      choices: ["Verbo", "Sustantivo", "Adjetivo", "Adverbio"],
    },
    {
      q: "ayer",
      a: 3,
      choices: ["Verbo", "Sustantivo", "Adjetivo", "Adverbio"],
    },
    {
      q: "saltar",
      a: 0,
      choices: ["Verbo", "Sustantivo", "Adjetivo", "Adverbio"],
    },
    {
      q: "feliz",
      a: 2,
      choices: ["Verbo", "Sustantivo", "Adjetivo", "Adverbio"],
    },
    {
      q: "lápiz",
      a: 1,
      choices: ["Verbo", "Sustantivo", "Adjetivo", "Adverbio"],
    },
    {
      q: "suavemente",
      a: 3,
      choices: ["Verbo", "Sustantivo", "Adjetivo", "Adverbio"],
    },
    {
      q: "caminar",
      a: 0,
      choices: ["Verbo", "Sustantivo", "Adjetivo", "Adverbio"],
    },
    {
      q: "niño",
      a: 1,
      choices: ["Verbo", "Sustantivo", "Adjetivo", "Adverbio"],
    },
  ],
  "4b": [
    {
      q: "Pedro",
      a: 1,
      choices: ["Sustantivo común", "Sustantivo propio", "Verbo", "Adjetivo"],
    },
    {
      q: "ciudad",
      a: 0,
      choices: ["Sustantivo común", "Sustantativo propio", "Verbo", "Adjetivo"],
    },
    {
      q: "leer",
      a: 2,
      choices: ["Sustantivo común", "Sustantivo propio", "Verbo", "Adjetivo"],
    },
    {
      q: "hermoso",
      a: 3,
      choices: ["Sustantivo común", "Sustantivo propio", "Verbo", "Adjetivo"],
    },
    {
      q: "Carolina",
      a: 1,
      choices: ["Sustantivo común", "Sustantivo propio", "Verbo", "Adjetivo"],
    },
    {
      q: "montaña",
      a: 0,
      choices: ["Sustantivo común", "Sustantivo propio", "Verbo", "Adjetivo"],
    },
    {
      q: "cantar",
      a: 2,
      choices: ["Sustantivo común", "Sustantivo propio", "Verbo", "Adjetivo"],
    },
    {
      q: "pequeño",
      a: 3,
      choices: ["Sustantivo común", "Sustantivo propio", "Verbo", "Adjetivo"],
    },
    {
      q: "río",
      a: 0,
      choices: ["Sustantivo común", "Sustantivo propio", "Verbo", "Adjetivo"],
    },
    {
      q: "Andrés",
      a: 1,
      choices: ["Sustantivo común", "Sustantivo propio", "Verbo", "Adjetivo"],
    },
  ],
  "4c": [
    {
      q: "brillantemente",
      a: 3,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "tormenta",
      a: 0,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "gritar",
      a: 1,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "silencioso",
      a: 2,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "velozmente",
      a: 3,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "montículo",
      a: 0,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "dibujar",
      a: 1,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "oscuro",
      a: 2,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "temprano",
      a: 3,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "sabiduría",
      a: 0,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
  ],
  "4d": [
    {
      q: "romper",
      a: 0,
      choices: [
        "Verbo transitivo",
        "Verbo intransitivo",
        "Adjetivo",
        "Adverbio",
      ],
    },
    {
      q: "caminar",
      a: 1,
      choices: [
        "Verbo transitivo",
        "Verbo intransitivo",
        "Adjetivo",
        "Adverbio",
      ],
    },
    {
      q: "brillante",
      a: 2,
      choices: [
        "Verbo transitivo",
        "Verbo intransitivo",
        "Adjetivo",
        "Adverbio",
      ],
    },
    {
      q: "cuidadosamente",
      a: 3,
      choices: [
        "Verbo transitivo",
        "Verbo intransitivo",
        "Adjetivo",
        "Adverbio",
      ],
    },
    {
      q: "pintar",
      a: 0,
      choices: [
        "Verbo transitivo",
        "Verbo intransitivo",
        "Adjetivo",
        "Adverbio",
      ],
    },
    {
      q: "dormir",
      a: 1,
      choices: [
        "Verbo transitivo",
        "Verbo intransitivo",
        "Adjetivo",
        "Adverbio",
      ],
    },
    {
      q: "delicado",
      a: 2,
      choices: [
        "Verbo transitivo",
        "Verbo intransitivo",
        "Adjetivo",
        "Adverbio",
      ],
    },
    {
      q: "lentamente",
      a: 3,
      choices: [
        "Verbo transitivo",
        "Verbo intransitivo",
        "Adjetivo",
        "Adverbio",
      ],
    },
    {
      q: "cortar",
      a: 0,
      choices: [
        "Verbo transitivo",
        "Verbo intransitivo",
        "Adjetivo",
        "Adverbio",
      ],
    },
    {
      q: "nadar",
      a: 1,
      choices: [
        "Verbo transitivo",
        "Verbo intransitivo",
        "Adjetivo",
        "Adverbio",
      ],
    },
  ],
  "4e": [
    {
      q: "prudente",
      a: 2,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "descubrir",
      a: 1,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "amistad",
      a: 0,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "frecuentemente",
      a: 3,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "perezoso",
      a: 2,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "alimentar",
      a: 1,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "montaña",
      a: 0,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "valientemente",
      a: 3,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "curioso",
      a: 2,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
    },
    {
      q: "imaginar",
      a: 1,
      choices: ["Sustantivo", "Verbo", "Adjetivo", "Adverbio"],
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
