const $hora = document.querySelector(".hour");
const $minuto = document.querySelector(".minute");
const $segundo = document.querySelector(".second");

const $horaDigital = document.querySelector("#digital-time");
const $fechaDigital = document.querySelector("#digital-date");

let rafId = null;
let baseTime = 0;
let basePerf = 0;

/* =========================
   Obtener fecha real por zona
========================= */
function obtenerFechaZona(zona) {
  const ahora = new Date();

  const partes = new Intl.DateTimeFormat("es-ES", {
    timeZone: zona,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(ahora);

  const get = (t) => partes.find((p) => p.type === t)?.value;

  return new Date(
    `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}`,
  );
}

/* =========================
   Inicializar base estable
========================= */
function initBase(zona) {
  const fechaZona = obtenerFechaZona(zona);

  baseTime = fechaZona.getTime();
  basePerf = performance.now();
}

/* =========================
   Animación ultra fluida
========================= */
function tick(getEstado) {
  const { zonaActiva } = getEstado();

  // Si cambió la zona, recalculamos base
  if (!baseTime) initBase(zonaActiva);

  const nowPerf = performance.now();
  const elapsed = nowPerf - basePerf;

  const currentTime = new Date(baseTime + elapsed);

  const h = currentTime.getHours();
  const m = currentTime.getMinutes();
  const s = currentTime.getSeconds();
  const ms = currentTime.getMilliseconds();

  // Sweep continuo
  const sCont = s + ms / 1000;
  const mCont = m + sCont / 60;
  const hCont = (h % 12) + mCont / 60;

  $segundo.style.transform = `rotate(${sCont * 6}deg)`;
  $minuto.style.transform = `rotate(${mCont * 6}deg)`;
  $hora.style.transform = `rotate(${hCont * 30}deg)`;

  // Digital (solo 1 vez por segundo real)
  $horaDigital.textContent = new Intl.DateTimeFormat("es-ES", {
    timeZone: zonaActiva,
    timeStyle: "medium",
  }).format(new Date());

  $fechaDigital.textContent = new Intl.DateTimeFormat("es-ES", {
    timeZone: zonaActiva,
    dateStyle: "full",
  }).format(new Date());

  rafId = requestAnimationFrame(() => tick(getEstado));
}

export function iniciarReloj(getEstado) {
  if (rafId) cancelAnimationFrame(rafId);

  const { zonaActiva } = getEstado();
  initBase(zonaActiva);

  rafId = requestAnimationFrame(() => tick(getEstado));
}
