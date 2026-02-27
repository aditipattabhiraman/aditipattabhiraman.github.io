document.addEventListener('DOMContentLoaded', function() {

    // ── Section visibility observer (targets .section-wrapper divs) ──────────
    const sectionWrappers = document.querySelectorAll('.section-wrapper');
    const visibilityObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Staggered entrance for cards and skill categories inside this section
                const staggerItems = entry.target.querySelectorAll('.card, .skill-category');
                staggerItems.forEach((item, i) => {
                    item.classList.add('card-stagger');
                    setTimeout(() => {
                        item.classList.add('card-visible');
                    }, i * 100);
                });

                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    sectionWrappers.forEach(wrapper => {
        visibilityObserver.observe(wrapper);
    });

    // ── Active nav link highlighting based on which section is in view ────────
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('data-section');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + sectionId);
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.section-wrapper[data-section]').forEach(wrapper => {
        navObserver.observe(wrapper);
    });

    // ── Typing animation for the header title ─────────────────────────────────
    const typingText = document.querySelector('.header-typing');
    if (typingText) {
        const text = typingText.textContent;
        let index = 0;
        typingText.textContent = '';

        function type() {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(type, 80);
            } else {
                typingText.style.borderRight = 'none';
            }
        }

        type();
    }

    // ── Hamburger menu toggle ──────────────────────────────────────────────────
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close mobile nav when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ── Scroll progress bar ───────────────────────────────────────────────────
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    document.body.appendChild(progressBar);

    // ── Scroll-to-Top Button ──────────────────────────────────────────────────
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    // ── Combined scroll handler (progress bar + scroll-to-top + header shrink) ─
    const header = document.querySelector('.title-banner');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
        const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollPos / winHeight) * 100;
        progressBar.style.width = scrolled + '%';

        if (scrollPos > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }

        if (scrollPos > lastScrollTop) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
        lastScrollTop = scrollPos;
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── Business card flip on click / keyboard ────────────────────────────────
    const bizCard = document.getElementById('biz-card');
    if (bizCard) {
        bizCard.addEventListener('click', () => {
            bizCard.classList.toggle('is-flipped');
        });
        bizCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                bizCard.classList.toggle('is-flipped');
            }
        });
    }

    // ── Skill tag ripple on click ─────────────────────────────────────────────
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple-anim 0.5s linear;
                width: 40px;
                height: 40px;
                left: 50%;
                top: 50%;
                margin-left: -20px;
                margin-top: -20px;
                pointer-events: none;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);
        });
    });

});

// CSS keyframe for ripple injected at runtime
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
@keyframes ripple-anim {
  to { transform: scale(3); opacity: 0; }
}`;
document.head.appendChild(rippleStyle);
