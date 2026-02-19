// ========================================
// JOSEPH EBINESAR - PORTFOLIO JAVASCRIPT
// Modern, Animated, Interactive Features
// ========================================

// ========================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ========================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');

  if (body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
});

// ========================================
// MOBILE NAVIGATION MENU
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// ========================================
// STICKY NAVBAR & SCROLL EFFECTS
// ========================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ========================================

const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    if (href === '#') {
      e.preventDefault();
      return;
    }

    const targetElement = document.querySelector(href);

    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll('.section > .container > *');
elementsToAnimate.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  observer.observe(el);
});

// ========================================
// BACK TO TOP BUTTON
// ========================================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========================================
// CONTACT FORM VALIDATION & SUBMISSION
// ========================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (message.length < 10) {
    alert('Please enter a message with at least 10 characters.');
    return;
  }

  console.log('Form submitted:', { name, email, message });

  contactForm.style.display = 'none';
  formSuccess.classList.add('show');

  contactForm.reset();

  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

  setTimeout(() => {
    formSuccess.classList.remove('show');
    contactForm.style.display = 'flex';
  }, 5000);
});

// ========================================
// PARALLAX EFFECT FOR BACKGROUND BLOBS
// ========================================

const blobs = document.querySelectorAll('.blob');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  blobs.forEach((blob, index) => {
    const speed = 0.1 + (index * 0.05);
    const yPos = -(scrollY * speed);
    blob.style.transform = `translateY(${yPos}px)`;
  });
});

// ========================================
// LOGS
// ========================================

console.log('%c Portfolio Loaded Successfully! ', 'background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;');
console.log('%c Developed by Joseph Ebinesar ', 'color: #6366f1; font-size: 12px;');

// ========================================
// PERFORMANCE MONITORING
// ========================================

window.addEventListener('load', () => {
  const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
  console.log(`Page loaded in ${loadTime}ms`);

  const criticalElements = [
    'navbar',
    'themeToggle',
    'contactForm',
    'backToTop'
  ];

  criticalElements.forEach(id => {
    if (!document.getElementById(id)) {
      console.warn(`Critical element missing: ${id}`);
    }
  });
});

// ========================================
// EASTER EGG
// ========================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);

  if (konamiCode.join('') === konamiSequence.join('')) {
    document.body.style.animation = 'rainbow 2s linear infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);

    console.log('%c 🎉 Easter Egg Activated! 🎉 ', 'background: #ff0; color: #000; padding: 10px; font-size: 20px; font-weight: bold;');
  }
});

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--accent-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
`;
skipLink.addEventListener('focus', () => {
  skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
  skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

const interactiveCards = document.querySelectorAll('.project-card, .skill-category, .achievement-card');
interactiveCards.forEach(card => {
  card.setAttribute('tabindex', '0');
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      card.click();
    }
  });
});

// ========================================
// FORM INPUT ENHANCEMENTS
// ========================================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });

  input.addEventListener('blur', () => {
    if (!input.value) {
      input.parentElement.classList.remove('focused');
    }
  });

  input.addEventListener('input', () => {
    if (input.validity.valid) {
      input.style.borderColor = 'var(--accent-primary)';
    } else {
      input.style.borderColor = 'var(--border-color)';
    }
  });
});

// ========================================
// ANALYTICS TRACKING (PLACEHOLDER)
// ========================================

const trackableButtons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-outline');
trackableButtons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent.trim();
    console.log(`Button clicked: ${buttonText}`);
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      console.log(`Section viewed: ${sectionId}`);
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));
