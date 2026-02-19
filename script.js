import { iniciarPWA, iniciarTema, iniciarModo } from "./js/pwa.js";
import { iniciarReloj } from "./js/reloj.js";
import { iniciarCiudades, getEstado } from "./js/ciudades.js";
import { iniciarClima } from "./js/clima.js";

function iniciarApp() {
  iniciarPWA();            // Service Worker + PWA
  iniciarTema();           // tema guardado
  iniciarModo();           // modo oscuro guardado

  iniciarCiudades();       // zona + ciudad + bandera (guardado)
  iniciarReloj(getEstado); // reloj por zona (sweep)

  iniciarClima(getEstado); // clima + pronóstico por ciudad/zona
}

iniciarApp();
requestAnimationFrame(() => {
  document.body.classList.add("app-ready");
});
