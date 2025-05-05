
// Fade‑in
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('appear');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// UX project accordion
document.querySelectorAll('.ux-card').forEach(card => {
  const btn = card.querySelector('.ux-toggle');
  const content = card.querySelector('.ux-content');
  btn.addEventListener('click', () => {
    const open = card.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    content.style.maxHeight = open ? content.scrollHeight + 'px' : null;
  });
});

// UX section master toggle
const uxSection = document.getElementById('ux');
const uxToggleMaster = uxSection.querySelector('.ux-section-toggle');
const uxList = uxSection.querySelector('.ux-list');

uxToggleMaster.addEventListener('click', () => {
  const collapsed = uxSection.classList.toggle('ux-collapsed');
  uxToggleMaster.setAttribute('aria-expanded', !collapsed);
});

// Poster sliders
const seriesMap = {
  nature: ['images/nature poster.png', 'images/nature poster.png'],
  final: ['images/Final poster.png', 'images/Final poster.png'],
  '30min': ['images/30 minutes.png', 'images/30 minutes.png'],
  mist: ['images/POSTER 1.png', 'images/POSTER 1.png']
};

document.querySelectorAll('.poster-card').forEach(card => {
  const series = card.dataset.series;
  const imgs = seriesMap[series] || [];
  let idx = 0;
  const imgEl = card.querySelector('img');

  const show = i => { if (imgs[i]) imgEl.src = imgs[i]; };

  card.querySelector('.prev').addEventListener('click', () => {
    idx = (idx - 1 + imgs.length) % imgs.length;
    show(idx);
  });
  card.querySelector('.next').addEventListener('click', () => {
    idx = (idx + 1) % imgs.length;
    show(idx);
  });
});
