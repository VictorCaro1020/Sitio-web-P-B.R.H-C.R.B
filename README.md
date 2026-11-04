# Bancarrota Hídrica · Contaminación del río Bogotá

Sitio web estático (HTML, CSS y JavaScript nativo, sin instalación ni frameworks).

## Cómo abrirlo
1. Descomprime la carpeta completa.
2. Haz doble clic en `index.html`. Se abre en tu navegador.
3. Con internet se cargan las fuentes (Google Fonts) y las fotos del registro de campo (Epicollect).

## Estructura
- `index.html` — la página completa, con las 7 secciones.
- `css/` — `tokens.css` (colores y fuentes), `base.css`, `components.css`, `sections.css`, `vester.css`, `ciclo-informe.css`, `campo-podcast.css`.
- `js/` — `main.js` (menú, animaciones), `vester.js`, `ciclo.js`, `informe.js`, `campo.js`, `podcast.js`.
- `data/` — `vester.js`, `ciclo.js`, `campo.js`, `podcast.js`: aquí se edita el contenido.
- `assets/img/` — logo, esquema del ciclo, infografía y las imágenes originales del Árbol y de la matriz (solo de referencia).

## Cómo cambiar el contenido
**Matriz de Vester:** abre `data/vester.js` y edita los números de `matriz` (escala 0 a 3, una fila por problemática). La influencia y la dependencia se recalculan solas. La clasificación de cada problemática está en el campo `clase`.

**Zonas resaltadas del ciclo:** en `data/ciclo.js`, el campo `region` de cada etapa son cuatro números: izquierda, arriba, ancho y alto, en porcentaje de la imagen.

**Fotos del registro de campo:** descárgalas de Epicollect, guárdalas en `assets/campo/` y cambia las direcciones en `data/campo.js` (por ejemplo `assets/campo/fondaje1.jpg`).

**Podcast:**
1. Copia el audio a `assets/audio/` (por ejemplo `ep1.mp3`).
2. En `data/podcast.js` agrega dentro de `episodios`: `{ titulo: 'Episodio 1', descripcion: 'De qué trata', archivo: 'assets/audio/ep1.mp3' }`.
3. Guarda y recarga: "Próximamente" desaparece y el reproductor queda activo.

**Colores y fuentes:** solo en `css/tokens.css`.

## Cómo publicarlo gratis
- **Netlify Drop:** entra a app.netlify.com/drop y arrastra la carpeta completa.
- **GitHub Pages:** sube la carpeta a un repositorio y activa Pages en Settings.

## Notas
- Las cifras de la Matriz de Vester provienen del Excel original `Matriz-De-Vester_v02`.
- El registro de campo no incluye nombres de estudiantes.

## Novedades de esta versión
- **Nuestro equipo:** edita nombres, roles y fotos en `data/equipo.js` (fotos en `assets/img/equipo/`).
- **Soluciones:** el texto está en `index.html` (sección `#soluciones`); la cadena P1-P4 → P7 → P6 se calcula con la matriz.
- **Descargas:** los archivos están en `assets/descargas/`. Si los cambias, conserva los nombres o actualiza los enlaces en `index.html`.
- **Registro de campo:** las fotos que no cargan se ocultan solas, sin dejar espacios.
- **Podcast:** sin episodios muestra solo "Próximamente"; con un episodio, el reproductor limpio; con varios, aparece la lista.

- **Podcast:** el episodio está en `assets/audio/podcast-bancarrota-hidrica.mp3` (comprimido a 96 kbps para que pese menos). Para cambiar título o descripción, edita `data/podcast.js`.
