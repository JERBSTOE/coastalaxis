// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Mobile dropdown toggles
document.querySelectorAll('.nav-dropdown > a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});

// Close mobile menu when clicking a non-dropdown link
document.querySelectorAll('.nav a:not(.nav-dropdown > a)').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      nav.classList.remove('open');
    }
  });
});

// Handle contact form submission via AJAX
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    }).then(function(response) {
      if (response.ok) {
        contactForm.innerHTML = '<div style="text-align:center; padding: 2rem 0;"><h3 style="color: var(--navy); margin-bottom: 0.5rem;">Thank You!</h3><p style="color: var(--dark-gray);">Your request has been submitted. Jared will be in touch within one business day.</p></div>';
      } else {
        btn.disabled = false;
        btn.textContent = 'Submit Request';
        alert('Something went wrong. Please try again or email jared@coastalaxis.com directly.');
      }
    }).catch(function() {
      btn.disabled = false;
      btn.textContent = 'Submit Request';
      alert('Something went wrong. Please try again or email jared@coastalaxis.com directly.');
    });
  });
}

// Set active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach(link => {
  link.classList.remove('active');
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
