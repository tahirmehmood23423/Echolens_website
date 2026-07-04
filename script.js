(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────────────────────── Mobile nav ───────────────────────── */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  /* ─────────────────── Smooth-scroll with offset ────────────────── */
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var nav = document.getElementById('nav');
      var y = target.getBoundingClientRect().top + window.pageYOffset - (nav ? nav.offsetHeight + 8 : 0);
      window.scrollTo({ top: y, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  });

  /* ───────────────────────── Scroll-spy ───────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  function spy() {
    var current = '';
    var y = window.pageYOffset + 160;
    sections.forEach(function (s) { if (y >= s.offsetTop) current = s.id; });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href').slice(1) === current);
    });
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(function () { spy(); ticking = false; }); ticking = true; }
  }, { passive: true });
  spy();

  /* ─────────────────────── Reveal on scroll ────────────────────── */
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.course, .why-item, .pillar, .stage, .about-card, .enrol-card, .ov-row')
      .forEach(function (el) { obs.observe(el); });
  }

  /* ─────────────────── 3D tilt cards (pointer) ─────────────────── */
  if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.tilt').forEach(function (card) {
      var raf = null;
      card.addEventListener('pointermove', function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          var r = card.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width;
          var py = (e.clientY - r.top) / r.height;
          card.style.setProperty('--ry', ((px - 0.5) * 8).toFixed(2) + 'deg');
          card.style.setProperty('--rx', ((0.5 - py) * 8).toFixed(2) + 'deg');
          card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
          raf = null;
        });
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ──────────────── 3D hero: particle lens (Three.js) ──────────── */
  var canvas = document.getElementById('lens3d');
  if (canvas && !reducedMotion && typeof THREE !== 'undefined') {
    try {
      var hero = canvas.parentElement;
      var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.set(0, 0, 9);

      var group = new THREE.Group();
      scene.add(group);

      var VIOLET = 0x7c5cff, CYAN = 0x22d3ee, SOFT = 0xa78bfa;

      // 1. Particle sphere — the "lens"
      var COUNT = 1600;
      var positions = new Float32Array(COUNT * 3);
      var colors = new Float32Array(COUNT * 3);
      var cV = new THREE.Color(VIOLET), cC = new THREE.Color(CYAN);
      for (var i = 0; i < COUNT; i++) {
        // Fibonacci sphere for even coverage
        var t = i / COUNT;
        var inc = Math.acos(1 - 2 * t);
        var az = Math.PI * (1 + Math.sqrt(5)) * i;
        var rad = 3 + (Math.random() - 0.5) * 0.25;
        positions[i * 3]     = rad * Math.sin(inc) * Math.cos(az);
        positions[i * 3 + 1] = rad * Math.sin(inc) * Math.sin(az);
        positions[i * 3 + 2] = rad * Math.cos(inc);
        var mix = cV.clone().lerp(cC, t);
        colors[i * 3] = mix.r; colors[i * 3 + 1] = mix.g; colors[i * 3 + 2] = mix.b;
      }
      var pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      var points = new THREE.Points(pGeo, new THREE.PointsMaterial({
        size: 0.045, vertexColors: true, transparent: true, opacity: 0.9,
        blending: THREE.AdditiveBlending, depthWrite: false
      }));
      group.add(points);

      // 2. Inner wireframe icosahedron — the "core"
      var core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.7, 1),
        new THREE.MeshBasicMaterial({ color: SOFT, wireframe: true, transparent: true, opacity: 0.28 })
      );
      group.add(core);

      // 3. Orbit rings
      var ringMatV = new THREE.MeshBasicMaterial({ color: VIOLET, transparent: true, opacity: 0.35 });
      var ringMatC = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.3 });
      var ring1 = new THREE.Mesh(new THREE.TorusGeometry(4.1, 0.012, 8, 140), ringMatV);
      var ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.6, 0.009, 8, 140), ringMatC);
      ring1.rotation.x = Math.PI / 2.4;
      ring2.rotation.x = Math.PI / 1.7;
      ring2.rotation.y = Math.PI / 5;
      group.add(ring1, ring2);

      // 4. Floating dust field
      var DUST = 350;
      var dPos = new Float32Array(DUST * 3);
      for (var d = 0; d < DUST; d++) {
        dPos[d * 3]     = (Math.random() - 0.5) * 26;
        dPos[d * 3 + 1] = (Math.random() - 0.5) * 16;
        dPos[d * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
      }
      var dGeo = new THREE.BufferGeometry();
      dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
      var dust = new THREE.Points(dGeo, new THREE.PointsMaterial({
        size: 0.03, color: 0x8ea2ff, transparent: true, opacity: 0.5,
        blending: THREE.AdditiveBlending, depthWrite: false
      }));
      scene.add(dust);

      // Layout: nudge the lens right on wide screens, centre on mobile
      function layout() {
        var w = hero.clientWidth, h = hero.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        group.position.x = w > 860 ? 4.6 : 0;
        group.position.y = w > 860 ? 0.2 : 1.5;
        var s = w > 860 ? 1 : 0.72;
        group.scale.set(s, s, s);
      }
      layout();
      window.addEventListener('resize', layout);

      // Mouse parallax
      var mx = 0, my = 0, tx = 0, ty = 0;
      window.addEventListener('pointermove', function (e) {
        tx = (e.clientX / window.innerWidth - 0.5);
        ty = (e.clientY / window.innerHeight - 0.5);
      }, { passive: true });

      // Pause when hero not visible
      var heroVisible = true;
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { heroVisible = en[0].isIntersecting; }, { threshold: 0 })
          .observe(hero);
      }

      var clock = new THREE.Clock();
      (function animate() {
        requestAnimationFrame(animate);
        if (!heroVisible) return;
        var t = clock.getElapsedTime();
        mx += (tx - mx) * 0.04;
        my += (ty - my) * 0.04;

        group.rotation.y = t * 0.12 + mx * 0.5;
        group.rotation.x = Math.sin(t * 0.18) * 0.12 + my * 0.35;
        core.rotation.y = -t * 0.3;
        core.rotation.z = t * 0.14;
        ring1.rotation.z = t * 0.16;
        ring2.rotation.z = -t * 0.11;
        points.rotation.y = t * 0.05;
        dust.rotation.y = t * 0.015;

        // Gentle breathing on the core
        var b = 1 + Math.sin(t * 1.4) * 0.04;
        core.scale.set(b, b, b);

        renderer.render(scene, camera);
      })();
    } catch (err) {
      // WebGL unavailable — the aurora backdrop still carries the design.
      canvas.style.display = 'none';
    }
  }
})();
