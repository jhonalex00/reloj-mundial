import { CLIMA_POR_ZONA } from "./ciudades.js";

const $climaIcono = document.querySelector("#weather-icon");
const $climaTemp = document.querySelector("#weather-temp");
const $climaDesc = document.querySelector("#weather-desc");
const $forecastList = document.querySelector("#forecast-list");

/* ====== Iconos y texto por código ====== */
function iconoClima(code) {
  if (code === 0) return ["☀️", "Despejado", "sol"];
  if ([1, 2].includes(code)) return ["🌤️", "Parcial", "sol"];
  if (code === 3) return ["☁️", "Nublado", "nube"];
  if ([45, 48].includes(code)) return ["🌫️", "Niebla", "niebla"];
  if ([51, 53, 55].includes(code)) return ["🌦️", "Llovizna", "lluvia"];
  if ([61, 63, 65].includes(code)) return ["🌧️", "Lluvia", "lluvia"];
  if ([71, 73, 75].includes(code)) return ["❄️", "Nieve", "nieve"];
  if ([95, 96, 99].includes(code)) return ["⛈️", "Tormenta", "lluvia"];
  return ["⛅", "Clima", "nube"];
}

function pintarClimaError() {
  $climaIcono.textContent = "⛅";
  $climaTemp.textContent = "--°C";
  $climaDesc.textContent = "Clima no disponible";
  document.body.classList.remove("fx-sol", "fx-lluvia", "fx-nieve", "fx-niebla");
}

function aplicarFX(tipo) {
  document.body.classList.remove("fx-sol", "fx-lluvia", "fx-nieve", "fx-niebla");
  if (tipo === "sol") document.body.classList.add("fx-sol");
  if (tipo === "lluvia") document.body.classList.add("fx-lluvia");
  if (tipo === "nieve") document.body.classList.add("fx-nieve");
  if (tipo === "niebla") document.body.classList.add("fx-niebla");
}

/* ====== Fetch Open-Meteo ====== */
async function fetchMeteo(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${encodeURIComponent(lat)}` +
    `&longitude=${encodeURIComponent(lon)}` +
    `&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Open-Meteo error");
  return res.json();
}

/* ====== Pronóstico UI ====== */
function nombreDia(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  return new Intl.DateTimeFormat("es-ES", { weekday: "short" }).format(d);
}

function pintarPronostico(daily) {
  if (!$forecastList || !daily) return;

  const days = daily.time || [];
  const max = daily.temperature_2m_max || [];
  const min = daily.temperature_2m_min || [];
  const code = daily.weather_code || [];

  $forecastList.innerHTML = days.slice(0, 7).map((fecha, i) => {
    const [ico, texto] = iconoClima(Number(code[i]));
    return `
      <div class="forecast-item" title="${texto}">
        <div class="forecast-icon">${ico}</div>
        <div class="forecast-day">${nombreDia(fecha)}</div>
        <div class="forecast-temp">
          <span class="temp-max">${Math.round(max[i])}°</span>
          <span class="temp-min">${Math.round(min[i])}°</span>
        </div>
      </div>
    `;
  }).join("");
}

/* ====== Decide coords por zona/ciudad ====== */
function coordsDesdeEstado(getEstado) {
  const st = getEstado();

  if (st.usaCiudad && st.ciudadObj) {
    return { lat: st.ciudadObj.lat, lon: st.ciudadObj.lon, nombre: st.ciudadObj.nombre };
  }

  const info = CLIMA_POR_ZONA[st.zonaActiva] || st.climaZonaObj;
  if (!info) return null;
  return { lat: info.lat, lon: info.lon, nombre: info.ciudad };
}

/* ====== Render clima ====== */
async function actualizarClima(getEstado) {
  try {

    const reloj = document.querySelector(".clock");
    const weather = document.querySelector(".weather");

    // Animación salida
    reloj.classList.add("fade-out");
    weather.classList.add("fade-out");

    await new Promise(r => setTimeout(r, 250));

    const coords = coordsDesdeEstado(getEstado);
    if (!coords) return pintarClimaError();

    const data = await fetchMeteo(coords.lat, coords.lon);

    const temp = data?.current?.temperature_2m;
    const feels = data?.current?.apparent_temperature;
    const wind = data?.current?.wind_speed_10m;
    const code = Number(data?.current?.weather_code);

    const [ico, texto, tipo] = iconoClima(code);

    $climaIcono.textContent = ico;
    $climaTemp.textContent = `${Math.round(temp)}°C`;
    $climaDesc.textContent =
      `${texto} • ${coords.nombre} • Viento ${Math.round(wind)} km/h • Sensación ${Math.round(feels)}°C`;

    aplicarFX(tipo);
    pintarPronostico(data.daily);

    // Animación entrada
    reloj.classList.remove("fade-out");
    weather.classList.remove("fade-out");

  } catch {
    pintarClimaError();
  }
}


export function iniciarClima(getEstado) {
  // primera carga
  actualizarClima(getEstado);

  // refresca cada 10 min (solo 1 interval)
  setInterval(() => actualizarClima(getEstado), 10 * 60 * 1000);

  // ✅ refresco inmediato cuando cambias zona/ciudad
  window.addEventListener("estado-cambio", () => actualizarClima(getEstado));
}
