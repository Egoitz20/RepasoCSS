# Currículum Vitae — Son Goku

Proyecto de maquetación web responsive que recrea el Currículum Vitae de **Son Goku**, desarrollado con **HTML5 semántico** y **CSS3 moderno**.

---

## Descripción del Proyecto

Este proyecto consiste en la creación de una página web curricular temática basada en el universo de *Dragon Ball*. El objetivo principal es aplicar buenas prácticas de maquetación web, jerarquía visual, uso avanzado de **Flexbox**, **Custom Properties (Variables CSS)** y adaptación multiplataforma mediante **Media Queries**.

---

## Características Principales

- **Estructura Semántica en HTML5:** Uso de etiquetas semánticas (`<header>`, `<section>`, `<div>`, `<table>`, listas, etc.) para una correcta accesibilidad y orden estructural.
- **Diseño con CSS Flexbox:** Distribución modular en dos columnas principales (barra lateral y contenido principal), alineación de cabeceras, tarjetas de formación y cuadrículas de etiquetas.
- **Sistema de Variables CSS (`:root`):** Paleta de colores unificada y medidas reutilizables (radios, espaciados y estados de color) para facilitar el mantenimiento y la consistencia del diseño.
- **Barras de Progreso Personalizadas:** Visualización de nivel de competencias (*Ki*, *Artes marciales*, *Velocidad*...) mediante barras con degradados y bordes redondeados.
- **Etiquetas y Píldoras (Chips):** Estilización de técnicas de combate y reconocimientos con bordes ovalados (`border-radius: var(--radio-pildora)`).
- **Tabla de Combates Destacados:** Tabla estilizada con cabecera diferenciada, esquinas redondeadas (`overflow: hidden`) y clases condicionales de resultado (*Victoria*, *Derrota*, *Decisivo*).
- **Diseño Responsive (Móvil y Escritorio):** Adaptación completa para dispositivos móviles (`@media (max-width: 768px)`), reorganizando las columnas en un flujo vertical limpio y optimizando tipografías y espaciados.

---

## Estructura del Proyecto

```text
Son_Goku_CV/
├── index.html              # Documento HTML principal con el contenido del CV
├── styles/
│   └── styles.css          # Hoja de estilos organizada por bloques temáticos
├── images/
│   ├── goku-avatar.jpg     # Foto de perfil de Son Goku
│   └── mountain.png        # Imagen de fondo para la cabecera de escritorio
├── examples/               # Diseños y modelos de referencia en PDF
└── README.md               # Documentación del proyecto
```
---

## Tecnologías Utilizadas

- **HTML5:** Marcado estructurado y semántico.
- **CSS3:**
  - Modelo de caja (`box-sizing: border-box`).
  - Flexbox (`flex`, `flex-direction`, `justify-content`, `align-items`, `gap`).
  - Variables CSS (`--color-azul-oscuro`, `--radio-tarjetas`, etc.).
  - Media Queries (`@media (max-width: 768px)`).

---

## Visualización Local

Para visualizar el proyecto en tu equipo:

1. Clona o descarga este repositorio:
   ```bash
   git clone https://github.com/Egoitz20/Son_Goku_CV.git
   ```
2. Entra en el directorio del proyecto:
   ```bash
   cd Son_Goku_CV
   ```
3. Abre el archivo `index.html` en tu navegador web habitual (o utiliza la extensión **Live Server** en VS Code).

---

## Vista Responsive

- **Pantallas grandes (> 768px):** Distribución a dos columnas, cabecera con imagen escénica, tarjetas de entrenamiento en fila horizontal de 4 columnas.
- **Pantallas pequeñas (≤ 768px):** Disposición en una sola columna vertical, cabecera adaptada con fondo claro para máxima legibilidad y tarjetas apiladas.
