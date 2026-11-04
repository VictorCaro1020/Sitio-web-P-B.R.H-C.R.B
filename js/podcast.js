/* PODCAST.JS — reproductor listo para episodios; sin episodios muestra "Próximamente" */
(() => {
  'use strict';
  const D = window.PODCAST, app = document.getElementById('podcast-app');
  if (!D || !app) return;
  const eps = D.episodios || [], soon = !eps.length, audio = new Audio(), rates = [1, 1.25, 1.5, 0.75];
  let cur = 0, r = 0;
  app.innerHTML = `<div class="pod"><div class="pod-cover"><img src="assets/img/logo-crb-g1.png" alt=""><div class="eq" aria-hidden="true">${[1,2,3,4,5,6,7].map(n => `<i style="--n:${n}"></i>`).join('')}</div></div>
    <div class="pod-main">${soon ? '<span class="soon">Próximamente</span>' : ''}<h3 id="p-t"></h3><p id="p-d"></p>
    <input type="range" id="p-seek" min="0" max="100" value="0" step="0.1" aria-label="Progreso del episodio" ${soon ? 'disabled' : ''}>
    <div class="pod-time"><span id="p-c">0:00</span><span id="p-l">0:00</span></div>
    <div class="pod-ctrl"><button id="p-b" aria-label="Retroceder 15 segundos">−15</button><button id="p-p" class="play" aria-label="Reproducir">▶</button><button id="p-f" aria-label="Adelantar 15 segundos">+15</button><button id="p-r" aria-label="Velocidad">1×</button></div></div></div>
    <ol class="pod-list" id="p-list"></ol>`;
  const $ = s => app.querySelector(s), fmt = s => isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '0:00';
  const ctrl = ['#p-b', '#p-p', '#p-f', '#p-r'].map($);
  if (soon) {
    ctrl.forEach(b => b.disabled = true);
    $('#p-t').textContent = 'Nuevo podcast en preparación';
    $('#p-d').textContent = 'Muy pronto podrás escuchar aquí los episodios del proyecto sobre el río Bogotá.';
    $('#p-list').remove();
    return;
  }
  if (eps.length < 2) $('#p-list').hidden = true;
  const load = k => {
    cur = k; const e = eps[k]; audio.src = e.archivo; audio.playbackRate = rates[r];
    $('#p-t').textContent = e.titulo; $('#p-d').textContent = e.descripcion || '';
    $('#p-list').querySelectorAll('li').forEach((li, j) => li.classList.toggle('on', j === k));
  };
  $('#p-list').innerHTML = eps.map((e, k) => `<li><button data-k="${k}"><b>${k + 1}</b><span>${e.titulo}</span></button></li>`).join('');
  $('#p-list').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { load(+b.dataset.k); audio.play(); } });
  $('#p-p').onclick = () => audio.paused ? audio.play() : audio.pause();
  $('#p-b').onclick = () => audio.currentTime -= 15; $('#p-f').onclick = () => audio.currentTime += 15;
  $('#p-r').onclick = () => { r = (r + 1) % rates.length; audio.playbackRate = rates[r]; $('#p-r').textContent = rates[r] + '×'; };
  $('#p-seek').oninput = e => audio.currentTime = audio.duration * e.target.value / 100;
  audio.onplay = audio.onpause = () => { const p = !audio.paused; app.classList.toggle('playing', p); $('#p-p').textContent = p ? '❚❚' : '▶'; $('#p-p').setAttribute('aria-label', p ? 'Pausar' : 'Reproducir'); };
  audio.ontimeupdate = () => { $('#p-seek').value = audio.duration ? audio.currentTime / audio.duration * 100 : 0; $('#p-c').textContent = fmt(audio.currentTime); };
  audio.onloadedmetadata = () => $('#p-l').textContent = fmt(audio.duration);
  audio.onended = () => { if (cur < eps.length - 1) { load(cur + 1); audio.play(); } };
  load(0);
})();
