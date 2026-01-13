document.addEventListener("DOMContentLoaded", () => {
    const magnifier = document.getElementById('magnifier');
    const zoomContainer = document.getElementById('magnifier-content-clone');
    const magnifyArea = document.getElementById('magnify-area');
    const categories = document.querySelectorAll('.sketch-grid .sketch-category');
    const exploreButtons = document.querySelectorAll('.explore-btn');

    // TWEAK THIS: Zoom level
    const zoomLevel = 1.5;

    // 1. Create the Live Clone
    zoomContainer.innerHTML = ''; // Clear just in case
    const clone = magnifyArea.cloneNode(true);
    clone.id = 'magnify-area-clone';
    zoomContainer.appendChild(clone);
    
    // Force transform origin to top-left for accurate math
    zoomContainer.style.transformOrigin = '0 0';

    const clonedCategories = zoomContainer.querySelectorAll('.sketch-category');
    
    // Marquee References (for syncing text)
    const originalMarquee = document.querySelector('.marquee-content');
    const clonedMarquee = clone.querySelector('.marquee-content');
    // Stop the clone from animating on its own (we will force-sync it)
    if (clonedMarquee) clonedMarquee.style.animation = 'none';

    // 2. Sync Hover States
    categories.forEach((cat, index) => {
        const color = cat.getAttribute('data-color');
        cat.style.setProperty('--theme-color', color);
        clonedCategories[index].style.setProperty('--theme-color', color);

        cat.addEventListener('mouseenter', () => {
            magnifier.querySelector('.glass-inner').style.borderColor = color;
            clonedCategories[index].classList.add('force-hover');
        });

        cat.addEventListener('mouseleave', () => {
            magnifier.querySelector('.glass-inner').style.borderColor = '#2D2926';
            clonedCategories[index].classList.remove('force-hover');
        });
    });

   // 3. Animation Loop (Handles Movement + Mode Switching)
    let mouseX = 0, mouseY = 0;
    let isMouseActive = false;
    let isOverNav = false;

    window.addEventListener('mousemove', (e) => {
        isMouseActive = true;
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Check if mouse is touching the header/navigation
        if (e.target.closest('header')) {
            isOverNav = true;
        } else {
            isOverNav = false;
        }
    });

    function render() {
        if (isMouseActive) {
            
            if (isOverNav) {
                // ─── NAV MODE ───
                // 1. Hide Magnifier
                magnifier.style.display = 'none';
                // 2. SHOW Global Cursor (Remove the hiding class)
                document.body.classList.remove('magnifier-mode'); 
                
            } else {
                // ─── PAGE MODE ───
                // 1. Show Magnifier (Move it)
                magnifier.style.display = 'block';
                magnifier.style.left = `${mouseX}px`;
                magnifier.style.top = `${mouseY}px`;
                
                // 2. HIDE Global Cursor (Add the hiding class)
                document.body.classList.add('magnifier-mode');

                // 3. Calculate Zoom Logic
                const rect = magnifyArea.getBoundingClientRect();
                const relX = mouseX - rect.left;
                const relY = mouseY - rect.top;
                const moveX = -(relX * zoomLevel) + (magnifier.offsetWidth / 2);
                const moveY = -(relY * zoomLevel) + (magnifier.offsetHeight / 2);

                zoomContainer.style.transform = `translate(${moveX}px, ${moveY}px) scale(${zoomLevel})`;
            }
        }

        // Sync Marquee Text
        if (originalMarquee && clonedMarquee) {
            const style = window.getComputedStyle(originalMarquee);
            const matrix = style.transform || style.webkitTransform;
            clonedMarquee.style.transform = matrix;
        }

        requestAnimationFrame(render);
    }

    render();

    // 4. Pulse Effect
    exploreButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => magnifier.classList.add('pulse'));
        btn.addEventListener('mouseleave', () => magnifier.classList.remove('pulse'));
    });
});
