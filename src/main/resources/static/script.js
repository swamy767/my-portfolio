document.addEventListener('DOMContentLoaded', () => {

    /* ── Silent Visitor Tracking ─────────────────────────── */
    fetch('/api/visitor/save', { method: 'POST' }).catch(() => {});

    /* ── Contact Form ────────────────────────────────────── */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name    = document.getElementById('cf-name').value.trim();
            const email   = document.getElementById('cf-email').value.trim();
            const subject = document.getElementById('cf-subject').value.trim();
            const message = document.getElementById('cf-message').value.trim();
            const status  = document.getElementById('msg-status');

            if (!name || !email || !subject || !message) {
                status.style.color = '#ff6b6b';
                status.textContent = 'Please fill in all fields.';
                return;
            }

            status.style.color = '#a0a0a0';
            status.textContent = 'Sending...';

            fetch('/api/message/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            })
            .then(r => r.json())
            .then(data => {
                if (data.status === 'saved') {
                    status.style.color = '#2ecc71';
                    status.textContent = '✅ Message sent! I will get back to you soon.';
                    contactForm.reset();
                } else {
                    status.style.color = '#ff6b6b';
                    status.textContent = '❌ Something went wrong. Try again.';
                }
            })
            .catch(() => {
                status.style.color = '#ff6b6b';
                status.textContent = '❌ Could not send. Please email directly.';
            });
        });
    }

    /* ── Custom Cursor ───────────────────────────────────── */
    const cursorDot     = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top  = `${e.clientY}px`;
            cursorOutline.animate(
                { left: `${e.clientX}px`, top: `${e.clientY}px` },
                { duration: 500, fill: 'forwards' }
            );
        });
        document.querySelectorAll('a, button, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width           = '60px';
                cursorOutline.style.height          = '60px';
                cursorOutline.style.backgroundColor = 'rgba(0,242,254,0.2)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width           = '40px';
                cursorOutline.style.height          = '40px';
                cursorOutline.style.backgroundColor = 'rgba(0,242,254,0.1)';
            });
        });
    }

    /* ── Scroll Progress ─────────────────────────────────── */
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop    = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrollProgress.style.width = `${(scrollTop / scrollHeight) * 100}%`;
    });

    /* ── Theme Toggle ────────────────────────────────────── */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon      = document.getElementById('theme-icon');
    const htmlEl         = document.documentElement;
    const currentTheme   = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        initParticles(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'ph ph-moon' : 'ph ph-sun';
    }

    /* ── Mobile Menu ─────────────────────────────────────── */
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ── Typing Effect ───────────────────────────────────── */
    const textEl  = document.querySelector('.typing-text');
    const words   = ['Java Developer', 'Problem Solver', 'ML Enthusiast', 'Spring Boot Dev'];
    let wIdx = 0, cIdx = 0, deleting = false;

    function typeEffect() {
        const word = words[wIdx];
        textEl.textContent = deleting
            ? word.substring(0, cIdx - 1)
            : word.substring(0, cIdx + 1);
        deleting ? cIdx-- : cIdx++;
        let speed = deleting ? 50 : 100;
        if (!deleting && cIdx === word.length) { speed = 2000; deleting = true; }
        else if (deleting && cIdx === 0)        { deleting = false; wIdx = (wIdx + 1) % words.length; speed = 500; }
        setTimeout(typeEffect, speed);
    }
    if (textEl) typeEffect();

    /* ── Intersection Observer (fade-in) ─────────────────── */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // Fallback — show all elements after 800ms if observer didn't fire
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up:not(.visible)').forEach(el => {
            el.classList.add('visible');
        });
    }, 800);

    /* ── Back to Top ─────────────────────────────────────── */
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('show', window.scrollY > 500);
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ── Particles ───────────────────────────────────────── */
    function initParticles(theme) {
        const color = theme === 'dark' ? '#00f2fe' : '#0072ff';
        tsParticles.load('tsparticles', {
            background: { color: { value: 'transparent' } },
            fpsLimit: 60,
            interactivity: {
                events: { onHover: { enable: true, mode: 'repulse' }, resize: true },
                modes:  { repulse: { distance: 100, duration: 0.4 } }
            },
            particles: {
                color: { value: color },
                links: { color, distance: 150, enable: true, opacity: 0.2, width: 1 },
                move:  { enable: true, speed: 1, outModes: { default: 'bounce' } },
                number:{ density: { enable: true, area: 800 }, value: 40 },
                opacity: { value: 0.3 },
                shape:   { type: 'circle' },
                size:    { value: { min: 1, max: 3 } }
            },
            detectRetina: true
        });
    }
    initParticles(currentTheme);

    /* ── Active Nav Link on Scroll ───────────────────────── */
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (!link) return;
            const top    = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

});
