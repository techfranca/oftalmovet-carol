/* ========================================
   OFTALMOVET - Dra. Carolina Neumann
   Landing Page JavaScript
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // ========================================
    // Depoimentos Carousel
    // ========================================
    const track = document.querySelector('.depoimentos-track');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const dots = document.querySelectorAll('.dot');
    const cards = document.querySelectorAll('.depoimento-card');
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Calculate card width including gap
    function getCardWidth() {
        if (window.innerWidth <= 768) {
            return track.offsetWidth;
        }
        const card = cards[0];
        const style = getComputedStyle(track);
        const gap = parseInt(style.gap) || 24;
        return card.offsetWidth + gap;
    }
    
    // Update carousel position
    function updateCarousel(index) {
        const cardWidth = getCardWidth();
        track.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % totalCards;
            updateCarousel(nextIndex);
        });
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel(prevIndex);
        });
    }
    
    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
        });
    });
    
    // Update current index on scroll (for touch/swipe)
    if (track) {
        track.addEventListener('scroll', () => {
            const cardWidth = getCardWidth();
            const scrollLeft = track.scrollLeft;
            const newIndex = Math.round(scrollLeft / cardWidth);
            
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalCards) {
                currentIndex = newIndex;
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        });
    }
    
    // Auto-play carousel (optional - every 5 seconds)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % totalCards;
            updateCarousel(nextIndex);
        }, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Start autoplay
    startAutoPlay();
    
    // Pause autoplay on hover
    if (track) {
        track.addEventListener('mouseenter', stopAutoPlay);
        track.addEventListener('mouseleave', startAutoPlay);
    }
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const animatedElements = document.querySelectorAll(
        '.section-header, .depoimento-card, .step-card, .feature-item, .faq-item, .gallery-item, .estrutura-item'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // WhatsApp Button Click Tracking (optional)
    // ========================================
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .whatsapp-float');
    
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // You can add analytics tracking here
            console.log('WhatsApp button clicked');
            
            // Example: Google Analytics event
            // gtag('event', 'click', {
            //     'event_category': 'WhatsApp',
            //     'event_label': 'Agendar Consulta'
            // });
        });
    });
    
    // ========================================
    // Lazy Loading Images
    // ========================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    lazyObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => lazyObserver.observe(img));
    }
    
    // ========================================
    // Mobile Menu (if needed in future)
    // ========================================
    // Placeholder for mobile menu functionality
    
    // ========================================
    // Form Validation (if needed in future)
    // ========================================
    // Placeholder for form validation
    
});

// ========================================
// Utility Functions
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
