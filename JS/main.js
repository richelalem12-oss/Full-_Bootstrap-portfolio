// Main JavaScript for Portfolio

// DOM Elements
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");
const navLinks = document.querySelectorAll(".nav-link");
const indicator = document.getElementById("indicator");
const sections = document.querySelectorAll("section[id]");

// Sidebar Toggle for Mobile
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("hide");
});

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (
    window.innerWidth < 768 &&
    !sidebar.contains(e.target) &&
    !menuToggle.contains(e.target) &&
    !sidebar.classList.contains("hide")
  ) {
    sidebar.classList.add("hide");
  }
});

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const icon = themeToggle.querySelector("i");

  // Toggle icon
  if (document.body.classList.contains("dark")) {
    icon.className = "bi-sun";
    localStorage.setItem("theme", "dark");
  } else {
    icon.className = "bi-moon";
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.querySelector("i").className = "bi-sun";
}

// Update active nav link on scroll
function updateActiveNav() {
  let scrollPos = window.scrollY + 100;

  // Find active section
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      // Update active nav link
      navLinks.forEach((link) => {
        if (link.getAttribute("data-target") === sectionId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // Move indicator
      const activeLink = document.querySelector(".nav-link.active");
      if (activeLink && indicator) {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = activeLink.closest(".nav").getBoundingClientRect();
        indicator.style.top = `${linkRect.top - navRect.top}px`;
      }
    }
  });
}

// Smooth scroll to section
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("data-target");
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Update active link immediately
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Smooth scroll
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });

      // Close sidebar on mobile after click
      if (window.innerWidth < 768) {
        sidebar.classList.add("hide");
      }
    }
  });
});

// Counter animation for stats
function animateCounter() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Set initial active nav
  updateActiveNav();

  // Initialize counters when stats section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    observer.observe(statsSection);
  }
});

// Update nav on scroll
window.addEventListener("scroll", () => {
  updateActiveNav();
});

// Handle window resize
window.addEventListener("resize", () => {
  // Update indicator position
  updateActiveNav();

  // Show sidebar on desktop, hide toggle button
  if (window.innerWidth >= 768) {
    sidebar.classList.remove("hide");
    menuToggle.style.display = "none";
  } else {
    menuToggle.style.display = "block";
  }
});

// Initialize on load
window.dispatchEvent(new Event("resize"));

// Form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple form validation
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (name && email && message) {
      // Here you would typically send the data to a server
      alert("Thank you for your message! I'll get back to you soon.");
      contactForm.reset();
    } else {
      alert("Please fill in all fields.");
    }
  });
}

// Project card hover effect enhancement
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// Service card hover effect
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// Floating cards animation with GSAP (if GSAP is loaded)
if (typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Animate floating cards in hero
  const cards = document.querySelectorAll(".floating-cards .card");
  cards.forEach((card, index) => {
    gsap.to(card, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.5,
    });
  });

  // Parallax effect for hero
  gsap.to(".hero-avatar", {
    y: -50,
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

// Typing effect for hero text
const heroText = document.querySelector(".hero-text .text-warning");
if (heroText && typeof Typewriter !== "undefined") {
  new Typewriter(heroText, {
    strings: ["Creative Developer", "UI/UX Designer", "Frontend Developer"],
    autoStart: true,
    loop: true,
    delay: 50,
    deleteSpeed: 30,
  });
}
