const $cuerpo = document.body;
const $btnModo = document.querySelector(".mode-switch");
const $botonesTema = document.querySelectorAll(".theme-btn");

const guardar = (k, v) => localStorage.setItem(k, v);
const leer = (k) => localStorage.getItem(k);

/* ====== PWA ====== */
export function iniciarPWA() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
  }
}

/* ====== Temas ====== */
export function iniciarTema() {
  const tema = leer("tema") || "ocean";
  aplicarTema(tema);

  $botonesTema.forEach((btn) => {
    btn.addEventListener("click", () => aplicarTema(btn.dataset.theme));
  });
}

function aplicarTema(t) {
  $cuerpo.dataset.theme = t;
  guardar("tema", t);
  $botonesTema.forEach((b) => b.classList.toggle("is-active", b.dataset.theme === t));
}

/* ====== Modo oscuro ====== */
export function iniciarModo() {
  aplicarModo(leer("modo") === "oscuro");

  $btnModo.addEventListener("click", () => {
    aplicarModo(!$cuerpo.classList.contains("dark"));
  });
}

function aplicarModo(estado) {
  $cuerpo.classList.toggle("dark", estado);
  $btnModo.textContent = estado ? "Modo claro" : "Modo oscuro";
  guardar("modo", estado ? "oscuro" : "claro");
}
