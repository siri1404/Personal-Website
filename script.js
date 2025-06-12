// Show message when clicking the CTA button
function showMessage() {
    alert("Thanks for your interest! We'll be in touch soon.");
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Add scroll animation for sections
    const sections = document.querySelectorAll('.section');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial setup for sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check scroll position on load
    checkScroll();
    
    // Check scroll position on scroll
    window.addEventListener('scroll', checkScroll);
});

// Add current class to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add responsive navigation toggle for mobile
const createMobileNav = () => {
    const nav = document.querySelector('nav');
    const navList = document.querySelector('nav ul');
    
    if (nav && navList && window.innerWidth < 768) {
        // Create hamburger menu button if it doesn't exist
        if (!document.querySelector('.nav-toggle')) {
            const navToggle = document.createElement('button');
            navToggle.classList.add('nav-toggle');
            navToggle.innerHTML = '<span></span><span></span><span></span>';
            nav.insertBefore(navToggle, navList);
            
            // Add toggle functionality
            navToggle.addEventListener('click', function() {
                navList.classList.toggle('show');
                this.classList.toggle('active');
            });
            
            // Add styles for mobile navigation
            const style = document.createElement('style');
            style.textContent = `
                .nav-toggle {
                    display: block;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 10px;
                }
                
                .nav-toggle span {
                    display: block;
                    width: 25px;
                    height: 3px;
                    margin: 5px 0;
                    background-color: #333;
                    transition: all 0.3s ease;
                }
                
                .nav-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .nav-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .nav-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -7px);
                }
                
                nav ul {
                    display: none;
                    flex-direction: column;
                    width: 100%;
                    text-align: center;
                }
                
                nav ul.show {
                    display: flex;
                }
                
                nav ul li {
                    margin: 10px 0;
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// Check for mobile navigation on load and resize
window.addEventListener('load', createMobileNav);
window.addEventListener('resize', createMobileNav);