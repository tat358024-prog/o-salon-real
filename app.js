// Tab Switching Controller Logic
function switchTab(category) {
    const grids = document.querySelectorAll('.services-grid');
    grids.forEach(grid => grid.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(category).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Active Navbar Highlighting Engine during User Scrolling
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

// Netlify AJAX Form Submission Pipeline
document.getElementById("appointmentForm").addEventListener("submit", function (e) {
    // 1. Prevent the default browser page reload behavior
    e.preventDefault();

    const form = e.target;
    // 2. Capture all the input fields inside the form elements
    const formData = new FormData(form);

    // 3. Post the serialized input parameters asynchronously to Netlify's route handler
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    })
    .then(() => {
        // 4. Smoothly hide the active form container element
        form.style.display = "none";
        
        // 5. Reveal the beautiful confirmation success message box
        document.getElementById("formSuccessMessage").style.display = "block";
    })
    .catch((error) => {
        // Fallback error routing if the user's internet drops during transmission
        alert("An unexpected transmission error occurred: " + error + ". Please call us directly at (808) 689-6611.");
    });
});

    .catch((error) => {
        alert("An unexpected transmission error occurred: " + error + ". Please call us directly at (808) 689-6611.");
    });
});
