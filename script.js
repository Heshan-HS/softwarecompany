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
    // Disable loading screen behavior
    const loadingEl = document.getElementById('loading-screen');
    if (loadingEl) {
        loadingEl.style.display = 'none';
        loadingEl.classList.add('fade-out');
    }
    document.body.style.overflow = 'auto';
    // Immediately notify app is ready
    window.dispatchEvent(new CustomEvent('app:ready'));
    
    // Initialize typing animation
    initTypingAnimation();
    
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

// Advanced Python Code Typing Animation
document.addEventListener('DOMContentLoaded', () => {
    const codeElement = document.getElementById('typing-code');
    if (!codeElement) return;
    
    const pythonCode = `<span class="comment"># Advanced AI-Powered Analytics System</span>
<span class="keyword">import</span> numpy <span class="keyword">as</span> np
<span class="keyword">import</span> tensorflow <span class="keyword">as</span> tf
<span class="keyword">from</span> sklearn.ensemble <span class="keyword">import</span> RandomForestClassifier
<span class="keyword">from</span> transformers <span class="keyword">import</span> pipeline

<span class="decorator">@dataclass</span>
<span class="keyword">class</span> <span class="class-name">AIAnalytics</span>:
    <span class="string">"""Advanced ML-powered analytics engine"""</span>
    
    <span class="keyword">def</span> <span class="function">__init__</span>(self, model_path: <span class="class-name">str</span>):
        self.model = tf.keras.models.<span class="function">load_model</span>(model_path)
        self.nlp = <span class="function">pipeline</span>(<span class="string">'sentiment-analysis'</span>)
        self.classifier = <span class="function">RandomForestClassifier</span>(n_estimators=<span class="number">100</span>)
    
    <span class="keyword">async def</span> <span class="function">process_data</span>(self, data: np.ndarray) <span class="operator">-></span> <span class="class-name">dict</span>:
        <span class="comment"># Neural network prediction</span>
        predictions = <span class="keyword">await</span> self.<span class="function">predict_async</span>(data)
        
        <span class="comment"># Feature extraction using deep learning</span>
        features = self.model.<span class="function">predict</span>(
            tf.convert_to_tensor(data, dtype=tf.float32)
        )
        
        <span class="comment"># Advanced sentiment analysis</span>
        sentiment = self.nlp.<span class="function">analyze</span>(
            <span class="string">"Processing customer feedback with AI"</span>
        )
        
        <span class="keyword">return</span> {
            <span class="string">'predictions'</span>: predictions,
            <span class="string">'features'</span>: features.numpy(),
            <span class="string">'sentiment_score'</span>: sentiment[<span class="number">0</span>][<span class="string">'score'</span>],
            <span class="string">'confidence'</span>: <span class="function">float</span>(np.<span class="function">mean</span>(predictions))
        }
    
    <span class="decorator">@staticmethod</span>
    <span class="keyword">def</span> <span class="function">optimize_performance</span>(data: np.ndarray) <span class="operator">-></span> np.ndarray:
        <span class="comment"># GPU-accelerated computation</span>
        <span class="keyword">with</span> tf.device(<span class="string">'/GPU:0'</span>):
            optimized = tf.nn.<span class="function">relu</span>(
                tf.matmul(data, tf.<span class="function">transpose</span>(data))
            )
        <span class="keyword">return</span> optimized.numpy()`;

    let i = 0;
    const speed = 15; // Typing speed in milliseconds
    
    function typeCode() {
        if (i < pythonCode.length) {
            codeElement.innerHTML = pythonCode.substring(0, i + 1);
            i++;
            
            // Auto-scroll as code types
            const codeContent = codeElement.closest('.code-content');
            if (codeContent) {
                codeContent.scrollTop = codeContent.scrollHeight;
            }
            
            setTimeout(typeCode, speed);
        } else {
            // Loop animation after completion
            setTimeout(() => {
                i = 0;
                codeElement.innerHTML = '';
                const codeContent = codeElement.closest('.code-content');
                if (codeContent) {
                    codeContent.scrollTop = 0;
                }
                typeCode();
            }, 3000); // Wait 3 seconds before restarting
        }
    }
    
    // Start typing animation
    typeCode();
});

// Hero Title Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.typing-cursor');
    
    if (!typingElement || !cursor) return;
    
    const text = "Building Tomorrow's Digital Future";
    const gradientStart = text.indexOf("Digital Future");
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            const currentChar = text.charAt(index);
            const currentText = text.substring(0, index + 1);
            
            // Apply gradient to "Digital Future" part
            if (index >= gradientStart) {
                const beforeGradient = text.substring(0, gradientStart);
                const gradientText = text.substring(gradientStart, index + 1);
                typingElement.innerHTML = beforeGradient + '<span class="gradient-text">' + gradientText + '</span>';
            } else {
                typingElement.textContent = currentText;
            }
            
            index++;
            
            // Variable typing speed for more natural feel
            const speed = currentChar === ' ' ? 100 : Math.random() * 100 + 50;
            setTimeout(typeWriter, speed);
        } else {
            // Hide cursor after typing is complete
            setTimeout(() => {
                cursor.style.opacity = '0';
            }, 1000);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ===== CHAT WIDGET FUNCTIONALITY =====
class ChatWidget {
    constructor() {
        this.chatToggle = document.getElementById('chat-toggle');
        this.chatWindow = document.getElementById('chat-window');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-message');
        this.minimizeBtn = document.getElementById('minimize-chat');
        this.closeBtn = document.getElementById('close-chat');
        this.notification = document.getElementById('chat-notification');
        this.quickActionBtns = document.querySelectorAll('.quick-action-btn');
        
        this.isOpen = false;
        this.isMinimized = false;
        
        this.init();
        this.addStyles();
    }
    
    init() {
        // Toggle chat window
        this.chatToggle.addEventListener('click', () => {
            this.toggleChat();
        });
        
        // Send message
        this.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });
        
        // Send message on Enter key
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Minimize chat
        this.minimizeBtn.addEventListener('click', () => {
            this.minimizeChat();
        });
        
        // Close chat
        this.closeBtn.addEventListener('click', () => {
            this.closeChat();
        });
        
        // Quick action buttons
        this.quickActionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                this.sendQuickMessage(message);
            });
        });
        
        // Show initial notification
        setTimeout(() => {
            this.showNotification();
        }, 3000);
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* ===== TESTIMONIALS SECTION ===== */
            .testimonials {
                padding: 120px 0;
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                position: relative;
                overflow: hidden;
            }
            
            .testimonials::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at 20% 80%, rgba(36, 97, 230, 0.05), transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(14, 25, 72, 0.05), transparent 50%);
                pointer-events: none;
            }
            
            .testimonials-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-bottom: 4rem;
            }
            
            .testimonial-card {
                background: white;
                border-radius: 20px;
                padding: 2rem;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
                position: relative;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .testimonial-card.featured {
                background: linear-gradient(135deg, #2461e6 0%, #0e1948 100%);
                color: white;
                transform: scale(1.02);
            }
            
            .testimonial-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            }
            
            .testimonial-card.featured:hover {
                transform: translateY(-10px) scale(1.02);
            }
            
            .testimonial-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 1.5rem;
            }
            
            .client-info {
                display: flex;
                gap: 1rem;
                align-items: center;
            }
            
            .client-avatar {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                overflow: hidden;
                border: 3px solid rgba(36, 97, 230, 0.2);
            }
            
            .testimonial-card.featured .client-avatar {
                border-color: rgba(255, 255, 255, 0.3);
            }
            
            .client-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .client-details h4 {
                font-size: 1.1rem;
                font-weight: 600;
                margin-bottom: 0.25rem;
                color: #1a202c;
            }
            
            .testimonial-card.featured .client-details h4 {
                color: white;
            }
            
            .client-details p {
                font-size: 0.9rem;
                color: #64748b;
                margin-bottom: 0.5rem;
            }
            
            .testimonial-card.featured .client-details p {
                color: rgba(255, 255, 255, 0.8);
            }
            
            .client-rating {
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
            
            .client-rating i {
                color: #fbbf24;
                font-size: 0.9rem;
            }
            
            .rating-text {
                font-size: 0.85rem;
                font-weight: 600;
                margin-left: 0.5rem;
                color: #64748b;
            }
            
            .testimonial-card.featured .rating-text {
                color: rgba(255, 255, 255, 0.9);
            }
            
            .testimonial-badge {
                width: 40px;
                height: 40px;
                background: rgba(36, 97, 230, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #2461e6;
                font-size: 1.2rem;
            }
            
            .testimonial-card.featured .testimonial-badge {
                background: rgba(255, 255, 255, 0.2);
                color: white;
            }
            
            .testimonial-content p {
                font-size: 1rem;
                line-height: 1.7;
                color: #4a5568;
                margin-bottom: 1.5rem;
                font-style: italic;
            }
            
            .testimonial-card.featured .testimonial-content p {
                color: rgba(255, 255, 255, 0.9);
            }
            
            .testimonial-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 1rem;
                border-top: 1px solid rgba(0, 0, 0, 0.1);
            }
            
            .testimonial-card.featured .testimonial-footer {
                border-top-color: rgba(255, 255, 255, 0.2);
            }
            
            .project-info {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            
            .project-type {
                font-size: 0.85rem;
                font-weight: 600;
                color: #2461e6;
            }
            
            .testimonial-card.featured .project-type {
                color: #fbbf24;
            }
            
            .project-duration {
                font-size: 0.8rem;
                color: #64748b;
            }
            
            .testimonial-card.featured .project-duration {
                color: rgba(255, 255, 255, 0.7);
            }
            
            .testimonial-stats .stat-item {
                text-align: right;
            }
            
            .testimonial-stats .stat-value {
                display: block;
                font-size: 1.5rem;
                font-weight: 700;
                color: #2461e6;
            }
            
            .testimonial-card.featured .testimonial-stats .stat-value {
                color: #fbbf24;
            }
            
            .testimonial-stats .stat-label {
                font-size: 0.8rem;
                color: #64748b;
            }
            
            .testimonial-card.featured .testimonial-stats .stat-label {
                color: rgba(255, 255, 255, 0.7);
            }
            
            /* Success Metrics */
            .success-metrics {
                margin-top: 4rem;
            }
            
            .metrics-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
            }
            
            .metric-card {
                background: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .metric-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
            }
            
            .metric-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #2461e6 0%, #0e1948 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
                color: white;
                font-size: 1.5rem;
            }
            
            .metric-number {
                display: block;
                font-size: 2.5rem;
                font-weight: 700;
                color: #1a202c;
                margin-bottom: 0.5rem;
            }
            
            .metric-label {
                font-size: 1rem;
                color: #64748b;
                font-weight: 500;
            }
            
            /* ===== LIVE CHAT WIDGET ===== */
            .chat-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                font-family: 'Inter', sans-serif;
            }
            
            .chat-toggle {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #2461e6 0%, #0e1948 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 8px 25px rgba(36, 97, 230, 0.4);
                transition: all 0.3s ease;
                position: relative;
            }
            
            .chat-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 12px 35px rgba(36, 97, 230, 0.5);
            }
            
            .chat-icon {
                color: white;
                font-size: 1.5rem;
                transition: all 0.3s ease;
            }
            
            .chat-toggle.active .chat-icon {
                transform: rotate(180deg);
            }
            
            .chat-notification {
                position: absolute;
                top: -5px;
                right: -5px;
                width: 24px;
                height: 24px;
                background: #ef4444;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 0.75rem;
                font-weight: 600;
                animation: pulse 2s infinite;
            }
            
            .chat-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                display: none;
                flex-direction: column;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .chat-window.active {
                display: flex;
                animation: slideUp 0.3s ease;
            }
            
            .chat-header {
                background: linear-gradient(135deg, #2461e6 0%, #0e1948 100%);
                color: white;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .chat-header-info {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .agent-avatar {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
            }
            
            .agent-details h4 {
                font-size: 1rem;
                font-weight: 600;
                margin-bottom: 0.25rem;
            }
            
            .status {
                font-size: 0.8rem;
                opacity: 0.9;
            }
            
            .status.online::before {
                content: '●';
                color: #10b981;
                margin-right: 0.25rem;
            }
            
            .chat-controls {
                display: flex;
                gap: 0.5rem;
            }
            
            .chat-controls button {
                width: 30px;
                height: 30px;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .chat-controls button:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            .chat-messages {
                flex: 1;
                padding: 1rem;
                overflow-y: auto;
                background: #f8fafc;
            }
            
            .message {
                display: flex;
                gap: 0.75rem;
                margin-bottom: 1rem;
                align-items: flex-start;
            }
            
            .message-avatar {
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #2461e6 0%, #0e1948 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 0.9rem;
                flex-shrink: 0;
            }
            
            .user-message .message-avatar {
                background: #64748b;
                order: 2;
            }
            
            .user-message {
                flex-direction: row-reverse;
            }
            
            .message-content {
                background: white;
                padding: 0.75rem 1rem;
                border-radius: 15px;
                max-width: 80%;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            
            .user-message .message-content {
                background: linear-gradient(135deg, #2461e6 0%, #0e1948 100%);
                color: white;
            }
            
            .message-content p {
                margin: 0;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .message-time {
                font-size: 0.75rem;
                color: #64748b;
                margin-top: 0.5rem;
                display: block;
            }
            
            .user-message .message-time {
                color: rgba(255, 255, 255, 0.8);
            }
            
            .quick-actions {
                padding: 1rem;
                background: white;
                border-top: 1px solid #e2e8f0;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .quick-action-btn {
                background: #f1f5f9;
                border: 1px solid #e2e8f0;
                border-radius: 10px;
                padding: 0.75rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.85rem;
            }
            
            .quick-action-btn:hover {
                background: #e2e8f0;
                border-color: #2461e6;
            }
            
            .quick-action-btn i {
                color: #2461e6;
                font-size: 1rem;
            }
            
            .chat-input-container {
                background: white;
                border-top: 1px solid #e2e8f0;
            }
            
            .chat-input-wrapper {
                display: flex;
                padding: 1rem;
                gap: 0.75rem;
            }
            
            #chat-input {
                flex: 1;
                border: 1px solid #e2e8f0;
                border-radius: 25px;
                padding: 0.75rem 1rem;
                font-size: 0.9rem;
                outline: none;
                transition: all 0.3s ease;
            }
            
            #chat-input:focus {
                border-color: #2461e6;
                box-shadow: 0 0 0 3px rgba(36, 97, 230, 0.1);
            }
            
            .send-btn {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #2461e6 0%, #0e1948 100%);
                border: none;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .send-btn:hover {
                transform: scale(1.1);
            }
            
            .chat-footer {
                padding: 0.5rem 1rem;
                text-align: center;
            }
            
            .powered-by {
                font-size: 0.75rem;
                color: #64748b;
            }
            
            /* Animations */
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .testimonials-grid {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }
                
                .testimonial-card.featured {
                    transform: none;
                }
                
                .testimonial-card.featured:hover {
                    transform: translateY(-10px);
                }
                
                .metrics-container {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                }
                
                .chat-window {
                    width: 300px;
                    height: 450px;
                }
                
                .chat-widget {
                    bottom: 15px;
                    right: 15px;
                }
            }
            
            @media (max-width: 480px) {
                .testimonials {
                    padding: 80px 0;
                }
                
                .testimonial-card {
                    padding: 1.5rem;
                }
                
                .metrics-container {
                    grid-template-columns: 1fr;
                }
                
                .chat-window {
                    width: calc(100vw - 30px);
                    right: -10px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        this.chatWindow.classList.add('active');
        this.chatToggle.classList.add('active');
        this.isOpen = true;
        this.hideNotification();
        
        // Focus on input
        setTimeout(() => {
            this.chatInput.focus();
        }, 300);
    }
    
    closeChat() {
        this.chatWindow.classList.remove('active');
        this.chatToggle.classList.remove('active');
        this.isOpen = false;
        this.isMinimized = false;
    }
    
    minimizeChat() {
        this.chatWindow.style.height = '60px';
        this.isMinimized = true;
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (message) {
            this.addUserMessage(message);
            this.chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                this.addBotResponse(message);
            }, 1000);
        }
    }
    
    sendQuickMessage(message) {
        this.addUserMessage(message);
        
        // Simulate bot response
        setTimeout(() => {
            this.addBotResponse(message);
        }, 1000);
    }
    
    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${this.getCurrentTime()}</span>
            </div>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addBotResponse(userMessage) {
        const response = this.getBotResponse(userMessage);
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${response}</p>
                <span class="message-time">${this.getCurrentTime()}</span>
            </div>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    getBotResponse(userMessage) {
        const responses = {
            'web development': 'Great! Our web development services include custom websites, e-commerce platforms, and web applications. We use modern technologies like React, Node.js, and more. Would you like to schedule a consultation?',
            'mobile app': 'Excellent! We develop both iOS and Android apps, as well as cross-platform solutions using React Native and Flutter. Our apps are user-friendly and high-performance. What type of app are you looking to build?',
            'custom project': 'Perfect! We love working on custom projects. Our team can handle everything from enterprise software to specialized applications. Could you tell me more about your specific requirements?',
            'quote': 'I\'d be happy to help you get a quote! Our pricing depends on the project scope and requirements. For a detailed quote, please contact us at info@hssoftware.com or call +94 77 123 4567.',
            'pricing': 'Our pricing varies based on project complexity. We offer competitive rates starting from $299/month for basic services up to $1299/month for enterprise solutions. Would you like to discuss your specific needs?',
            'contact': 'You can reach us at:\n📧 info@hssoftware.com\n📞 +94 77 123 4567\n📍 Colombo, Sri Lanka\n\nOr fill out our contact form and we\'ll get back to you within 24 hours!',
            'default': 'Thank you for your message! I\'m here to help you with information about our software development services. You can ask me about web development, mobile apps, pricing, or anything else. How can I assist you today?'
        };
        
        const lowerMessage = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return responses.default;
    }
    
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    showNotification() {
        this.notification.style.display = 'flex';
    }
    
    hideNotification() {
        this.notification.style.display = 'none';
    }
}

// ===== FAQ FUNCTIONALITY =====
class FAQManager {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.categoryBtns = document.querySelectorAll('.category-btn');
        this.searchInput = document.getElementById('faq-search-input');
        this.openChatBtn = document.getElementById('open-chat-faq');
        
        this.init();
        this.addFAQStyles();
    }
    
    init() {
        // FAQ toggle functionality
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle i');
            
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close all other FAQ items
                this.faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                        otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
                    }
                });
                
                // Toggle current item
                if (isOpen) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                    toggle.className = 'fas fa-plus';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    toggle.className = 'fas fa-minus';
                }
            });
        });
        
        // Category filtering
        this.categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                
                // Update active button
                this.categoryBtns.forEach(otherBtn => {
                    otherBtn.classList.remove('active');
                });
                btn.classList.add('active');
                
                // Filter FAQ items
                this.filterFAQs(category);
            });
        });
        
        // Search functionality
        this.searchInput.addEventListener('input', (e) => {
            this.searchFAQs(e.target.value);
        });
        
        // Open chat from FAQ
        if (this.openChatBtn) {
            this.openChatBtn.addEventListener('click', () => {
                const chatWidget = document.querySelector('.chat-widget');
                if (chatWidget) {
                    const chatToggle = document.getElementById('chat-toggle');
                    if (chatToggle) {
                        chatToggle.click();
                    }
                }
            });
        }
    }
    
    addFAQStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* ===== FAQ SECTION ===== */
            .faq {
                padding: 120px 0;
                background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                position: relative;
            }
            
            .faq::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at 80% 20%, rgba(36, 97, 230, 0.03), transparent 50%),
                            radial-gradient(circle at 20% 80%, rgba(14, 25, 72, 0.03), transparent 50%);
                pointer-events: none;
            }
            
            /* FAQ Search */
            .faq-search {
                margin-bottom: 3rem;
                display: flex;
                justify-content: center;
            }
            
            .search-container {
                position: relative;
                max-width: 500px;
                width: 100%;
            }
            
            .search-input {
                width: 100%;
                padding: 1rem 1rem 1rem 3rem;
                border: 2px solid #e2e8f0;
                border-radius: 50px;
                font-size: 1rem;
                outline: none;
                transition: all 0.3s ease;
                background: white;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            
            .search-input:focus {
                border-color: #2461e6;
                box-shadow: 0 0 0 3px rgba(36, 97, 230, 0.1), 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            
            .search-icon {
                position: absolute;
                left: 1rem;
                top: 50%;
                transform: translateY(-50%);
                color: #64748b;
                font-size: 1.1rem;
            }
            
            /* FAQ Categories */
            .faq-categories {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-bottom: 3rem;
                flex-wrap: wrap;
            }
            
            .category-btn {
                padding: 0.75rem 1.5rem;
                border: 2px solid #e2e8f0;
                background: white;
                border-radius: 25px;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                color: #64748b;
            }
            
            .category-btn:hover {
                border-color: #2461e6;
                color: #2461e6;
                transform: translateY(-2px);
            }
            
            .category-btn.active {
                background: linear-gradient(135deg, #2461e6 0%, #0e1948 100%);
                border-color: #2461e6;
                color: white;
                box-shadow: 0 4px 15px rgba(36, 97, 230, 0.3);
            }
            
            /* FAQ Container */
            .faq-container {
                max-width: 1200px;
                margin: 0 auto;
                margin-bottom: 4rem;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1.5rem;
            }
            
            .faq-item {
                background: white;
                border-radius: 15px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.2);
                overflow: hidden;
                transition: all 0.3s ease;
                height: fit-content;
            }
            
            .faq-item:hover {
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
                transform: translateY(-2px);
            }
            
            .faq-item.hidden {
                display: none;
            }
            
            .faq-question {
                padding: 1.5rem;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all 0.3s ease;
            }
            
            .faq-question:hover {
                background: #f8fafc;
            }
            
            .faq-item.active .faq-question {
                background: linear-gradient(135deg, #2461e6 0%, #0e1948 100%);
                color: white;
            }
            
            .faq-question h3 {
                font-size: 1.1rem;
                font-weight: 600;
                margin: 0;
                color: #1a202c;
                flex: 1;
                padding-right: 1rem;
            }
            
            .faq-item.active .faq-question h3 {
                color: white;
            }
            
            .faq-toggle {
                width: 30px;
                height: 30px;
                background: rgba(36, 97, 230, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .faq-item.active .faq-toggle {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .faq-toggle i {
                color: #2461e6;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }
            
            .faq-item.active .faq-toggle i {
                color: white;
                transform: rotate(180deg);
            }
            
            .faq-answer {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
                background: #f8fafc;
            }
            
            .faq-answer > div {
                padding: 0 1.5rem 1.5rem;
            }
            
            .faq-answer p {
                margin-bottom: 1rem;
                color: #4a5568;
                line-height: 1.6;
            }
            
            .faq-answer ul, .faq-answer ol {
                margin-left: 1.5rem;
                margin-bottom: 1rem;
            }
            
            .faq-answer li {
                margin-bottom: 0.5rem;
                color: #4a5568;
                line-height: 1.6;
            }
            
            .faq-answer li strong {
                color: #2461e6;
                font-weight: 600;
            }
            
            /* FAQ CTA */
            .faq-cta {
                text-align: center;
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                padding: 3rem 2rem;
                border-radius: 20px;
                max-width: 600px;
                margin: 0 auto;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
            }
            
            .faq-cta h3 {
                font-size: 1.8rem;
                font-weight: 700;
                color: #1a202c;
                margin-bottom: 1rem;
            }
            
            .faq-cta p {
                font-size: 1.1rem;
                color: #64748b;
                margin-bottom: 2rem;
            }
            
            .cta-buttons {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .cta-buttons .btn {
                padding: 0.75rem 2rem;
                font-weight: 600;
                border-radius: 25px;
                transition: all 0.3s ease;
            }
            
            .cta-buttons .btn-primary {
                background: linear-gradient(135deg, #2461e6 0%, #0e1948 100%);
                color: white;
                border: none;
                text-decoration: none;
                display: inline-block;
            }
            
            .cta-buttons .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(36, 97, 230, 0.4);
            }
            
            .cta-buttons .btn-secondary {
                background: white;
                color: #2461e6;
                border: 2px solid #2461e6;
            }
            
            .cta-buttons .btn-secondary:hover {
                background: #2461e6;
                color: white;
                transform: translateY(-2px);
            }
            
            /* Responsive Design */
            @media (max-width: 1024px) {
                .faq-container {
                    max-width: 900px;
                    gap: 1rem;
                }
            }
            
            @media (max-width: 768px) {
                .faq {
                    padding: 80px 0;
                }
                
                .faq-container {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                    max-width: 600px;
                }
                
                .faq-categories {
                    gap: 0.5rem;
                }
                
                .category-btn {
                    padding: 0.5rem 1rem;
                    font-size: 0.8rem;
                }
                
                .faq-question {
                    padding: 1rem;
                }
                
                .faq-question h3 {
                    font-size: 1rem;
                }
                
                .faq-answer > div {
                    padding: 0 1rem 1rem;
                }
                
                .faq-cta {
                    padding: 2rem 1rem;
                }
                
                .cta-buttons {
                    flex-direction: column;
                    align-items: center;
                }
                
                .cta-buttons .btn {
                    width: 200px;
                }
            }
            
            @media (max-width: 480px) {
                .search-container {
                    max-width: 100%;
                    margin: 0 1rem;
                }
                
                .faq-categories {
                    margin: 0 1rem 3rem;
                }
                
                .faq-container {
                    margin: 0 1rem 4rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    filterFAQs(category) {
        this.faqItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
                // Close if open
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                const toggle = item.querySelector('.faq-toggle i');
                answer.style.maxHeight = '0';
                toggle.className = 'fas fa-plus';
            }
        });
    }
    
    searchFAQs(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(term) || answer.includes(term)) {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
                // Close if open
                item.classList.remove('active');
                const answerEl = item.querySelector('.faq-answer');
                const toggle = item.querySelector('.faq-toggle i');
                answerEl.style.maxHeight = '0';
                toggle.className = 'fas fa-plus';
            }
        });
        
        // Reset category filter when searching
        if (searchTerm.trim() !== '') {
            this.categoryBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            this.categoryBtns[0].classList.add('active'); // "All Questions" button
        }
    }
}

// ===== VIDEO BACKGROUND MANAGER =====
class VideoBackgroundManager {
    constructor() {
        this.video = document.querySelector('.hero-video-bg');
        this.init();
        this.addVideoStyles();
    }
    
    init() {
        if (!this.video) return;
        
        // Ensure video plays on load
        this.video.addEventListener('loadeddata', () => {
            this.video.play().catch(e => {
                console.log('Video autoplay failed:', e);
                // Fallback: try to play on user interaction
                document.addEventListener('click', () => {
                    this.video.play();
                }, { once: true });
            });
        });
        
        // Handle video errors
        this.video.addEventListener('error', (e) => {
            console.log('Video error:', e);
            // Hide video if it fails to load
            this.video.style.display = 'none';
        });
        
        // Optimize video performance
        this.video.addEventListener('canplaythrough', () => {
            // Video is ready to play
            this.video.style.opacity = '1';
        });
        
        // Pause video when not visible (performance optimization)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.video.play();
                } else {
                    this.video.pause();
                }
            });
        });
        
        observer.observe(this.video);
    }
    
    addVideoStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced Video Background Styles */
            .hero-video-bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                z-index: -1;
                opacity: 0;
                transition: opacity 1s ease-in-out;
                filter: brightness(0.9) contrast(1.05);
            }
            
            .hero {
                position: relative;
                overflow: hidden;
            }
            
            .hero::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(
                    135deg,
                    rgba(0, 0, 0, 0.3) 0%,
                    rgba(0, 0, 0, 0.2) 50%,
                    rgba(0, 0, 0, 0.3) 100%
                );
                z-index: 1;
                pointer-events: none;
            }
            
            .hero-container {
                position: relative;
                z-index: 2;
            }
            
            /* Video Loading State */
            .hero-video-bg[data-loading="true"] {
                background: linear-gradient(135deg, #0e1948 0%, #2461e6 100%);
            }
            
            /* Fallback Background */
            .hero-video-bg:not([src]) {
                background: linear-gradient(135deg, #0e1948 0%, #2461e6 100%);
                opacity: 1;
            }
            
            /* Mobile Optimization */
            @media (max-width: 768px) {
                .hero-video-bg {
                    filter: brightness(0.8) contrast(1.1);
                }
                
                .hero::before {
                    background: linear-gradient(
                        135deg,
                        rgba(0, 0, 0, 0.4) 0%,
                        rgba(0, 0, 0, 0.3) 50%,
                        rgba(0, 0, 0, 0.4) 100%
                    );
                }
            }
            
            /* Performance Optimization */
            @media (prefers-reduced-motion: reduce) {
                .hero-video-bg {
                    animation: none;
                    transition: none;
                }
            }
            
            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .hero::before {
                    background: rgba(0, 0, 0, 0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatWidget();
    new FAQManager();
    new VideoBackgroundManager();
});
