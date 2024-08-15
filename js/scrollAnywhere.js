document.addEventListener('DOMContentLoaded', function() {
    const splitContainer2 = document.getElementById('split_container_2');
    
    if (splitContainer2) {
        document.body.style.overflow = 'hidden'; // Disable body scrolling
        
        // Variables to manage smooth scrolling
        let scrollTimeout;
        let scrollDistance = 150; // Adjust this value for longer or shorter scrolls

        // Redirect any scroll on the body to split_container_2
        document.body.addEventListener('wheel', function(event) {
            event.preventDefault(); // Prevent default scrolling
            
            // Clear any ongoing scroll events to avoid jankiness
            clearTimeout(scrollTimeout);

            // Calculate the scroll direction
            const direction = event.deltaY > 0 ? 1 : -1;
            
            // Scroll by a larger distance for smoother experience
            splitContainer2.scrollBy({
                top: direction * scrollDistance,
                behavior: 'smooth'
            });

            // Optional: Ensure gradual continuous scrolling if the user keeps scrolling
            scrollTimeout = setTimeout(function() {
                splitContainer2.scrollBy({
                    top: direction * scrollDistance,
                    behavior: 'smooth'
                });
            }, 200); // Adjust delay for smoother continuous scroll
        }, { passive: false });

        // Support arrow key scrolling as well
        document.body.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                
                // Determine scroll direction
                const scrollAmount = event.key === 'ArrowDown' ? scrollDistance : -scrollDistance;

                splitContainer2.scrollBy({
                    top: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }, { passive: false });

        // Smooth scrolling for nav links
        document.querySelectorAll('nav ul li a').forEach(anchor => {
            anchor.addEventListener('click', function(event) {
                event.preventDefault();

                const targetId = this.getAttribute('href').substring(1); // Get the target ID
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const containerTop = splitContainer2.getBoundingClientRect().top;
                    const sectionTop = targetSection.getBoundingClientRect().top;

                    // Calculate the scroll position relative to split_container_2
                    const scrollPosition = sectionTop - containerTop + splitContainer2.scrollTop;

                    splitContainer2.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});
