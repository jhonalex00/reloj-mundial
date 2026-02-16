const $hora = document.querySelector(".hour");
const $minuto = document.querySelector(".minute");
const $segundo = document.querySelector(".second");

const $horaDigital = document.querySelector("#digital-time");
const $fechaDigital = document.querySelector("#digital-date");

let rafId = null;

// para suavizado
let lastSecDeg = null;

function horaZona(zona) {
  const partes = new Intl.DateTimeFormat("es-ES", {
    timeZone: zona,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const get = (t) => Number(partes.find((p) => p.type === t)?.value || 0);
  return { h: get("hour"), m: get("minute"), s: get("second") };
}

// LERP para suavizar (0.0–1.0) -> cuanto más cerca de 1, más “pegado” al objetivo
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Maneja el wrap 359 -> 0 sin pegar tirón
function lerpAngle(a, b, t) {
  let diff = (b - a) % 360;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return (a + diff * t + 360) % 360;
}

function tick(getEstado) {
  const ahora = new Date();
  const { zonaActiva } = getEstado(); // OJO: esto debe ser timeZone real (Europe/Madrid, etc)

  // Digital
  $horaDigital.textContent = new Intl.DateTimeFormat("es-ES", {
    timeZone: zonaActiva,
    timeStyle: "medium",
  }).format(ahora);

  $fechaDigital.textContent = new Intl.DateTimeFormat("es-ES", {
    timeZone: zonaActiva,
    dateStyle: "full",
  }).format(ahora);

  // Analógico
  const { h, m, s } = horaZona(zonaActiva);
  const ms = ahora.getMilliseconds();

  // objetivo (target) continuo
  const sContTarget = s + ms / 1000;
  const mCont = m + sContTarget / 60;
  const hCont = (h % 12) + mCont / 60;

  const secDegTarget = (sContTarget * 6) % 360;

  // inicializa suavizado
  if (lastSecDeg === null) lastSecDeg = secDegTarget;

  // suaviza (0.20 = suave pero responde rápido)
  lastSecDeg = lerpAngle(lastSecDeg, secDegTarget, 0.20);

  // aplica transforms
  $segundo.style.transform = `rotate(${lastSecDeg}deg)`;
  $minuto.style.transform = `rotate(${(mCont * 6) % 360}deg)`;
  $hora.style.transform = `rotate(${(hCont * 30) % 360}deg)`;

  rafId = requestAnimationFrame(() => tick(getEstado));
}

export function iniciarReloj(getEstado) {
  if (rafId) cancelAnimationFrame(rafId);
  lastSecDeg = null;
  rafId = requestAnimationFrame(() => tick(getEstado));
}
