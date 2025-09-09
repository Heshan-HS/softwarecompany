// Loading Screen Management
class LoadingManager {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.progressBar = document.getElementById('progress-bar');
        this.percentageText = document.getElementById('loading-percentage');
        this.splineViewer = null;
        this.progress = 0;
        this.isComplete = false;
        
        this.init();
    }

    init() {
        // Start loading simulation
        this.simulateLoading();
        
        // Listen for Spline viewer load
        this.waitForSplineLoad();
        
        // Minimum loading time of 2.5 seconds for smooth experience
        setTimeout(() => {
            this.checkComplete();
        }, 2500);
    }

    simulateLoading() {
        const interval = setInterval(() => {
            if (this.progress < 90) {
                // Simulate realistic loading progress
                const increment = Math.random() * 15 + 5;
                this.progress = Math.min(this.progress + increment, 90);
                this.updateProgress(this.progress);
            } else {
                clearInterval(interval);
            }
        }, 200);
    }

    waitForSplineLoad() {
        // Wait for Spline viewer to be available
        const checkSpline = setInterval(() => {
            this.splineViewer = document.querySelector('spline-viewer');
            if (this.splineViewer) {
                clearInterval(checkSpline);
                
                // Listen for Spline load events
                this.splineViewer.addEventListener('load', () => {
                    this.completeLoading();
                });
                
                // Fallback: Complete loading after 4 seconds regardless
                setTimeout(() => {
                    if (!this.isComplete) {
                        this.completeLoading();
                    }
                }, 4000);
            }
        }, 100);
    }

    updateProgress(percentage) {
        this.progressBar.style.width = percentage + '%';
        this.percentageText.textContent = Math.round(percentage) + '%';
        
        // Update loading message based on progress
        const messageElement = document.querySelector('.loading-message');
        if (percentage < 30) {
            messageElement.textContent = 'Loading Assets...';
        } else if (percentage < 60) {
            messageElement.textContent = 'Preparing 3D Experience...';
        } else if (percentage < 90) {
            messageElement.textContent = 'Almost Ready...';
        } else {
            messageElement.textContent = 'Finalizing...';
        }
    }

    completeLoading() {
        if (this.isComplete) return;
        this.isComplete = true;
        
        // Complete progress bar
        this.updateProgress(100);
        
        // Wait a moment then fade out
        setTimeout(() => {
            this.loadingScreen.classList.add('fade-out');
            
            // Remove loading screen after fade animation
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
                // Notify app that initial loading is finished
                window.dispatchEvent(new CustomEvent('app:ready'));
            }, 800);
        }, 500);
    }

    checkComplete() {
        // Force complete if not already done (fallback)
        if (!this.isComplete) {
            this.completeLoading();
        }
    }
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading manager
    new LoadingManager();
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Professional Scroll Animation System
class ScrollAnimationManager {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class when element comes into view
                    entry.target.classList.add('animate-in');
                    
                    // Optional: Stop observing after animation (for performance)
                    // this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // Start animation 50px before element enters viewport
        });

        // Start observing elements when DOM is loaded
        this.observeElements();
    }

    observeElements() {
        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('scroll-fade-up');
            this.observer.observe(section);
        });

        // Observe section headers
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            header.classList.add('scroll-fade-up');
            this.observer.observe(header);
        });

        // Observe cards with staggered animation
        const cards = document.querySelectorAll('.about-card, .service-card, .portfolio-item, .insight-card, .pricing-card, .process-step, .tech-card');
        cards.forEach(card => {
            card.classList.add('scroll-stagger');
            this.observer.observe(card);
        });

        // Observe stats with scale animation
        const stats = document.querySelectorAll('.stat-card, .stats-container .stat');
        stats.forEach(stat => {
            stat.classList.add('scroll-scale');
            this.observer.observe(stat);
        });

        // Observe contact items with left/right animations
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
            item.classList.add(index % 2 === 0 ? 'scroll-fade-left' : 'scroll-fade-right');
            this.observer.observe(item);
        });

        // Observe footer sections
        const footerSections = document.querySelectorAll('.footer-section');
        footerSections.forEach(section => {
            section.classList.add('scroll-fade-up');
            this.observer.observe(section);
        });
    }
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimationManager();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item, .about-text, .about-image');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h4');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Floating cards animation enhancement
document.addEventListener('DOMContentLoaded', () => {
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Service cards hover effect enhancement
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Portfolio items hover effect
document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const image = item.querySelector('.portfolio-image');
            image.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            const image = item.querySelector('.portfolio-image');
            image.style.transform = 'scale(1)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Don't add loading to form submit buttons (handled separately)
            if (this.type === 'submit') return;
            
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Professional Typing Animation System
class TypewriterEffect {
    constructor() {
        this.typeElements = document.querySelectorAll('.type');
        this.started = false;
        this.init();
    }

    init() {
        if (this.typeElements.length === 0) return;

        const loadingScreen = document.getElementById('loading-screen');

        // If a loading screen exists, wait for app:ready; otherwise fallback to small delay
        if (loadingScreen) {
            const startIfReady = () => {
                if (this.started) return;
                this.started = true;
                this.startTypingSequence();
            };
            window.addEventListener('app:ready', startIfReady, { once: true });
            // Safety fallback in case event is missed
            setTimeout(() => startIfReady(), 3500);
        } else {
            setTimeout(() => this.startTypingSequence(), 800);
        }
    }

    async startTypingSequence() {
        for (let i = 0; i < this.typeElements.length; i++) {
            const element = this.typeElements[i];
            const text = element.getAttribute('data-text');
            
            // Clear element content
            element.textContent = '';
            element.style.opacity = '1';
            
            // Type the text with smooth animation
            await this.typeText(element, text, this.getTypingSpeed(i));
            
            // Hide cursor from current element when moving to next
            if (i < this.typeElements.length - 1) {
                element.classList.add('typing-done');
                await this.delay(300);
            }
        }
        
        // Hide cursor after all typing is complete
        setTimeout(() => {
            const lastElement = this.typeElements[this.typeElements.length - 1];
            if (lastElement) {
                lastElement.classList.add('typing-done');
            }
        }, 1000);
    }

    async typeText(element, text, baseSpeed) {
        return new Promise((resolve) => {
            let charIndex = 0;
            
            const typeChar = () => {
                if (charIndex < text.length) {
                    const char = text.charAt(charIndex);
                    element.textContent += char;
                    charIndex++;
                    
                    // Variable speed for natural typing
                    let speed = baseSpeed;
                    if (char === ' ') speed *= 0.5; // Faster for spaces
                    if (char === ',' || char === '.') speed *= 2; // Slower for punctuation
                    
                    // Add slight randomness for natural feel
                    speed += Math.random() * 30 - 15;
                    
                    setTimeout(typeChar, Math.max(speed, 20));
                } else {
                    resolve();
                }
            };
            
            typeChar();
        });
    }

    getTypingSpeed(elementIndex) {
        // Different speeds for different elements
        const speeds = [80, 60]; // First element slower, second faster
        return speeds[elementIndex] || 70;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new TypewriterEffect();
});

// Portfolio Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    
    portfolioButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.style.pointerEvents = 'none';
            
            // Simulate project loading
            setTimeout(() => {
                // Reset button
                this.textContent = originalText;
                this.style.pointerEvents = 'auto';
                
                // Show project modal or redirect
                showProjectModal(index);
            }, 1000);
        });
    });
});

// Project Modal System
function showProjectModal(projectIndex) {
    const projects = [
        {
            title: 'E-commerce Platform',
            description: 'A comprehensive online shopping platform with advanced features including real-time inventory management, secure payment processing, and personalized recommendations.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
            features: ['Real-time inventory', 'Secure payments', 'User analytics', 'Mobile responsive'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'Analytics Dashboard',
            description: 'Real-time analytics dashboard with interactive charts and data visualization for business intelligence and performance monitoring.',
            technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Chart.js'],
            features: ['Real-time data', 'Interactive charts', 'Export reports', 'Custom filters'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'Learning Management System',
            description: 'Complete LMS platform for online education with course management, progress tracking, and interactive learning tools.',
            technologies: ['Angular', 'Django', 'MySQL', 'WebRTC'],
            features: ['Course management', 'Progress tracking', 'Video streaming', 'Assessments'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'Fitness Mobile App',
            description: 'Cross-platform fitness application with workout tracking, nutrition planning, and social features for health enthusiasts.',
            technologies: ['React Native', 'Firebase', 'Redux', 'Health APIs'],
            features: ['Workout tracking', 'Nutrition plans', 'Social features', 'Health sync'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'AI Chatbot Platform',
            description: 'Intelligent chatbot platform with natural language processing and machine learning capabilities for customer service automation.',
            technologies: ['Python', 'TensorFlow', 'NLP', 'WebSocket'],
            features: ['Natural language', 'Machine learning', 'Multi-language', 'Analytics'],
            demoUrl: '#',
            githubUrl: '#'
        },
        {
            title: 'Cybersecurity Suite',
            description: 'Comprehensive cybersecurity solution with threat detection, vulnerability assessment, and real-time monitoring capabilities.',
            technologies: ['Java', 'Spring Boot', 'Elasticsearch', 'Docker'],
            features: ['Threat detection', 'Vulnerability scan', 'Real-time alerts', 'Compliance reports'],
            demoUrl: '#',
            githubUrl: '#'
        }
    ];
    
    const project = projects[projectIndex];
    if (!project) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${project.title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p class="project-description">${project.description}</p>
                
                <div class="project-technologies">
                    <h4>Technologies Used:</h4>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-features">
                    <h4>Key Features:</h4>
                    <ul class="feature-list">
                        ${project.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-actions">
                    <a href="${project.demoUrl}" class="btn-demo" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.githubUrl}" class="btn-github" target="_blank">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Restore scroll when modal closes
    modal.addEventListener('transitionend', () => {
        if (modal.style.opacity === '0') {
            document.body.style.overflow = 'auto';
        }
    });
}

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});
