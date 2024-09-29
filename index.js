document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.querySelector('#dark-mode-toggle');
    const clockElement = document.getElementById('digital-clock');
    const contactForm = document.getElementById('contactForm');
    const formContainer = document.querySelector('.form-container');

    if (localStorage.getItem('dark-mode') === 'enabled') {
        enableDarkMode();
    }

    toggleSwitch.addEventListener('click', () => {
        if (localStorage.getItem('dark-mode') !== 'enabled') {
            enableDarkMode();
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            disableDarkMode();
            localStorage.removeItem('dark-mode');
        }
    });

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        toggleSwitch.classList.remove('btn-outline-light');
        toggleSwitch.classList.add('btn-light');
        toggleSwitch.textContent = "Light Mode";
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        toggleSwitch.classList.remove('btn-light');
        toggleSwitch.classList.add('btn-outline-light');
        toggleSwitch.textContent = "Dark Mode";
    }

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateClock, 1000);
    updateClock();
    
    const navLink = document.querySelectorAll('.nav-link');

    navLink.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(nav => nav.classList.remove('active-nav'));
            this.classList.add('active-nav');
        });
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-nav');
            }
        });
    });

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Show the success modal
        $('#successModal').modal('show');

        // Clear the form after submission (optional)
        contactForm.reset();
    });
});