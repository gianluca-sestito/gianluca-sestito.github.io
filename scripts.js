/**
 * Gianluca Sestito Portfolio
 * Premium Interactions & Animations
 */

(function() {
    'use strict';

    // ============================================
    // CURSOR GLOW EFFECT
    // ============================================
    const cursorGlow = document.querySelector('.cursor-glow');

    if (cursorGlow) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            const ease = 0.15;
            currentX += (mouseX - currentX) * ease;
            currentY += (mouseY - currentY) * ease;

            cursorGlow.style.left = currentX + 'px';
            cursorGlow.style.top = currentY + 'px';

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }

    // ============================================
    // NAVIGATION
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        const header = document.querySelector('.site-header');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Scroll behavior
        let lastScrollY = 0;
        let ticking = false;

        function handleScroll() {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        }, { passive: true });

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('open');
            });

            // Close menu on link click
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('open');
                });
            });
        }

        // Active section highlighting
        const sections = document.querySelectorAll('section[id]');

        function highlightActiveSection() {
            const scrollY = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', highlightActiveSection, { passive: true });
        highlightActiveSection();
    });

    // ============================================
    // SECTION NAVIGATION ARROWS & SCROLL REVEAL
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        let currentSectionIndex = 0;

        // Create single up and down arrows (fixed position)
        const upArrow = document.createElement('button');
        upArrow.className = 'section-nav section-nav-up';
        upArrow.setAttribute('aria-label', 'Scroll to previous section');
        upArrow.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
        `;
        upArrow.style.display = 'none';
        document.body.appendChild(upArrow);

        const downArrow = document.createElement('button');
        downArrow.className = 'section-nav section-nav-down';
        downArrow.setAttribute('aria-label', 'Scroll to next section');
        downArrow.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
        `;
        document.body.appendChild(downArrow);

        // Update arrow visibility based on current section
        function updateArrowVisibility() {
            upArrow.style.display = currentSectionIndex > 0 ? 'flex' : 'none';
            downArrow.style.display = currentSectionIndex < sections.length - 1 ? 'flex' : 'none';
        }

        // Click handlers
        upArrow.addEventListener('click', () => {
            if (currentSectionIndex > 0) {
                sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        downArrow.addEventListener('click', () => {
            if (currentSectionIndex < sections.length - 1) {
                sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        // Track current section on scroll
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    currentSectionIndex = sections.indexOf(entry.target);
                    updateArrowVisibility();
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => navObserver.observe(section));

        // Initialize
        updateArrowVisibility();

        // Track active section and trigger reveals
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add active to current section (never remove - animations only play once)
                    entry.target.classList.add('section-active');
                    // Stop observing this section
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // Activate first section immediately
        if (sections[0]) {
            sections[0].classList.add('section-active');
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const currentSection = sections.find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top >= -10 && rect.top <= 10;
            });

            if (!currentSection) return;

            const currentIndex = sections.indexOf(currentSection);

            // Arrow Up - previous section
            if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                sections[currentIndex - 1].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Arrow Down - next section
            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                e.preventDefault();
                sections[currentIndex + 1].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();

                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    });

    // ============================================
    // INTERSECTION OBSERVER - FADE IN
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.addEventListener('DOMContentLoaded', () => {
        const fadeElements = document.querySelectorAll(
            '.project-feature, .experience-card, .skill-block, .contact-link, .section-header'
        );

        fadeElements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.05}s`;
            fadeObserver.observe(el);
        });
    });

    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        const counterElements = document.querySelectorAll('.metric-value[data-target]');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(el => counterObserver.observe(el));

        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const prefix = element.getAttribute('data-prefix') || '';
            const suffix = element.getAttribute('data-suffix') || '';
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease-out exponential
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeProgress * target);

                element.textContent = prefix + current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = prefix + target + suffix;
                }
            }

            requestAnimationFrame(updateCounter);
        }
    });

    // ============================================
    // TYPING EFFECT
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        const typedElement = document.querySelector('.typed-text');
        if (!typedElement) return;

        const text = typedElement.textContent;
        typedElement.textContent = '';

        let charIndex = 0;

        function type() {
            if (charIndex < text.length) {
                typedElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            }
        }

        // Start typing after a delay
        setTimeout(type, 800);
    });

    // ============================================
    // PARALLAX EFFECTS
    // ============================================
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    const gradientOrbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('scroll', () => {
        if (!hero || !heroBackground) return;

        const scrollTop = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrollTop < heroHeight) {
            const scrollPercent = scrollTop / heroHeight;

            heroBackground.style.transform = `translateY(${scrollTop * 0.3}px)`;
            heroBackground.style.opacity = 1 - scrollPercent * 0.5;

            gradientOrbs.forEach((orb, index) => {
                const speed = index === 0 ? 0.2 : 0.15;
                orb.style.transform = `translateY(${scrollTop * speed}px)`;
            });
        }
    }, { passive: true });

    // ============================================
    // MAGNETIC BUTTONS
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
                button.style.transition = 'transform 0.3s ease';
            });

            button.addEventListener('mouseenter', () => {
                button.style.transition = 'transform 0.1s ease';
            });
        });
    });

    // ============================================
    // CARD HOVER EFFECTS
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.experience-card, .skill-block');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });
        });
    });

    // ============================================
    // TEXT REVEAL ON SCROLL
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        const revealElements = document.querySelectorAll('.section-title, .project-title, .exp-company h3');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(el);
        });
    });

    // ============================================
    // PROJECT STACK HOVER
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        const stackTags = document.querySelectorAll('.project-stack span');

        stackTags.forEach((tag, index) => {
            tag.style.transitionDelay = `${index * 0.03}s`;
        });
    });


    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        // Skip to main content
        document.addEventListener('keydown', (e) => {
            // Press 'S' to skip to main content
            if (e.key === 's' && e.altKey) {
                e.preventDefault();
                const main = document.querySelector('#main-content');
                if (main) {
                    main.focus();
                    main.scrollIntoView({ behavior: 'smooth' });
                }
            }

            // Press 'C' to go to contact
            if (e.key === 'c' && e.altKey) {
                e.preventDefault();
                const contact = document.querySelector('#contact');
                if (contact) {
                    contact.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c[GS]', 'color: #39FF14; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(57, 255, 20, 0.5);');
    console.log('%cGianluca Sestito', 'color: #ffffff; font-size: 14px;');
    console.log('%cStaff Backend Engineer', 'color: #FF6B35; font-size: 12px;');
    console.log('%c---', 'color: #888;');
    console.log('%cLooking to connect? gianluca.sestito93@gmail.com', 'color: #888; font-size: 11px;');

})();
