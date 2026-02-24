// ciudades.js

const $selectZona = document.querySelector("#zona"); // UI: "País"
const $selectCiudad = document.querySelector("#ciudad"); // UI: "Ciudad" (dependiente)
const $bandera = document.querySelector("#bandera-actual");

const guardar = (k, v) => localStorage.setItem(k, v);
const leer = (k) => localStorage.getItem(k);

function avisarCambioEstado() {
  window.dispatchEvent(new Event("estado-cambio"));
}

//PAÍSES (lo que verá el usuario en "Zona")
export const ZONAS = [
    { id: "co", nombre: "Colombia", bandera: "🇨🇴" },
    { id: "ec", nombre: "Ecuador", bandera: "🇪🇨" },
    { id: "pe", nombre: "Perú", bandera: "🇵🇪" },
    { id: "mx", nombre: "México", bandera: "🇲🇽" },
    { id: "ar", nombre: "Argentina", bandera: "🇦🇷" },
    { id: "us", nombre: "Estados Unidos", bandera: "🇺🇸" },
    { id: "es", nombre: "España", bandera: "🇪🇸" },
    { id: "de", nombre: "Alemania", bandera: "🇩🇪" }, 
    { id: "jp", nombre: "Japón", bandera: "🇯🇵" },
    { id: "gl", nombre: "Groenlandia", bandera: "🇬🇱" },
    { id: "nz", nombre: "Nueva Zelanda", bandera: "🇳🇿" },
    { id: "kr", nombre: "Corea del Sur", bandera: "🇰🇷" },

];

//5 CIUDADES PRINCIPALES POR PAÍS (REQUERIMIENTO)

const CIUDADES_POR_PAIS = {
  co: [
    {
      id: "bogota",
      nombre: "Bogotá",
      lat: 4.711,
      lon: -74.0721,
      tz: "America/Bogota",
    },
    {
      id: "medellin",
      nombre: "Medellín",
      lat: 6.2442,
      lon: -75.5812,
      tz: "America/Bogota",
    },
    {
    id: "rionegro",
    nombre: "Rionegro",
    lat: 6.155,
    lon: -75.3737,
    tz: "America/Bogota",
    },
    {
    id: "la-ceja",
    nombre: "La Ceja",
    lat: 6.0313,
    lon: -75.4333,
    tz: "America/Bogota",
    },
    {
    id: "itagui",
    nombre: "Itagüí",
    lat: 6.1686,
    lon: -75.6110,
    tz: "America/Bogota",
    },
    {
    id: "bello",
    nombre: "Bello",
    lat: 6.3373,
    lon: -75.5579,
    tz: "America/Bogota",
    },
    {
    id: "la-guajira",
    nombre: "La Guajira",
    lat: 11.5444,
    lon: -72.9072,
    tz: "America/Bogota",
    },
    {
    id: "turbo",
    nombre: "Turbo",
    lat: 8.0926,
    lon: -76.7282,
    tz: "America/Bogota",
    },
    {
      id: "cali",
      nombre: "Cali",
      lat: 3.4516,
      lon: -76.532,
      tz: "America/Bogota",
    },
    {
      id: "barranquilla",
      nombre: "Barranquilla",
      lat: 10.9639,
      lon: -74.7964,
      tz: "America/Bogota",
    },
    {
      id: "cartagena",
      nombre: "Cartagena",
      lat: 10.391,
      lon: -75.4794,
      tz: "America/Bogota",
    },
    
  ],
  ec: [
  { id: "quito", nombre: "Quito", lat: -0.1807, lon: -78.4678, tz: "America/Guayaquil" },
  { id: "guayaquil", nombre: "Guayaquil", lat: -2.1709, lon: -79.9224, tz: "America/Guayaquil" },
  { id: "cuenca", nombre: "Cuenca", lat: -2.9006, lon: -79.0045, tz: "America/Guayaquil" },
  { id: "ambato", nombre: "Ambato", lat: -1.2543, lon: -78.6228, tz: "America/Guayaquil" },
  { id: "manta", nombre: "Manta", lat: -0.9677, lon: -80.7089, tz: "America/Guayaquil" }
],
pe: [
  { id: "lima", nombre: "Lima", lat: -12.0464, lon: -77.0428, tz: "America/Lima" },
  { id: "arequipa", nombre: "Arequipa", lat: -16.4090, lon: -71.5375, tz: "America/Lima" },
  { id: "trujillo", nombre: "Trujillo", lat: -8.1091, lon: -79.0215, tz: "America/Lima" },
  { id: "cusco", nombre: "Cusco", lat: -13.5319, lon: -71.9675, tz: "America/Lima" },
  { id: "piura", nombre: "Piura", lat: -5.1945, lon: -80.6328, tz: "America/Lima" }
],
  es: [
    {
      id: "madrid",
      nombre: "Madrid",
      lat: 40.4168,
      lon: -3.7038,
      tz: "Europe/Madrid",
    },
    {
      id: "barcelona",
      nombre: "Barcelona",
      lat: 41.3874,
      lon: 2.1686,
      tz: "Europe/Madrid",
    },
    {
      id: "valencia",
      nombre: "Valencia",
      lat: 39.4699,
      lon: -0.3763,
      tz: "Europe/Madrid",
    },
    {
      id: "sevilla",
      nombre: "Sevilla",
      lat: 37.3891,
      lon: -5.9845,
      tz: "Europe/Madrid",
    },
    {
      id: "granada",
      nombre: "Granada",
      lat: 37.1882,
      lon: -3.6067,
      tz: "Europe/Madrid",
    },
  ],
  de: [
    {
      id: "berlin",
      nombre: "Berlín",
      lat: 52.52,
      lon: 13.405,
      tz: "Europe/Berlin",
    },
    {
      id: "hamburg",
      nombre: "Hamburgo",
      lat: 53.5511,
      lon: 9.9937,
      tz: "Europe/Berlin",
    },
    {
      id: "munich",
      nombre: "Múnich",
      lat: 48.1351,
      lon: 11.582,
      tz: "Europe/Berlin",
    },
    {
      id: "gimte",
      nombre: "Gimte",
      lat: 51.4156,
      lon: 9.64,
      tz: "Europe/Berlin",
    },
    {
      id: "hann_munden",
      nombre: "Hann. Münden",
      lat: 51.415,
      lon: 9.65,
      tz: "Europe/Berlin",
    },
  ],
  mx: [
    {
      id: "cdmx",
      nombre: "CDMX",
      lat: 19.4326,
      lon: -99.1332,
      tz: "America/Mexico_City",
    },
    {
      id: "guadalajara",
      nombre: "Guadalajara",
      lat: 20.6597,
      lon: -103.3496,
      tz: "America/Mexico_City",
    },
    {
      id: "monterrey",
      nombre: "Monterrey",
      lat: 25.6866,
      lon: -100.3161,
      tz: "America/Mexico_City",
    },
    {
      id: "puebla",
      nombre: "Puebla",
      lat: 19.0414,
      lon: -98.2063,
      tz: "America/Mexico_City",
    },
    {
      id: "cancun",
      nombre: "Cancún",
      lat: 21.1619,
      lon: -86.8515,
      tz: "America/Mexico_City",
    },
  ],
  ar: [
    {
      id: "buenosaires",
      nombre: "Buenos Aires",
      lat: -34.6037,
      lon: -58.3816,
      tz: "America/Argentina/Buenos_Aires",
    },
    {
      id: "cordoba",
      nombre: "Córdoba",
      lat: -31.4201,
      lon: -64.1888,
      tz: "America/Argentina/Buenos_Aires",
    },
    {
      id: "rosario",
      nombre: "Rosario",
      lat: -32.9442,
      lon: -60.6505,
      tz: "America/Argentina/Buenos_Aires",
    },
    {
      id: "mendoza",
      nombre: "Mendoza",
      lat: -32.8895,
      lon: -68.8458,
      tz: "America/Argentina/Buenos_Aires",
    },
    {
      id: "mardelplata",
      nombre: "Mar del Plata",
      lat: -38.0055,
      lon: -57.5426,
      tz: "America/Argentina/Buenos_Aires",
    },
  ],
  jp: [
    {
      id: "tokyo",
      nombre: "Tokio",
      lat: 35.6762,
      lon: 139.6503,
      tz: "Asia/Tokyo",
    },
    {
      id: "osaka",
      nombre: "Osaka",
      lat: 34.6937,
      lon: 135.5023,
      tz: "Asia/Tokyo",
    },
    {
      id: "kyoto",
      nombre: "Kioto",
      lat: 35.0116,
      lon: 135.7681,
      tz: "Asia/Tokyo",
    },
    {
      id: "sapporo",
      nombre: "Sapporo",
      lat: 43.0618,
      lon: 141.3545,
      tz: "Asia/Tokyo",
    },
    {
      id: "fukuoka",
      nombre: "Fukuoka",
      lat: 33.5902,
      lon: 130.4017,
      tz: "Asia/Tokyo",
    },
  ],
  us: [
    {
      id: "newyork",
      nombre: "New York",
      lat: 40.7128,
      lon: -74.006,
      tz: "America/New_York",
    },
    {
      id: "miami",
      nombre: "Miami",
      lat: 25.7617,
      lon: -80.1918,
      tz: "America/New_York",
    },
    {
      id: "chicago",
      nombre: "Chicago",
      lat: 41.8781,
      lon: -87.6298,
      tz: "America/Chicago",
    },
    {
      id: "denver",
      nombre: "Denver",
      lat: 39.7392,
      lon: -104.9903,
      tz: "America/Denver",
    },
    {
      id: "losangeles",
      nombre: "Los Ángeles",
      lat: 34.0522,
      lon: -118.2437,
      tz: "America/Los_Angeles",
    },
  ],
  gl: [
    {
      id: "nuuk",
      nombre: "Nuuk",
      lat: 64.1814,
      lon: -51.6941,
      tz: "America/Nuuk",
    },
    {
      id: "sisimiut",
      nombre: "Sisimiut",
      lat: 66.9395,
      lon: -53.6735,
      tz: "America/Nuuk",
    },
    {
      id: "ilulissat",
      nombre: "Ilulissat",
      lat: 69.2167,
      lon: -51.1,
      tz: "America/Nuuk",
    },
    {
      id: "aqaurtoq",
      nombre: "Aasiaat",
      lat: 68.7098,
      lon: -52.8696,
      tz: "America/Nuuk",
    },
    {
      id: "tasiilaq",
      nombre: "Tasiilaq",
      lat: 65.6145,
      lon: -37.6336,
      tz: "America/Nuuk",
    },
  ],
  nz: [
    {
      id: "auckland",
      nombre: "Auckland",
      lat: -36.8485,
      lon: 174.7633,
      tz: "Pacific/Auckland",
    },
    {
      id: "wellington",
      nombre: "Wellington",
      lat: -41.2865,
      lon: 174.7762,
      tz: "Pacific/Auckland",
    },
    {
      id: "christchurch",
      nombre: "Christchurch",
      lat: -43.5321,
      lon: 172.6362,
      tz: "Pacific/Auckland",
    },
    {
      id: "hamilton",
      nombre: "Hamilton",
      lat: -37.787,
      lon: 175.2793,
      tz: "Pacific/Auckland",
    },
    {
      id: "dunedin",
      nombre: "Dunedin",
      lat: -45.8788,
      lon: 170.5028,
      tz: "Pacific/Auckland",
    },
  ],
  kr: [
    {
      id: "seoul",
      nombre: "Seúl",
      lat: 37.5665,
      lon: 126.978,
      tz: "Asia/Seoul",
    },
    {
      id: "busan",
      nombre: "Busan",
      lat: 35.1796,
      lon: 129.0756,
      tz: "Asia/Seoul",
    },
    {
      id: "incheon",
      nombre: "Incheon",
      lat: 37.4563,
      lon: 126.7052,
      tz: "Asia/Seoul",
    },
    {
      id: "daegu",
      nombre: "Daegu",
      lat: 35.8722,
      lon: 128.6025,
      tz: "Asia/Seoul",
    },
    {
      id: "daejeon",
      nombre: "Daejeon",
      lat: 36.3504,
      lon: 127.3845,
      tz: "Asia/Seoul",
    },
  ],
};

export const CIUDADES_CLIMA = [];
export const CLIMA_POR_ZONA = {
  "Europe/Madrid": { lat: 40.4168, lon: -3.7038, ciudad: "Madrid" },
  "America/Bogota": { lat: 4.711, lon: -74.0721, ciudad: "Bogotá" },
  "Europe/Berlin": { lat: 52.52, lon: 13.405, ciudad: "Berlín" },
  "America/Mexico_City": { lat: 19.4326, lon: -99.1332, ciudad: "CDMX" },
  "America/Argentina/Buenos_Aires": {
    lat: -34.6037,
    lon: -58.3816,
    ciudad: "Buenos Aires",
  },
  "Asia/Tokyo": { lat: 35.6762, lon: 139.6503, ciudad: "Tokio" },
};

/* =========================
   ESTADO
========================= */
let paisActivo = "co";
let ciudadActiva = "bogota";
let zonaActiva = "America/Bogota";

/* =========================
   UI
========================= */
function poblarPaises() {
  $selectZona.innerHTML = ZONAS.map(
    (p) => `<option value="${p.id}">${p.nombre}</option>`,
  ).join("");
}

function poblarCiudades(paisId) {
  const lista = CIUDADES_POR_PAIS[paisId] || [];
  $selectCiudad.innerHTML = lista
    .map((c) => `<option value="${c.id}">${c.nombre}</option>`)
    .join("");
}

function actualizarBandera() {
  const p = ZONAS.find((x) => x.id === paisActivo);
  $bandera.textContent = p ? p.bandera : "🌍";
}

// ✨ FUNCIÓN AGREGADA: Maneja el cambio de zona/país con animación
function aplicarZona(paisId) {
  // Actualizamos el estado del país (no zonaActiva de timezone, sino paisActivo del select)
  paisActivo = paisId;
  guardar("pais", paisActivo);
  $selectZona.value = paisActivo;

  actualizarBandera();
  actualizarEstadoCiudad();

  // ✨ Animación país en el reloj
  const clock = document.querySelector(".clock");
  if (clock) {
    clock.classList.add("pais-change");
    setTimeout(() => {
      clock.classList.remove("pais-change");
    }, 600);
  }

  avisarCambioEstado();
}

// Helper para sincronizar estado interno
function actualizarEstadoCiudad() {
  // Esta función asegura que si cambiamos de país, la ciudad sea válida
  const lista = CIUDADES_POR_PAIS[paisActivo] || [];
  const guardada = leer("ciudad");
  const existe = lista.some((c) => c.id === guardada);

  if (!existe && lista.length > 0) {
    setCiudad(lista[0].id, true);
  }
}

function setPais(paisId, forzarSelect = true) {
  // 1. Lógica de datos (cargar ciudades del nuevo país)
  paisActivo = paisId;
  guardar("pais", paisActivo);
  if (forzarSelect) $selectZona.value = paisActivo;

  actualizarBandera();
  poblarCiudades(paisActivo);

  // 2. Validar ciudad
  const lista = CIUDADES_POR_PAIS[paisActivo] || [];
  const guardada = leer("ciudad");
  const existe = lista.some((c) => c.id === guardada);

  setCiudad(existe ? guardada : lista[0]?.id || "", true);

  // 3. Ejecutar animación y notificaciones (usando la nueva función)
  // Nota: llamamos a aplicarZona para asegurar la animación, aunque ya actualizamos variables arriba
  // Para evitar duplicidad de guards, podemos llamar solo a la parte visual de aplicarZona
  // o simplemente confiar en que setPais ya hizo el trabajo pesado y disparar la animación aquí.
  // Para cumplir estrictamente con tu petición, haremos que aplicarZona sea la que mande:
}

// Re-escribimos setPais para que use aplicarZona correctamente
function setPaisRefactorizado(paisId, forzarSelect = true) {
  // Actualizar lógica de ciudades primero
  poblarCiudades(paisId);
  const lista = CIUDADES_POR_PAIS[paisId] || [];
  const guardada = leer("ciudad");
  const existe = lista.some((c) => c.id === guardada);
  setCiudad(existe ? guardada : lista[0]?.id || "", true);

  // Luego aplicar la zona con animación
  aplicarZona(paisId);
}

function setCiudad(ciudadId, forzarSelect = true) {
  const lista = CIUDADES_POR_PAIS[paisActivo] || [];
  const c = lista.find((x) => x.id === ciudadId);
  if (!c) return;

  ciudadActiva = c.id;
  zonaActiva = c.tz; // ✅ aquí está la magia: reloj usa timeZone real

  guardar("ciudad", ciudadActiva);
  guardar("zona", zonaActiva);
  if (forzarSelect) $selectCiudad.value = ciudadActiva;

  avisarCambioEstado();
}

/* =========================
   API para reloj.js y clima.js
========================= */
export function getEstado() {
  const lista = CIUDADES_POR_PAIS[paisActivo] || [];
  const ciudadObj = lista.find((c) => c.id === ciudadActiva) || null;

  return {
    zonaActiva,
    ciudadActiva,
    usaCiudad: true,
    ciudadObj,
    climaZonaObj: CLIMA_POR_ZONA[zonaActiva] || null,
    paisActivo,
  };
}

export function iniciarCiudades() {
  if (!$selectZona || !$selectCiudad || !$bandera) return;

  poblarPaises();

  // defaults guardados
  const paisGuardado = leer("pais") || "co";

  // Inicialización sin animación brusca al cargar
  setPaisRefactorizado(paisGuardado, true);

  $selectZona.addEventListener("change", (e) => {
    setPaisRefactorizado(e.target.value, true);
  });

  $selectCiudad.addEventListener("change", (e) => {
    setCiudad(e.target.value, true);
  });
}
