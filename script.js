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

// Wait for DOM and EmailJS to load
document.addEventListener("DOMContentLoaded", function() {
  let retryCount = 0;
  const maxRetries = 50; // 5 seconds total (50 * 100ms)
  
  // Initialize EmailJS when it's available
  function initEmailJS() {
    if (typeof emailjs !== "undefined") {
      emailjs.init("q2GWXMUir3i7mUxXW");
      setupContactForm();
    } else {
      retryCount++;
      if (retryCount < maxRetries) {
        // Retry after a short delay if EmailJS isn't loaded yet
        setTimeout(initEmailJS, 100);
      } else {
        // EmailJS failed to load
        console.error("EmailJS library failed to load. Please check your internet connection or CDN access.");
        const formMessage = document.getElementById("formMessage");
        if (formMessage) {
          formMessage.textContent = "Email service is temporarily unavailable. Please email me directly at dawoodchohaan46@gmail.com";
          formMessage.className = "form-message form-message-error";
          formMessage.style.display = "block";
        }
      }
    }
  }

  // Setup contact form
  function setupContactForm() {
    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const formMessage = document.getElementById("formMessage");

    if (contactForm && typeof emailjs !== "undefined") {
      contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        formMessage.style.display = "none";
        
        try {
          // Send email using EmailJS
          await emailjs.sendForm(
            "service_wct97t8",
            "template_32wz4nf",
            contactForm,
            "q2GWXMUir3i7mUxXW"
          );
          
          // Success message
          formMessage.textContent = "Message sent successfully! I'll get back to you soon.";
          formMessage.className = "form-message form-message-success";
          formMessage.style.display = "block";
          
          // Reset form
          contactForm.reset();
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            formMessage.style.display = "none";
          }, 5000);
          
        } catch (error) {
          // Error message with more details
          let errorMsg = "Failed to send message. ";
          
          if (error.message && error.message.includes("Failed to fetch")) {
            errorMsg += "Network error: Cannot reach email service. ";
            errorMsg += "Please check your internet connection or try again later. ";
            errorMsg += "You can also email me directly at dawoodchohaan46@gmail.com";
          } else {
            errorMsg += "Please try again or email me directly at dawoodchohaan46@gmail.com";
          }
          
          formMessage.textContent = errorMsg;
          formMessage.className = "form-message form-message-error";
          formMessage.style.display = "block";
          console.error("EmailJS Error:", error);
        } finally {
          // Re-enable submit button
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        }
      });
    }
  }

  // Start initialization
  initEmailJS();
});