/**
 * theme.js — Sistema Global de Gestión de Temas
 * Permite alternar entre Tema Base (Goku), Modo Oscuro (Vegeta) y Modo Super Saiyan.
 * Persiste la selección del usuario en localStorage y se sincroniza en todas las páginas.
 */

(function () {
  const CLAVE_STORAGE = "repaso_css_theme";
  const TEMA_POR_DEFECTO = "base";

  // 1. Aplicar tema inmediatamente para evitar parpadeos visuales (FOUC)
  const temaGuardado = localStorage.getItem(CLAVE_STORAGE) || TEMA_POR_DEFECTO;
  document.documentElement.setAttribute("data-theme", temaGuardado);

  // 2. Función global accesible desde cualquier página
  window.cambiarTemaGlobal = function (nuevoTema) {
    const temaValido = ["base", "dark", "saiyan"].includes(nuevoTema) ? nuevoTema : TEMA_POR_DEFECTO;
    document.documentElement.setAttribute("data-theme", temaValido);
    localStorage.setItem(CLAVE_STORAGE, temaValido);

    // Sincronizar todos los selectores o botones de la página actual
    const selectores = document.querySelectorAll(".selector-tema-global");
    selectores.forEach(sel => {
      sel.value = temaValido;
    });

    const botonesTema = document.querySelectorAll("[data-set-theme]");
    botonesTema.forEach(btn => {
      if (btn.getAttribute("data-set-theme") === temaValido) {
        btn.classList.add("activo");
      } else {
        btn.classList.remove("activo");
      }
    });
  };

  // 3. Sincronizar controles cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", () => {
    const temaActual = document.documentElement.getAttribute("data-theme") || TEMA_POR_DEFECTO;

    const selectores = document.querySelectorAll(".selector-tema-global");
    selectores.forEach(sel => {
      sel.value = temaActual;
      sel.addEventListener("change", (e) => {
        window.cambiarTemaGlobal(e.target.value);
      });
    });

    const botonesTema = document.querySelectorAll("[data-set-theme]");
    botonesTema.forEach(btn => {
      if (btn.getAttribute("data-set-theme") === temaActual) {
        btn.classList.add("activo");
      }
      btn.addEventListener("click", () => {
        window.cambiarTemaGlobal(btn.getAttribute("data-set-theme"));
      });
    });
  });
})();

