document.addEventListener('DOMContentLoaded', function() {

    // Section visibility observer (targets .section-wrapper divs)
    const sectionWrappers = document.querySelectorAll('.section-wrapper');
    const visibilityObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    sectionWrappers.forEach(wrapper => {
        visibilityObserver.observe(wrapper);
    });

    // Active nav link highlighting based on which section is in view
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

    // Typing animation for the header title (guarded null check)
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

    // Button hover ripple effect
    const buttons = document.querySelectorAll('a.button');
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.addEventListener('click', function(e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            let ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    document.body.appendChild(progressBar);

    // Scroll-to-Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    // Combined scroll handler (progress bar + scroll-to-top + header shrink)
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
});
