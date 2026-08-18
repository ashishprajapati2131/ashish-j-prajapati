// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Select elements to animate
    const animateElements = document.querySelectorAll('.animate-up, .animate-left, .animate-right, .project-card, .timeline-item, .skill-category, .cert-card');
    
    // Set up observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    // Create observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class
                entry.target.classList.add('is-visible');
                
                // If it's a stats container, animate numbers
                if (entry.target.querySelector('.stat-num')) {
                    animateNumbers(entry.target);
                }
                
                // If it's a skills container, animate progress bars
                if (entry.target.classList.contains('skill-category')) {
                    animateProgressBars(entry.target);
                }
                
                // Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add initial classes to non-hero elements and observe
    animateElements.forEach((el, index) => {
        // Add animation classes to cards if they don't have them
        if (el.classList.contains('project-card') || el.classList.contains('cert-card')) {
            el.classList.add('animate-up');
            // Add slight stagger delay based on index within row (approximate)
            el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        }
        
        if (el.classList.contains('timeline-item')) {
            el.classList.add('animate-left');
        }
        
        if (el.classList.contains('skill-category')) {
            el.classList.add('animate-up');
            el.style.transitionDelay = `${(index % 3) * 0.15}s`;
        }
        
        observer.observe(el);
    });
    
    // Function to animate numbers
    function animateNumbers(container) {
        const statNums = container.querySelectorAll('.stat-num');
        
        statNums.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 30; // 30 steps
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.ceil(current);
                }
            }, 50);
        });
    }
    
    // Function to animate progress bars
    function animateProgressBars(container) {
        const progressBars = container.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
});
