/**
 * Script de animaciones fluidas con técnica FLIP (First, Last, Invert, Play)
 * Permite visualizar el recorrido cinético de los bloques al modificar Flexbox y Grid.
 */

// --- 1. LÓGICA DE BOX MODEL ---
let boxSizingActual = "border-box";

function actualizarBoxModel() {
  const padding = document.getElementById("input-padding").value;
  const margin = document.getElementById("input-margin").value;
  const border = document.getElementById("input-border").value;

  document.getElementById("val-padding").textContent = padding + "px";
  document.getElementById("val-margin").textContent = margin + "px";
  document.getElementById("val-border").textContent = border + "px";

  const renderMargin = document.getElementById("render-margin");
  const renderBorder = document.getElementById("render-border");

  renderMargin.style.padding = margin + "px";
  renderBorder.style.padding = padding + "px";
  renderBorder.style.borderWidth = border + "px";

  const totalContentBox = 160 + (parseInt(padding) * 2) + (parseInt(border) * 2);
  const formulaEl = document.getElementById("formula-medidas");

  if (boxSizingActual === "border-box") {
    formulaEl.innerHTML = `<strong>border-box:</strong> Ancho total = 200px (padding y border no ensanchan el elemento exterior)`;
  } else {
    formulaEl.innerHTML = `<strong>content-box:</strong> Ancho total = 160px + ${padding * 2}px(pad) + ${border * 2}px(bord) = <strong style="color:#d32f2f;">${totalContentBox}px</strong> (¡Se desborda!)`;
  }
}

function alternarBoxSizing() {
  boxSizingActual = boxSizingActual === "border-box" ? "content-box" : "border-box";
  document.getElementById("val-boxsizing").textContent = boxSizingActual;
  actualizarBoxModel();
}

// --- 2. LÓGICA DE FLEXBOX CON ANIMACIÓN FLIP SUAVE ---
function actualizarFlexboxAnimado() {
  const escenario = document.getElementById("escenario-flex");
  const cajas = Array.from(escenario.querySelectorAll(".flex-caja"));

  // 1. FIRST: Medir posiciones iniciales
  const posicionesIniciales = cajas.map(caja => caja.getBoundingClientRect());

  // 2. Modificar propiedades CSS en el DOM
  const dir = document.getElementById("select-flex-direction").value;
  const just = document.getElementById("select-justify").value;
  const align = document.getElementById("select-align").value;
  const wrap = document.getElementById("select-wrap").value;
  const gap = document.getElementById("select-gap").value;

  escenario.style.flexDirection = dir;
  escenario.style.justifyContent = just;
  escenario.style.alignItems = align;
  escenario.style.flexWrap = wrap;
  escenario.style.gap = gap;

  // Actualizar indicador de eje y flecha visual
  actualizarIndicadorEje(dir);

  // 3. LAST: Medir nuevas posiciones tras el cambio
  const posicionesFinales = cajas.map(caja => caja.getBoundingClientRect());

  // 4. INVERT & PLAY: Animar el viaje de cada caja
  cajas.forEach((caja, i) => {
    const deltaX = posicionesIniciales[i].left - posicionesFinales[i].left;
    const deltaY = posicionesIniciales[i].top - posicionesFinales[i].top;

    // Desactivar transición momentáneamente y poner la caja en la posición vieja
    caja.style.transition = 'none';
    caja.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // Forzar reflow del navegador para registrar la posición invertida
    caja.offsetHeight;

    // Activar transición suave elástica y volver a la nueva posición natural (0, 0)
    caja.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
    caja.style.transform = '';
  });

  // Actualizar el visor de código CSS
  const visor = document.getElementById("visor-css-flex");
  visor.innerHTML = `<span class="codigo-comentario">/* Reglas CSS aplicadas en vivo al contenedor */</span>
.contenedor {
  display: flex;
  flex-direction: ${dir};
  justify-content: ${just};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: ${gap};
}`;
}

function actualizarIndicadorEje(direccion) {
  const lblEje = document.getElementById("lbl-eje-direccion");
  const flechaIcono = document.getElementById("icono-flecha-eje");

  if (direccion === 'row') {
    lblEje.textContent = "Eje Principal: X Horizontal (Izquierda → Derecha)";
    flechaIcono.textContent = "➡️";
    flechaIcono.style.transform = "rotate(0deg)";
  } else if (direccion === 'row-reverse') {
    lblEje.textContent = "Eje Principal: X Horizontal Invertido (Derecha → Izquierda)";
    flechaIcono.textContent = "⬅️";
    flechaIcono.style.transform = "rotate(0deg)";
  } else if (direccion === 'column') {
    lblEje.textContent = "Eje Principal: Y Vertical (Arriba → Abajo)";
    flechaIcono.textContent = "⬇️";
    flechaIcono.style.transform = "rotate(0deg)";
  } else if (direccion === 'column-reverse') {
    lblEje.textContent = "Eje Principal: Y Vertical Invertido (Abajo → Arriba)";
    flechaIcono.textContent = "⬆️";
    flechaIcono.style.transform = "rotate(0deg)";
  }
}

// --- 3. LÓGICA DE CSS GRID CON ANIMACIÓN FLIP SUAVE ---
function cambiarGridPresetAnimado(preset, btn) {
  document.querySelectorAll(".btn-grid-preset").forEach(b => b.classList.remove("activo"));
  btn.classList.add("activo");

  const escenario = document.getElementById("escenario-grid");
  const cajas = Array.from(escenario.querySelectorAll(".grid-caja"));

  // 1. FIRST
  const posIni = cajas.map(c => c.getBoundingClientRect());

  const visor = document.getElementById("visor-css-grid");
  const c1 = document.getElementById("gc-1");
  const c2 = document.getElementById("gc-2");
  const c3 = document.getElementById("gc-3");
  const c4 = document.getElementById("gc-4");

  // Reset de áreas
  [c1, c2, c3, c4].forEach(c => {
    c.className = "grid-caja";
    c.style.gridArea = "";
  });

  if (preset === 'auto-fit') {
    escenario.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
    escenario.style.gridTemplateAreas = "";
    c1.innerHTML = "Entrenamiento 01<br><small>Maestro Roshi</small>";
    c2.innerHTML = "Entrenamiento 02<br><small>Torre de Korin</small>";
    c3.innerHTML = "Entrenamiento 03<br><small>Kaio del Norte</small>";
    c4.innerHTML = "Entrenamiento 04<br><small>Whis (Divino)</small>";
    visor.innerHTML = `<span class="codigo-comentario">/* Mágica cuadrícula responsive: crea tantas columnas como quepan */</span>
.contenedor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}`;
  } else if (preset === '3-cols') {
    escenario.style.gridTemplateColumns = "repeat(3, 1fr)";
    escenario.style.gridTemplateAreas = "";
    c1.innerHTML = "Columna 1<br><small>1 fracción</small>";
    c2.innerHTML = "Columna 2<br><small>1 fracción</small>";
    c3.innerHTML = "Columna 3<br><small>1 fracción</small>";
    c4.innerHTML = "Fila 2 - Col 1<br><small>Baja automáticamente</small>";
    visor.innerHTML = `<span class="codigo-comentario">/* 3 columnas exactamente iguales (1 fracción cada una) */</span>
.contenedor-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}`;
  } else if (preset === 'asimetrico') {
    escenario.style.gridTemplateColumns = "250px 1fr 100px";
    escenario.style.gridTemplateAreas = "";
    c1.innerHTML = "Lateral Fijo<br><small>250px</small>";
    c2.innerHTML = "Contenido Fluido<br><small>1fr (ocupa el resto)</small>";
    c3.innerHTML = "Barra Auxiliar<br><small>100px</small>";
    c4.innerHTML = "Elemento Siguiente<br><small>Segunda fila</small>";
    visor.innerHTML = `<span class="codigo-comentario">/* Columna fija de 250px, columna fluida de 1fr y columna final de 100px */</span>
.contenedor-grid {
  display: grid;
  grid-template-columns: 250px 1fr 100px;
  gap: 15px;
}`;
  } else if (preset === 'areas') {
    escenario.style.gridTemplateColumns = "200px 1fr";
    escenario.style.gridTemplateAreas = '"header header" "lateral main" "footer footer"';
    c1.classList.add("grid-area-header"); c1.style.gridArea = "header"; c1.innerHTML = "CABECERA (header)";
    c2.classList.add("grid-area-lateral"); c2.style.gridArea = "lateral"; c2.innerHTML = "LATERAL (lateral)";
    c3.classList.add("grid-area-main"); c3.style.gridArea = "main"; c3.innerHTML = "CONTENIDO (main)";
    c4.classList.add("grid-area-footer"); c4.style.gridArea = "footer"; c4.innerHTML = "PIE (footer)";

    visor.innerHTML = `<span class="codigo-comentario">/* Maquetación estructurada con nombres semánticos de zonas */</span>
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

  // 2. LAST
  const posFin = cajas.map(c => c.getBoundingClientRect());

  // 3. INVERT & PLAY
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

// --- 4. SIMULACIÓN RESPONSIVE DE MEDIA QUERIES ---
function simularPantalla(tipo) {
  const marco = document.getElementById("tester-wrapper");
  const lbl = document.getElementById("lbl-resolucion");

  if (tipo === 'mobile') {
    marco.classList.add("modo-movil");
    lbl.textContent = "390px (Móvil vertical - flex-direction: column)";
  } else {
    marco.classList.remove("modo-movil");
    lbl.textContent = "1200px (Escritorio - flex-direction: row)";
  }
}

// --- 5. FAQ ACORDEÓN ---
function toggleFaq(elemento) {
  elemento.classList.toggle("abierto");
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  actualizarBoxModel();
  actualizarFlexboxAnimado();
});

