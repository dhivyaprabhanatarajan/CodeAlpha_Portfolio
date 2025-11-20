// Smooth scroll for in-page links and mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.getAttribute('href');
      if (hash.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        if (window.innerWidth <= 800) toggleNav(false);
      }
    });
  });

  // mobile nav toggle
  const nav = document.getElementById('mainNav');
  const btn = document.getElementById('navToggle');
  btn.addEventListener('click', () => toggleNav());
  function toggleNav(force) {
    if (force === false) nav.style.display = 'none';
    else nav.style.display = (nav.style.display === 'flex' || nav.style.display === 'block') ? 'none' : 'flex';
  }

  // simple reveal-on-scroll (intersection observer)
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, {threshold: 0.15});

  document.querySelectorAll('.section, .card').forEach(el => {
    el.classList.add('will-reveal');
    obs.observe(el);
  });
});
