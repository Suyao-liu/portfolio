document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INDEX ACCORDION LOGIC
    const items = document.querySelectorAll('.index-item');

    items.forEach(item => {
        const trigger = item.querySelector('.index-trigger');
        const content = item.querySelector('.index-content');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close ALL other items first (Exclusive Accordion)
            items.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.index-trigger').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.index-content').style.maxHeight = null;
                }
            });

            // Toggle Current
            if (!isActive) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                // Set max-height to scrollHeight to allow CSS transition
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                item.classList.remove('active');
                trigger.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            }
        });
    });

    // 2. SCROLL REVEAL ANIMATION
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});