/**
 * ALLIANCE BARRA MANSA - LANDING PAGE INTERACTIVITY, ANIMATIONS & CONVERSION
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const bookingModal = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.js-open-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('#mobileNav a');
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  // Phone Number Alliance BM
  const whatsappNumber = '5524974029313';

  // ==========================================
  // 1. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ==========================================
  // 2. FAQ ACCORDION INTERACTIVITY
  // ==========================================
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const faqItem = trigger.parentElement;
      const isOpen = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const triggerBtn = item.querySelector('.faq-trigger');
        if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        faqItem.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ==========================================
  // 3. MODAL CONTROLLERS & WHATSAPP GENERATOR
  // ==========================================
  function openModal(defaultModalLevel = '') {
    if (bookingModal) {
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (defaultModalLevel) {
        const levelSelect = document.getElementById('studentLevel');
        if (levelSelect) levelSelect.value = defaultModalLevel;
      }
    }
  }

  function closeModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const level = btn.getAttribute('data-level') || '';
      openModal(level);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle Form Submission -> WhatsApp Link
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('studentName').value.trim();
      const level = document.getElementById('studentLevel').value;
      const period = document.getElementById('preferredPeriod').value;
      const notes = document.getElementById('studentNotes').value.trim();

      if (!name) {
        alert('Por favor, informe o seu nome para continuarmos o agendamento.');
        return;
      }

      let message = `Olá, equipe *Alliance Barra Mansa*!\n\n`;
      message += `Gostaria de agendar minha *AULA EXPERIMENTAL* de Jiu-Jitsu!\n\n`;
      message += `📌 *Nome:* ${name}\n`;
      message += `🥋 *Nível Atual:* ${level}\n`;
      if (period) {
        message += `⏰ *Horário de Preferência:* ${period}\n`;
      }
      if (notes) {
        message += `📝 *Observação:* ${notes}\n`;
      }
      message += `\nAguardo a confirmação da disponibilidade. OSS! 👊`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
      closeModal();
      bookingForm.reset();
    });
  }

  // ==========================================
  // 4. MOBILE MENU & UX CONTROLLERS
  // ==========================================
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle('hidden');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (mobileNav.classList.contains('hidden')) {
          icon.className = 'fa-solid fa-bars';
        } else {
          icon.className = 'fa-solid fa-xmark';
        }
      }
    });

    // Close mobile menu when clicking a link inside
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target) && !mobileNav.classList.contains('hidden')) {
        mobileNav.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // Header Scroll Effect
  const header = document.getElementById('mainHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('bg-black/95', 'backdrop-blur-md', 'shadow-2xl', 'py-2.5');
        header.classList.remove('py-3.5', 'bg-transparent');
      } else {
        header.classList.remove('bg-black/95', 'backdrop-blur-md', 'shadow-2xl', 'py-2.5');
        header.classList.add('bg-transparent', 'py-3.5');
      }
    });
  }
});
