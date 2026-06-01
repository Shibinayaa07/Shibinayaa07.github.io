(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close');
  const typingTarget = document.getElementById('typing-text');
  const contactForm = document.getElementById('contact-form');
  const revealItems = document.querySelectorAll('.reveal, .reveal-item');

  const preferredTheme = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', preferredTheme);

  function syncThemeButton() {
    themeToggle.setAttribute('aria-label', root.getAttribute('data-theme') === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function toggleTheme() {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    syncThemeButton();
  }

  themeToggle.addEventListener('click', toggleTheme);
  syncThemeButton();

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    });
  });

  const roles = [
    'Embedded Systems Developer',
    'IoT Enthusiast',
    'Full Stack Developer',
    'Problem Solver'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeRole() {
    const currentRole = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    typingTarget.textContent = currentRole.slice(0, charIndex);

    if (!deleting && charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeRole, 1200);
      return;
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    const delay = deleting ? 45 : 70;
    setTimeout(typeRole, delay);
  }

  typeRole();

  function createParticles() {
    const container = document.getElementById('particles');
    const count = window.innerWidth < 768 ? 18 : 32;

    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement('span');
      const size = 4 + Math.random() * 5;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${100 + Math.random() * 30}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = `${0.18 + Math.random() * 0.5}`;
      particle.style.animationDuration = `${10 + Math.random() * 12}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.setProperty('--dx', `${(Math.random() * 160) - 80}px`);
      container.appendChild(particle);
    }
  }

  createParticles();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealItems.forEach((item) => observer.observe(item));

  function openModal(title, content) {
    modalBody.innerHTML = `
      <p class="section-label">Project Details</p>
      <h3 id="modal-title">${title}</h3>
      <div class="modal-content">${content}</div>
    `;
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalBody.innerHTML = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  const projectDetails = {
    jasmine: {
      title: 'Jasmine Plant Protection System',
      content: '<p>IoT crop protection using UV-C sterilization and electrostatic pest control. Built on ESP32 + Arduino Nano with Blynk-based remote monitoring and control.</p>'
    },
    hostel: {
      title: 'Hostel Management System',
      content: '<p>Role-based hostel administration platform for room allocation, complaints, fee management, authentication, and database integration.</p>'
    },
    blog: {
      title: 'Blog Web Application',
      content: '<p>Full-stack blogging platform with secure authentication, CRUD operations, and SQL injection prevention using prepared statements.</p>'
    },
    animal: {
      title: 'Animal Shelter and Adoption Management System',
      content: '<p>Role-based platform for managing pet registrations, adoptions, donations, and medical records.</p>'
    },
    rfid: {
      title: 'RFID Smart Classroom Key Management System',
      content: '<p>RFID-based authentication system with secure access control and real-time activity logging.</p>'
    },
    fuse: {
      title: 'Automated Fuse Damage Detection System',
      content: '<p>Transformer fault detection system with instant GPS-based maintenance alerts and sensor-driven fault monitoring.</p>'
    }
  };

  document.querySelectorAll('.details-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const projectKey = button.getAttribute('data-project');
      const project = projectDetails[projectKey] || { title: 'Project', content: '<p>Details coming soon.</p>' };
      openModal(project.title, project.content);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = encodeURIComponent(formData.get('subject'));
    const message = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${formData.get('message')}`);
    window.location.href = `mailto:shibinayaas@gmail.com?subject=${subject}&body=${message}`;
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
})();
