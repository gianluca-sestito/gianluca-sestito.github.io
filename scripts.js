/**
 * Gianluca Sestito Portfolio - Interactive Scripts
 * Smooth scroll, animations, and interactive effects
 */

(function() {
    'use strict';

    // ============================================
    // SMOOTH SCROLL BEHAVIOR
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        // Smooth scroll for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    });

    // ============================================
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.addEventListener('DOMContentLoaded', function() {
        const animatedElements = document.querySelectorAll(
            '.project-card, .skill-category, .education-card, .language-item, .contact-link'
        );

        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        // Also observe section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            title.classList.add('fade-in');
            observer.observe(title);
        });
    });

    // ============================================
    // PARALLAX EFFECT FOR HERO SECTION
    // ============================================
    let lastScrollTop = 0;
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');

    window.addEventListener('scroll', function() {
        if (!hero || !heroBackground) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = hero.offsetHeight;
        const scrollPercent = scrollTop / heroHeight;

        if (scrollTop < heroHeight) {
            // Parallax effect on hero background
            heroBackground.style.transform = `translateY(${scrollTop * 0.5}px)`;
            heroBackground.style.opacity = 1 - scrollPercent * 0.5;
        }

        lastScrollTop = scrollTop;
    }, { passive: true });

    // ============================================
    // ENHANCED HOVER EFFECTS FOR PROJECT CARDS
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        const projectCards = document.querySelectorAll('.project-card:not(.featured)');

        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                this.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    });

    // ============================================
    // DYNAMIC GLOW EFFECT ON SCROLL
    // ============================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroName = document.querySelector('.hero-name');
        
        if (heroName && scrolled < window.innerHeight) {
            const opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            heroName.style.opacity = Math.max(opacity, 0.5);
        }
    }, { passive: true });

    // ============================================
    // CURSOR TRAIL EFFECT (OPTIONAL - CAN BE DISABLED)
    // ============================================
    let cursorTrailEnabled = false; // Set to true to enable cursor trail

    if (cursorTrailEnabled) {
        const cursorTrail = [];
        const trailLength = 10;

        document.addEventListener('mousemove', function(e) {
            if (cursorTrail.length >= trailLength) {
                const oldTrail = cursorTrail.shift();
                if (oldTrail && oldTrail.parentNode) {
                    oldTrail.parentNode.removeChild(oldTrail);
                }
            }

            const trail = document.createElement('div');
            trail.style.position = 'fixed';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.width = '4px';
            trail.style.height = '4px';
            trail.style.borderRadius = '50%';
            trail.style.background = 'radial-gradient(circle, var(--electric-blue), var(--electric-pink))';
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9999';
            trail.style.transition = 'opacity 0.5s ease';
            trail.style.opacity = '0.8';

            document.body.appendChild(trail);
            cursorTrail.push(trail);

            setTimeout(function() {
                trail.style.opacity = '0';
                setTimeout(function() {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }, 500);
            }, 100);
        });
    }

    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    // Throttle scroll events for better performance
    function throttle(func, wait) {
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

    // Apply throttling to scroll-heavy functions if needed
    // window.addEventListener('scroll', throttle(function() {
    //     // Heavy scroll operations here
    // }, 16)); // ~60fps

    // ============================================
    // CONSOLE MESSAGE (FOR FUN)
    // ============================================
    console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #00D4FF;');
    console.log('%cInterested in working together?', 'font-size: 14px; color: #FF006E;');
    console.log('%cGet in touch: gianluca.sestito93@gmail.com', 'font-size: 12px; color: #b0b0c0;');

})();

