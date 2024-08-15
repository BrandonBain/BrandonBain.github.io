document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');

    // Set 'About' as the default active section
    const aboutLink = document.querySelector('nav ul li:first-child');
    if (aboutLink) {
        aboutLink.classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // Remove 'active' class from any previously active link
            document.querySelector('nav ul li.active')?.classList.remove('active');

            // Add 'active' class to the clicked link's parent (li)
            this.parentElement.classList.add('active');

            // Smooth scroll to the target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
