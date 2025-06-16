// DOM Elements
const sidebar = document.getElementById('sidebar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

// Smooth scrolling for sidebar links
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close sidebar on mobile
            sidebar.classList.remove('active');
            
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active link
            updateActiveLink(link);
        }
    });
});

// Update active link in sidebar
function updateActiveLink(activeLink) {
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Intersection Observer for active section tracking
const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            const correspondingLink = document.querySelector(`.sidebar-menu a[href="#${sectionId}"]`);
            
            if (correspondingLink) {
                updateActiveLink(correspondingLink);
            }
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('section[id]');
sections.forEach(section => {
    observer.observe(section);
});

// Parallax effect for floating cards
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-category, .timeline-item, .education-item, .project-card, .interest-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animation styles
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .timeline-item, .education-item, .project-card, .interest-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial check
    animateOnScroll();
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        setTimeout(() => {
            typeWriter(nameElement, originalText, 100);
        }, 1000);
    }
});

// Skill tags hover effect
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 100;
        
        if (sectionTop < window.innerHeight - sectionVisible) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Initialize section reveal
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Hero section should be visible immediately
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
    
    revealSections();
});

window.addEventListener('scroll', revealSections);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Enhanced floating cards animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        // Add random delay to make animation more natural
        card.style.animationDelay = `${index * 0.5}s`;
        
        // Add mouse interaction
        card.addEventListener('mouseenter', () => {
            card.style.animationPlayState = 'paused';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animationPlayState = 'running';
        });
    });
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        sidebar.classList.remove('active');
    }
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    animateOnScroll();
    revealSections();
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Add resize listener for responsive adjustments
window.addEventListener('resize', () => {
    // Close sidebar on resize to prevent layout issues
    sidebar.classList.remove('active');
});

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-2px) scale(1)';
        });
    });
});

console.log('Portfolio chargé avec succès ! 🚀');