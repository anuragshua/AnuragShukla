const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const revealElements = document.querySelectorAll(".reveal");
const sectionIds = ["about", "skills", "projects", "contact"];

function setTheme(theme) {
    if (theme === "light") {
        body.classList.add("light-theme");
        themeToggle.textContent = "☀️";
    } else {
        body.classList.remove("light-theme");
        themeToggle.textContent = "🌙";
    }
}

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
    const isLight = body.classList.contains("light-theme");
    const nextTheme = isLight ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
});

navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
});

document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.14 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionElements = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

const navAnchorMap = {};
document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
    const targetId = link.getAttribute("href").slice(1);
    navAnchorMap[targetId] = link;
});

function updateActiveNav() {
    const scrollPosition = window.scrollY + 140;

    for (const section of sectionElements) {
        const isInView =
            scrollPosition >= section.offsetTop &&
            scrollPosition < section.offsetTop + section.offsetHeight;

        const link = navAnchorMap[section.id];
        if (link) {
            link.classList.toggle("active", isInView);
        }
    }
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);