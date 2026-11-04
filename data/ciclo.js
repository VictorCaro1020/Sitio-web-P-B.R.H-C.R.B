/* ==========================================================
   ETAPAS DEL CICLO HIDROLÓGICO ROTO
   region = zona del esquema que se resalta (x, y, ancho, alto en % de la imagen; ajustables)
   problemas = códigos de la Matriz de Vester relacionados
   ========================================================== */
window.CICLO = { etapas: [
  { n: 1, corto: 'Precipitación', titulo: 'Precipitación y escorrentía', region: [0, 8, 34, 60], problemas: [],
    texto: 'El río nace limpio. La lluvia cae sobre el páramo de Guacheneque y las laderas con vegetación nativa regulan el agua. Desde el nacimiento hasta Villapinzón, el agua es potable, rica en propiedades naturales y llena de vida.' },
  { n: 2, corto: 'Uso del agua', titulo: 'Uso del agua', region: [14, 27, 34, 46], problemas: [],
    texto: 'El río abastece el consumo humano de Bogotá y los municipios, el riego de la Sabana y la industria. Una parte del agua sale de la cuenca y el resto debería volver al río en buen estado.' },
  { n: 3, corto: 'Vertimiento', titulo: 'Vertimiento: el eslabón roto', region: [43, 12, 42, 50], problemas: ['P3', 'P4', 'P1', 'P2'],
    texto: 'En lugar de purificarse, el río recibe metales pesados de las curtiembres desde Villapinzón, la carga de afluentes como Juan Amarillo, Fucha y Tunjuelo, y descargas masivas de aguas residuales domésticas e industriales de Bogotá. Aquí se rompe el ciclo.' },
  { n: 4, corto: 'Colapso', titulo: 'Devolución al río y colapso', region: [29, 66, 33, 32], problemas: ['P7', 'P5', 'P6', 'P10'],
    texto: 'La materia orgánica eleva la DBO₅ y los coliformes. Las bacterias consumen todo el oxígeno (anoxia) y la vida acuática muere, incluidas especies nativas como el capitán y la guapucha.' },
  { n: 5, corto: 'Infiltración', titulo: 'Evapotranspiración e infiltración', region: [62, 16, 38, 82], problemas: ['P8', 'P9', 'P11', 'P12', 'P13'],
    texto: 'La cuenca degradada pierde su capacidad de autodepuración, los metales se acumulan en el fondo y el agua contaminada se infiltra hacia los acuíferos. Con sequías más fuertes, el río queda inutilizable: es la bancarrota hídrica.' }
] };
