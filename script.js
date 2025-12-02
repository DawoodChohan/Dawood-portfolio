// Mobile navigation toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("show");
    }
  });
}

// Theme toggle with localStorage
const themeToggle = document.getElementById("themeToggle");
const rootHtml = document.documentElement;

const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light" || storedTheme === "dark") {
  rootHtml.setAttribute("data-theme", storedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = rootHtml.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    rootHtml.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      event.preventDefault();
      const headerOffset = 80;
      const rect = target.getBoundingClientRect();
      const offsetTop = rect.top + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Set footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}