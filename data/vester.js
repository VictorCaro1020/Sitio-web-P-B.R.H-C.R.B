/* ==========================================================
   DATOS DE LA MATRIZ DE VESTER — única fuente de verdad.
   Fila i = influencia de la problemática i sobre la columna j (escala 0-3).
   Influencia (suma de fila) y dependencia (suma de columna) se calculan en js/vester.js.
   Clasificación según el "Resumen de la clasificación" del proyecto.
   ========================================================== */
window.VESTER = {
  corte: { x: 7.5, y: 11 }, // líneas vertical (influencia) y horizontal (dependencia) del gráfico
  clases: {
    critico:     { nombre: 'Crítica',      color: '#b5432c', texto: 'La única crítica: es donde termina buena parte de la contaminación orgánica del río y lo que desencadena la pérdida casi total de vida acuática.' },
    activo:      { nombre: 'Activas',      color: '#a8651a', texto: 'Causas raíz de todo lo demás: no dependen mucho de otros problemas, pero sí los generan.' },
    pasivo:      { nombre: 'Pasivas',      color: '#277a4d', texto: 'Grandes consecuencias del mal uso del río, no su origen. Que la quiebra hídrica sea pasiva lo confirma.' },
    indiferente: { nombre: 'Indiferentes', color: '#1f78ad', texto: 'Su relación de causa y efecto con el resto del sistema resultó más débil.' }
  },
  problemas: [
    { id: 'P1',  clase: 'activo',      corto: 'Aguas residuales domésticas',  nombre: 'Vertimiento de aguas residuales domésticas (ARD) de Bogotá', desc: 'Es el principal detonante: aporta enormes cantidades de materia orgánica y coliformes al botar aguas negras sin tratar.' },
    { id: 'P2',  clase: 'activo',      corto: 'Aguas residuales industriales', nombre: 'Vertimiento de aguas residuales industriales (ARI) de Bogotá', desc: 'Además de materia orgánica, inyecta químicos y metales pesados al río que son difíciles de procesar.' },
    { id: 'P3',  clase: 'activo',      corto: 'Curtiembres de Villapinzón',    nombre: 'Vertimientos de curtiembres en Villapinzón (cromo y metales pesados)', desc: 'Demuestra que el daño empieza desde el nacimiento del río, siendo la fuente directa de metales pesados como el cromo.' },
    { id: 'P4',  clase: 'activo',      corto: 'Afluentes tributarios',         nombre: 'Contaminación aportada por afluentes tributarios (Juan Amarillo, Fucha, Tunjuelo)', desc: 'Estos ríos suman más cargas contaminantes, acumulando el daño a lo largo del trayecto.' },
    { id: 'P5',  clase: 'indiferente', corto: 'Coliformes fecales',            nombre: 'Coliformes fecales y contaminación bacteriológica extrema', desc: 'Llegan a 23 millones por 100 ml cuando el límite seguro es 200: muestra la gravedad bacteriológica.' },
    { id: 'P6',  clase: 'critico',     corto: 'Anoxia (sin oxígeno)',          nombre: 'Agotamiento del oxígeno disuelto (anoxia)', desc: 'Es el problema central y más crítico. El oxígeno llega casi a cero, haciendo imposible cualquier forma de vida acuática y conectando las causas con sus graves consecuencias.' },
    { id: 'P7',  clase: 'activo',      corto: 'DBO₅ elevada',                  nombre: 'DBO₅ elevada (alta demanda bioquímica de oxígeno)', desc: 'Es el mecanismo que explica la anoxia: la carga orgánica es tan alta que las bacterias consumen todo el oxígeno disponible.' },
    { id: 'P8',  clase: 'pasivo',      corto: 'Pérdida de autodepuración',     nombre: 'Pérdida de la capacidad de autodepuración (índice ICOMO alto)', desc: 'Con un índice ICOMO alto, el río ya no puede limpiarse solo. Aunque cese la contaminación hoy, su recuperación no será inmediata.' },
    { id: 'P9',  clase: 'indiferente', corto: 'Metales en sedimentos',         nombre: 'Acumulación de metales pesados en los sedimentos', desc: 'Representa el daño generacional: esta toxicidad perdurará por décadas en el fondo del río.' },
    { id: 'P10', clase: 'pasivo',      corto: 'Especies nativas',              nombre: 'Desaparición de especies nativas (capitán, guapucha)', desc: 'Es el rostro visible de la contaminación: la pérdida de fauna propia de nuestro ecosistema.' },
    { id: 'P11', clase: 'indiferente', corto: 'Pérdida de humedales',          nombre: 'Pérdida de humedales por urbanización descontrolada', desc: 'El crecimiento descontrolado nos quita los filtros naturales que podrían ayudar a mitigar el daño del río.' },
    { id: 'P12', clase: 'indiferente', corto: 'Aumento de sequías',            nombre: 'Aumento de las sequías por cambio climático', desc: 'Menos agua limpia disponible justo cuando más se necesita en una emergencia.' },
    { id: 'P13', clase: 'pasivo',      corto: 'Quiebra hídrica',               nombre: 'Quiebra hídrica: río inutilizable como fuente de agua potable', desc: 'Es la gran consecuencia final: tener un río caudaloso pero cuya agua no se puede usar para nada.' }
  ],
  matriz: [
    [0,0,0,2,3,2,3,2,0,1,0,0,2], // P1
    [0,0,0,2,0,2,2,2,3,1,0,0,2], // P2
    [0,0,0,0,0,1,1,1,3,1,0,0,1], // P3
    [0,0,0,0,3,2,2,2,1,1,0,0,1], // P4
    [0,0,0,0,0,1,0,1,0,1,0,0,2], // P5
    [0,0,0,0,0,0,0,2,1,3,0,0,2], // P6
    [0,0,0,0,0,3,0,2,0,1,0,0,2], // P7
    [0,0,0,0,0,1,0,0,1,1,0,0,2], // P8
    [0,0,0,0,0,0,0,0,0,2,0,0,3], // P9
    [0,0,0,0,0,0,0,0,0,0,0,0,1], // P10
    [0,0,0,0,0,0,0,2,0,1,0,0,1], // P11
    [0,0,0,0,0,2,0,2,0,0,0,0,3], // P12
    [0,0,0,0,0,0,0,0,0,0,0,0,0]  // P13
  ]
};
