/**
 * seohack - Practical SEO & Digital Marketing Learning for Beginners
 * Main JavaScript file: Navigation, Filter/Search, FAQ accordion, Form handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('is-open');
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target) && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Dynamic Active Nav Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 3. Guides Filter & Search (For Guides & Digital Marketing Pages)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.querySelector('.search-input');
  const guideCards = document.querySelectorAll('.guide-card');
  const noResultsMsg = document.getElementById('no-results-msg');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterGuides() {
    let visibleCount = 0;

    guideCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const title = (card.querySelector('.guide-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.guide-excerpt')?.textContent || '').toLowerCase();

      const matchesCategory = activeCategory === 'all' || category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = title.includes(searchQuery) || desc.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-category') || 'all';
        filterGuides();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterGuides();
    });
  }

  // 4. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Optional: close other open items
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 5. Contact Form Simulation (No fake claims, honest polite feedback)
  const contactForm = document.getElementById('contact-form');
  const formSuccessAlert = document.getElementById('form-success-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        alert('Please complete all required fields.');
        return;
      }

      if (formSuccessAlert) {
        formSuccessAlert.style.display = 'block';
        contactForm.reset();
        formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // 6. Newsletter Form Simulation
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        alert('Thank you for subscribing! You will receive our latest practical beginner guides.');
        input.value = '';
      }
    });
  });
});
