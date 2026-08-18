// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Active Section Highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-num');
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            let count = 0;
            const updateCount = () => {
                const inc = target / 20;
                if (count < target) {
                    count += inc;
                    entry.target.innerText = Math.ceil(count) + "+";
                    setTimeout(updateCount, 50);
                } else {
                    entry.target.innerText = target + "+";
                }
            };
            updateCount();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            const mailtoLink = `mailto:ashishkumar@example.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
            window.location.href = mailtoLink;

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i data-lucide="check"></i> Message Sent!';
            btn.classList.replace('btn-primary', 'btn-outline');
            lucide.createIcons();
            
            setTimeout(() => {
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.classList.replace('btn-outline', 'btn-primary');
                lucide.createIcons();
            }, 3000);
        }
    });
}

// Image Lightbox/Modal
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("modalCaption");
const closeBtn = document.querySelector(".modal-close");
const certImages = document.querySelectorAll(".cert-img");

if (modal && certImages.length > 0) {
    certImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            setTimeout(() => modal.classList.add('show'), 10);
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === captionText) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = "none", 300);
    }
}

// Glowing Cursor Tracker
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursorGlow.style.width = '30px';
        cursorGlow.style.height = '30px';
    });

    document.addEventListener('mouseup', () => {
        cursorGlow.style.width = '40px';
        cursorGlow.style.height = '40px';
    });
}

// Initialize Lucide icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Set copyright year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Initialize VanillaTilt for glass cards
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".glass-card"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
        scale: 1.02
    });
}
