/**
 * script.js — Manish Waghmare Portfolio
 * ============================================================
 * All interactive features, vanilla JS only.
 * No external libraries — uses IntersectionObserver &
 * requestAnimationFrame for performance.
 *
 * TABLE OF CONTENTS:
 *  1. Navbar — glass effect on scroll
 *  2. Mobile menu — hamburger toggle with animation
 *  3. Smooth scroll — offset for fixed navbar
 *  4. Typing effect — cycles through role phrases
 *  5. Scroll reveal — IntersectionObserver fade-in
 *  6. Skill bars — animate fill width on scroll into view
 *  7. Cursor glow — subtle radial glow follows mouse in hero
 *  8. Contact form — validation + Formspree AJAX submit
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================
       1. NAVBAR — Glass blur effect when scrolled down
    ======================================================== */
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Run immediately in case page loads already scrolled
    handleNavbarScroll();
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });


    /* ========================================================
       2. MOBILE MENU — Hamburger toggle (morphs into X)
    ======================================================== */
    const hamburger    = document.getElementById('hamburger');
    const mobileMenu   = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks  = document.querySelectorAll('.mobile-link');

    function openMenu() {
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    function closeMenu() {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.contains('open');
        isOpen ? closeMenu() : openMenu();
    });

    // Close menu when any nav link is clicked
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Close menu when overlay is clicked
    mobileOverlay.addEventListener('click', closeMenu);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });


    /* ========================================================
       3. SMOOTH SCROLL — Accounts for fixed navbar height
    ======================================================== */
    const NAVBAR_HEIGHT = parseInt(
        getComputedStyle(document.documentElement)
            .getPropertyValue('--navbar-height') || '70'
    );

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const top = target.getBoundingClientRect().top
                      + window.pageYOffset
                      - NAVBAR_HEIGHT;

            window.scrollTo({ top, behavior: 'smooth' });
        });
    });


    /* ========================================================
       4. TYPING EFFECT
       Cycles through an array of phrases, types each letter,
       pauses, then deletes before moving to the next.
    ======================================================== */
    const typingTarget = document.getElementById('typing-target');

    if (typingTarget) {
        // ✏️  Edit this array to change the cycling phrases
        const phrases = [
            'Java Developer',
            'Backend Engineer',
            'Problem Solver',
            'API Architect',
            'Spring Boot Expert',
        ];

        let phraseIndex  = 0;
        let charIndex    = 0;
        let isDeleting   = false;
        const TYPE_SPEED   = 85;   // ms per character typed
        const DELETE_SPEED = 45;   // ms per character deleted
        const PAUSE_END    = 1800; // ms to pause at end of phrase
        const PAUSE_START  = 400;  // ms to pause before typing next

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (!isDeleting) {
                // — Typing forward —
                typingTarget.textContent = currentPhrase.slice(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentPhrase.length) {
                    // Finished typing — pause then start deleting
                    isDeleting = true;
                    setTimeout(type, PAUSE_END);
                    return;
                }
            } else {
                // — Deleting —
                typingTarget.textContent = currentPhrase.slice(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    // Finished deleting — move to next phrase
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(type, PAUSE_START);
                    return;
                }
            }

            setTimeout(type, isDeleting ? DELETE_SPEED : TYPE_SPEED);
        }

        // Start after a short delay so hero loads first
        setTimeout(type, 600);
    }


    /* ========================================================
       5. SCROLL REVEAL — Fade + slide up on scroll
       Uses IntersectionObserver (no library needed).
       Targets all elements with class "reveal".
    ======================================================== */
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing once revealed (one-shot animation)
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,    // Trigger when 10% of element is visible
            rootMargin: '0px 0px -60px 0px', // Slightly before hitting viewport bottom
        }
    );

    // Observe every element with the .reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });


    /* ========================================================
       6. SKILL BARS — Animate width fill on scroll into view
       Each .skill-fill has data-width="N" (0–100).
       JS sets the CSS width once the element is visible.
    ======================================================== */
    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill      = entry.target;
                    const targetWidth = fill.getAttribute('data-width') || '0';

                    // Slight delay so the scroll reveal plays first
                    setTimeout(() => {
                        fill.style.width = targetWidth + '%';
                    }, 200);

                    skillObserver.unobserve(fill);
                }
            });
        },
        { threshold: 0.5 }
    );

    document.querySelectorAll('.skill-fill').forEach(fill => {
        skillObserver.observe(fill);
    });


    /* ========================================================
       7. CURSOR GLOW — Subtle radial glow follows mouse in hero
       The .hero-glow div is positioned absolutely in the hero.
       We move it with CSS left/top to follow the cursor.
    ======================================================== */
    const heroSection = document.getElementById('hero');
    const heroGlow    = document.getElementById('hero-glow');

    if (heroSection && heroGlow) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Use requestAnimationFrame to keep it smooth
            requestAnimationFrame(() => {
                heroGlow.style.left = x + 'px';
                heroGlow.style.top  = y + 'px';
            });
        });

        // Hide glow when mouse leaves hero
        heroSection.addEventListener('mouseleave', () => {
            heroGlow.style.left = '50%';
            heroGlow.style.top  = '50%';
        });
    }


    /* ========================================================
       8. CONTACT FORM — Validation + Formspree AJAX submit
    ======================================================== */
    const contactForm  = document.getElementById('contact-form');
    const submitBtn    = document.getElementById('form-submit-btn');
    const formSuccess  = document.getElementById('form-success');

    // Input elements
    const nameInput    = document.getElementById('contact-name');
    const emailInput   = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    // Error span elements
    const nameError    = document.getElementById('name-error');
    const emailError   = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    /** Validates a single field and shows/clears its error */
    function validateField(input, errorEl, rules) {
        const value = input.value.trim();
        let errorMsg = '';

        if (rules.required && !value) {
            errorMsg = `${rules.label} is required.`;
        } else if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorMsg = 'Please enter a valid email address.';
        } else if (rules.minLength && value.length < rules.minLength) {
            errorMsg = `${rules.label} must be at least ${rules.minLength} characters.`;
        }

        if (errorMsg) {
            input.classList.add('error');
            errorEl.textContent = errorMsg;
            return false;
        } else {
            input.classList.remove('error');
            errorEl.textContent = '';
            return true;
        }
    }

    /** Live validation — clears errors as user types */
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            validateField(nameInput, nameError, { required: true, label: 'Name', minLength: 2 });
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', () => {
            validateField(emailInput, emailError, { required: true, email: true, label: 'Email' });
        });
    }

    if (messageInput) {
        messageInput.addEventListener('input', () => {
            validateField(messageInput, messageError, { required: true, label: 'Message', minLength: 10 });
        });
    }

    /** Form submission handler */
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate all fields before submitting
            const isNameValid    = validateField(nameInput,    nameError,    { required: true, label: 'Name', minLength: 2 });
            const isEmailValid   = validateField(emailInput,   emailError,   { required: true, email: true, label: 'Email' });
            const isMessageValid = validateField(messageInput, messageError, { required: true, label: 'Message', minLength: 10 });

            if (!isNameValid || !isEmailValid || !isMessageValid) {
                // Focus first invalid field
                if (!isNameValid)    nameInput.focus();
                else if (!isEmailValid)   emailInput.focus();
                else                 messageInput.focus();
                return;
            }

            // Show loading spinner on button
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                const formData = new FormData(contactForm);
                const action   = contactForm.getAttribute('action');

                /*
                 * If Formspree is configured (action URL contains a real form ID),
                 * submit via fetch. Otherwise, simulate success after a delay.
                 */
                if (action && !action.includes('YOUR_FORM_ID')) {
                    // Real Formspree submission
                    const response = await fetch(action, {
                        method:  'POST',
                        body:    formData,
                        headers: { 'Accept': 'application/json' },
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                } else {
                    // Simulated success — remove this once Formspree is set up
                    await new Promise(resolve => setTimeout(resolve, 1200));
                }

                // Hide form, show success message
                contactForm.hidden   = true;
                formSuccess.hidden   = false;

            } catch (error) {
                // Show error on submit button
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                nameError.textContent = 'Something went wrong. Please try again or email me directly.';
                console.error('Form submission error:', error);
            }
        });
    }


    /* ========================================================
       BONUS: Active nav link highlight on scroll
       Adds .active class to the nav link corresponding to
       the currently visible section.
    ======================================================== */
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${id}`) {
                            link.style.color = 'var(--accent)';
                            link.style.background = 'var(--accent-light)';
                        } else {
                            link.style.color = '';
                            link.style.background = '';
                        }
                    });
                }
            });
        },
        {
            threshold: 0.4,
            rootMargin: `-${NAVBAR_HEIGHT}px 0px 0px 0px`,
        }
    );

    sections.forEach(section => sectionObserver.observe(section));

}); // end DOMContentLoaded
