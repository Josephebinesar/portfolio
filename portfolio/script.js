// ========================================
// JOSEPH EBINESAR â€“ PORTFOLIO JAVASCRIPT v2
// AI Engineer Â· ML Developer Â· Creator of FeelUp
// ========================================

// ========================================
// VISITOR COUNTER
// ========================================
(function initVisitorCounter() {
  const countEl = document.getElementById('visitorCount');
  if (!countEl) return;

  // Get current count from localStorage (simulates a real counter for local use)
  let count = parseInt(localStorage.getItem('portfolio_visitor_count') || '0', 10);

  // Increment once per session
  const sessionKey = 'portfolio_session_counted';
  if (!sessionStorage.getItem(sessionKey)) {
    count += 1;
    localStorage.setItem('portfolio_visitor_count', count.toString());
    sessionStorage.setItem(sessionKey, '1');
  }

  // Animate the count up
  const target = count;
  let current = Math.max(0, target - 30);
  countEl.textContent = current;

  const animInterval = setInterval(() => {
    if (current >= target) {
      clearInterval(animInterval);
      countEl.textContent = target.toLocaleString();
      return;
    }
    current += Math.ceil((target - current) / 8);
    countEl.textContent = current.toLocaleString();
  }, 60);

  // Optionally try for a real count via GoatCounter or CountAPI (fallback gracefully)
  fetch('https://api.countapi.xyz/hit/josephebinesar-portfolio/visits')
    .then(r => r.json())
    .then(data => {
      if (data && data.value) {
        const realCount = data.value;
        localStorage.setItem('portfolio_visitor_count', realCount.toString());
        let c = parseInt(countEl.textContent, 10);
        const step = () => {
          if (c >= realCount) { countEl.textContent = realCount.toLocaleString(); return; }
          c += Math.ceil((realCount - c) / 6);
          countEl.textContent = c.toLocaleString();
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    })
    .catch(() => {/* silently fail, use localStorage count */ });
})();

// ========================================
// PARTICLE CANVAS â€“ Neural Network Style
// ========================================
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -1000, y: -1000 };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initParticleArray(); });

  // Track mouse for interactive particles
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const COLORS = ['rgba(0,245,212,', 'rgba(247,37,133,', 'rgba(67,97,238,', 'rgba(255,214,10,'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.8 + 0.4;
      this.alpha = Math.random() * 0.6 + 0.1;
      this.colorBase = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.pulse += 0.02;

      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.vx += (dx / dist) * force * 0.3;
        this.vy += (dy / dist) * force * 0.3;
      }

      // Speed damping
      this.vx *= 0.99;
      this.vy *= 0.99;

      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      const pulsedAlpha = this.alpha * (0.7 + 0.3 * Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.colorBase}${pulsedAlpha})`;
      ctx.fill();
    }
  }

  function initParticleArray() {
    const count = Math.min(150, Math.floor((canvas.width * canvas.height) / 9000));
    particles = Array.from({ length: count }, () => new Particle());
  }
  initParticleArray();

  function drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,245,212,${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
})();

// ========================================
// THEME TOGGLE
// ========================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
if (localStorage.getItem('theme') === 'light') body.classList.add('light-mode');
themeToggle?.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// ========================================
// MOBILE NAVIGATION
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu?.classList.toggle('active');
});
navLinks.forEach(link => link.addEventListener('click', () => {
  hamburger?.classList.remove('active');
  navMenu?.classList.remove('active');
}));
document.addEventListener('click', e => {
  if (navMenu && hamburger && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// ========================================
// STICKY NAVBAR
// ========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
const sections = document.querySelectorAll('section[id]');
function highlightNavOnScroll() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      navLink?.classList.add('active');
    }
  });
}
window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

// ========================================
// SCROLL REVEAL WITH STAGGER
// ========================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      const children = entry.target.querySelectorAll('.reveal-card');
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('in-view'), i * 130);
      });
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-section').forEach(el => revealObserver.observe(el));

// ========================================
// COUNTER ANIMATION (stat numbers)
// ========================================
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(el => {
        const text = el.textContent.trim();
        const num = parseFloat(text);
        if (isNaN(num)) return;
        const isDecimal = text.includes('.');
        const suffix = text.replace(/[0-9.]/g, '');
        let current = 0;
        const duration = 1500;
        const start = performance.now();
        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          current = num * eased;
          el.textContent = isDecimal ? current.toFixed(2) + suffix : Math.floor(current) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = text;
        }
        requestAnimationFrame(tick);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.about-stats').forEach(el => statObserver.observe(el));

// ========================================
// PERFORMANCE METRIC COUNTER ANIMATION
// ========================================
const perfObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.perf-metric').forEach(el => {
        const orig = el.textContent.trim();
        el.textContent = orig; // No numeric animation for metrics with special chars
        el.style.animation = 'fade-in-metric 0.6s ease both';
      });
      perfObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.perf-grid').forEach(el => perfObserver.observe(el));

// ========================================
// ACHIEVEMENTS SLIDER
// ========================================
(function initAchievementsSlider() {
  const slider = document.getElementById('achievementsSlider');
  const prevBtn = document.getElementById('achieveSliderPrev');
  const nextBtn = document.getElementById('achieveSliderNext');
  const dotsContainer = document.getElementById('achieveDots');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.achievement-slide'));
  if (!slides.length) return;

  let currentIndex = 0;
  let autoPlay;

  function getVisible() {
    return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  }

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); resetAuto(); });
    dotsContainer?.appendChild(dot);
  });

  function updateDots() {
    const dots = dotsContainer?.querySelectorAll('.slider-dot');
    dots?.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }

  function goTo(index) {
    const visible = getVisible();
    const maxIndex = Math.max(0, slides.length - visible);
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    const slideW = slides[0].offsetWidth + 20; // gap ~1.25rem
    slider.scrollTo({ left: currentIndex * slideW, behavior: 'smooth' });
    updateDots();
  }

  prevBtn?.addEventListener('click', () => { goTo(currentIndex - 1); resetAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(currentIndex + 1); resetAuto(); });

  function startAuto() {
    autoPlay = setInterval(() => {
      const visible = getVisible();
      const maxIndex = slides.length - visible;
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      goTo(currentIndex);
    }, 3500);
  }

  function resetAuto() { clearInterval(autoPlay); startAuto(); }
  startAuto();

  // Swipe support
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goTo(currentIndex + 1) : goTo(currentIndex - 1); resetAuto(); }
  }, { passive: true });

  window.addEventListener('resize', () => goTo(0));
})();

// ========================================
// SKILL KEYS â€“ TOUCH SUPPORT
// ========================================
document.querySelectorAll('.skill-key').forEach(key => {
  key.addEventListener('touchstart', () => {
    document.querySelectorAll('.skill-key').forEach(k => { if (k !== key) k.blur(); });
    key.focus();
  }, { passive: true });
  key.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); key.focus(); }
  });
});

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();
  if (!name || !email || !message) return alert('Please fill in all fields.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Enter a valid email.');
  if (message.length < 10) return alert('Message too short.');
  contactForm.style.display = 'none';
  formSuccess?.classList.add('show');
  formSuccess?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  contactForm.reset();
  setTimeout(() => { formSuccess?.classList.remove('show'); contactForm.style.display = 'flex'; }, 5000);
});

document.querySelectorAll('.form-group input, .form-group textarea').forEach(inp => {
  inp.addEventListener('focus', () => inp.parentElement.classList.add('focused'));
  inp.addEventListener('blur', () => { if (!inp.value) inp.parentElement.classList.remove('focused'); });
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') { e.preventDefault(); return; }
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ========================================
// BACK TO TOP
// ========================================
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTopBtn?.classList.toggle('show', window.scrollY > 500);
}, { passive: true });
backToTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ========================================
// PARALLAX BLOBS
// ========================================
const blobs = document.querySelectorAll('.blob');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      blobs.forEach((blob, i) => {
        const speed = 0.06 + i * 0.03;
        blob.style.transform = `translateY(${-(scrollY * speed)}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// ========================================
// CURSOR GLOW EFFECT
// ========================================
(function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; width:300px; height:300px;
    border-radius:50%; pointer-events:none;
    background:radial-gradient(circle, rgba(0,245,212,0.04) 0%, transparent 70%);
    transform:translate(-50%,-50%);
    z-index:0; transition:opacity 0.3s ease;
    mix-blend-mode:screen;
  `;
  document.body.appendChild(glow);

  let cx = 0, cy = 0;
  let tx = 0, ty = 0;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  function animateGlow() {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
})();

// ========================================
// TYPING ANIMATION FOR HERO ROLES
// ========================================
(function initTypingEffect() {
  const roles = ['AI Engineer', 'Machine Learning Engineer', 'Software Developer', 'FeelUp Creator'];
  const roleEls = document.querySelectorAll('.role-tag');
  if (!roleEls.length) return;

  let roleIdx = 0;
  setInterval(() => {
    roleIdx = (roleIdx + 1) % roles.length;
    // Pulse the middle role-tag slightly
    roleEls.forEach((el, i) => {
      el.style.transition = 'opacity 0.4s ease';
      if (i === 1) {
        el.style.opacity = '0';
        setTimeout(() => {
          el.textContent = roles[roleIdx];
          el.style.opacity = '1';
        }, 400);
      }
    });
  }, 3000);
})();

// ========================================
// TILT EFFECT ON PROJECT CARDS
// ========================================
document.querySelectorAll('.project-card, .innovation-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

// ========================================
// ACCESSIBILITY
// ========================================
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
Object.assign(skipLink.style, {
  position: 'absolute', top: '-40px', left: '0',
  background: '#00f5d4', color: '#000', padding: '8px 16px',
  textDecoration: 'none', zIndex: '9999', borderRadius: '0 0 8px 0',
  fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: '700'
});
skipLink.addEventListener('focus', () => { skipLink.style.top = '0'; });
skipLink.addEventListener('blur', () => { skipLink.style.top = '-40px'; });
document.body.insertBefore(skipLink, document.body.firstChild);

document.querySelectorAll('.project-card, .stat-card, .paper-card, .innovation-card').forEach(card => {
  card.setAttribute('tabindex', '0');
});

// ========================================
// CONSOLE BRANDING
// ========================================
console.log('%c ðŸ¤– Joseph Ebinesar â€“ AI Engineer ', 'background:linear-gradient(135deg,#00f5d4,#4361ee,#f72585);color:#000;padding:12px 24px;border-radius:50px;font-size:14px;font-weight:bold;');
console.log('%c FeelUp Creator Â· Tech With Ebi Â· HITS Chennai ', 'color:#00f5d4;font-size:11px;padding:4px 0;');
console.log('%c https://feelup.vercel.app | github.com/Josephebinesar ', 'color:#f72585;font-size:11px;');

// Performance
window.addEventListener('load', () => {
  const timing = performance?.timing;
  if (timing) console.log(`%c âš¡ Loaded in ${timing.domContentLoadedEventEnd - timing.navigationStart}ms`, 'color:#06d6a0;font-weight:bold;');
});

// Easter egg
let konamiBuffer = [];
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
document.addEventListener('keydown', e => {
  konamiBuffer.push(e.key);
  konamiBuffer = konamiBuffer.slice(-10);
  if (konamiBuffer.join('') === KONAMI.join('')) {
    document.body.style.animation = 'rainbow 2s linear infinite';
    setTimeout(() => { document.body.style.animation = ''; }, 5000);
    console.log('%c ðŸŽ‰ Easter Egg! You found it!', 'background:#ffd60a;color:#000;padding:10px;font-size:20px;font-weight:bold;');
  }
});

// ========================================
// ACHIEVEMENT GALLERY MODAL
// ========================================
const achieveData = {
  gyan2025: {
    title: '1st Prize – Gyan Disha 2025',
    desc: 'Won 1st place showcasing AI innovation at the university-level technical event Gyan Disha 2025 at HITS, Chennai. A milestone achievement!',
    photos: [
      { src: 'images/2 year ghyan disha/certificate.jpeg', label: 'Winner Certificate – Gyan Disha 2025' },
      { src: 'images/2 year ghyan disha/Gyan Disha with friends.JPG.jpeg', label: 'Team Celebration with Friends' },
      { src: 'images/2 year ghyan disha/poster.jpeg', label: 'Project Poster Display' },
    ]
  },
  infosys: {
    title: 'Infosys Hackathon 2024',
    desc: 'Participated in Infosys Hackathon, building enterprise AI solutions in a 24-hour competitive sprint with a passionate team.',
    photos: [
      { src: 'images/infosys hackaton/team photo.jpeg', label: 'Team Photo at Infosys Hackathon' },
      { src: 'images/infosys hackaton/certificate.jpeg', label: 'Certificate of Participation' },
    ]
  },
  google: {
    title: 'Google Thinkathon 2024',
    desc: 'Participated in Google Thinkathon, generating innovative tech solutions under the guidance of Google mentors and industry experts.',
    photos: [
      { src: 'images/google thinkathon/Thinkathon.jpg.jpeg', label: 'At the Google Thinkathon Event' },
    ]
  },
  saveetha: {
    title: 'Saveetha Innovation Challenge 2024',
    desc: 'Competed in Saveetha College Innovation Challenge, presenting an AI-driven solution for healthcare accessibility and digital wellness.',
    photos: [
      { src: 'images/saveetha hackathon/team photo.jpeg', label: 'Team Photo – Saveetha Hackathon' },
      { src: 'images/saveetha hackathon/certificate.jpeg', label: 'Participation Certificate' },
    ]
  },
  srm: {
    title: 'SRM Hackathon 2023',
    desc: 'Participated in SRM Institute hackathon, building innovative software solutions within a time-limited sprint.',
    photos: [
      { src: 'images/srm hackathon/certificate.jpeg', label: 'SRM Hackathon Certificate' },
    ]
  },
  think3: {
    title: 'Thinkathon – 3rd Year (2025)',
    desc: 'Third year competing in HITS Thinkathon with evolved AI projects and deeper technical expertise.',
    photos: [
      { src: 'images/thinkathon 3rd year/WhatsApp Image 2026-04-21 at 10.38.26 PM.jpeg', label: 'Thinkathon 3rd Year Participation' },
      { src: 'images/thinkathon 3rd year/certificate.jpeg', label: 'Certificate – Thinkathon 3rd Year' },
    ]
  },
  gyan1: {
    title: 'Gyan Disha – 1st Year (2023)',
    desc: 'First year participation in Gyan Disha – the beginning of competitive tech events, with the HOD and core team.',
    photos: [
      { src: 'images/gyan disha 1st year/with friends with hod.jpeg', label: 'With Friends and HOD – Gyan Disha 2023' },
      { src: 'images/gyan disha 1st year/certificate.jpeg', label: 'Certificate – Gyan Disha 1st Year' },
    ]
  },
};

window.openAchieveModal = function(eventId) {
  const data = achieveData[eventId];
  if (!data) return;
  const modal = document.getElementById('achieveModal');
  document.getElementById('achieveModalTitle').textContent = data.title;
  document.getElementById('achieveModalDesc').textContent = data.desc;
  const photosEl = document.getElementById('achieveModalPhotos');
  photosEl.innerHTML = data.photos.map(p =>
    '<div class="achieve-modal-photo"><img src="' + p.src + '" alt="' + p.label + '" loading="lazy" onerror="this.style.display=\'none\'"><p class="achieve-modal-photo-label">' + p.label + '</p></div>'
  ).join('');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeAchieveModal = function() {
  document.getElementById('achieveModal')?.classList.remove('open');
  document.body.style.overflow = '';
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAchieveModal();
});

// ========================================
// RESEARCH EXPAND TOGGLE
// ========================================
window.toggleResearchDetails = function() {
  const panel = document.getElementById('researchDetailsPanel');
  const btn = document.getElementById('researchToggleBtn');
  const txt = document.getElementById('researchToggleText');
  if (!panel) return;
  const isOpen = panel.style.display !== 'none';
  if (isOpen) {
    panel.style.display = 'none';
    btn.classList.remove('expanded');
    txt.textContent = '📖 See Full Research Details';
  } else {
    panel.style.display = 'flex';
    panel.classList.add('animating');
    btn.classList.add('expanded');
    txt.textContent = '🔼 Hide Research Details';
    setTimeout(() => panel.classList.remove('animating'), 600);
    // Re-trigger reveal animations inside
    panel.querySelectorAll('.reveal-card').forEach(el => {
      setTimeout(() => el.classList.add('in-view'), 100);
    });
  }
};

// ========================================
// 3D FLOATING SHAPES – inject into DOM
// ========================================
(function inject3DShapes() {
  const scene = document.createElement('div');
  scene.className = 'bg-3d-scene';
  const shapes = [
    { cls: 'shape-cube', style: 'top:10%;left:5%;animation-delay:0s' },
    { cls: 'shape-ring', style: 'top:60%;left:90%;animation-delay:3s' },
    { cls: 'shape-dot', style: 'top:30%;left:80%;animation-delay:1s' },
    { cls: 'shape-cube', style: 'top:80%;left:15%;animation-delay:6s' },
    { cls: 'shape-ring', style: 'top:20%;left:50%;animation-delay:9s' },
    { cls: 'shape-dot', style: 'top:70%;left:60%;animation-delay:4s' },
    { cls: 'shape-cube', style: 'top:45%;left:25%;animation-delay:2s' },
  ];
  shapes.forEach(s => {
    const el = document.createElement('div');
    el.className = 'shape-3d ' + s.cls;
    el.setAttribute('style', s.style);
    scene.appendChild(el);
  });
  document.body.insertBefore(scene, document.body.firstChild);
})();