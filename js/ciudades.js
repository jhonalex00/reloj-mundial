const $selectZona = document.querySelector("#zona");
const $selectCiudad = document.querySelector("#ciudad");
const $bandera = document.querySelector("#bandera-actual");

const guardar = (k, v) => localStorage.setItem(k, v);
const leer = (k) => localStorage.getItem(k);

function avisarCambioEstado() {
  window.dispatchEvent(new Event("estado-cambio"));
}

/* ================= ZONAS (HORA) ================= */
export const ZONAS = [
  { nombre: "España (Madrid)", zona: "Europe/Madrid", bandera: "🇪🇸" },
  { nombre: "Colombia (Bogotá)", zona: "America/Bogota", bandera: "🇨🇴" },
  { nombre: "Alemania (Berlín)", zona: "Europe/Berlin", bandera: "🇩🇪" },
  { nombre: "México (CDMX)", zona: "America/Mexico_City", bandera: "🇲🇽" },
  { nombre: "Argentina (Buenos Aires)", zona: "America/Argentina/Buenos_Aires", bandera: "🇦🇷" },
  { nombre: "Japón (Tokio)", zona: "Asia/Tokyo", bandera: "🇯🇵" },
];

/* ================= CIUDADES (CLIMA) ================= */
export const CIUDADES_CLIMA = [
  { id: "medellin", nombre: "Medellín", lat: 6.2442, lon: -75.5812, zona: "America/Bogota" },
  { id: "bogota", nombre: "Bogotá", lat: 4.7110, lon: -74.0721, zona: "America/Bogota" },

  { id: "madrid", nombre: "Madrid", lat: 40.4168, lon: -3.7038, zona: "Europe/Madrid" },
  { id: "granada", nombre: "Granada", lat: 37.1882, lon: -3.6067, zona: "Europe/Madrid" },

  // ✅ la vuelvo a activar para que no haya inconsistencias
  { id: "berlin", nombre: "Berlín", lat: 52.5200, lon: 13.4050, zona: "Europe/Berlin" },
  { id: "munich", nombre: "Múnich", lat: 48.1351, lon: 11.5820, zona: "Europe/Berlin" },
  { id: "gimte", nombre: "Gimte (Alemania)", lat: 51.4156, lon: 9.64, zona: "Europe/Berlin" },
  { id: "hann_munden", nombre: "Hann. Münden (Alemania)", lat: 51.4150, lon: 9.65, zona: "Europe/Berlin" },
];

/* Para zonas sin ciudad, usamos capital */
export const CLIMA_POR_ZONA = {
  "Europe/Madrid": { lat: 40.4168, lon: -3.7038, ciudad: "Madrid" },
  "America/Bogota": { lat: 4.7110, lon: -74.0721, ciudad: "Bogotá" },
  "Europe/Berlin": { lat: 52.5200, lon: 13.4050, ciudad: "Berlín" },
  "America/Mexico_City": { lat: 19.4326, lon: -99.1332, ciudad: "CDMX" },
  "America/Argentina/Buenos_Aires": { lat: -34.6037, lon: -58.3816, ciudad: "Buenos Aires" },
  "Asia/Tokyo": { lat: 35.6762, lon: 139.6503, ciudad: "Tokio" },
};

const ZONAS_CON_CIUDAD = new Set(["Europe/Madrid", "America/Bogota", "Europe/Berlin"]);

let zonaActiva = "Europe/Madrid";
let ciudadActiva = "madrid";

function poblarZonas() {
  $selectZona.innerHTML = ZONAS.map((z) => `<option value="${z.zona}">${z.nombre}</option>`).join("");
}

function poblarCiudades() {
  $selectCiudad.innerHTML = CIUDADES_CLIMA.map((c) => `<option value="${c.id}">${c.nombre}</option>`).join("");
}

function actualizarBandera() {
  const z = ZONAS.find((x) => x.zona === zonaActiva);
  $bandera.textContent = z ? z.bandera : "🌍";
}

function actualizarEstadoCiudad() {
  const usaCiudad = ZONAS_CON_CIUDAD.has(zonaActiva);
  $selectCiudad.disabled = !usaCiudad;
  $selectCiudad.style.opacity = usaCiudad ? "1" : "0.5";
  $selectCiudad.style.pointerEvents = usaCiudad ? "auto" : "none";
}

function aplicarZona(z) {
  zonaActiva = z;
  guardar("zona", zonaActiva);
  $selectZona.value = zonaActiva;
  actualizarBandera();
  actualizarEstadoCiudad();
  avisarCambioEstado();
}

function aplicarCiudad(id) {
  ciudadActiva = id;
  guardar("ciudad", ciudadActiva);
  $selectCiudad.value = ciudadActiva;
  avisarCambioEstado();
}

/* API para otros módulos */
export function getEstado() {
  return {
    zonaActiva,
    ciudadActiva,
    usaCiudad: ZONAS_CON_CIUDAD.has(zonaActiva),
    ciudadObj: CIUDADES_CLIMA.find((c) => c.id === ciudadActiva) || null,
    climaZonaObj: CLIMA_POR_ZONA[zonaActiva] || null,
  };
}

export function iniciarCiudades() {
  if (!$selectZona || !$selectCiudad || !$bandera) return;

  poblarZonas();
  poblarCiudades();

  aplicarZona(leer("zona") || "Europe/Madrid");
  aplicarCiudad(leer("ciudad") || "madrid");

  // Si la ciudad pertenece a otra zona, ajustamos zona automáticamente
  const c = CIUDADES_CLIMA.find((x) => x.id === ciudadActiva);
  if (c) aplicarZona(c.zona);

  actualizarBandera();
  actualizarEstadoCiudad();

  $selectZona.addEventListener("change", (e) => {
    aplicarZona(e.target.value);

    if (zonaActiva === "Europe/Madrid") {
      const last = leer("ciudad");
      const ok = last === "madrid" || last === "granada";
      aplicarCiudad(ok ? last : "madrid");
    }

    if (zonaActiva === "America/Bogota") {
      const last = leer("ciudad");
      const ok = last === "medellin" || last === "bogota";
      aplicarCiudad(ok ? last : "medellin");
    }

    if (zonaActiva === "Europe/Berlin") {
      const last = leer("ciudad");
      const esDE = ["berlin", "munich", "gimte", "hann_munden"].includes(last);
      aplicarCiudad(esDE ? last : "hann_munden"); // ✅ sin parámetro basura
    }
  });

  $selectCiudad.addEventListener("change", (e) => {
    aplicarCiudad(e.target.value);
    const c = CIUDADES_CLIMA.find((x) => x.id === ciudadActiva);
    if (c) aplicarZona(c.zona);
  });
}
