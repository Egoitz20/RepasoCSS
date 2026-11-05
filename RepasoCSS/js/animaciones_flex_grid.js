/**
 * animaciones_flex_grid.js — Controladores interactivos para el Laboratorio CSS
 * Incluye demostraciones interactivas para:
 * - Box Model (sliders y cálculo en tiempo real).
 * - Flexbox interactivo con animación cinemática FLIP.
 * - CSS Grid interactivo con transiciones fluidas.
 * - Simulador Responsive (Escritorio vs Móvil).
 * - Posicionamiento en vivo (static, relative, absolute, fixed, sticky).
 * - Explorador interactivo de Backgrounds (size, repeat, position).
 * - Estudio de Gradientes (linear vs radial, ángulos en tiempo real).
 * - Probador de Selectores y Pseudoclases dinámicas.
 * - Probador de Tipografía dinámica.
 * - Comparador de Opacidad vs Canal Alfa.
 * - Laboratorio de Transformaciones 2D.
 */

// =============================================================================
// 1. DEMOSTRADOR VISUAL DE BOX MODEL
// =============================================================================
let boxSizingActual = "border-box";

function actualizarBoxModel() {
  const inputPad = document.getElementById("input-padding");
  const inputMar = document.getElementById("input-margin");
  const inputBor = document.getElementById("input-border");

  if (!inputPad || !inputMar || !inputBor) return;

  const padding = parseInt(inputPad.value, 10);
  const margin = parseInt(inputMar.value, 10);
  const border = parseInt(inputBor.value, 10);

  const valPad = document.getElementById("val-padding");
  const valMar = document.getElementById("val-margin");
  const valBor = document.getElementById("val-border");

  if (valPad) valPad.textContent = padding + "px";
  if (valMar) valMar.textContent = margin + "px";
  if (valBor) valBor.textContent = border + "px";

  const renderMargin = document.getElementById("render-margin");
  const renderBorder = document.getElementById("render-border");

  if (renderMargin) renderMargin.style.padding = margin + "px";
  if (renderBorder) {
    renderBorder.style.padding = padding + "px";
    renderBorder.style.borderWidth = border + "px";
  }

  const baseWidth = 160;
  const totalContentBox = baseWidth + (padding * 2) + (border * 2);
  const formulaEl = document.getElementById("formula-medidas");
  const visorCss = document.getElementById("visor-boxmodel-css");

  if (formulaEl) {
    if (boxSizingActual === "border-box") {
      const espacioInteriorUtil = Math.max(0, 200 - (padding * 2) - (border * 2));
      formulaEl.innerHTML = `
        <span class="badge-modo badge-borderbox">border-box activo</span>
        <strong>Ancho exterior total:</strong> 200px (fijo y predecible).<br>
        <small>El contenido interior se encoge a <strong>${espacioInteriorUtil}px</strong> para alojar padding (${padding}px × 2) y borde (${border}px × 2) sin ensanchar la caja exterior.</small>
      `;
    } else {
      formulaEl.innerHTML = `
        <span class="badge-modo badge-contentbox">content-box activo</span>
        <strong>Ancho total desbordado:</strong> ${baseWidth}px (content) + ${padding * 2}px (padding) + ${border * 2}px (borde) = 
        <strong style="color: #d32f2f; font-size: 1.1rem;">${totalContentBox}px</strong><br>
        <small>⚠️ ¡Alerta! El elemento se hace <strong>${totalContentBox - 200}px</strong> más grande de lo planeado y rompe el layout.</small>
      `;
    }
  }

  if (visorCss) {
    visorCss.innerHTML = `<span class="codigo-comentario">/* Reglas CSS aplicadas en este elemento */</span>
.caja-demostracion {
  box-sizing: ${boxSizingActual};
  width: ${boxSizingActual === 'border-box' ? '200px' : '160px'};
  padding: ${padding}px;
  border: ${border}px solid var(--color-acento);
  margin: ${margin}px;
}`;
  }
}

function alternarBoxSizing() {
  boxSizingActual = boxSizingActual === "border-box" ? "content-box" : "border-box";
  const valEl = document.getElementById("val-boxsizing");
  if (valEl) valEl.textContent = boxSizingActual;
  actualizarBoxModel();
}

// =============================================================================
// 2. FLEXBOX INTERACTIVO CON ANIMACIÓN FLIP
// =============================================================================
function actualizarFlexboxAnimado() {
  const escenario = document.getElementById("escenario-flex");
  if (!escenario) return;

  const cajas = Array.from(escenario.querySelectorAll(".flex-caja"));
  const posicionesIniciales = cajas.map(c => c.getBoundingClientRect());

  const dir = document.getElementById("select-flex-direction")?.value || "row";
  const just = document.getElementById("select-justify")?.value || "space-between";
  const align = document.getElementById("select-align")?.value || "center";
  const wrap = document.getElementById("select-wrap")?.value || "wrap";
  const gap = document.getElementById("select-gap")?.value || "20px";

  escenario.style.flexDirection = dir;
  escenario.style.justifyContent = just;
  escenario.style.alignItems = align;
  escenario.style.flexWrap = wrap;
  escenario.style.gap = gap;

  actualizarIndicadorEje(dir);

  const posicionesFinales = cajas.map(c => c.getBoundingClientRect());

  cajas.forEach((caja, i) => {
    const deltaX = posicionesIniciales[i].left - posicionesFinales[i].left;
    const deltaY = posicionesIniciales[i].top - posicionesFinales[i].top;

    caja.style.transition = 'none';
    caja.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    caja.offsetHeight; // Reflow

    caja.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
    caja.style.transform = '';
  });

  const visor = document.getElementById("visor-css-flex");
  if (visor) {
    visor.innerHTML = `<span class="codigo-comentario">/* Reglas aplicadas al contenedor flexible */</span>
.contenedor-flex {
  display: flex;
  flex-direction: ${dir};
  justify-content: ${just};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: ${gap};
}`;
  }
}

function actualizarIndicadorEje(direccion) {
  const lblEje = document.getElementById("lbl-eje-direccion");
  const flechaIcono = document.getElementById("icono-flecha-eje");
  if (!lblEje || !flechaIcono) return;

  if (direccion === 'row') {
    lblEje.textContent = "Eje Principal: X Horizontal (Izquierda ➔ Derecha)";
    flechaIcono.textContent = "➡️";
  } else if (direccion === 'row-reverse') {
    lblEje.textContent = "Eje Principal: X Horizontal Invertido (Derecha ➔ Izquierda)";
    flechaIcono.textContent = "⬅️";
  } else if (direccion === 'column') {
    lblEje.textContent = "Eje Principal: Y Vertical (Arriba ➔ Abajo)";
    flechaIcono.textContent = "⬇️";
  } else if (direccion === 'column-reverse') {
    lblEje.textContent = "Eje Principal: Y Vertical Invertido (Abajo ➔ Arriba)";
    flechaIcono.textContent = "⬆️";
  }
}

// =============================================================================
// 3. CSS GRID INTERACTIVO CON ANIMACIÓN FLIP
// =============================================================================
function cambiarGridPresetAnimado(preset, btn) {
  document.querySelectorAll(".btn-grid-preset").forEach(b => b.classList.remove("activo"));
  if (btn) btn.classList.add("activo");

  const escenario = document.getElementById("escenario-grid");
  if (!escenario) return;

  const cajas = Array.from(escenario.querySelectorAll(".grid-caja"));
  const posIni = cajas.map(c => c.getBoundingClientRect());

  const visor = document.getElementById("visor-css-grid");
  const c1 = document.getElementById("gc-1");
  const c2 = document.getElementById("gc-2");
  const c3 = document.getElementById("gc-3");
  const c4 = document.getElementById("gc-4");

  [c1, c2, c3, c4].forEach(c => {
    if (c) {
      c.className = "grid-caja";
      c.style.gridArea = "";
    }
  });

  if (preset === 'auto-fit') {
    escenario.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
    escenario.style.gridTemplateAreas = "";
    if (c1) c1.innerHTML = "Entrenamiento 01<br><small>Maestro Roshi</small>";
    if (c2) c2.innerHTML = "Entrenamiento 02<br><small>Torre de Korin</small>";
    if (c3) c3.innerHTML = "Entrenamiento 03<br><small>Kaio del Norte</small>";
    if (c4) c4.innerHTML = "Entrenamiento 04<br><small>Whis (Divino)</small>";
    if (visor) {
      visor.innerHTML = `<span class="codigo-comentario">/* Cuadrícula responsiva automática sin media queries */</span>
.contenedor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}`;
    }
  } else if (preset === '3-cols') {
    escenario.style.gridTemplateColumns = "repeat(3, 1fr)";
    escenario.style.gridTemplateAreas = "";
    if (c1) c1.innerHTML = "Columna 1<br><small>1 fracción (1fr)</small>";
    if (c2) c2.innerHTML = "Columna 2<br><small>1 fracción (1fr)</small>";
    if (c3) c3.innerHTML = "Columna 3<br><small>1 fracción (1fr)</small>";
    if (c4) c4.innerHTML = "Fila 2 - Col 1<br><small>Fluye automáticamente</small>";
    if (visor) {
      visor.innerHTML = `<span class="codigo-comentario">/* 3 columnas exactamente iguales en proporciones fraccionarias */</span>
.contenedor-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}`;
    }
  } else if (preset === 'asimetrico') {
    escenario.style.gridTemplateColumns = "250px 1fr 120px";
    escenario.style.gridTemplateAreas = "";
    if (c1) c1.innerHTML = "Barra Fija<br><small>250px</small>";
    if (c2) c2.innerHTML = "Área Fluida<br><small>1fr (resto dinámico)</small>";
    if (c3) c3.innerHTML = "Panel Lateral<br><small>120px</small>";
    if (c4) c4.innerHTML = "Bloque Extra<br><small>Segunda fila</small>";
    if (visor) {
      visor.innerHTML = `<span class="codigo-comentario">/* Columnas asimétricas: medidas fijas en extremos y fluida al centro */</span>
.contenedor-grid {
  display: grid;
  grid-template-columns: 250px 1fr 120px;
  gap: 15px;
}`;
    }
  } else if (preset === 'areas') {
    escenario.style.gridTemplateColumns = "200px 1fr";
    escenario.style.gridTemplateAreas = '"header header" "lateral main" "footer footer"';
    if (c1) { c1.classList.add("grid-area-header"); c1.style.gridArea = "header"; c1.innerHTML = "CABECERA (header)"; }
    if (c2) { c2.classList.add("grid-area-lateral"); c2.style.gridArea = "lateral"; c2.innerHTML = "LATERAL (lateral)"; }
    if (c3) { c3.classList.add("grid-area-main"); c3.style.gridArea = "main"; c3.innerHTML = "CONTENIDO (main)"; }
    if (c4) { c4.classList.add("grid-area-footer"); c4.style.gridArea = "footer"; c4.innerHTML = "PIE (footer)"; }

    if (visor) {
      visor.innerHTML = `<span class="codigo-comentario">/* Maquetación estructurada por zonas semánticas */</span>
.contenedor-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header  header"
    "lateral main"
    "footer  footer";
  gap: 15px;
}
.header  { grid-area: header; }
.lateral { grid-area: lateral; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`;
    }
  }

  const posFin = cajas.map(c => c.getBoundingClientRect());

  cajas.forEach((caja, i) => {
    const deltaX = posIni[i].left - posFin[i].left;
    const deltaY = posIni[i].top - posFin[i].top;

    caja.style.transition = 'none';
    caja.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    caja.offsetHeight; // Reflow
    caja.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease';
    caja.style.transform = '';
  });
}

// =============================================================================
// 4. SIMULADOR RESPONSIVE DE MEDIA QUERIES (CV SON GOKU)
// =============================================================================
function simularPantalla(tipo) {
  const marco = document.getElementById("tester-wrapper");
  const lbl = document.getElementById("lbl-resolucion");
  const botones = document.querySelectorAll(".btn-simular-pantalla");

  if (!marco) return;

  botones.forEach(b => b.classList.remove("activo"));

  if (tipo === 'mobile') {
    marco.classList.add("modo-movil");
    if (lbl) lbl.textContent = "390px (Móvil vertical — flex-direction: column)";
    const btnMovil = document.getElementById("btn-modo-movil");
    if (btnMovil) btnMovil.classList.add("activo");
  } else {
    marco.classList.remove("modo-movil");
    if (lbl) lbl.textContent = "1200px (Escritorio — flex-direction: row)";
    const btnDesk = document.getElementById("btn-modo-desktop");
    if (btnDesk) btnDesk.classList.add("activo");
  }
}

// =============================================================================
// 5. LABORATORIO DE POSICIONAMIENTO EN VIVO (POSITION)
// =============================================================================
let posicionModoActual = "relative";

function cambiarPositionModo(modo, btn) {
  posicionModoActual = modo;
  document.querySelectorAll(".btn-position-mode").forEach(b => b.classList.remove("activo"));
  if (btn) btn.classList.add("activo");

  const caja = document.getElementById("box-position-target");
  const visor = document.getElementById("visor-css-position");
  const explicacion = document.getElementById("explicacion-position");
  const contenedor = document.getElementById("position-stage");

  if (!caja || !visor || !explicacion) return;

  const topVal = document.getElementById("pos-coord-top")?.value || "20";
  const leftVal = document.getElementById("pos-coord-left")?.value || "30";

  // Reset de estilos previos
  caja.style.position = modo;
  caja.style.top = "";
  caja.style.left = "";
  caja.style.right = "";
  caja.style.bottom = "";

  if (modo === "static") {
    caja.style.top = topVal + "px"; // static ignora top y left
    caja.style.left = leftVal + "px";
    explicacion.innerHTML = `<strong>position: static (Por Defecto):</strong> El elemento fluye naturalmente según el orden del HTML. <strong style="color: #d32f2f;">Ignora por completo</strong> las propiedades <code>top</code>, <code>left</code>, <code>bottom</code>, <code>right</code> y <code>z-index</code>.`;
    visor.innerHTML = `<span class="codigo-comentario">/* static: Flujo normal (top y left NO tienen efecto) */</span>
.caja-posicionada {
  position: static;
  top: ${topVal}px;  <span class="codigo-comentario">/* Ignorado por el navegador */</span>
  left: ${leftVal}px; <span class="codigo-comentario">/* Ignorado por el navegador */</span>
}`;
  } else if (modo === "relative") {
    caja.style.top = topVal + "px";
    caja.style.left = leftVal + "px";
    explicacion.innerHTML = `<strong>position: relative:</strong> El elemento se desplaza <strong>${topVal}px hacia abajo</strong> y <strong>${leftVal}px hacia la derecha</strong> respecto a <em>su posición original natural</em>. <strong>Conserva su hueco físico</strong> en el documento sin perturbar el espacio de los hermanos.`;
    visor.innerHTML = `<span class="codigo-comentario">/* relative: Desplazamiento respecto a su propio hueco */</span>
.caja-posicionada {
  position: relative;
  top: ${topVal}px;
  left: ${leftVal}px;
}`;
  } else if (modo === "absolute") {
    caja.style.top = topVal + "px";
    caja.style.left = leftVal + "px";
    explicacion.innerHTML = `<strong>position: absolute:</strong> El elemento <strong>abandona el flujo normal</strong> (sus hermanos ocupan su hueco anterior). Se ubica exactamente respecto a las coordenadas de su <em>ancestro posicionado más cercano</em> (en este caso el contenedor de prueba con <code>position: relative</code>).`;
    visor.innerHTML = `<span class="codigo-comentario">/* absolute: Sale del flujo y se ancla al ancestro relative */</span>
.contenedor-padre {
  position: relative; <span class="codigo-comentario">/* Marco de anclaje */</span>
}
.caja-posicionada {
  position: absolute;
  top: ${topVal}px;
  left: ${leftVal}px;
}`;
  } else if (modo === "fixed") {
    caja.style.top = "20px";
    caja.style.right = "20px";
    explicacion.innerHTML = `<strong>position: fixed:</strong> El elemento se ancla a la <strong>ventana gráfica (viewport)</strong>. Permanece flotando en pantalla incluso si el usuario hace scroll hacia arriba o abajo en la web.`;
    visor.innerHTML = `<span class="codigo-comentario">/* fixed: Flota fijo anclado a la pantalla */</span>
.caja-posicionada {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}`;
    // Restablecer tras 3 segundos para no bloquear la vista del estudiante
    setTimeout(() => {
      if (posicionModoActual === "fixed") {
        cambiarPositionModo("relative", document.querySelector('[data-pos-btn="relative"]'));
      }
    }, 4500);
  } else if (modo === "sticky") {
    caja.style.position = "sticky";
    caja.style.top = "10px";
    explicacion.innerHTML = `<strong>position: sticky:</strong> Híbrido inteligente. Fluye como <code>relative</code> en el documento hasta que el scroll del contenedor alcanza <code>top: 10px</code>; en ese instante se 'pega' temporalmente. ¡Prueba a hacer scroll dentro del contenedor de abajo!`;
    visor.innerHTML = `<span class="codigo-comentario">/* sticky: Se pega al alcanzar el umbral de scroll */</span>
.caja-posicionada {
  position: sticky;
  top: 10px;
}`;
  }
}

function actualizarPosicionCoordenadas() {
  const topVal = document.getElementById("pos-coord-top")?.value || "20";
  const leftVal = document.getElementById("pos-coord-left")?.value || "30";

  const valTop = document.getElementById("val-pos-top");
  const valLeft = document.getElementById("val-pos-left");

  if (valTop) valTop.textContent = topVal + "px";
  if (valLeft) valLeft.textContent = leftVal + "px";

  const caja = document.getElementById("box-position-target");
  if (!caja) return;

  if (posicionModoActual !== "static" && posicionModoActual !== "fixed") {
    caja.style.top = topVal + "px";
    caja.style.left = leftVal + "px";
  }

  const visor = document.getElementById("visor-css-position");
  if (visor && (posicionModoActual === "relative" || posicionModoActual === "absolute")) {
    visor.innerHTML = `<span class="codigo-comentario">/* Coordenadas en tiempo real */</span>
.caja-posicionada {
  position: ${posicionModoActual};
  top: ${topVal}px;
  left: ${leftVal}px;
}`;
  }
}

// =============================================================================
// 6. EXPLORADOR INTERACTIVO DE FONDOS (BACKGROUNDS)
// =============================================================================
function actualizarFondoInteractivo() {
  const canvas = document.getElementById("bg-canvas-interactive");
  const visor = document.getElementById("visor-css-background");
  const info = document.getElementById("bg-info-explicacion");

  if (!canvas) return;

  const bgSize = document.getElementById("sel-bg-size")?.value || "cover";
  const bgRepeat = document.getElementById("sel-bg-repeat")?.value || "no-repeat";
  const bgPos = document.getElementById("sel-bg-pos")?.value || "center center";
  const bgImage = document.getElementById("sel-bg-image")?.value || "mountain";

  const imagePath = bgImage === "mountain" ? "../cv/images/mountain.png" : "../cv/images/goku-face.png";

  canvas.style.backgroundImage = `url('${imagePath}')`;
  canvas.style.backgroundSize = bgSize;
  canvas.style.backgroundRepeat = bgRepeat;
  canvas.style.backgroundPosition = bgPos;

  if (info) {
    if (bgSize === "cover") {
      info.innerHTML = `<strong>background-size: cover:</strong> Escala la imagen proporcionalmente para <strong>cubrir el 100% de la caja</strong> sin dejar bordes vacíos. Si la proporción de la caja no coincide con la foto, <em>las partes sobrantes se recortan</em>.`;
    } else if (bgSize === "contain") {
      info.innerHTML = `<strong>background-size: contain:</strong> Escala la imagen para que <strong>quepa entera y completa</strong> dentro de la caja sin recortar nada. Puede dejar áreas vacías a los lados o arriba/abajo.`;
    } else if (bgSize === "auto") {
      info.innerHTML = `<strong>background-size: auto:</strong> Renderiza la imagen a sus <strong>dimensiones originales en píxeles</strong> sin escalar.`;
    } else if (bgSize === "100% 100%") {
      info.innerHTML = `<strong>background-size: 100% 100%:</strong> Fuerza a la imagen a medir exactamente el ancho y alto del contenedor. <strong style="color:#d32f2f;">¡Cuidado!</strong> Deforma y estira la imagen rompiendo su relación de aspecto.`;
    }
  }

  if (visor) {
    visor.innerHTML = `<span class="codigo-comentario">/* Reglas del fondo interactivo */</span>
.contenedor-fondo {
  background-image: url('${imagePath}');
  background-size: ${bgSize};
  background-repeat: ${bgRepeat};
  background-position: ${bgPos};
}`;
  }
}

// =============================================================================
// 7. ESTUDIO INTERACTIVO DE GRADIENTES
// =============================================================================
function actualizarEstudioGradiente() {
  const canvas = document.getElementById("canvas-gradiente-estudio");
  const visor = document.getElementById("visor-css-gradiente");
  const lblAngulo = document.getElementById("val-grad-angulo");
  const sliderAngulo = document.getElementById("slider-grad-angulo");
  const tipo = document.getElementById("sel-grad-tipo")?.value || "linear";
  const paleta = document.getElementById("sel-grad-paleta")?.value || "goku";

  if (!canvas) return;

  const angulo = sliderAngulo ? sliderAngulo.value : "135";
  if (lblAngulo) lblAngulo.textContent = angulo + "°";

  let color1 = "#0d477a";
  let color2 = "#1972b9";

  if (paleta === "saiyan") {
    color1 = "#b45309";
    color2 = "#f59e0b";
  } else if (paleta === "shenron") {
    color1 = "#15803d";
    color2 = "#064e3b";
  } else if (paleta === "vegeta") {
    color1 = "#1e1b4b";
    color2 = "#4338ca";
  }

  let gradString = "";
  if (tipo === "linear") {
    gradString = `linear-gradient(${angulo}deg, ${color1}, ${color2})`;
  } else {
    gradString = `radial-gradient(circle at center, ${color2}, ${color1})`;
  }

  canvas.style.background = gradString;

  if (visor) {
    visor.innerHTML = `<span class="codigo-comentario">/* Gradiente generado en tiempo real */</span>
.fondo-gradiente {
  background: ${gradString};
}`;
  }
}

// =============================================================================
// 8. PROBADOR INTERACTIVO DE SELECTORES & PSEUDOCLASES
// =============================================================================
function probarPseudoclase(selector, btn) {
  document.querySelectorAll(".btn-selector-test").forEach(b => b.classList.remove("activo"));
  if (btn) btn.classList.add("activo");

  const cards = document.querySelectorAll(".selector-item-card");
  const visor = document.getElementById("visor-css-selectores-demo");
  const explicacion = document.getElementById("explicacion-selectores-demo");

  // Reset de resaltados
  cards.forEach(c => c.classList.remove("resaltado"));

  if (selector === "first-child") {
    const el = document.querySelector(".selector-item-card:first-child");
    if (el) el.classList.add("resaltado");
    if (explicacion) explicacion.innerHTML = `<code>:first-child</code> selecciona únicamente el <strong>primer elemento hijo</strong> directo de su contenedor.`;
    if (visor) visor.innerHTML = `<span class="codigo-comentario">/* Selecciona solo el primer hijo */</span>\n.tarjeta:first-child {\n  background-color: var(--color-dorado);\n}`;
  } else if (selector === "last-child") {
    const el = document.querySelector(".selector-item-card:last-child");
    if (el) el.classList.add("resaltado");
    if (explicacion) explicacion.innerHTML = `<code>:last-child</code> selecciona únicamente el <strong>último elemento hijo</strong> del contenedor.`;
    if (visor) visor.innerHTML = `<span class="codigo-comentario">/* Selecciona solo el último hijo */</span>\n.tarjeta:last-child {\n  background-color: var(--color-dorado);\n}`;
  } else if (selector === "nth-child-even") {
    document.querySelectorAll(".selector-item-card:nth-child(even)").forEach(el => el.classList.add("resaltado"));
    if (explicacion) explicacion.innerHTML = `<code>:nth-child(even)</code> (o <code>2n</code>) selecciona todos los <strong>hijos en posiciones pares</strong> (2, 4, 6...). Técnica estándar para el efecto cebra en tablas.`;
    if (visor) visor.innerHTML = `<span class="codigo-comentario">/* Filas pares para efecto cebra */</span>\n.tarjeta:nth-child(even) {\n  background-color: var(--color-dorado);\n}`;
  } else if (selector === "nth-child-odd") {
    document.querySelectorAll(".selector-item-card:nth-child(odd)").forEach(el => el.classList.add("resaltado"));
    if (explicacion) explicacion.innerHTML = `<code>:nth-child(odd)</code> (o <code>2n+1</code>) selecciona todos los <strong>hijos en posiciones impares</strong> (1, 3, 5...).`;
    if (visor) visor.innerHTML = `<span class="codigo-comentario">/* Filas impares */</span>\n.tarjeta:nth-child(odd) {\n  background-color: var(--color-dorado);\n}`;
  } else if (selector === "nth-child-3") {
    const el = document.querySelector(".selector-item-card:nth-child(3)");
    if (el) el.classList.add("resaltado");
    if (explicacion) explicacion.innerHTML = `<code>:nth-child(3)</code> selecciona con precisión matemática el <strong>tercer elemento hijo</strong> exacto.`;
    if (visor) visor.innerHTML = `<span class="codigo-comentario">/* Tercer hijo exacto */</span>\n.tarjeta:nth-child(3) {\n  background-color: var(--color-dorado);\n}`;
  }
}

// =============================================================================
// 9. PROBADOR INTERACTIVO DE PSEUDOELEMENTOS (::before y ::after)
// =============================================================================
function togglePseudoelemento(tipo) {
  const tarjeta = document.getElementById("tarjeta-pseudoelemento-demo");
  const visor = document.getElementById("visor-css-pseudoelementos");
  if (!tarjeta) return;

  if (tipo === "before") {
    tarjeta.classList.toggle("con-before");
  } else if (tipo === "after") {
    tarjeta.classList.toggle("con-after");
  }

  const tieneBefore = tarjeta.classList.contains("con-before");
  const tieneAfter = tarjeta.classList.contains("con-after");

  if (visor) {
    let css = `<span class="codigo-comentario">/* Pseudoelementos ::before y ::after generados */</span>\n`;
    if (tieneBefore) {
      css += `.tarjeta::before {\n  content: "🥋 "; <span class="codigo-comentario">/* ¡Obligatorio! */</span>\n  display: inline-block;\n  margin-right: 6px;\n}\n`;
    }
    if (tieneAfter) {
      css += `.tarjeta::after {\n  content: " [NIVEL SAIYAN]"; <span class="codigo-comentario">/* Badge decorativo */</span>\n  font-size: 0.75rem;\n  color: var(--color-dorado);\n  font-weight: bold;\n}\n`;
    }
    if (!tieneBefore && !tieneAfter) {
      css += `/* Activa los botones para inyectar contenido virtual ::before o ::after */`;
    }
    visor.innerHTML = css;
  }
}

// =============================================================================
// 10. LABORATORIO TIPOGRÁFICO INTERACTIVO
// =============================================================================
function actualizarTipografia() {
  const muestra = document.getElementById("muestra-texto-tipografia");
  const visor = document.getElementById("visor-css-tipografia");
  if (!muestra) return;

  const fontFam = document.getElementById("tipo-font-family")?.value || "sans-serif";
  const fontSize = document.getElementById("tipo-font-size")?.value || "1.2";
  const fontWeight = document.getElementById("tipo-font-weight")?.value || "400";
  const lineHeight = document.getElementById("tipo-line-height")?.value || "1.6";
  const textAlign = document.getElementById("tipo-text-align")?.value || "left";
  const textDecor = document.getElementById("tipo-text-decoration")?.value || "none";

  muestra.style.fontFamily = fontFam;
  muestra.style.fontSize = fontSize + "rem";
  muestra.style.fontWeight = fontWeight;
  muestra.style.lineHeight = lineHeight;
  muestra.style.textAlign = textAlign;
  muestra.style.textDecoration = textDecor;

  const valSize = document.getElementById("val-tipo-size");
  const valLH = document.getElementById("val-tipo-lh");
  if (valSize) valSize.textContent = fontSize + "rem (" + Math.round(parseFloat(fontSize) * 16) + "px)";
  if (valLH) valLH.textContent = lineHeight;

  if (visor) {
    visor.innerHTML = `<span class="codigo-comentario">/* Reglas tipográficas en tiempo real */</span>
.texto-estilizado {
  font-family: ${fontFam};
  font-size: ${fontSize}rem;
  font-weight: ${fontWeight};
  line-height: ${lineHeight};
  text-align: ${textAlign};
  text-decoration: ${textDecor};
}`;
  }
}

// =============================================================================
// 11. COMPARADOR DE OPACIDAD (opacity vs rgba)
// =============================================================================
function actualizarOpacidad() {
  const slider = document.getElementById("slider-opacidad");
  if (!slider) return;

  const valor = parseFloat(slider.value);
  const lbl = document.getElementById("val-slider-opacidad");
  if (lbl) lbl.textContent = valor;

  const cajaOpacity = document.getElementById("demo-box-opacity");
  const cajaRgba = document.getElementById("demo-box-rgba");

  if (cajaOpacity) {
    cajaOpacity.style.opacity = valor;
  }
  if (cajaRgba) {
    cajaRgba.style.backgroundColor = `rgba(13, 71, 122, ${valor})`;
  }
}

// =============================================================================
// 12. TRANSFORMACIONES 2D (transform)
// =============================================================================
function actualizarTransformacion() {
  const caja = document.getElementById("caja-transform-demo");
  const visor = document.getElementById("visor-css-transform");
  if (!caja) return;

  const transX = document.getElementById("trans-x")?.value || 0;
  const transY = document.getElementById("trans-y")?.value || 0;
  const escala = document.getElementById("trans-scale")?.value || 1;
  const rotacion = document.getElementById("trans-rotate")?.value || 0;
  const inclinacion = document.getElementById("trans-skew")?.value || 0;

  const valX = document.getElementById("val-trans-x");
  const valY = document.getElementById("val-trans-y");
  const valScale = document.getElementById("val-trans-scale");
  const valRot = document.getElementById("val-trans-rotate");
  const valSkew = document.getElementById("val-trans-skew");

  if (valX) valX.textContent = transX + "px";
  if (valY) valY.textContent = transY + "px";
  if (valScale) valScale.textContent = escala + "x";
  if (valRot) valRot.textContent = rotacion + "°";
  if (valSkew) valSkew.textContent = inclinacion + "°";

  const transformString = `translate(${transX}px, ${transY}px) scale(${escala}) rotate(${rotacion}deg) skew(${inclinacion}deg)`;
  caja.style.transform = transformString;

  if (visor) {
    visor.innerHTML = `<span class="codigo-comentario">/* Transformación 2D combinada */</span>
.elemento-transformado {
  transform: ${transformString};
  transition: transform 0.25s ease;
}`;
  }
}

function resetearTransformacion() {
  const ids = ["trans-x", "trans-y", "trans-skew", "trans-rotate"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = 0;
  });
  const elScale = document.getElementById("trans-scale");
  if (elScale) elScale.value = 1;

  actualizarTransformacion();
}

// =============================================================================
// 13. ESPECIFICIDAD Y BATALLA DE SELECTORES
// =============================================================================

/**
 * Calcula la tupla de especificidad [Inline, ID, Clase/Pseudo, Elemento]
 * @param {string} selector 
 * @returns {[number, number, number, number]}
 */
function calcularEspecificidad(selector) {
  if (!selector || typeof selector !== "string") {
    return [0, 0, 0, 0];
  }

  let s = selector.trim();

  // Caso especial: declaración de estilo inline
  if (/^style\s*=/i.test(s) || s.toLowerCase() === "style" || s.toLowerCase().startsWith("style:")) {
    return [1, 0, 0, 0];
  }

  let inline = 0;
  let ids = 0;
  let classes = 0;
  let elements = 0;

  // 1. Extraer pseudo-elementos (::before, ::after, ::first-line, etc. y sintaxis clásica :before)
  const pseudoElementsRegex = /(::(?:before|after|first-line|first-letter|placeholder|selection|marker|backdrop|file-selector-button)|:(?:before|after|first-line|first-letter))\b/gi;
  const matchPseudoElements = s.match(pseudoElementsRegex);
  if (matchPseudoElements) {
    elements += matchPseudoElements.length;
    s = s.replace(pseudoElementsRegex, " ");
  }

  // 2. Extraer selectores de atributos [type="text"], [data-*], etc.
  const attrRegex = /\[[^\]]+\]/g;
  const matchAttrs = s.match(attrRegex);
  if (matchAttrs) {
    classes += matchAttrs.length;
    s = s.replace(attrRegex, " ");
  }

  // 3. Extraer IDs: #nombre-id
  const idRegex = /#[a-zA-Z0-9_-]+/g;
  const matchIds = s.match(idRegex);
  if (matchIds) {
    ids += matchIds.length;
    s = s.replace(idRegex, " ");
  }

  // 4. Extraer Clases: .nombre-clase
  const classRegex = /\.[a-zA-Z0-9_-]+/g;
  const matchClasses = s.match(classRegex);
  if (matchClasses) {
    classes += matchClasses.length;
    s = s.replace(classRegex, " ");
  }

  // 5. Extraer Pseudoclases: :hover, :focus, :nth-child(...), etc.
  const pseudoClassesRegex = /:[a-zA-Z0-9_-]+(?:\([^)]*\))?/g;
  const matchPseudos = s.match(pseudoClassesRegex);
  if (matchPseudos) {
    classes += matchPseudos.length;
    s = s.replace(pseudoClassesRegex, " ");
  }

  // 6. Extraer Elementos / Etiquetas HTML: div, p, a, h1, span, etc.
  // Limpiar combinadores (> , + , ~ , *)
  s = s.replace(/[>+~*]/g, " ");
  const tokens = s.trim().split(/\s+/).filter(Boolean);
  for (const token of tokens) {
    if (/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(token)) {
      elements++;
    }
  }

  return [inline, ids, classes, elements];
}

/**
 * Compara dos tuplas de especificidad A y B en orden lexicográfico
 * @returns {number} 1 si gana A, -1 si gana B, 0 si hay empate
 */
function compararEspecificidad(a, b) {
  for (let i = 0; i < 4; i++) {
    if (a[i] > b[i]) return 1;
    if (a[i] < b[i]) return -1;
  }
  return 0;
}

/**
 * Ejecuta el enfrentamiento entre dos selectores y actualiza la interfaz
 * @param {string} selA 
 * @param {string} selB 
 */
function batallaSelectores(selA, selB) {
  const inputA = document.getElementById("input-selector-a");
  const inputB = document.getElementById("input-selector-b");

  if (selA !== undefined && inputA) inputA.value = selA;
  if (selB !== undefined && inputB) inputB.value = selB;

  const selectorA = (inputA ? inputA.value : selA) || "";
  const selectorB = (inputB ? inputB.value : selB) || "";

  const espA = calcularEspecificidad(selectorA);
  const espB = calcularEspecificidad(selectorB);

  // Actualizar contadores de Selector A
  const elAInline = document.getElementById("esp-a-inline");
  const elAId = document.getElementById("esp-a-id");
  const elAClass = document.getElementById("esp-a-class");
  const elAElement = document.getElementById("esp-a-element");
  if (elAInline) elAInline.textContent = espA[0];
  if (elAId) elAId.textContent = espA[1];
  if (elAClass) elAClass.textContent = espA[2];
  if (elAElement) elAElement.textContent = espA[3];

  // Actualizar contadores de Selector B
  const elBInline = document.getElementById("esp-b-inline");
  const elBId = document.getElementById("esp-b-id");
  const elBClass = document.getElementById("esp-b-class");
  const elBElement = document.getElementById("esp-b-element");
  if (elBInline) elBInline.textContent = espB[0];
  if (elBId) elBId.textContent = espB[1];
  if (elBClass) elBClass.textContent = espB[2];
  if (elBElement) elBElement.textContent = espB[3];

  // Comparar y asignar estados de victoria / derrota
  const cardA = document.getElementById("card-batalla-a");
  const cardB = document.getElementById("card-batalla-b");
  const panelResultado = document.getElementById("panel-resultado-batalla");

  const cmp = compararEspecificidad(espA, espB);

  if (cardA && cardB) {
    cardA.classList.remove("ganador", "perdedor", "empate");
    cardB.classList.remove("ganador", "perdedor", "empate");

    if (cmp > 0) {
      cardA.classList.add("ganador");
      cardB.classList.add("perdedor");
    } else if (cmp < 0) {
      cardB.classList.add("ganador");
      cardA.classList.add("perdedor");
    } else {
      cardA.classList.add("empate");
      cardB.classList.add("empate");
    }
  }

  if (panelResultado) {
    if (cmp > 0) {
      const razon = espA[0] > espB[0] 
        ? "El estilo Inline (1, 0, 0, 0) anula cualquier selector regular sin !important."
        : espA[1] > espB[1]
        ? "Posee más identificadores de ID (#). ¡1 ID supera a 10.000 clases juntas!"
        : espA[2] > espB[2]
        ? "Posee más clases (.), pseudoclases (:) o atributos ([])."
        : "Posee más nombres de etiqueta / elemento.";
      panelResultado.innerHTML = `
        <h4 style="color: var(--color-verde); margin-bottom: 6px;">🏆 ¡Vencedor indiscutible: Selector A!</h4>
        <p style="color: var(--color-texto); font-size: 0.92rem; margin: 0;">
          <strong>Puntuación:</strong> [${espA.join(", ")}] vs [${espB.join(", ")}].<br>
          <strong>Explicación pedagógica:</strong> ${razon}
        </p>
      `;
    } else if (cmp < 0) {
      const razon = espB[0] > espA[0] 
        ? "El estilo Inline (1, 0, 0, 0) anula cualquier selector regular sin !important."
        : espB[1] > espA[1]
        ? "Posee más identificadores de ID (#). ¡1 ID supera a 10.000 clases juntas!"
        : espB[2] > espA[2]
        ? "Posee más clases (.), pseudoclases (:) o atributos ([])."
        : "Posee más nombres de etiqueta / elemento.";
      panelResultado.innerHTML = `
        <h4 style="color: var(--color-verde); margin-bottom: 6px;">🏆 ¡Vencedor indiscutible: Selector B!</h4>
        <p style="color: var(--color-texto); font-size: 0.92rem; margin: 0;">
          <strong>Puntuación:</strong> [${espB.join(", ")}] vs [${espA.join(", ")}].<br>
          <strong>Explicación pedagógica:</strong> ${razon}
        </p>
      `;
    } else {
      panelResultado.innerHTML = `
        <h4 style="color: var(--color-dorado-oscuro); margin-bottom: 6px;">⚖️ ¡Empate técnico exacto de especificidad!</h4>
        <p style="color: var(--color-texto); font-size: 0.92rem; margin: 0;">
          <strong>Puntuación idéntica:</strong> [${espA.join(", ")}].<br>
          <strong>Explicación pedagógica:</strong> Al existir empate absoluto, el navegador activa la regla de <strong>La Cascada (Cascade)</strong>: prevalecerá la regla que aparezca <strong>más abajo en el archivo CSS</strong> (última declarada en el código fuente).
        </p>
      `;
    }
  }
}

// =============================================================================
// 14. GUÍA DEFINITIVA DE CENTRADO EN CSS
// =============================================================================

/**
 * Conmuta entre los 4 métodos estándar de centrado en CSS
 * @param {'flex'|'grid'|'margin-auto'|'absolute-transform'} metodo 
 * @param {HTMLElement} btn 
 */
function cambiarMetodoCentrado(metodo, btn) {
  const escenario = document.getElementById("escenario-centrado");
  const caja = document.getElementById("caja-centrada");
  const visor = document.getElementById("visor-css-centrado");
  const explicacion = document.getElementById("explicacion-centrado");

  if (!escenario || !caja) return;

  // Actualizar estado de botones
  const botones = document.querySelectorAll(".btn-centrado-modo");
  botones.forEach(b => b.classList.remove("activo"));
  if (btn) {
    btn.classList.add("activo");
  } else {
    const btnActivo = document.querySelector(`.btn-centrado-modo[data-metodo="${metodo}"]`);
    if (btnActivo) btnActivo.classList.add("activo");
  }

  // Resetear propiedades del escenario y la caja
  escenario.style.display = "";
  escenario.style.justifyContent = "";
  escenario.style.alignItems = "";
  escenario.style.placeItems = "";

  caja.style.position = "";
  caja.style.top = "";
  caja.style.left = "";
  caja.style.transform = "";
  caja.style.margin = "";

  let cssCodigo = "";
  let textoExplicacion = "";

  switch (metodo) {
    case "flex":
      escenario.style.display = "flex";
      escenario.style.justifyContent = "center";
      escenario.style.alignItems = "center";
      caja.style.position = "static";
      caja.style.margin = "0";

      cssCodigo = `<span class="codigo-comentario">/* 1. Flexbox: Centrado completo bidireccional */</span>
.contenedor {
  display: flex;
  justify-content: center; <span class="codigo-comentario">/* Centra en eje horizontal (main axis) */</span>
  align-items: center;     <span class="codigo-comentario">/* Centra en eje vertical (cross axis) */</span>
  min-height: 280px;
}

.caja-centrada {
  <span class="codigo-comentario">/* Sin necesidad de hacks ni coordenadas */</span>
}`;
      textoExplicacion = `
        <strong>💡 ¿Por qué es el método más usado hoy en día?</strong><br>
        Flexbox permite centrar cualquier contenido sin conocer sus dimensiones previas. No saca los elementos del flujo normal del documento y se adapta limpiamente si el contenido de texto crece o encoge dinámicamente.
      `;
      break;

    case "grid":
      escenario.style.display = "grid";
      escenario.style.placeItems = "center";
      caja.style.position = "static";
      caja.style.margin = "0";

      cssCodigo = `<span class="codigo-comentario">/* 2. CSS Grid: El método más conciso de todo CSS (solo 2 líneas) */</span>
.contenedor {
  display: grid;
  place-items: center; <span class="codigo-comentario">/* Abreviatura de align-items + justify-items */</span>
  min-height: 280px;
}

.caja-centrada {
  <span class="codigo-comentario">/* Se ubica automáticamente en el centro de la celda */</span>
}`;
      textoExplicacion = `
        <strong>⚡ Ventaja clave de CSS Grid:</strong><br>
        Es la sintaxis más limpia y minimalista creada en CSS. <code>place-items: center</code> centra en ambos ejes con una única regla. Ideal para layouts de tarjetas, loaders o contenedores directos.
      `;
      break;

    case "margin-auto":
      escenario.style.display = "block";
      caja.style.position = "static";
      caja.style.margin = "95px auto";

      cssCodigo = `<span class="codigo-comentario">/* 3. Margen Automático: Centrado horizontal clásico */</span>
.contenedor {
  display: block; <span class="codigo-comentario">/* Flujo de bloque estándar */</span>
}

.caja-centrada {
  width: 150px;       <span class="codigo-comentario">/* ¡Obligatorio definir un ancho explícito! */</span>
  margin: 0 auto;     <span class="codigo-comentario">/* Distribuye el espacio sobrante a ambos lados */</span>
}`;
      textoExplicacion = `
        <strong>⚠️ Trampa clásica de examen:</strong><br>
        En elementos en bloque estándar, <code>margin: auto</code> <strong>solo funciona en el eje horizontal</strong>. Para centrar en vertical con margin-auto puro se requiere que el contenedor padre sea Flexbox (<code>.hijo { margin: auto; }</code>) o posicionamiento absoluto.
      `;
      break;

    case "absolute-transform":
      escenario.style.display = "block";
      caja.style.position = "absolute";
      caja.style.top = "50%";
      caja.style.left = "50%";
      caja.style.transform = "translate(-50%, -50%)";
      caja.style.margin = "0";

      cssCodigo = `<span class="codigo-comentario">/* 4. Posicionamiento Absoluto + Transformación 2D */</span>
.contenedor {
  position: relative; <span class="codigo-comentario">/* Marco de referencia para el hijo absoluto */</span>
  min-height: 280px;
}

.caja-centrada {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); <span class="codigo-comentario">/* Corrige el 50% de la propia caja */</span>
}`;
      textoExplicacion = `
        <strong>🎯 ¿Cuándo usar este método?</strong><br>
        Es la técnica ideal para ventanas emergentes modales (popups), tooltips flotantes o insignias superpuestas. Funciona sin importar el tamaño del hijo porque <code>translate(-50%, -50%)</code> toma como referencia las dimensiones del propio elemento, no las del padre.
      `;
      break;
  }

  if (visor) visor.innerHTML = cssCodigo;
  if (explicacion) explicacion.innerHTML = textoExplicacion;
}

// =============================================================================
// 15. COMPARADOR DE UNIDADES (px vs rem vs em vs %)
// =============================================================================

/**
 * Actualiza el comparador de unidades modificando el font-size raíz de cálculo
 * @param {number} raizPx 
 * @param {HTMLElement} btn 
 */
function actualizarUnidadesDemo(raizPx, btn) {
  const tamano = raizPx || 16;

  // Actualizar botones de opción raíz
  if (btn) {
    const botones = document.querySelectorAll(".btn-raiz-opcion");
    botones.forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");
  }

  const lblRaiz = document.getElementById("lbl-tamano-raiz");
  if (lblRaiz) lblRaiz.textContent = `${tamano}px`;

  // Cálculos matemáticos
  const rem15 = (1.5 * tamano).toFixed(1);
  const em125Nivel1 = (1.25 * tamano).toFixed(1);
  const em125Nivel2 = (1.25 * parseFloat(em125Nivel1)).toFixed(1);
  const em125Nivel3 = (1.25 * parseFloat(em125Nivel2)).toFixed(1);

  const rem125 = (1.25 * tamano).toFixed(1);

  // Actualizar etiquetas numéricas
  const calcRem = document.getElementById("calc-rem-val");
  const calcPx = document.getElementById("calc-px-val");
  if (calcRem) calcRem.textContent = `1.5rem = ${rem15}px`;
  if (calcPx) calcPx.textContent = `24px (fijo, ignora accesibilidad)`;

  // Actualizar cascada em
  const calcEm1 = document.getElementById("calc-em-n1");
  const calcEm2 = document.getElementById("calc-em-n2");
  const calcEm3 = document.getElementById("calc-em-n3");
  if (calcEm1) calcEm1.textContent = `${em125Nivel1}px (${tamano}px × 1.25)`;
  if (calcEm2) calcEm2.textContent = `${em125Nivel2}px (${em125Nivel1}px × 1.25)`;
  if (calcEm3) calcEm3.textContent = `${em125Nivel3}px (${em125Nivel2}px × 1.25)`;

  // Actualizar estabilidad rem
  const calcRem1 = document.getElementById("calc-rem-n1");
  const calcRem2 = document.getElementById("calc-rem-n2");
  const calcRem3 = document.getElementById("calc-rem-n3");
  if (calcRem1) calcRem1.textContent = `${rem125}px (${tamano}px × 1.25)`;
  if (calcRem2) calcRem2.textContent = `${rem125}px (${tamano}px × 1.25)`;
  if (calcRem3) calcRem3.textContent = `${rem125}px (${tamano}px × 1.25)`;

  // Aplicar estilos visuales en el DOM
  const demoEmBox1 = document.getElementById("demo-em-box-1");
  const demoEmBox2 = document.getElementById("demo-em-box-2");
  const demoEmBox3 = document.getElementById("demo-em-box-3");
  if (demoEmBox1) demoEmBox1.style.fontSize = `${em125Nivel1}px`;
  if (demoEmBox2) demoEmBox2.style.fontSize = `${em125Nivel2}px`;
  if (demoEmBox3) demoEmBox3.style.fontSize = `${em125Nivel3}px`;

  const demoRemBox1 = document.getElementById("demo-rem-box-1");
  const demoRemBox2 = document.getElementById("demo-rem-box-2");
  const demoRemBox3 = document.getElementById("demo-rem-box-3");
  if (demoRemBox1) demoRemBox1.style.fontSize = `${rem125}px`;
  if (demoRemBox2) demoRemBox2.style.fontSize = `${rem125}px`;
  if (demoRemBox3) demoRemBox3.style.fontSize = `${rem125}px`;
}

// =============================================================================
// 16. LABORATORIO DE SOMBRAS Y FILTROS (box-shadow & filter)
// =============================================================================

function actualizarSombrasFiltros() {
  const inputX = document.getElementById("shadow-x");
  const inputY = document.getElementById("shadow-y");
  const inputBlur = document.getElementById("shadow-blur");
  const inputSpread = document.getElementById("shadow-spread");
  const chkInset = document.getElementById("shadow-inset");

  const inputDropBlur = document.getElementById("filter-drop-blur");
  const inputFilterBlur = document.getElementById("filter-blur-slider");
  const inputHue = document.getElementById("filter-hue-slider");
  const inputBright = document.getElementById("filter-bright-slider");

  if (!inputX || !inputY) return;

  const x = parseInt(inputX.value, 10);
  const y = parseInt(inputY.value, 10);
  const blur = parseInt(inputBlur?.value || 20, 10);
  const spread = parseInt(inputSpread?.value || 0, 10);
  const inset = chkInset?.checked ? "inset " : "";

  const dropBlur = parseInt(inputDropBlur?.value || 10, 10);
  const fBlur = parseInt(inputFilterBlur?.value || 0, 10);
  const hue = parseInt(inputHue?.value || 0, 10);
  const bright = parseInt(inputBright?.value || 100, 10);

  // Actualizar valores de texto
  const lblX = document.getElementById("val-shadow-x");
  const lblY = document.getElementById("val-shadow-y");
  const lblBlur = document.getElementById("val-shadow-blur");
  const lblSpread = document.getElementById("val-shadow-spread");
  const lblDropBlur = document.getElementById("val-filter-drop-blur");
  const lblFBlur = document.getElementById("val-filter-blur");
  const lblHue = document.getElementById("val-filter-hue");
  const lblBright = document.getElementById("val-filter-bright");

  if (lblX) lblX.textContent = `${x}px`;
  if (lblY) lblY.textContent = `${y}px`;
  if (lblBlur) lblBlur.textContent = `${blur}px`;
  if (lblSpread) lblSpread.textContent = `${spread}px`;
  if (lblDropBlur) lblDropBlur.textContent = `${dropBlur}px`;
  if (lblFBlur) lblFBlur.textContent = `${fBlur}px`;
  if (lblHue) lblHue.textContent = `${hue}deg`;
  if (lblBright) lblBright.textContent = `${bright}%`;

  const sombraTarjeta = `${inset}${x}px ${y}px ${blur}px ${spread}px rgba(13, 71, 122, 0.3)`;
  const filtroSilueta = `drop-shadow(${x}px ${y}px ${dropBlur}px rgba(13, 71, 122, 0.65)) blur(${fBlur}px) hue-rotate(${hue}deg) brightness(${bright}%)`;

  const muestraCaja = document.getElementById("muestra-caja-shadow");
  const muestraSilueta = document.getElementById("muestra-filtro-img");
  const visor = document.getElementById("visor-css-sombras");

  if (muestraCaja) muestraCaja.style.boxShadow = sombraTarjeta;
  if (muestraSilueta) muestraSilueta.style.filter = filtroSilueta;

  if (visor) {
    visor.innerHTML = `<span class="codigo-comentario">/* 1. box-shadow: Sombra rectangular geométrica */</span>
.tarjeta-con-sombra {
  box-shadow: ${sombraTarjeta};
}

<span class="codigo-comentario">/* 2. filter: Sombra orgánica respetando el canal alfa (PNG) */</span>
.silueta-guerrero {
  filter: ${filtroSilueta};
}`;
  }
}

// =============================================================================
// 17. BARRA DE KI Y COMPONENTES REUTILIZABLES
// =============================================================================

function actualizarKiBarraDemo(valor) {
  const slider = document.getElementById("slider-ki-demo");
  const porcentaje = valor !== undefined ? valor : (slider ? parseInt(slider.value, 10) : 85);

  const fill = document.getElementById("ki-fill-demo");
  const lblPorcentaje = document.getElementById("val-ki-porcentaje");
  const lblEstado = document.getElementById("lbl-ki-estado");
  const visor = document.getElementById("visor-css-kibar");

  if (lblPorcentaje) lblPorcentaje.textContent = `${porcentaje}%`;

  let gradienteKi = "linear-gradient(90deg, #38bdf8, #0284c7, #2563eb)";
  let nombreNivel = "Ki Base — Guerrero en Calma";
  let colorSombra = "rgba(56, 189, 248, 0.6)";

  if (porcentaje <= 30) {
    gradienteKi = "linear-gradient(90deg, #38bdf8, #0284c7)";
    nombreNivel = "Modo Reposo — Concentración de Ki";
    colorSombra = "rgba(56, 189, 248, 0.4)";
  } else if (porcentaje <= 60) {
    gradienteKi = "linear-gradient(90deg, #f87171, #ef4444, #b91c1c)";
    nombreNivel = "¡Kaio-ken x10! — Aumento de Potencia";
    colorSombra = "rgba(239, 68, 68, 0.6)";
  } else if (porcentaje <= 90) {
    gradienteKi = "linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)";
    nombreNivel = "Super Saiyan 2 — Aura Dorada";
    colorSombra = "rgba(245, 158, 11, 0.7)";
  } else {
    gradienteKi = "linear-gradient(90deg, #818cf8, #38bdf8, #f472b6, #fbbf24)";
    nombreNivel = "¡Ultra Instinto / Saiyan Blue Dominado!";
    colorSombra = "rgba(129, 140, 248, 0.85)";
  }

  if (fill) {
    fill.style.width = `${porcentaje}%`;
    fill.style.background = gradienteKi;
    fill.style.boxShadow = `0 0 15px ${colorSombra}`;
  }

  if (lblEstado) lblEstado.textContent = nombreNivel;

  if (visor) {
    visor.innerHTML = `<span class="codigo-comentario">/* Barra de Progreso de Ki Dinámica */</span>
.barra-ki-relleno {
  width: ${porcentaje}%;
  background: ${gradienteKi};
  box-shadow: 0 0 15px ${colorSombra};
  transition: width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}`;
  }
}

// =============================================================================
// 18. UTILIDAD PARA COPIAR CÓDIGO AL PORTAPAPELES
// =============================================================================

function copiarCodigo(idElemento, btn) {
  const el = document.getElementById(idElemento);
  if (!el) return;

  const texto = el.innerText || el.textContent;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(() => {
      mostrarFeedbackCopiado(btn);
    }).catch(() => {
      copiarFallback(texto, btn);
    });
  } else {
    copiarFallback(texto, btn);
  }
}

function copiarFallback(texto, btn) {
  const textarea = document.createElement("textarea");
  textarea.value = texto;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    mostrarFeedbackCopiado(btn);
  } catch (err) {
    console.error("Error al copiar texto", err);
  }
  document.body.removeChild(textarea);
}

function mostrarFeedbackCopiado(btn) {
  if (!btn) return;
  const textoOriginal = btn.innerHTML;
  btn.innerHTML = "¡Copiado! ✓";
  btn.style.borderColor = "var(--color-verde)";
  btn.style.color = "var(--color-verde)";

  setTimeout(() => {
    btn.innerHTML = textoOriginal;
    btn.style.borderColor = "";
    btn.style.color = "";
  }, 2000);
}

// =============================================================================
// INICIALIZACIÓN GLOBAL SEGURA
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("input-padding")) {
    actualizarBoxModel();
  }
  if (document.getElementById("escenario-flex")) {
    actualizarFlexboxAnimado();
  }
  if (document.getElementById("muestra-texto-tipografia")) {
    actualizarTipografia();
  }
  if (document.getElementById("slider-opacidad")) {
    actualizarOpacidad();
  }
  if (document.getElementById("caja-transform-demo")) {
    actualizarTransformacion();
  }
  if (document.getElementById("box-position-target")) {
    actualizarPosicionCoordenadas();
  }
  if (document.getElementById("bg-canvas-interactive")) {
    actualizarFondoInteractivo();
  }
  if (document.getElementById("canvas-gradiente-estudio")) {
    actualizarEstudioGradiente();
  }
  if (document.getElementById("input-selector-a")) {
    batallaSelectores("#goku", ".guerrero.saiyan.entrenado");
  }
  if (document.getElementById("escenario-centrado")) {
    cambiarMetodoCentrado("flex");
  }
  if (document.getElementById("lbl-tamano-raiz")) {
    actualizarUnidadesDemo(16);
  }
  if (document.getElementById("shadow-x")) {
    actualizarSombrasFiltros();
  }
  if (document.getElementById("slider-ki-demo")) {
    actualizarKiBarraDemo(85);
  }
});
