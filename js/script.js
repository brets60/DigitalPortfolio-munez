/**
 * ============================================================================
 * DIGITAL PORTFOLIO - JECHELE ANE P. MUÑEZ
 * Ultra-Fast & Lightweight JavaScript
 * Optimized Canvas (2 Draw Calls/Frame), Throttled Scroll & Clean UX
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {



  // ==========================================================================
  // 2. HERO SUBTITLE ROTATION / TYPING
  // ==========================================================================
  const initTypingEffect = () => {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;

    const phrases = [
      "BSIT Student | Aspiring Full-Stack Developer",
      "Python & Web Systems Enthusiast",
      "Torres Capitol College Student",
      "Building Simple, Practical Digital Solutions"
    ];

    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = true;
    let typingSpeed = 60;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        typedElement.textContent = currentPhrase.substring(0, charIndex);
        typingSpeed = 30;
      } else {
        charIndex++;
        typedElement.textContent = currentPhrase.substring(0, charIndex);
        typingSpeed = 60;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    };

    setTimeout(typeLoop, 3000);
  };

  initTypingEffect();

  // ==========================================================================
  // 3. SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================================================
  const initScrollReveal = () => {
    const elements = document.querySelectorAll('.fade-up-element');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -30px 0px',
      threshold: 0.05
    });

    elements.forEach(el => observer.observe(el));
  };

  initScrollReveal();

  // ==========================================================================
  // 4. THROTTLED NAVBAR SCROLL EFFECT
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  let isScrolling = false;

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Navbar shadow toggle
        if (scrollY > 30) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        // Active link detection
        const scrollPos = scrollY + 140;
        let currentId = '';

        for (let i = 0; i < sections.length; i++) {
          const sec = sections[i];
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentId = sec.getAttribute('id');
            break;
          }
        }

        if (currentId) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }

        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  // ==========================================================================
  // 5. MOBILE DRAWER NAVIGATION
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileNav = () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      hamburgerIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    } else {
      hamburgerIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileNav);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        toggleMobileNav();
      }
    });
  });

  // ==========================================================================
  // 6. PROJECT DETAILS MODAL
  // ==========================================================================
  const projectData = {
    speed: {
      title: "Speed Detection and Warning System",
      category: "Hardware Prototype & Python Computer Vision",
      description: "A prototype system designed to detect vehicle speed and provide warnings to help improve pedestrian safety. The project integrates sensors and computational modules to monitor incoming vehicles, compute speed in real time, and trigger safety alerts.",
      problem: "Over-speeding along school zones and pedestrian crossings poses major hazards. This system provides a low-cost automated warning solution to alert oncoming motorists before accidents occur.",
      features: [
        "Real-time speed estimation using sensors and calibrated detection logic",
        "Automated audio-visual warning signals activated when speed limits are breached",
        "Python script for telemetry processing and threshold verification",
        "Hardware integration suitable for prototype road safety testing"
      ],
      technologies: ["Python", "Computer Vision", "Ultrasonic/Radar Sensors", "Alert Hardware", "Embedded Logic"]
    },
    laundry: {
      title: "Laundry Pickup and Delivery Management System",
      category: "Full-Stack Web Application",
      description: "A comprehensive web-based management system designed to streamline laundry services, customer pickups, schedule tracking, deliveries, and payment status recording.",
      problem: "Manual laundry logbooks often lead to misplaced clothing, delayed pickup schedules, and calculation discrepancies. This system centralizes tracking for both service staff and clients.",
      features: [
        "Online booking module for laundry pickup and delivery requests",
        "Automated laundry weight, service type, and price calculation",
        "Order status dashboard (Pending, In-Wash, Dried, Ready for Delivery)",
        "Secure relational database storage for order histories and payment records"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Flask (Python)", "SQL Database", "RESTful Routing"]
    },
    breta: {
      title: "Breta AI",
      category: "AI & Educational Application",
      description: "An interactive English learning application designed to help users practice everyday conversations, improve English grammar, and develop stronger verbal and written communication confidence.",
      problem: "Many students and English language learners lack consistent conversational practice partners. Breta AI offers a supportive, 24/7 conversational environment with constructive grammatical guidance.",
      features: [
        "Natural conversational dialog interface tailored for student practice",
        "Immediate grammar inspection and clear contextual suggestions",
        "Vocabulary enrichment feedback based on learner input",
        "Lightweight, responsive interface accessible from both mobile and desktop"
      ],
      technologies: ["Python", "Natural Language Processing (NLP)", "Interactive Web UI", "Prompt Engineering", "JSON Data Store"]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const projectModalTitle = document.getElementById('modal-project-title');
  const projectModalBody = document.getElementById('modal-project-body');
  const closeProjectModalBtn = document.getElementById('close-project-modal');
  const viewProjectButtons = document.querySelectorAll('.btn-view-project');

  const openProjectModal = (projectKey) => {
    const data = projectData[projectKey];
    if (!data) return;

    projectModalTitle.textContent = data.title;
    projectModalBody.innerHTML = `
      <div class="project-modal-meta">
        <span class="project-cat-badge">${data.category}</span>
      </div>
      <p class="project-modal-desc">${data.description}</p>
      
      <div style="background-color: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--accent-hover); font-weight: 700; margin-bottom: 0.35rem;">
          Problem & Purpose
        </h4>
        <p style="font-size: 0.9125rem; color: var(--text-muted); line-height: 1.55;">${data.problem}</p>
      </div>

      <h4 class="modal-section-title">Key Capabilities & Features</h4>
      <ul class="project-features-list">
        ${data.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h4 class="modal-section-title" style="margin-top: 1rem;">Technologies Utilized</h4>
      <div class="project-tech-tags" style="margin-bottom: 1.5rem;">
        ${data.technologies.map(t => `<span class="tech-tag" style="background-color: var(--accent-soft); color: var(--accent-dark); border-color: var(--accent-border);">${t}</span>`).join('')}
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
        <button class="btn btn-secondary btn-sm" id="inner-close-btn" type="button">Close</button>
      </div>
    `;

    document.getElementById('inner-close-btn')?.addEventListener('click', closeProjectModal);

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  viewProjectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-project');
      openProjectModal(projectKey);
    });
  });

  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener('click', closeProjectModal);
  }

  // ==========================================================================
  // 7. RESUME & CV MODAL
  // ==========================================================================
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const mobileResumeBtn = document.getElementById('mobile-resume-btn');
  const closeResumeModalBtn = document.getElementById('close-resume-modal');

  const openResumeModal = () => {
    resumeModal.classList.add('active');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeResumeModal = () => {
    resumeModal.classList.remove('active');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResumeModal);
  if (mobileResumeBtn) mobileResumeBtn.addEventListener('click', () => {
    toggleMobileNav();
    openResumeModal();
  });
  if (closeResumeModalBtn) closeResumeModalBtn.addEventListener('click', closeResumeModal);

  // Close modals on clicking overlay backdrop
  [projectModal, resumeModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal.classList.contains('active')) closeProjectModal();
      if (resumeModal.classList.contains('active')) closeResumeModal();
    }
  });

  // ==========================================================================
  // 8. CLIPBOARD COPY UTILITIES
  // ==========================================================================
  const setupCopyBtn = (btnId, textToCopy) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied! ✓';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  };

  setupCopyBtn('copy-email-btn', 'jechelemunez01@gmail.com');
  setupCopyBtn('copy-phone-btn', '09922178120');

  // ==========================================================================
  // 9. CONTACT FORM INTERACTION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          Send Message
        `;

        formStatus.classList.add('success');
        formStatus.style.display = 'flex';
        contactForm.reset();

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 6000);
      }, 500);
    });
  }

  // ==========================================================================
  // 10. BACK TO TOP BUTTON
  // ==========================================================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
