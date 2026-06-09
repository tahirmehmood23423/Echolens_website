/* ───────────────────────────────────────────────────────────────
   ECHOLENS · script.js
   Minimal interactions — nav toggle, smooth-scroll, scroll-spy.
   ─────────────────────────────────────────────────────────────── */

(function () {
    'use strict';

    // ─── Mobile nav toggle ───
    const navToggle = document.getElementById('navToggle');
    const navMenu   = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('open');
        });

        // Close menu when a link is tapped
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
            });
        });
    }

    // ─── Smooth-scroll for anchor links (offset for sticky nav) ───
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach(a => {
        a.addEventListener('click', e => {
            const href   = a.getAttribute('href');
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const nav    = document.getElementById('nav');
            const offset = nav ? nav.offsetHeight + 8 : 0;
            const y      = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });

    // ─── Active-section indicator in nav ───
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-menu a[href^="#"]');

    function setActive() {
        let current = '';
        const scrollY = window.pageYOffset + 140;
        sections.forEach(sec => {
            if (scrollY >= sec.offsetTop) current = sec.id;
        });
        navLinks.forEach(link => {
            const href = link.getAttribute('href').slice(1);
            link.classList.toggle('active', href === current);
        });
    }
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => { setActive(); ticking = false; });
            ticking = true;
        }
    }, { passive: true });
    setActive();

    // ─── Mobile: tag responsive table cells with their column labels ───
    function tagTableCells() {
        if (window.innerWidth > 768) return;
        document.querySelectorAll('.ot-row').forEach(row => {
            const cells  = row.querySelectorAll('.num');
            const labels = ['WKS', 'HRS', 'PROGRAMS', 'PRICE (PKR)'];
            cells.forEach((c, i) => {
                if (!c.dataset.tagged) {
                    c.setAttribute('data-label', labels[i] || '');
                    c.dataset.tagged = '1';
                }
            });
        });
    }
    tagTableCells();
    window.addEventListener('resize', tagTableCells);

    // ─── Reveal-on-scroll for tier sections ───
    if ('IntersectionObserver' in window) {
        const reveal = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    reveal.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.course, .why-item, .pillar, .stage, .about-pane')
            .forEach(el => reveal.observe(el));
    }
})();
