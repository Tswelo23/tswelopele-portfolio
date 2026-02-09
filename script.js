// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navIcon = menuToggle ? menuToggle.querySelector('i') : null;

if (menuToggle && navLinks && navIcon) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navIcon.classList.toggle('fa-bars');
    navIcon.classList.toggle('fa-times');
  });

  // Close mobile menu when clicking a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navIcon.classList.add('fa-bars');
      navIcon.classList.remove('fa-times');
    });
  });

  // Close menu if user clicks outside nav (mobile UX)
  document.addEventListener('click', (e) => {
    const isClickInsideNav = e.target.closest('.navbar');
    if (!isClickInsideNav && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navIcon.classList.add('fa-bars');
      navIcon.classList.remove('fa-times');
    }
  });
}

// ===== Smooth Scrolling for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();

    // Match your CSS scroll-padding-top (navbar height)
    const offset = 110;
    const top = targetElement.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 140) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// ===== Contact Form Submission (Formspree) =====
const contactForm = document.querySelector('.contact-form');
const formNote = document.querySelector('#form-note');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const action = contactForm.getAttribute('action');
    if (!action || action === '#') {
      alert('Form action is missing. Add your Formspree action URL.');
      return;
    }

    const formData = new FormData(contactForm);

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        if (formNote) formNote.textContent = "Message sent! Thanks — I’ll reply soon.";
        contactForm.reset();
      } else {
        if (formNote) formNote.textContent = "Something went wrong. Please try again or email me directly.";
      }
    } catch (err) {
      if (formNote) formNote.textContent = "Network error. Please try again later or email me directly.";
    }
  });
}


// ===== Reveal Animations on Scroll =====
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target); // animate once
    }
  });
}, observerOptions);

document.querySelectorAll('.project-card, .timeline-item, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ===== CV Download Tracking (optional) =====
const downloadBtn = document.querySelector('.btn-download');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    console.log('CV download clicked');
  });
}
