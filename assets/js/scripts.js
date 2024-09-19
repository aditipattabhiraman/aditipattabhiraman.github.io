document.addEventListener('DOMContentLoaded', function() {
    // Smooth fade-in effect for each section as you scroll
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Once the section is visible, stop observing it
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Typing animation for the header
    const typingText = document.querySelector('.header-typing');
    const text = typingText.textContent;
    let index = 0;
    typingText.textContent = '';

    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100); // Adjust speed here
        }
    }

    type();

    // Button hover ripple effect
    const buttons = document.querySelectorAll('a.button');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600); // Adjust duration here
        });
    });

    // Scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    document.body.appendChild(progressBar);

    window.onscroll = function () {
        let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
        let winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (scrollPos / winHeight) * 100;
        progressBar.style.width = scrolled + "%";
    };

    // Scroll-to-Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Header shrink effect on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });
});
