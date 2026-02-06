// ========================================
// JOSEPH EBINESAR - PORTFOLIO JAVASCRIPT
// Modern, Animated, Interactive Features
// ========================================

// ========================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ========================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme preference from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  
  // Save preference to localStorage
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

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
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
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // Add scrolled class for styling
  if (currentScrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollY = currentScrollY;
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
      if (navLink) {
        navLink.classList.add('active');
      }
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
    
    // Skip if it's just "#" (empty anchor)
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

// Observe all sections and major elements
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
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Basic validation
  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }
  
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Message length validation
  if (message.length < 10) {
    alert('Please enter a message with at least 10 characters.');
    return;
  }
  
  // Simulate form submission (in production, this would send to a backend)
  console.log('Form submitted:', { name, email, message });
  
  // Hide form and show success message
  contactForm.style.display = 'none';
  formSuccess.classList.add('show');
  
  // Reset form
  contactForm.reset();
  
  // Scroll to success message
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Reset after 5 seconds
  setTimeout(() => {
    formSuccess.classList.remove('show');
    contactForm.style.display = 'flex';
  }, 5000);
});

// ========================================
// DYNAMIC TYPING EFFECT (OPTIONAL ENHANCEMENT)
// ========================================

// You can uncomment this section if you want a typing effect on the hero subtitle
/*
const subtitleElement = document.querySelector('.hero-subtitle');
const subtitleText = 'Software Developer | Python | Web Development | MySQL';
let charIndex = 0;

function typeSubtitle() {
  if (charIndex < subtitleText.length) {
    subtitleElement.textContent = subtitleText.substring(0, charIndex + 1);
    charIndex++;
    setTimeout(typeSubtitle, 50);
  }
}

// Start typing effect after page loads
window.addEventListener('load', () => {
  subtitleElement.textContent = '';
  setTimeout(typeSubtitle, 500);
});
*/

// ========================================
// ANIMATED COUNTER FOR STATS (OPTIONAL)
// ========================================

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Example usage (if you add stat counters to your page):
// const statElements = document.querySelectorAll('.stat-number');
// statElements.forEach(el => {
//   const target = parseInt(el.getAttribute('data-target'));
//   animateCounter(el, target);
// });

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
// CURSOR TRAIL EFFECT (OPTIONAL PREMIUM FEATURE)
// ========================================

// Uncomment this section for a premium cursor trail effect
/*
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement('div');
cursorOutline.className = 'cursor-outline';
document.body.appendChild(cursorOutline);

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;
});

function animateCursorOutline() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;
  
  cursorOutline.style.left = `${outlineX}px`;
  cursorOutline.style.top = `${outlineY}px`;
  
  requestAnimationFrame(animateCursorOutline);
}

animateCursorOutline();

// Add these styles to your CSS if you enable cursor trail:
// .cursor-dot {
//   width: 8px;
//   height: 8px;
//   background: var(--accent-primary);
//   border-radius: 50%;
//   position: fixed;
//   pointer-events: none;
//   z-index: 9999;
//   transform: translate(-50%, -50%);
// }
// .cursor-outline {
//   width: 30px;
//   height: 30px;
//   border: 2px solid var(--accent-primary);
//   border-radius: 50%;
//   position: fixed;
//   pointer-events: none;
//   z-index: 9999;
//   transform: translate(-50%, -50%);
//   transition: width 0.2s, height 0.2s;
// }
*/

// ========================================
// LAZY LOADING FOR IMAGES (IF YOU ADD IMAGES)
// ========================================

// Uncomment if you add project images or other media
/*
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
*/

// ========================================
// PREVENT CONSOLE ERRORS & DEBUGGING
// ========================================

// Log successful initialization
console.log('%c Portfolio Loaded Successfully! ', 'background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;');
console.log('%c Developed by Joseph Ebinesar ', 'color: #6366f1; font-size: 12px;');

// ========================================
// PERFORMANCE MONITORING (OPTIONAL)
// ========================================

window.addEventListener('load', () => {
  // Log page load time
  const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
  console.log(`Page loaded in ${loadTime}ms`);
  
  // Check if all critical elements are present
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
// EASTER EGG (OPTIONAL FUN FEATURE)
// ========================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join('') === konamiSequence.join('')) {
    // Easter egg activated!
    document.body.style.animation = 'rainbow 2s linear infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
    
    console.log('%c 🎉 Easter Egg Activated! 🎉 ', 'background: #ff0; color: #000; padding: 10px; font-size: 20px; font-weight: bold;');
  }
});

// Add this to CSS if you want the rainbow effect:
// @keyframes rainbow {
//   0% { filter: hue-rotate(0deg); }
//   100% { filter: hue-rotate(360deg); }
// }

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Skip to main content functionality
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

// Keyboard navigation for cards
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
  // Add floating label effect
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', () => {
    if (!input.value) {
      input.parentElement.classList.remove('focused');
    }
  });
  
  // Real-time validation feedback
  input.addEventListener('input', () => {
    if (input.validity.valid) {
      input.style.borderColor = 'var(--accent-primary)';
    } else {
      input.style.borderColor = 'var(--border-color)';
    }
  });
});

// ========================================
// PRELOADER (OPTIONAL)
// ========================================

// Uncomment if you want to add a loading screen
/*
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

// Add this HTML before closing body tag:
// <div id="preloader" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg-primary); display: flex; align-items: center; justify-content: center; z-index: 9999;">
//   <div style="width: 50px; height: 50px; border: 3px solid var(--border-color); border-top-color: var(--accent-primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>
// </div>
*/

// ========================================
// ANALYTICS TRACKING (PLACEHOLDER)
// ========================================

// Track button clicks for analytics
const trackableButtons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-outline');
trackableButtons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent.trim();
    console.log(`Button clicked: ${buttonText}`);
    
    // In production, send to analytics service:
    // gtag('event', 'button_click', { button_name: buttonText });
    // or
    // analytics.track('Button Clicked', { button: buttonText });
  });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      console.log(`Section viewed: ${sectionId}`);
      
      // In production, send to analytics:
      // gtag('event', 'section_view', { section: sectionId });
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));

// ========================================
// END OF SCRIPT
// ========================================
