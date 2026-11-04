/* ==========================================================
   MAIN.JS — comportamiento global: menú, revelado, enlace activo, contadores
   ========================================================== */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Menú móvil */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  nav?.addEventListener('click', e => { if (e.target.matches('a')) nav.classList.remove('is-open'); });

  /* 2. Revelado progresivo al hacer scroll */
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-visible'); obs.unobserve(en.target); } });
  }, { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

  /* 3. Enlace activo según la sección visible */
  const links = [...document.querySelectorAll('.nav a')];
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

  /* 4. Contadores animados: <strong data-count="380"> */
  const fmt = n => n.toLocaleString('es-CO');
  const counter = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, end = +el.dataset.count, t0 = performance.now(), dur = 1400;
      const tick = t => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      reduce ? (el.textContent = fmt(end)) : requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  });
  document.querySelectorAll('[data-count]').forEach(el => counter.observe(el));

  /* 5. Barra de progreso de lectura */
  const bar = document.createElement('div'); bar.className = 'progress'; bar.setAttribute('aria-hidden', 'true'); document.body.prepend(bar);
  let busy = false;
  addEventListener('scroll', () => {
    if (busy) return; busy = true;
    requestAnimationFrame(() => { const h = document.documentElement; bar.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`; busy = false; });
  }, { passive: true });

  /* 6. Pestañas accesibles: una sola parada de Tab y navegación con flechas */
  document.querySelectorAll('[role=tablist]').forEach(list => {
    const tabs = () => [...list.querySelectorAll('[role=tab]')];
    const sync = () => tabs().forEach(t => t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1);
    sync(); new MutationObserver(sync).observe(list, { attributes: true, subtree: true, attributeFilter: ['aria-selected'] });
    list.addEventListener('keydown', e => {
      const t = tabs(), i = t.indexOf(document.activeElement); if (i < 0) return;
      const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: t.length - 1 }[e.key]; if (k === undefined) return;
      e.preventDefault(); const n = t[(k + t.length) % t.length]; n.focus(); n.click();
    });
  });

  /* 7. Revelado escalonado dentro de rejillas y listas */
  document.querySelectorAll('.reveal').forEach(el => {
    const sib = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
    if (sib.length > 1) el.style.transitionDelay = (sib.indexOf(el) % 4) * 90 + 'ms';
  });
})();
