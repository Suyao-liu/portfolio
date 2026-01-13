/* EXPERIENCE PAGE LOGIC
   Handles Scroll Animations & Photo Carousels
*/

document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. SCROLL REVEAL ANIMATION */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));


    /* 2. PHOTO CAROUSEL LOGIC */
    const sliders = document.querySelectorAll('.photo-slider');

    sliders.forEach(slider => {
        const track = slider.querySelector('.slides');
        const slides = track.children;
        const prevBtn = slider.querySelector('.ps-prev');
        const nextBtn = slider.querySelector('.ps-next');
        let idx = 0;

        // Function to update slide position
        const updateSlide = () => {
            track.style.transform = `translateX(-${idx * 100}%)`;
        };

        // Previous Button Click
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents clicking the parent card if it has a link
            idx = idx === 0 ? slides.length - 1 : idx - 1;
            updateSlide();
        });

        // Next Button Click
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            idx = (idx + 1) % slides.length;
            updateSlide();
        });
    });

});
