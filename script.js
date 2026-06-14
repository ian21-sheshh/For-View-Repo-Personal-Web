// =========================
// MODERN PORTFOLIO SCRIPT
// =========================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");
const skillsContainer = document.getElementById("skillsSliderContainer");
const slideLeftBtn = document.getElementById("slideLeft");
const slideRightBtn = document.getElementById("slideRight");

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
});

// Close mobile menu after clicking a link
navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        const icon = menuToggle.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
    });
});

// Active nav link while scrolling
const sections = document.querySelectorAll("main section[id]");

function updateActiveNav() {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

// Back to top button
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Skills horizontal slider
function getSkillScrollAmount() {
    const firstCard = skillsContainer.querySelector(".skill-card");
    if (!firstCard) return 340;

    const cardWidth = firstCard.getBoundingClientRect().width;
    return cardWidth + 18;
}

slideRightBtn.addEventListener("click", () => {
    skillsContainer.scrollBy({
        left: getSkillScrollAmount(),
        behavior: "smooth"
    });
});

slideLeftBtn.addEventListener("click", () => {
    skillsContainer.scrollBy({
        left: -getSkillScrollAmount(),
        behavior: "smooth"
    });
});

// Reveal animation
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.14
    }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Close mobile menu when clicking outside the navbar
document.addEventListener("click", (event) => {
    const clickedInsideNavbar = event.target.closest(".navbar");

    if (!clickedInsideNavbar && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");

        const icon = menuToggle.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
    }
});
