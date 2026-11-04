/* CAMPO.JS — puntos de observación y tarjetas de la salida al río (sin fotos en los puntos ni mapa) */
(() => {
  'use strict';
  const D = window.CAMPO, V = window.VESTER, root = document.getElementById('campo-app');
  if (!D || !root) return;
  /* Las fotos nacen ocultas y solo se muestran si cargan: así no quedan huecos ni imágenes rotas */
  const fotos = a => a && a.length ? `<div class="fotos" hidden>${a.map(u => `<a href="${u}" target="_blank" rel="noopener" hidden><img src="${u}" alt="Foto del registro de campo"></a>`).join('')}</div>` : '';
  const tags = a => (a || []).map(t => `<span class="tag">${t}</span>`).join('');
  const pchip = ids => (ids || []).map(id => { const p = V && V.problemas.find(x => x.id === id); return p ? `<a class="chip-p" href="#diagnostico" style="--c:${V.clases[p.clase].color}">${p.id} · ${p.corto}</a>` : ''; }).join('');
  const temp = t => t ? `<div class="temp" title="${t} °C"><i style="width:${Math.round(t / 40 * 100)}%"></i><span>${t} °C</span></div>` : '';

  root.innerHTML = `<p class="fecha">Salida del ${D.fecha}</p>
    <ol class="linea">${D.puntos.map((p, k) => `<li class="reveal"><span class="num">${k + 1}</span><div class="punto-card"><h3>${p.nombre}</h3>${temp(p.temp)}<p>${p.texto}</p><p class="coord">${p.lat}, ${p.lng}</p></div></li>`).join('')}</ol>
    <h3 class="sub">Lo que observó el grupo</h3>
    <div class="obs-grid">${D.observaciones.map(o => `<article class="obs reveal"><h4>${o.titulo}</h4><p>${o.texto}</p><div>${tags(o.tags)}</div>${o.nota ? `<p class="nota">${o.nota}</p>` : ''}${fotos(o.fotos)}${o.video ? `<p><a href="${o.video}" target="_blank" rel="noopener">▶ Ver video del flujo</a></p>` : ''}${o.vester ? `<div class="chips-p"><small>Se conecta con la matriz</small>${pchip(o.vester)}</div>` : ''}</article>`).join('')}</div>
    <blockquote class="cita reveal">“${D.cita}”<cite>Observación del grupo de campo</cite></blockquote>`;

  const foto = e => {
    if (e.target.tagName !== 'IMG') return;
    const a = e.target.closest('a'); if (!a) return;
    if (e.type === 'error') a.remove(); else { a.hidden = false; a.parentElement.hidden = false; }
  };
  root.addEventListener('error', foto, true); root.addEventListener('load', foto, true);
})();
