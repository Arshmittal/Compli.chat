// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video popup functionality - videos break out of cards and show in large overlay
    const laptopFrames = document.querySelectorAll('.laptop-frame');
    let currentPopupVideo = null;
    
    // Create popup overlay once
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'video-popup-overlay';
    popupOverlay.innerHTML = `
        <div class="video-popup-container">
            <div class="video-popup-screen">
                <video class="video-popup-video" muted loop></video>
            </div>
            <button class="video-popup-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    document.body.appendChild(popupOverlay);
    
    const popupVideo = popupOverlay.querySelector('.video-popup-video');
    const closeButton = popupOverlay.querySelector('.video-popup-close');
    
    // Close popup function
    function closeVideoPopup() {
        popupOverlay.style.display = 'none';
        if (currentPopupVideo) {
            currentPopupVideo.pause();
            currentPopupVideo.currentTime = 0;
        }
        currentPopupVideo = null;
    }
    
    // Close button event
    closeButton.addEventListener('click', closeVideoPopup);
    
    // Close on overlay click
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closeVideoPopup();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.style.display === 'flex') {
            closeVideoPopup();
        }
    });
    
    laptopFrames.forEach((frame, index) => {
        const video = frame.querySelector('.project-demo-video');
        let hoverTimeout;
        
        if (video) {
            // Set video speed to 6x
            video.playbackRate = 6.0;
            // Hover to open large video popup
            frame.addEventListener('mouseenter', function() {
                // Start small preview immediately
                video.currentTime = 0;
                video.play().catch(e => console.log('Video autoplay blocked:', e));
                
                // Set timeout for popup (slight delay to prevent accidental triggers)
                hoverTimeout = setTimeout(() => {
                    // Copy video source to popup
                    const videoSrc = video.querySelector('source').src;
                    popupVideo.innerHTML = `<source src="${videoSrc}" type="video/mp4">`;
                    popupVideo.load();
                    // Set popup video speed to 6x
                    popupVideo.playbackRate = 6.0;
                    
                    // Show popup with animation
                    popupOverlay.style.display = 'flex';
                    currentPopupVideo = popupVideo;
                    
                    // Start playing popup video
                    setTimeout(() => {
                        popupVideo.currentTime = 0;
                        popupVideo.play().catch(e => console.log('Popup video autoplay blocked:', e));
                    }, 100);
                }, 800); // 800ms delay before enlarging
            });
            
            frame.addEventListener('mouseleave', function() {
                // Clear timeout if user moves away quickly
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                }
                
                // Pause small preview video
                video.pause();
                video.currentTime = 0;
            });
            
            // Preload videos for smooth playback
            video.load();
        }
    });
    
    // Close popup when mouse leaves the popup area
    popupOverlay.addEventListener('mouseleave', function() {
        closeVideoPopup();
    });

    // Project cards entrance animation only
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .project-card, .service-card, .contact-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Floating elements animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });

    // Enhanced parallax and floating particles
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const particles = document.querySelector('.hero-particles');
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.5}px) rotate(${scrolled * 0.1}deg)`;
        }
    });

    // Create floating glow particles
    function createFloatingGlow() {
        const glow = document.createElement('div');
        glow.className = 'floating-glow';
        glow.style.left = Math.random() * 100 + 'vw';
        glow.style.animationDuration = (Math.random() * 5 + 8) + 's';
        glow.style.animationDelay = Math.random() * 2 + 's';
        
        // Randomize colors
        const colors = [
            'rgba(124, 58, 237, 0.8)',
            'rgba(6, 182, 212, 0.6)',
            'rgba(236, 72, 153, 0.7)',
            'rgba(168, 85, 247, 0.5)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        glow.style.background = `radial-gradient(circle, ${randomColor}, transparent)`;
        
        document.body.appendChild(glow);
        
        // Remove after animation
        setTimeout(() => {
            if (glow.parentNode) {
                glow.parentNode.removeChild(glow);
            }
        }, 10000);
    }

    // Create floating particles every 2 seconds
    setInterval(createFloatingGlow, 2000);
    
    // Initial burst of particles
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingGlow, i * 400);
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#10b981';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });
    }

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Enhanced scroll reveal animations
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.about-card, .project-card, .service-card');
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in-up');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    // Project cards stagger animation
    const projectGrid = document.querySelector('.projects-grid');
    if (projectGrid) {
        const cards = projectGrid.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Dynamic counter animation for stats (if needed)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }

    // Navbar active link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Add enhanced CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: #06b6d4 !important;
            background: rgba(6, 182, 212, 0.1);
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
        }
        .nav-link.active::after {
            width: 80% !important;
        }
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes rippleEffect {
            0% {
                width: 0;
                height: 0;
                opacity: 0.5;
            }
            50% {
                opacity: 0.3;
            }
            100% {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
        .card-ripple {
            z-index: 1;
        }
        .floating-glow {
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(124, 58, 237, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            animation: floatingGlow 8s linear infinite;
            z-index: -1;
        }
        @keyframes floatingGlow {
            0% {
                transform: translateY(100vh) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-10vh) scale(1);
                opacity: 0;
            }
        }
        @keyframes glowPulse {
            0% {
                opacity: 0;
                transform: scale(0.8);
            }
            50% {
                opacity: 1;
                transform: scale(1.02);
            }
            100% {
                opacity: 0;
                transform: scale(1.1);
            }
        }
    `;
    document.head.appendChild(style);

    // Enhanced scroll-based animations and card interactions
    const scrollElements = document.querySelectorAll('.section-title, .section-subtitle, .about-card, .service-card, .contact-card');
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        elementObserver.observe(element);
    });

    // Service and About card animations
    const serviceCards = document.querySelectorAll('.service-card, .about-card');
    serviceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Add enhanced hover effect
            const glow = document.createElement('div');
            glow.className = 'card-glow';
            glow.style.cssText = `
                position: absolute;
                top: -5px;
                left: -5px;
                right: -5px;
                bottom: -5px;
                background: linear-gradient(45deg, rgba(124, 58, 237, 0.3), rgba(6, 182, 212, 0.3));
                border-radius: 25px;
                opacity: 0;
                animation: glowPulse 0.6s ease-out;
                pointer-events: none;
                z-index: -1;
            `;
            this.appendChild(glow);
            
            // Remove glow after animation
            setTimeout(() => {
                if (glow.parentNode) {
                    glow.parentNode.removeChild(glow);
                }
            }, 600);
        });
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((code, index) => code === konamiSequence[index])) {
            // Easter egg activated
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });

    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const debouncedScroll = debounce(() => {
    // Scroll-based animations
}, 10);

const throttledResize = throttle(() => {
    // Resize-based recalculations
}, 250);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('resize', throttledResize);