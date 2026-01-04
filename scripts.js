/**
 * Gianluca Sestito Portfolio - Interactive Scripts
 * Smooth scroll, animations, and interactive effects
 */

(function() {
    'use strict';

    // ============================================
    // SMOOTH SCROLL BEHAVIOR WITH FOCUS MANAGEMENT
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        // Smooth scroll for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            // Handle click events
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    scrollToTarget(target, link);
                }
            });
            
            // Handle keyboard events (Enter key)
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    const href = this.getAttribute('href');
                    
                    // Skip if it's just "#"
                    if (href === '#') return;
                    
                    const target = document.querySelector(href);
                    
                    if (target) {
                        e.preventDefault();
                        scrollToTarget(target, link);
                    }
                }
            });
        });
        
        // Function to handle smooth scrolling with focus management
        function scrollToTarget(target, sourceLink) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // After scrolling, move focus to the target section for screen readers
            // Use setTimeout to wait for scroll animation to complete
            setTimeout(function() {
                // Find the first focusable element in the target section, or focus the section itself
                const focusableElements = target.querySelectorAll(
                    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
                );
                
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                } else {
                    // If no focusable element, make the section focusable temporarily
                    if (!target.hasAttribute('tabindex')) {
                        target.setAttribute('tabindex', '-1');
                        target.focus();
                    } else {
                        target.focus();
                    }
                }
            }, 800); // Wait for smooth scroll to complete
        }
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
    // DISABLED: 3D transform effects removed - cards stay still on hover
    // document.addEventListener('DOMContentLoaded', function() {
    //     const projectCards = document.querySelectorAll('.project-card:not(.featured)');
    //     projectCards.forEach(card => {
    //         // Hover effects disabled - cards remain static
    //     });
    // });

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
    // KEYBOARD NAVIGATION ENHANCEMENTS
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        // Ensure all interactive elements are keyboard accessible
        const interactiveElements = document.querySelectorAll(
            'a, button, input, textarea, select, [role="button"], [role="link"]'
        );
        
        interactiveElements.forEach(element => {
            // Ensure elements are focusable if they're not already
            if (!element.hasAttribute('tabindex') && 
                element.getAttribute('tabindex') !== '0' && 
                element.getAttribute('tabindex') !== '-1') {
                // Links and buttons are naturally focusable, but check if disabled
                if (element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true') {
                    element.setAttribute('tabindex', '-1');
                }
            }
            
            // Add Enter key support for elements that act like buttons
            if (element.getAttribute('role') === 'button' || 
                (element.tagName === 'A' && element.getAttribute('href') === '#')) {
                element.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        e.preventDefault();
                        element.click();
                    }
                });
            }
        });
    });

    // ============================================
    // CONSOLE MESSAGE (FOR FUN)
    // ============================================
    console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #00D4FF;');
    console.log('%cInterested in working together?', 'font-size: 14px; color: #FF006E;');
    console.log('%cGet in touch: gianluca.sestito93@gmail.com', 'font-size: 12px; color: #b0b0c0;');

})();

