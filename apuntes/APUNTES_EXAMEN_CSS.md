# 📘 GUÍA MAESTRA DE REPASO: EXAMEN DE DESARROLLO DE INTERFACES (CSS, HTML5 & UI)

Este documento ha sido elaborado a partir del temario oficial de la asignatura (**teoria.pdf**) y de la práctica maquetada del **CV de Son Goku**. Está diseñado como un manual de estudio intensivo para el examen, combinando teoría pura con ejemplos de código extensamente comentados.

---

## 📑 ÍNDICE DE CONTENIDOS
1. [Preguntas Teóricas Clave de Examen (UI & Conceptos Web)](#1-preguntas-teóricas-clave-de-examen)
2. [El Modelo de Caja (Box Model): Margin vs Padding y Box-Sizing](#2-el-modelo-de-caja-box-model)
3. [Display y Flujo del Documento: Block, Inline, Flex y Grid](#3-display-y-flujo-del-documento)
4. [Jerarquía DOM y Anidamiento: Bloques Div dentro de Div (Padre, Hijo, Nieto y Hermanos)](#4-jerarquía-dom-y-anidamiento-divs-dentro-de-divs)
5. [Posicionamiento en CSS: Static, Relative, Absolute, Fixed y Sticky](#5-posicionamiento-en-css)
6. [Variables CSS (`:root`), Ámbitos y Sistema de Temas](#6-variables-css-root-y-temas)
7. [Condicionales en CSS: ¿Cómo hacer "If / Else" en hojas de estilo?](#7-condicionales-en-css-el-if-else-de-las-hojas-de-estilo)
8. [Selectores Avanzados, Pseudoclases, Pseudoelementos y Funciones (`clamp`, `calc`)](#8-selectores-avanzados-pseudoclases-y-funciones-matemáticas)
9. [Media Queries y Responsive Web Design](#9-media-queries-y-responsive-web-design)
10. [Flexbox en Profundidad (Unidimensional - 1D)](#10-flexbox-en-profundidad)
11. [CSS Grid en Profundidad (Bidimensional - 2D)](#11-css-grid-en-profundidad)
12. [Análisis Técnico del Ejercicio: CV de Son Goku](#12-análisis-técnico-del-ejercicio-cv-de-son-goku)
13. [Batería de Ejercicios Prácticos Resueltos para Examen](#13-batería-de-ejercicios-prácticos-resueltos)

---

## 1. PREGUNTAS TEÓRICAS CLAVE DE EXAMEN

### 1.1. ¿Qué es una Interfaz de Usuario (UI) y qué características definen una buena interfaz?
* **Definición:** Una Interfaz de Usuario (*User Interface* o UI) es el conjunto de componentes visuales, gráficos e interactivos que permiten la comunicación bidireccional entre un usuario humano y una aplicación o sistema informático.
* **Características imprescindibles según la teoría:**
  1. **Simplicidad:** Muestra únicamente los elementos necesarios para la tarea actual, sin sobrecargar con botones ni distracciones innecesarias.
  2. **Claridad:** La finalidad de cada elemento es obvia e inequívoca (por ejemplo, el texto *"Guardar"* es más claro que *"Aceptar"*; un icono de papelera indica borrar).
  3. **Consistencia:** Los elementos análogos tienen la misma apariencia y comportamiento a lo largo de toda la aplicación, reduciendo la curva de aprendizaje.
  4. **Rapidez y retroalimentación (*feedback*):** El sistema responde al instante. Si un proceso tarda, debe informar mediante barras de progreso o indicadores de carga.
  5. **Accesibilidad:** Diseñada para que cualquier persona, independientemente de sus capacidades físicas, visuales o cognitivas, pueda interactuar eficazmente.
  6. **Adaptabilidad (Responsividad):** La interfaz se ajusta y visualiza correctamente en cualquier tamaño de pantalla o dispositivo (móvil, tablet, escritorio).

---

### 1.2. ¿Cuál es la diferencia entre UI (Interfaz de Usuario) y UX (Experiencia de Usuario)?
| Aspecto | UI (User Interface) | UX (User Experience) |
| :--- | :--- | :--- |
| **Enfoque** | Aspecto visual, estético y componentes tangibles (botones, colores, tipografía, espaciado, maquetación). | Percepción global, sensaciones, emociones y satisfacción del usuario al interactuar con el producto. |
| **Pregunta clave** | *¿Cómo se ve y cómo está dispuesto?* | *¿Qué tan fácil, intuitivo y satisfactorio es resolver la tarea?* |
| **Relación** | La UI es una parte fundamental y visible dentro de la UX global. | Sin una buena UI es imposible lograr una buena UX, pero una UI bonita con errores de flujo sigue teniendo mala UX. |

---

### 1.3. ¿Qué es la Usabilidad y cómo la define Jakob Nielsen?
* **Usabilidad:** Es el atributo de calidad que mide lo fácil, intuitiva y eficaz que resulta una herramienta o interfaz para que los usuarios consigan sus metas con el menor esfuerzo posible y la máxima satisfacción.
* **Definición de Jakob Nielsen:** Considerado el padre de la usabilidad web, la define como la métrica y estudio empírico que evalúa la facilidad de aprendizaje (*learnability*), la eficiencia de uso, la facilidad de recuerdo (*memorability*), la tasa y gravedad de errores, y el agrado o satisfacción general del usuario al operar la interfaz.

---

### 1.4. Requisitos Funcionales vs Requisitos No Funcionales (de cara al diseño de interfaces)
* **Requisitos Funcionales:** Definen **qué** debe hacer la aplicación.
  * *Ejemplos:* "El usuario debe poder iniciar sesión", "El sistema debe calcular el promedio de combate", "La tabla debe mostrar el listado de derrotas y victorias".
* **Requisitos No Funcionales:** Definen **cómo** debe comportarse o qué restricciones de calidad debe cumplir.
  * *Ejemplos:* "El diseño debe cargar en menos de 2 segundos", "La interfaz debe ser responsive usando HTML5 semántico y CSS3", "Debe cumplir pautas de accesibilidad WCAG AA", "La paleta corporativa debe utilizar variables CSS".

---

## 2. EL MODELO DE CAJA (BOX MODEL)

En CSS, todo elemento en pantalla genera una caja rectangular. El modelo de caja define cuatro capas concéntricas:

```text
+-------------------------------------------------------+
|                    MARGIN (Margen)                   |
|  +-------------------------------------------------+  |
|  |                 BORDER (Borde)                  |  |
|  |  +-------------------------------------------+  |  |
|  |  |              PADDING (Relleno)            |  |  |
|  |  |  +-------------------------------------+  |  |  |
|  |  |  |                                     |  |  |  |
|  |  |  |          CONTENIDO (Content)        |  |  |  |
|  |  |  |         (width x height)            |  |  |  |
|  |  |  |                                     |  |  |  |
|  |  |  +-------------------------------------+  |  |  |
|  |  +-------------------------------------------+  |  |
|  +-------------------------------------------------+  |
+-------------------------------------------------------+
```

### 2.1. Diferencia Crítica: `margin` vs `padding` (¡Típica de examen!)
| Característica | `padding` (Relleno interno) | `margin` (Margen externo) |
| :--- | :--- | :--- |
| **Ubicación** | Espacio **dentro** del elemento, entre el contenido y su propio borde. | Espacio **fuera** del elemento, separándolo de elementos vecinos. |
| **Color de fondo** | Adopta el `background-color` del propio elemento. | Es completamente **transparente** (muestra el fondo del contenedor padre). |
| **Área interactiva (clics)** | Hace clicable un área mayor (ideal en botones y enlaces). | No forma parte del área del elemento, no captura eventos de clic. |
| **Colapso de márgenes** | Nunca colapsa. | Los márgenes verticales adyacentes pueden colapsar (fundirse en el mayor de los dos). |

---

### 2.2. `box-sizing: content-box` vs `box-sizing: border-box`

```css
/* 1. COMPORTAMIENTO POR DEFECTO DEL NAVEGADOR (content-box) */
.caja-antigua {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Ancho total real = 200 + 20(izq) + 20(der) + 5(izq) + 5(der) = 250px (se desborda) */
}

/* 2. ESTÁNDAR MODERNO PROFESIONAL (border-box) */
.caja-moderna {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Ancho total real = EXACTAMENTE 200px (el padding y border se restan hacia adentro) */
}
```

#### Reset Universal Obligatorio:
```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

---

## 3. DISPLAY Y FLUJO DEL DOCUMENTO

| Valor | Comportamiento | ¿Acepta `width` y `height`? | Salto de línea | Ejemplos HTML por defecto |
| :--- | :--- | :--- | :--- | :--- |
| `block` | Ocupa todo el ancho horizontal disponible (100%). | **SÍ** | **SÍ** (empuja al siguiente abajo). | `<div>`, `<p>`, `<h1>`-`<h6>`, `<section>`, `<ul>` |
| `inline` | Ocupa únicamente el ancho estricto de su texto. | **NO** (ignora width/height). | **NO** (sigue en la misma línea). | `<span>`, `<a>`, `<strong>`, `<em>` |
| `inline-block` | Fluye en la misma línea como texto, pero respeta caja completa. | **SÍ** (acepta dimensiones y márgenes). | **NO** (sigue en línea). | `<button>`, `<input>`, `<img>` |
| `none` | Elimina el elemento del renderizado (desaparece de pantalla y flujo). | No aplica | No aplica (no ocupa espacio). | Menús desplegables cerrados |
| `flex` | Activa el contexto flexible unidimensional (1D). | **SÍ** | Gobierna a sus **hijos directos**. | Barras de navegación, chips, alineaciones |
| `grid` | Activa la cuadrícula bidimensional (2D: filas y columnas). | **SÍ** | Gobierna a sus **hijos directos**. | Galerías, layouts de página |

---

## 4. JERARQUÍA DOM Y ANIDAMIENTO (DIVS DENTRO DE DIVS)

Comprender la relación entre elementos anidados es fundamental para dominar la maquetación.

```html
<div class="abuelo">
  <div class="padre">
    <div class="hijo">
      <p class="nieto">Texto interior</p>
    </div>
    <div class="hijo-hermano">Otro bloque</div>
  </div>
</div>
```

### 4.1. Conceptos Clave de la Jerarquía
1. **Padre (*Parent*):** Elemento contenedor inmediato. En el ejemplo anterior, `.padre` es el padre directo de `.hijo`.
2. **Hijo (*Child*):** Elemento contenido directamente dentro de otro.
3. **Descendiente (*Descendant*):** Cualquier elemento dentro de un ancestro (hijo, nieto, bisnieto...).
4. **Hermanos (*Siblings*):** Elementos que comparten exactamente el mismo padre directo.

---

### 4.2. La Herencia en CSS: ¿Qué se hereda y qué NO?
Cuando aplicas estilos a un `div` contenedor padre:

* **Propiedades que SÍ se heredan por los hijos:**
  * Tipografía y texto: `color`, `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, `text-align`.
  * Visibilidad: `visibility`.
  * *Ejemplo:* Si pones `color: red;` en `.padre`, todos sus hijos y nietos escribirán en rojo automáticamente.
* **Propiedades que NO se heredan (se aplican SOLO al propio div):**
  * Modelo de caja: `margin`, `padding`, `border`, `width`, `height`.
  * Fondos: `background-color`, `background-image` (los hijos no heredan el fondo, simplemente son transparentes y dejan ver el fondo del padre).
  * Posicionamiento y layout: `position`, `top/bottom/left/right`, `display`, `z-index`, `overflow`.
  * *Ejemplo:* Si pones `border: 2px solid blue;` al padre, los hijos **no** tienen un borde azul propio.

---

### 4.3. Los Combinadores de Selectores (Relación Padre-Hijo en CSS)
```css
/* 1. Selector Descendiente (Espacio): Afecta a cualquier <p> dentro de .padre, sin importar el nivel */
.padre p {
  color: green; /* Afecta a hijos, nietos, bisnietos... */
}

/* 2. Selector Hijo Directo (>): Afecta ÚNICAMENTE a los hijos inmediatos de primer nivel */
.padre > .hijo {
  background-color: yellow; /* NO afecta a nietos que estén dentro de .hijo */
}

/* 3. Selector Hermano Adyacente (+): Selecciona el primer hermano inmediato que va JUSTO DESPUÉS */
.hijo + .hijo-hermano {
  margin-top: 10px; /* Solo se aplica si .hijo-hermano está inmediatamente después de .hijo */
}

/* 4. Selector Hermanos Generales (~): Selecciona TODOS los hermanos que vengan después */
h2 ~ p {
  line-height: 1.8; /* Todos los párrafos que comparten padre después del h2 */
}
```

---

### 4.4. Regla Crucial con `display: flex` y `display: grid`
> [!IMPORTANT]
> **Flexbox y CSS Grid solo gobiernan a sus HIJOS DIRECTOS de primer nivel.**
> Si tienes:
> ```html
> <div class="contenedor-flex">   <!-- Padre flexible -->
>   <div class="tarjeta">         <!-- Hijo directo: se alinea con flexbox -->
>     <h3>Título</h3>             <!-- Nieto: NO es hijo flex; sigue flujo de bloque normal -->
>     <p>Descripción</p>          <!-- Nieto: NO es hijo flex -->
>   </div>
> </div>
> ```
> Para que los elementos dentro de `.tarjeta` también sean flexibles, debes convertir a `.tarjeta` en su propio contenedor flex anidado (`.tarjeta { display: flex; }`).

---

### 4.5. Colapso de Márgenes entre Padre e Hijo (*Margin Collapsing*)
Si un hijo tiene `margin-top: 30px;` y el padre no tiene borde ni padding superior, el margen del hijo "traspasa" al padre y empuja al padre completo hacia abajo.
* **Solución profesional:** Añadir `padding-top: 1px;` o `overflow: hidden;` en el contenedor padre.

---

## 5. POSICIONAMIENTO EN CSS (`position`)

### 5.1. La Técnica de Oro: Padre `relative` + Hijo `absolute`
Es el patrón más utilizado en exámenes para posicionar insignias (*badges*), iconos flotantes, botones de cierre o avatares superpuestos.

```html
<div class="tarjeta-padre">
  <span class="badge-hijo">Nuevo</span>
  <h3>Título del Producto</h3>
</div>
```

```css
/* 1. El padre actúa como punto de anclaje (marco de referencia) */
.tarjeta-padre {
  position: relative; /* ¡Sin esto, el hijo se posicionaría respecto a toda la ventana del navegador! */
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 10px;
}

/* 2. El hijo se mueve libremente respecto a las 4 esquinas de su padre */
.badge-hijo {
  position: absolute; /* Abandona el flujo normal */
  top: 10px;          /* A 10px del borde superior del padre */
  right: 10px;        /* A 10px del borde derecho del padre */
  background: red;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
}
```

### 5.2. Resumen de Tipos de Posicionamiento
* `static` (defecto): Sigue el orden natural. Ignora `top`, `left`, `z-index`.
* `relative`: Se desplaza respecto a su hueco original sin perderlo. Sirve de marco para hijos absolutos.
* `absolute`: Sale del flujo. Se ubica respecto al ancestro posicionado más cercano.
* `fixed`: Flota fijo respecto a la ventana (*viewport*). Permanece visible al hacer scroll.
* `sticky`: Híbrido: se comporta como `relative` hasta llegar a un límite (ej: `top: 0`), donde se fija temporalmente.

---

## 6. VARIABLES CSS (`:root`) Y SISTEMA DE TEMAS

Las variables CSS (Custom Properties) centralizan valores repetitivos para mantener la coherencia y permitir cambios globales instantáneos.

```css
/* 1. Declaración Global en :root (accesible en todo el HTML) */
:root {
  --color-primario: #0d477a;
  --color-fondo: #f4f8fb;
  --color-texto: #1e293b;
  --radio-borde: 12px;
}

/* 2. Variables Locales (solo accesibles dentro de este bloque y sus hijos) */
.tarjeta-especial {
  --color-primario: #d32f2f; /* Sobrescribe la variable solo para esta tarjeta */
  border: 2px solid var(--color-primario);
}

/* 3. Valor por defecto de respaldo (Fallback) */
/* Si --color-acento no está definida, toma #1972b9 */
.boton {
  background-color: var(--color-acento, #1972b9);
}

/* 4. Modo Oscuro con Variables en 5 líneas */
body.modo-oscuro {
  --color-primario: #38bdf8;
  --color-fondo: #0f172a;
  --color-texto: #f8fafc;
  /* ¡Al cambiar la clase en el body, toda la web cambia de tema automáticamente! */
}
```

---

## 7. CONDICIONALES EN CSS: EL "IF / ELSE" DE LAS HOJAS DE ESTILO

Aunque CSS es un lenguaje declarativo y no tiene `if / else` como Java o Python, dispone de **mecanismos condicionales nativos muy potentes**:

### 7.1. `@media`: El condicional de pantalla (If Viewport / Device)
Equivale a: `if (ancho <= 768px) { columna; } else { fila; }`
```css
/* Bloque base (ELSE) */
.contenedor {
  display: flex;
  flex-direction: row;
}

/* Condicional (IF) */
@media (max-width: 768px) {
  .contenedor {
    flex-direction: column;
  }
}
```

### 7.2. `@supports`: El condicional de compatibilidad (If Browser Supports)
Equivale a: `if (navegador soporta display: grid) { usa grid; } else { usa float/flex; }`
```css
/* Fallback básico */
.galeria { display: flex; flex-wrap: wrap; }

/* Condicional moderno */
@supports (display: grid) {
  .galeria {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
```

### 7.3. `:has()`: El condicional de hijos ("If Parent Has Child")
Es la pseudoclase más revolucionaria de CSS3 moderno. Permite estilizar a un padre **si contiene a un determinado hijo**:
```css
/* "Si la tarjeta tiene una imagen dentro, quítale el padding superior" */
.tarjeta:has(img) {
  padding-top: 0;
}

/* "Si el formulario contiene un input inválido, pon el borde del formulario en rojo" */
form:has(input:invalid) {
  border: 2px solid red;
}
```

### 7.4. `:not()`: El condicional de negación ("If NOT condition")
```css
/* Poner borde inferior a todos los elementos de la lista EXCEPTO al último */
li:not(:last-child) {
  border-bottom: 1px solid #ccc;
}
```

### 7.5. `:checked`: El condicional de estado ("If Checked")
Permite crear interruptores de tema, acordeones o menús hamburguesa sin JavaScript:
```css
/* Si el checkbox oculto está marcado, muestra el menú desplegable */
#menu-toggle:checked ~ .menu-navegacion {
  display: block;
}
```

---

## 8. SELECTORES AVANZADOS, PSEUDOCLASES Y FUNCIONES MATEMÁTICAS

### 8.1. Pseudoelementos `::before` y `::after`
Permiten insertar contenido cosmético antes o después del contenido del elemento sin tocar el HTML:
```css
/* Inserta un badge o icono antes del título */
.titulo-seccion::before {
  content: "⚡ "; /* Propiedad OBLIGATORIA para que se renderice */
  color: #f59e0b;
}
```

### 8.2. Pseudoclases de Posición (`:nth-child`)
* `:first-child`: El primer hijo.
* `:last-child`: El último hijo.
* `:nth-child(even)` o `:nth-child(2n)`: Filas pares (efecto cebra en tablas).
* `:nth-child(odd)` o `:nth-child(2n+1)`: Filas impares.
* `:nth-child(3)`: El tercer hijo exacto.

### 8.3. Funciones Matemáticas en CSS Moderno
* `calc()`: Operaciones matemáticas mixtas (`width: calc(100% - 40px);`).
* `min()` y `max()`: Elige el valor mínimo o máximo (`width: min(100%, 800px);`).
* `clamp(mínimo, preferido, máximo)`: **Tipografía responsive mágica sin media queries**.
  ```css
  /* El texto nunca medirá menos de 16px ni más de 32px, y fluctuará según el ancho de pantalla */
  font-size: clamp(1rem, 2.5vw, 2rem);
  ```

---

## 9. MEDIA QUERIES Y RESPONSIVE WEB DESIGN

```html
<!-- En el <head> para que el móvil no renderice con zoom alejado -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

* **Desktop-First:** Se definen estilos para pantallas grandes y se adaptan a móviles con `@media (max-width: 768px)`.
* **Mobile-First:** Se definen estilos para pantallas móviles y se expanden con `@media (min-width: 768px)`.

---

## 10. FLEXBOX EN PROFUNDIDAD (1D - UNIDIMENSIONAL)

### 10.1. Propiedades del Contenedor Padre
```css
.contenedor-flex {
  display: flex;
  flex-direction: row;        /* row | row-reverse | column | column-reverse */
  justify-content: center;    /* flex-start | center | flex-end | space-between | space-around | space-evenly */
  align-items: center;        /* stretch | center | flex-start | flex-end | baseline */
  flex-wrap: wrap;            /* nowrap | wrap */
  gap: 15px;                  /* Espacio uniforme entre hijos */
}
```

### 10.2. Propiedades de los Hijos Flexibles
```css
.hijo-flex {
  flex: 1;                    /* Atajo: grow: 1, shrink: 1, basis: 0% */
  align-self: flex-end;       /* Sobrescribe el align-items del padre solo para este hijo */
  order: 2;                   /* Altera el orden visual sin cambiar el HTML */
}
```

---

## 11. CSS GRID EN PROFUNDIDAD (2D - BIDIMENSIONAL)

### 11.1. Propiedades del Contenedor Grid
```css
.contenedor-grid {
  display: grid;
  /* Cuadrícula responsiva que se adapta sin media queries */
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
```

### 11.2. Maquetación por Áreas Nombradas
```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer  footer";
  gap: 10px;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

---

## 12. ANÁLISIS TÉCNICO DEL EJERCICIO: CV DE SON GOKU

* **Layout a dos columnas:** `.contenedor { display: flex; }` con `.parte-izquierda { flex: 1; }` (~25%) y `.parte-derecha { flex: 3; }` (~75%).
* **Barras de Ki:** Carril `.barra-fondo { width: 100%; overflow: hidden; }` y relleno `.barra-progreso { width: 80%; }`.
* **Chips de técnicas:** `.tecnicas-clave-grid { display: flex; flex-wrap: wrap; gap: 10px; }` con `border-radius: 50px`.
* **Tabla de resultados:** `border-collapse: collapse;` y `.tabla-resultados { overflow-x: auto; }` para scroll horizontal en pantallas estrechas.
* **Media Query:** `@media (max-width: 768px)` convierte el contenedor a `flex-direction: column;` y resetea las columnas a `width: 100%; flex: none;`.

---

## 13. BATERÍA DE EJERCICIOS PRÁCTICOS RESUELTOS

* **Ejercicio 1:** Barra de navegación flexible con `space-between` y apilamiento en móvil.
* **Ejercicio 2:** Centrado absoluto con `display: flex; justify-content: center; align-items: center;`.
* **Ejercicio 3:** Catálogo de tarjetas adaptativas con `repeat(auto-fit, minmax(200px, 1fr))`.
* **Ejercicio 4:** Insignia flotante con `position: relative` (padre) y `position: absolute` (hijo).
* **Ejercicio 5:** Cambio de tema instantáneo con variables `:root` y clase `.modo-oscuro`.
