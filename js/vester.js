/* ==========================================================
   VESTER.JS — matriz, gráfico de cuadrantes, árbol y panel de detalle
   ========================================================== */
(() => {
  'use strict';
  const V = window.VESTER, root = document.getElementById('vester');
  if (!V || !root) return;
  const $ = (s, r = root) => r.querySelector(s);

  /* 1. Cálculos: influencia = suma de fila; dependencia = suma de columna */
  V.problemas.forEach((p, i) => {
    p.i = i;
    p.influencia = V.matriz[i].reduce((a, b) => a + b, 0);
    p.dependencia = V.matriz.reduce((a, r) => a + r[i], 0);
  });
  const total = V.problemas.reduce((a, p) => a + p.influencia, 0);
  const color = p => V.clases[p.clase].color;
  let filtro = null;

  /* 2. Tarjetas-resumen (también filtran) */
  Object.entries(V.clases).forEach(([k, c]) => {
    const ids = V.problemas.filter(p => p.clase === k).map(p => p.id).join(' · ');
    const b = document.createElement('button');
    b.className = 'card-clase'; b.dataset.k = k; b.style.setProperty('--c', c.color);
    b.innerHTML = `<strong>${c.nombre}</strong><small>${ids}</small><p>${c.texto}</p>`;
    $('#resumen').append(b);
  });

  /* 3. Matriz */
  let h = '<caption class="sr-only">Matriz de Vester: influencia de cada problemática sobre las demás, en escala de 0 a 3</caption><thead><tr><th>Variable</th>' + V.problemas.map(p => `<th>${p.id}</th>`).join('') + '<th>Influencia</th></tr></thead><tbody>';
  V.problemas.forEach((p, i) => {
    h += `<tr data-clase="${p.clase}"><th scope="row"><button class="rowbtn" data-p="${p.id}"><i style="background:${color(p)}"></i>${p.id} · ${p.corto}</button></th>` +
      V.matriz[i].map((v, j) => `<td class="v${v}" data-r="${i}" data-c="${j}">${v}</td>`).join('') + `<td class="tot">${p.influencia}</td></tr>`;
  });
  h += '</tbody><tfoot><tr><th>Dependencia</th>' + V.problemas.map(p => `<td class="tot">${p.dependencia}</td>`).join('') + `<td class="tot">${total}</td></tr></tfoot>`;
  $('#tabla').innerHTML = h;
  const cells = [...$('#tabla').querySelectorAll('td[data-r]')];
  $('#tabla').addEventListener('mouseover', e => {
    const td = e.target.closest('td[data-r]'); if (!td) return;
    cells.forEach(c => c.classList.toggle('hl', c.dataset.r === td.dataset.r || c.dataset.c === td.dataset.c));
  });
  $('#tabla').addEventListener('mouseleave', () => cells.forEach(c => c.classList.remove('hl')));

  /* 4. Gráfico de cuadrantes (SVG) */
  (() => {
    const W = 640, H = 450, m = { l: 46, r: 14, t: 14, b: 46 }, pw = W - m.l - m.r, ph = H - m.t - m.b, X = 16, Y0 = -1.5, Y1 = 24;
    const sx = x => m.l + x / X * pw, sy = y => m.t + (Y1 - y) / (Y1 - Y0) * ph;
    const cx = sx(V.corte.x), cy = sy(V.corte.y), K = V.clases;
    const rect = (x, y, w, hh, c) => `<rect x="${x}" y="${y}" width="${w}" height="${hh}" fill="${c}" opacity=".13"/>`;
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfico de cuadrantes: influencia contra dependencia">`;
    s += rect(m.l, m.t, cx - m.l, cy - m.t, K.pasivo.color) + rect(cx, m.t, W - m.r - cx, cy - m.t, K.critico.color) +
         rect(m.l, cy, cx - m.l, H - m.b - cy, K.indiferente.color) + rect(cx, cy, W - m.r - cx, H - m.b - cy, K.activo.color);
    for (let x = 0; x <= X; x += 2) s += `<text x="${sx(x)}" y="${H - m.b + 18}" text-anchor="middle" class="tk">${x}</text>`;
    for (let y = 0; y <= Y1; y += 4) s += `<text x="${m.l - 8}" y="${sy(y) + 4}" text-anchor="end" class="tk">${y}</text><line x1="${m.l}" x2="${W - m.r}" y1="${sy(y)}" y2="${sy(y)}" class="gr"/>`;
    s += `<line x1="${cx}" x2="${cx}" y1="${m.t}" y2="${H - m.b}" class="cut"/><line x1="${m.l}" x2="${W - m.r}" y1="${cy}" y2="${cy}" class="cut"/>`;
    s += `<text x="${m.l + 16}" y="${m.t + 26}" class="ql">PASIVOS</text><text x="${W - m.r - 8}" y="${m.t + 26}" text-anchor="end" class="ql">CRÍTICOS</text>` +
         `<text x="${m.l + 16}" y="${cy + 24}" class="ql">INDIFERENTES</text><text x="${W - m.r - 8}" y="${cy + 24}" text-anchor="end" class="ql">ACTIVOS</text>`;
    s += `<text x="${m.l + pw / 2}" y="${H - 6}" text-anchor="middle" class="ax">Influencia / causalidad →</text><text transform="translate(12 ${m.t + ph / 2}) rotate(-90)" text-anchor="middle" class="ax">Dependencia / consecuencia →</text>`;
    V.problemas.forEach(p => {
      s += `<g class="punto" data-p="${p.id}" data-clase="${p.clase}" tabindex="0" role="button" aria-label="${p.id} ${p.corto}"><circle cx="${sx(p.influencia)}" cy="${sy(p.dependencia)}" r="14" fill="${color(p)}"/><text x="${sx(p.influencia)}" y="${sy(p.dependencia) + 4}" text-anchor="middle">${p.id.slice(1)}</text></g>`;
    });
    $('#grafico').innerHTML = s + '</svg>';
  })();

  /* 5. Árbol de problemas: copa = pasivos/indiferentes, tronco = crítica, raíces = activas */
  const nodo = p => `<button class="nodo" data-p="${p.id}" data-clase="${p.clase}" style="--c:${color(p)}"><b>${p.id}</b><span>${p.corto}</span><small>I ${p.influencia} · D ${p.dependencia}</small></button>`;
  const grupo = k => V.problemas.filter(p => p.clase === k).map(nodo).join('');
  $('#arbol').innerHTML = `<div class="copa"><div><h4>Pasivos · consecuencias</h4>${grupo('pasivo')}</div><div><h4>Indiferentes</h4>${grupo('indiferente')}</div></div>` +
    `<div class="tronco"><h4>Problema central · tronco</h4>${grupo('critico')}</div><div class="raices"><h4>Raíces · causas activas</h4>${grupo('activo')}</div>`;

  /* 6. Panel de detalle */
  function detalle(id) {
    const p = V.problemas.find(x => x.id === id); if (!p) return;
    root.querySelectorAll('[data-p]').forEach(el => el.classList.toggle('is-sel', el.dataset.p === id));
    const chips = a => a.length ? a.map(x => `<button class="chip" data-p="${x.p.id}">${x.p.id}<i>${x.v}</i></button>`).join('') : '<em>ninguna</em>';
    const infl = V.matriz[p.i].map((v, j) => v ? { p: V.problemas[j], v } : null).filter(Boolean);
    const dep = V.matriz.map((r, i) => r[p.i] ? { p: V.problemas[i], v: r[p.i] } : null).filter(Boolean);
    $('#detalle').innerHTML = `<span class="badge" style="--c:${color(p)}">${V.clases[p.clase].nombre}</span><h3>${p.id} · ${p.nombre}</h3><p>${p.desc}</p>` +
      `<div class="metrics"><div><b>${p.influencia}</b> influencia</div><div><b>${p.dependencia}</b> dependencia</div></div>` +
      `<p class="rel"><strong>Influye en:</strong> ${chips(infl)}</p><p class="rel"><strong>Depende de:</strong> ${chips(dep)}</p>`;
  }
  root.addEventListener('click', e => {
    const t = e.target.closest('.rowbtn, .nodo, .punto, .chip'); if (t) return detalle(t.dataset.p);
    const c = e.target.closest('.card-clase'); if (c) setFiltro(filtro === c.dataset.k ? null : c.dataset.k);
  });
  root.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('.punto')) detalle(e.target.dataset.p); });

  /* 7. Filtro por clase */
  function setFiltro(k) {
    filtro = k;
    root.querySelectorAll('[data-clase]').forEach(el => el.classList.toggle('is-dim', !!k && el.dataset.clase !== k));
    root.querySelectorAll('.card-clase').forEach(c => c.classList.toggle('is-on', c.dataset.k === k));
  }

  /* 8. Pestañas */
  const tabs = [...root.querySelectorAll('[role=tab]')];
  tabs.forEach(t => t.addEventListener('click', () => tabs.forEach(x => {
    const on = x === t; x.setAttribute('aria-selected', on);
    document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
  })));

  detalle('P6');
})();
