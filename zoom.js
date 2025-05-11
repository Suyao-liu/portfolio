
// zoom.js : lightweight image lightbox for Uni‑Connect case study
document.addEventListener('DOMContentLoaded', () => {

  // Grab every image inside case‑study that should zoom
  // Add the class="zoomable" to any <img> you want this to work on
  const images = document.querySelectorAll('img.zoomable');

  // Create the overlay once and reuse it
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.innerHTML = '<img src="" alt="Zoomed image">';
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector('img');

  // Clicking anywhere closes the overlay
  overlay.addEventListener('click', closeOverlay);
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') closeOverlay();
  });

  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openOverlay(img));
  });

  function openOverlay(img){
    overlayImg.src = img.src;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // stop scroll
  }

  function closeOverlay(){
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});
