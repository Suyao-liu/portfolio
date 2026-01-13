document.addEventListener('DOMContentLoaded', () => {
    
    const square = document.querySelector('.cursor-square');
    const line = document.querySelector('.cursor-line');

    // Only run if cursor elements exist
    if (square && line) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let squareX = mouseX;
        let squareY = mouseY;
        let lineX = mouseX;
        let lineY = mouseY;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {
            // Smooth movement (square is faster, line has more drag)
            squareX += (mouseX - squareX) * 0.2;
            squareY += (mouseY - squareY) * 0.2;
            
            lineX += (mouseX - lineX) * 0.15;
            lineY += (mouseY - lineY) * 0.15;
            
            square.style.left = squareX + 'px';
            square.style.top = squareY + 'px';
            
            line.style.left = lineX + 'px';
            line.style.top = lineY + 'px';
            
            requestAnimationFrame(animate);
        }

        animate();

        // Hover effects for all interactive elements
        const interactive = document.querySelectorAll('a, .card, button, .link, .project-link, .shutter');
        
        interactive.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });

        // Click effects
        document.addEventListener('mousedown', () => {
            document.body.classList.add('clicking');
        });

        document.addEventListener('mouseup', () => {
            document.body.classList.remove('clicking');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            // Toggle the menu
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});