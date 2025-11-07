
    // Loading Screen
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('fade-out');
      }, 1000);
    });

    // Enhanced Floating Contact Toggle
    const floatingToggle = document.getElementById('floatingToggle');
    const floatingContact = document.getElementById('floatingContact');

    floatingToggle.addEventListener('click', () => {
      floatingToggle.classList.toggle('active');
      floatingContact.classList.toggle('hidden');

      if (floatingToggle.classList.contains('active')) {
        floatingToggle.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        floatingToggle.innerHTML = '<i class="fas fa-comments"></i>';
      }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Intersection Observer for Animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in-up, .fade-in').forEach(el => {
      observer.observe(el);
    });

    // Counter Animation for Stats
    const animateCounter = (element, target, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          element.textContent = target.toLocaleString() + (target >= 1 ? '+' : '');
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(start).toLocaleString();
        }
      }, 16);
    };

    // Stats Counter Observer
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.stat-number');
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    // FAQ Toggle
    function toggleFAQ(element) {
      const faqItem = element.parentElement;
      const answer = faqItem.querySelector('.faq-answer');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          item.querySelector('.faq-answer').classList.remove('active');
        }
      });

      // Toggle current FAQ item
      faqItem.classList.toggle('active');
      answer.classList.toggle('active');
    }

    // Newsletter Subscription
    function handleNewsletter(event) {
      event.preventDefault();
      const form = event.target;
      const email = form.querySelector('input[type="email"]').value;
      const button = form.querySelector('button');

      // Simulate subscription
      button.innerHTML = '<i class="fas fa-check"></i>';
      button.style.background = 'var(--success)';

      setTimeout(() => {
        button.innerHTML = 'Subscribe';
        button.style.background = '';
        form.reset();
        alert('Thank you for subscribing to our newsletter!');
      }, 2000);
    }

    // Contact Form Handler
    function handleContactForm(event) {
      event.preventDefault();
      const form = event.target;
      const button = form.querySelector('.submit-btn');

      button.innerHTML = 'Sending...';
      button.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        button.innerHTML = 'Sent! <i class="fas fa-check"></i>';
        setTimeout(() => {
          button.innerHTML = 'Send Inquiry';
          button.disabled = false;
          form.reset();
          alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        }, 2000);
      }, 1500);
    }

    // Hero Slider Functionality
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    const totalSlides = slides.length;
    let slideInterval;
    const slideTimeout = 6000; // 6 seconds per slide

    function showSlide(index) {
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      // Add active class to current slide and dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');

      // Reset and start progress bar
      resetProgressBar();
      startProgressBar();
    }

    function nextSlide() {
      currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
      showSlide(currentSlideIndex);
    }

    function currentSlide(index) {
      currentSlideIndex = index - 1;
      showSlide(currentSlideIndex);
      restartSlideInterval();
    }

    function startSlideInterval() {
      slideInterval = setInterval(nextSlide, slideTimeout);
    }

    function restartSlideInterval() {
      clearInterval(slideInterval);
      startSlideInterval();
    }

    function startProgressBar() {
      const progressFill = document.getElementById('progressFill');
      progressFill.style.transition = 'width 6s linear';
      progressFill.style.width = '100%';
    }

    function resetProgressBar() {
      const progressFill = document.getElementById('progressFill');
      progressFill.style.transition = 'none';
      progressFill.style.width = '0%';
    }

    // Initialize slider
    document.addEventListener('DOMContentLoaded', function () {
      showSlide(0);
      startSlideInterval();

      // Pause on hover
      const heroSlider = document.querySelector('.hero-slider');
      heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });

      heroSlider.addEventListener('mouseleave', () => {
        startSlideInterval();
      });

      // Keyboard navigation
      document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
          currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
          showSlide(currentSlideIndex);
          restartSlideInterval();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          restartSlideInterval();
        }
      });
    });

    // Touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleGesture();
    });

    function handleGesture() {
      if (touchEndX < touchStartX - 50) {
        nextSlide();
        restartSlideInterval();
      }
      if (touchEndX > touchStartX + 50) {
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentSlideIndex);
        restartSlideInterval();
      }
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    function updateScrollEffects() {
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    });

    // Initialize animations on load
    window.addEventListener('load', () => {
      // Trigger initial animations
      document.querySelectorAll('.fade-in-up').forEach((el, index) => {
        setTimeout(() => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('animate');
          }
        }, index * 100);
      });
    });
