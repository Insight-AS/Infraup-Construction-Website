// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.offsetTop - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

// Set active nav link based on current page
(function setActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(link => {
        const href = link.getAttribute("href");
        if (
            href === currentPage ||
            (currentPage === "" && href === "index.html") ||
            (currentPage === "index.html" && href === "index.html")
        ) {
            link.classList.add("active");
        }
    });
})();

// Contact form handler
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const btn = contactForm.querySelector("button[type='submit']");
        const originalText = btn.innerHTML;

        const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            service: document.getElementById("service").value,
            message: document.getElementById("message").value.trim()
        };

        btn.innerHTML = "Sending...";
        btn.disabled = true;

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Unable to send message.");
            }

            contactForm.style.display = "none";

            const success = document.getElementById("form-success");

            if (success) {
                success.style.display = "block";
            }

        } catch (error) {
            console.error("Contact form error:", error);

            btn.innerHTML = originalText;
            btn.disabled = false;

            alert("Sorry, we couldn't send your message. Please try again or contact us by email.");
        }
    });
}

// Fade-in on scroll (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".service-card, .why-item, .mv-card, .value-item, .service-full-card").forEach(el => {
    observer.observe(el);
});

