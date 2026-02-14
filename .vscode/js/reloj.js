const $hora = document.querySelector(".hour");
const $minuto = document.querySelector(".minute");
const $segundo = document.querySelector(".second");

const $horaDigital = document.querySelector("#digital-time");
const $fechaDigital = document.querySelector("#digital-date");

let rafId = null;

/* Hora por zona */
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

function tick(getEstado) {
  const ahora = new Date();
  const { zonaActiva } = getEstado();

  // Digital
  $horaDigital.textContent = new Intl.DateTimeFormat("es-ES", {
    timeZone: zonaActiva,
    timeStyle: "medium",
  }).format(ahora);

  $fechaDigital.textContent = new Intl.DateTimeFormat("es-ES", {
    timeZone: zonaActiva,
    dateStyle: "full",
  }).format(ahora);

  // Analógico (sweep)
  const { h, m, s } = horaZona(zonaActiva);
  const ms = ahora.getMilliseconds();

  const sCont = s + ms / 1000;
  const mCont = m + sCont / 60;
  const hCont = (h % 12) + mCont / 60;

  $segundo.style.transform = `rotate(${sCont * 6}deg)`;
  $minuto.style.transform = `rotate(${mCont * 6}deg)`;
  $hora.style.transform = `rotate(${hCont * 30}deg)`;

  rafId = requestAnimationFrame(() => tick(getEstado));
}

export function iniciarReloj(getEstado) {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => tick(getEstado));
}
