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
});
