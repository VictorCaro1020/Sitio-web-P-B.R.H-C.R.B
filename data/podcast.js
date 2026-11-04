/* ==========================================================
   PODCAST — lista de episodios (vacía = "Próximamente").
   Para agregar otro episodio, copia el audio a assets/audio/ y suma un objeto:
   { titulo: 'Título', descripcion: 'De qué trata…', archivo: 'assets/audio/nombre.mp3' }
   Con un solo episodio no se muestra lista; con dos o más, sí.
   ========================================================== */
window.PODCAST = {
  episodios: [
    {
      titulo: 'Un Rio, Un Hogar: Bancarrota Hídrica',
      descripcion: 'El equipo cuenta qué se hizo en el proyecto: el diagnóstico del río Bogotá, la Matriz de Vester, la salida de campo y las soluciones propuestas.',
      archivo: 'assets/audio/podcast-bancarrota-hidrica.mp3'
    }
  ]
};
