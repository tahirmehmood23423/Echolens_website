(function () {
  'use strict';

  // Mobile nav toggle
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  // Smooth-scroll with nav offset
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const nav = document.getElementById('nav');
      const y = target.getBoundingClientRect().top + window.pageYOffset - (nav ? nav.offsetHeight + 8 : 0);
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // Scroll-spy active nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  function spy() {
    let current = '';
    const y = window.pageYOffset + 160;
    sections.forEach(s => { if (y >= s.offsetTop) current = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href').slice(1) === current));
  }
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(() => { spy(); ticking = false; }); ticking = true; }
  }, { passive: true });
  spy();

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.course, .why-item, .pillar, .stage, .about-card, .enrol-card')
      .forEach(el => obs.observe(el));
  }
})();
