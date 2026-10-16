// Ensure the DOM is fully loaded before binding event handlers
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Expose switchTab to the global window scope so the HTML onclick elements can find it
    window.switchTab = function(category) {
        // Find all individual service grids and remove active classes
        const grids = document.querySelectorAll('.services-grid');
        grids.forEach(grid => grid.classList.remove('active'));

        // Find all selection tab buttons and remove active styles
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        // Target the selected category container grid and bring it to view
        const targetGrid = document.getElementById(category);
        if (targetGrid) {
            targetGrid.classList.add('active');
        }

        // Apply active color scheme styles directly to the clicked button element
        if (window.event && window.event.currentTarget) {
            window.event.currentTarget.classList.add('active');
        }
    };

    // 2. Active Navbar Highlighting Engine during User Scrolling
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // 3. Netlify AJAX Form Submission Pipeline
    const appointmentForm = document.getElementById("appointmentForm");
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const form = e.target;
            const formData = new FormData(form);

            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(() => {
                form.style.display = "none";
                document.getElementById("formSuccessMessage").style.display = "block";
            })
            .catch((error) => {
                alert("An unexpected transmission error occurred: " + error + ". Please call us directly at (808) 689-6611.");
            });
        });
    }
});
