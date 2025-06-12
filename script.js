// Enhanced Letter Scrambling Effect
class LetterScramble {
  constructor(element) {
    this.element = element;
    this.originalText = element.getAttribute('data-text') || element.textContent;
    this.isAnimating = false;
    this.init();
  }

  init() {
    this.element.addEventListener('mouseenter', () => this.startScramble());
  }

  startScramble() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    let iteration = 0;
    const totalIterations = 4;
    const scrambleSpeed = 60;

    const interval = setInterval(() => {
      this.element.textContent = this.originalText
        .split('')
        .map((char) => {
          if (Math.random() < 0.5) {
            // Get a random letter from the original text
            return this.originalText[Math.floor(Math.random() * this.originalText.length)];
          }
          return char;
        })
        .join('');

      iteration++;

      if (iteration >= totalIterations) {
        clearInterval(interval);
        this.element.textContent = this.originalText;
        setTimeout(() => {
          this.isAnimating = false;
        }, 1000); // Prevent immediate re-triggering
      }
    }, scrambleSpeed);
  }
}

// Navigation state management
let currentSection = 'about';

// Navigation Functions
function showSection(sectionName) {
  // Hide current section
  const currentSectionElement = document.getElementById(currentSection);
  const newSectionElement = document.getElementById(sectionName);
  
  if (currentSectionElement) {
    currentSectionElement.classList.remove('active');
  }
  
  // Update navigation active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  // Show new section
  setTimeout(() => {
    if (newSectionElement) {
      newSectionElement.classList.add('active');
    }
    
    // Update active nav link
    const activeLink = document.querySelector(`[data-text="${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
    
    currentSection = sectionName;
    
    // Show/hide circle button based on section
    const circleBtn = document.getElementById('circleBtn');
    if (sectionName === 'about') {
      circleBtn.classList.remove('show');
    } else {
      circleBtn.classList.add('show');
    }
  }, 300);
}

// Circle button functionality
function goToTop() {
  showSection('about');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize scramble effects
  document.querySelectorAll('.scramble-text').forEach(el => {
    new LetterScramble(el);
  });
  
  // Set initial active state
  const aboutLink = document.querySelector('[data-text="About"]');
  if (aboutLink) {
    aboutLink.classList.add('active');
  }
  
  // Circle button click handler
  const circleBtn = document.getElementById('circleBtn');
  if (circleBtn) {
    circleBtn.addEventListener('click', goToTop);
  }
  
  // Add smooth scrolling behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Enhanced navigation interactions
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
    });
  });
  
  // Logo click handler
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => {
      showSection('about');
    });
    logo.style.cursor = 'pointer';
  }
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    const sections = ['about', 'experience', 'projects', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % sections.length;
      showSection(sections[nextIndex]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
      showSection(sections[prevIndex]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      showSection('about');
    }
  });
});

// Add window resize handler for responsive behavior
window.addEventListener('resize', () => {
  // Recalculate any position-dependent elements if needed
  const nav = document.querySelector('.nav');
  if (nav) {
    nav.style.transition = 'none';
    setTimeout(() => {
      nav.style.transition = '';
    }, 100);
  }
});

// Add scroll behavior for navigation background
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 50) {
    nav.style.background = 'rgba(247, 247, 239, 0.95)';
    nav.style.backdropFilter = 'blur(15px)';
  } else {
    nav.style.background = 'var(--primary-bg)';
    nav.style.backdropFilter = 'blur(10px)';
  }
  
  lastScrollY = currentScrollY;
});