/* ==========================================================
   REGISTRO DE CAMPO — salida al río Bogotá (sector Bilbao), 23 de septiembre
   Fuente: formulario Epicollect5. Se omiten nombres de grupo, integrantes y curso.
   Solo las tarjetas con campo "fotos" intentan mostrarlas; si una foto da error se oculta sola.
   ========================================================== */
(() => {
  const BASE = 'https://five.epicollect.net/api/media/rio-bogota-23-septiembre?type=photo&format=entry_original&name=7ea85e18-f3f6-4522-beee-db575c9ca56f_';
  const f = (...ids) => ids.map(id => `${BASE}${id}.jpg&v=1790263169`);
  window.CAMPO = {
    fecha: '23 de septiembre de 2026',
    puntos: [
      { nombre: 'Fondaje', lat: 4.748339, lng: -74.115533, temp: 30,
        texto: 'Zona agrícola con vertimientos, basura y contaminación. El agua está en estado mesotrófico y contiene azufre, lo que causa el mal olor.' },
      { nombre: 'Hatillo del río', lat: 4.74825, lng: -74.115751, temp: 23,
        texto: 'El río está dividido por una cota y hay huertas, una de ellas llamada Ana María. Los barrios cercanos aportan basuras; se observan algas, cambuches, consumo de sustancias, robos y vegetación seca con riesgo de incendio, además de afectaciones por el fenómeno del Niño. Aunque se hizo una limpieza, aún hay vertimientos de basura dentro y fuera del río. El grupo asocia los 23 °C con una isla de calor.' },
      { nombre: 'Huertas de Bilbao', lat: 4.74825, lng: -74.115751, temp: null,
        texto: 'Varias huertas con variedad de plantas, insectos como la mariposa, animales como el renacuajo y vegetales como la lechuga: una muestra de lo que el río aún sostiene.' }
    ],
    observaciones: [
      { titulo: 'Viviendas y ronda', texto: 'Las viviendas cercanas son la fuente principal de contaminación: hay escombros, basura y material de reciclaje fuera de las casas y cerca del río.', tags: ['Efecto observado: pérdida de vegetación'] },
      { titulo: 'Descargas y conexiones', texto: 'Se contaron 2 descargas. Los vertimientos salen de las viviendas con aguas residuales contaminadas. Las conexiones erradas no se pudieron verificar.', tags: ['2 descargas'], vester: ['P1'],
        video: 'https://five.epicollect.net/api/media/rio-bogota-23-septiembre?type=video&format=video&name=7ea85e18-f3f6-4522-beee-db575c9ca56f_1790261998.mp4&v=1790263169' },
      { titulo: 'Problemáticas en la ronda', texto: 'Según el grupo, son muy frecuentes en la zona y es lo que contamina el río.', tags: ['Vertimientos domésticos', 'Basuras y escombros', 'Delincuencia o inseguridad'], vester: ['P1'], fotos: f(1790262161, 1790262173) },
      { titulo: 'Espejo de agua', texto: 'El agua tenía un color café oscuro y un olor fuerte y desagradable.', tags: ['Marcado: mesotrófico', 'Color café o gris oscuro'], fotos: f(1790262422),
        nota: 'Nota de lectura: el estado marcado fue mesotrófico (olor leve), pero el color y el olor descritos sugieren una condición más severa.' },
      { titulo: 'Biodiversidad', texto: 'Cantidad aproximada observada: 3 individuos.', tags: ['Aves', 'Insectos', 'Árboles y arbustos de la ronda'], fotos: f(1790262505, 1790262515) },
      { titulo: 'Dinámicas sociales', texto: 'Son una fuente principal de contaminación diaria.', tags: ['Vivienda y comunidad', 'Reciclaje o recolección informal', 'Personas que permanecen en la ronda'], fotos: f(1790262632, 1790262661) }
    ],
    cita: 'Nos llamó la atención cómo está contaminado el río y lo que pasa a su alrededor.'
  };
})();
