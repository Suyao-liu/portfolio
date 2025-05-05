/* Reveal-on-scroll (unchanged) */
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('active'); io.unobserve(e.target);}
    });
  },{threshold:0.1});
  reveals.forEach(r=>io.observe(r));
});

/* ─── Mini-carousels ─── */
(function initPhotoSliders(){
  document.querySelectorAll('.photo-slider').forEach(slider=>{
    const track   = slider.querySelector('.slides');
    const slides  = track.children;
    const prevBtn = slider.querySelector('.ps-prev');
    const nextBtn = slider.querySelector('.ps-next');
    let idx = 0;

    const update = ()=> track.style.transform = `translateX(-${idx*100}%)`;
    prevBtn.addEventListener('click',()=>{
      idx = idx===0 ? slides.length-1 : idx-1;   // wrap-around
      update();
    });
    nextBtn.addEventListener('click',()=>{
      idx = (idx+1) % slides.length;              // wrap-around
      update();
    });
  });
})();
