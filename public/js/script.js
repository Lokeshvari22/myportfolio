/* ══════════════════════════════════════════════════
   Lokeshvari Portfolio — script.js
   All interactive behaviour lives here.
══════════════════════════════════════════════════ */

/* ── Typed hero text ──────────────────────────── */
const roles = [
  'Full Stack Developer',
  'AI / ML Enthusiast',
  'Final-Year Engineer'
];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-output');

function typeLoop() {
  const current = roles[roleIndex];
  typedEl.textContent = deleting
    ? current.slice(0, --charIndex)
    : current.slice(0, ++charIndex);

  let delay = deleting ? 55 : 100;
  if (!deleting && charIndex === current.length) {
    delay = 1800; deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 300;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();


/* ── Nav: scroll glass + active link ─────────── */
const nav      = document.getElementById('nav');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);

  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 80) current = s.id;
  });
  navAnchors.forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#' + current)
  );
});


/* ── Mobile burger toggle ─────────────────────── */
const burger  = document.getElementById('burger');
const navList = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});

navList.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navList.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);


/* ── Scroll-reveal ────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ── Skill bar animation ──────────────────────── */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(fill => {
        const w = fill.style.getPropertyValue('--w') || 0;
        fill.style.transform = `scaleX(${w})`;
        fill.classList.add('animated');
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(c => barObserver.observe(c));


/* ── Experience tabs (Internships / Courses) ──── */
document.querySelectorAll('.exp-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.exp-tab').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.exp-panel').forEach(p =>
      p.classList.remove('active')
    );
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
  });
});
