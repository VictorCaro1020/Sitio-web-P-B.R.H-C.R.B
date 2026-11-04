/* SOLUCIONES.JS — cadena causal P1-P4 → P7 → P6 con la fuerza de cada relación en la matriz */
(() => {
  'use strict';
  const V = window.VESTER, el = document.getElementById('cadena'); if (!V || !el) return;
  const ix = id => V.problemas.findIndex(p => p.id === id);
  const chip = (id, w) => { const p = V.problemas[ix(id)]; return `<a class="chip-p" href="#diagnostico" style="--c:${V.clases[p.clase].color}">${p.id} · ${p.corto}${w ? `<i>${w}</i>` : ''}</a>`; };
  el.innerHTML = `<div>${['P1', 'P2', 'P3', 'P4'].map(id => chip(id, V.matriz[ix(id)][ix('P7')])).join('')}</div><span aria-hidden="true">→</span><div>${chip('P7', V.matriz[ix('P7')][ix('P6')])}</div><span aria-hidden="true">→</span><div>${chip('P6')}</div>`;
})();
