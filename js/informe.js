/* INFORME.JS — pestañas de lectura del informe y el texto argumentativo */
(() => {
  'use strict';
  const root = document.getElementById('informe-app'); if (!root) return;
  const tabs = [...root.querySelectorAll('[role=tab]')];
  tabs.forEach(t => t.addEventListener('click', () => tabs.forEach(x => {
    const on = x === t; x.setAttribute('aria-selected', on);
    document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
  })));
})();
