/* EQUIPO.JS — carrusel: en cada diapositiva la persona pasa a la izquierda, las demás se desvanecen y su información entra por la derecha */
(() => {
  'use strict';
  const D = window.EQUIPO, app = document.getElementById('equipo-app'); if (!D || !app) return;
  const st = app.querySelector('#eq-stage'), dots = app.querySelector('#eq-dots'), live = app.querySelector('#eq-live'), I = D.integrantes, N = I.length + 1;
  let s = 0;
  st.innerHTML = I.map((p, k) => `<figure class="persona" data-k="${k + 1}" style="--gx:${p.pos[0]}%;--gw:${p.pos[1]}%"><img src="${p.foto}" alt="${p.nombre}" draggable="false"><figcaption>${p.corto}</figcaption></figure>`).join('') +
    `<div class="eq-info grupo" data-k="0"><h3>${D.grupo.titulo}</h3><p>${D.grupo.texto}</p></div>` +
    I.map((p, k) => `<div class="eq-info" data-k="${k + 1}"><span class="kicker">Integrante ${k + 1} de ${I.length}</span><h3>${p.nombre}</h3><ul class="roles">${p.roles.map(r => `<li>${r}</li>`).join('')}</ul></div>`).join('');
  dots.innerHTML = Array.from({ length: N }, (_, k) => `<button data-k="${k}" aria-label="${k ? I[k - 1].corto : 'Foto grupal'}"></button>`).join('');
  function go(n) {
    s = (n + N) % N; st.dataset.s = s;
    st.querySelectorAll('.persona').forEach(el => { const k = +el.dataset.k; el.classList.toggle('is-focus', k === s); el.classList.toggle('is-hidden', s !== 0 && k !== s); });
    st.querySelectorAll('.eq-info').forEach(el => { const on = +el.dataset.k === s; el.classList.toggle('on', on); el.setAttribute('aria-hidden', !on); });
    dots.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-current', k === s));
    live.textContent = s ? `${I[s - 1].nombre}: ${I[s - 1].roles.join(', ')}` : 'Foto grupal del equipo';
  }
  app.querySelector('#eq-prev').onclick = () => go(s - 1); app.querySelector('#eq-next').onclick = () => go(s + 1);
  dots.onclick = e => { const b = e.target.closest('button'); if (b) go(+b.dataset.k); };
  app.addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(s + 1); if (e.key === 'ArrowLeft') go(s - 1); });
  let x0 = null; st.addEventListener('pointerdown', e => x0 = e.clientX);
  st.addEventListener('pointerup', e => { if (x0 !== null && Math.abs(e.clientX - x0) > 40) go(s + (e.clientX < x0 ? 1 : -1)); x0 = null; });
  go(0);
})();
