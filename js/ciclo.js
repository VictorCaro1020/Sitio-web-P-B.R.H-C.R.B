/* CICLO.JS — recorrido por las 5 etapas con foco sobre el esquema */
(() => {
  'use strict';
  const C = window.CICLO, V = window.VESTER, app = document.getElementById('ciclo-app');
  if (!C || !app) return;
  const $ = s => app.querySelector(s), E = C.etapas;
  const nav = $('#ciclo-nav'), card = $('#ciclo-card'), spot = $('#spot'), prev = $('#prev'), next = $('#next');
  let i = 0;
  nav.innerHTML = E.map((e, k) => `<button role="tab" data-k="${k}"><b>${e.n}</b><span>${e.corto}</span></button>`).join('');
  function show(k) {
    i = Math.max(0, Math.min(E.length - 1, k)); const e = E[i];
    ['x', 'y', 'w', 'h'].forEach((p, j) => spot.style.setProperty('--' + p, e.region[j] + '%'));
    nav.querySelectorAll('button').forEach((b, j) => { b.setAttribute('aria-selected', j === i); b.classList.toggle('done', j < i); });
    const chips = e.problemas.map(id => { const p = V && V.problemas.find(x => x.id === id); return p ? `<a class="chip-p" href="#diagnostico" style="--c:${V.clases[p.clase].color}">${p.id} · ${p.corto}</a>` : ''; }).join('');
    card.innerHTML = `<span class="kicker">Etapa ${e.n} de ${E.length}</span><h3>${e.titulo}</h3><p>${e.texto}</p>${chips ? `<div class="chips-p"><small>Problemáticas relacionadas</small>${chips}</div>` : ''}`;
    card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap');
    prev.disabled = i === 0; next.disabled = i === E.length - 1;
  }
  nav.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(+b.dataset.k); });
  prev.onclick = () => show(i - 1); next.onclick = () => show(i + 1);
  show(0);
})();
