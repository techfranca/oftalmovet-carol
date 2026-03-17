document.addEventListener('DOMContentLoaded', () => {
    initFAQ();
    initSmoothScroll();

    queueIdleTask(() => {
        initDepoimentosWhenVisible();
    });
});

function queueIdleTask(callback) {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => callback(), { timeout: 1200 });
        return;
    }

    setTimeout(callback, 1);
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) {
        return;
    }

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');

        if (!question) {
            return;
        }

        question.addEventListener('click', () => {
            const shouldOpen = !item.classList.contains('active');

            faqItems.forEach((faqItem) => {
                faqItem.classList.remove('active');
            });

            if (shouldOpen) {
                item.classList.add('active');
            }
        });
    });
}

function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    if (!anchors.length) {
        return;
    }

    anchors.forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

function initDepoimentosWhenVisible() {
    const section = document.querySelector('.depoimentos');

    if (!section) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        initDepoimentosCarousel(section);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        const sectionVisible = entries.some((entry) => entry.isIntersecting);

        if (!sectionVisible) {
            return;
        }

        observer.disconnect();
        initDepoimentosCarousel(section);
    }, {
        rootMargin: '240px 0px'
    });

    observer.observe(section);
}

function initDepoimentosCarousel(section) {
    const track = section.querySelector('.depoimentos-track');
    const prevBtn = section.querySelector('.carousel-btn-prev');
    const nextBtn = section.querySelector('.carousel-btn-next');
    const dots = Array.from(section.querySelectorAll('.dot'));
    const cards = Array.from(section.querySelectorAll('.depoimento-card'));

    if (!track || cards.length < 2) {
        return;
    }

    let currentIndex = 0;
    let autoPlayInterval = null;
    let scrollFrame = 0;

    const updateDots = (index) => {
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index);
        });
    };

    const getCardWidth = () => {
        const firstCard = cards[0];

        if (!firstCard) {
            return 0;
        }

        const gap = parseFloat(getComputedStyle(track).gap || '16') || 16;
        return firstCard.getBoundingClientRect().width + gap;
    };

    const updateCarousel = (index, behavior = 'smooth') => {
        const cardWidth = getCardWidth();

        if (!cardWidth) {
            return;
        }

        currentIndex = ((index % cards.length) + cards.length) % cards.length;
        track.scrollTo({
            left: currentIndex * cardWidth,
            behavior
        });
        updateDots(currentIndex);
    };

    const syncIndexFromScroll = () => {
        scrollFrame = 0;

        const cardWidth = getCardWidth();

        if (!cardWidth) {
            return;
        }

        const nextIndex = Math.round(track.scrollLeft / cardWidth);

        if (nextIndex < 0 || nextIndex >= cards.length || nextIndex === currentIndex) {
            return;
        }

        currentIndex = nextIndex;
        updateDots(currentIndex);
    };

    const stopAutoPlay = () => {
        if (!autoPlayInterval) {
            return;
        }

        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    };

    const startAutoPlay = () => {
        stopAutoPlay();

        if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        autoPlayInterval = window.setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 5000);
    };

    prevBtn?.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
    });

    nextBtn?.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
        });
    });

    track.addEventListener('scroll', () => {
        if (scrollFrame) {
            return;
        }

        scrollFrame = window.requestAnimationFrame(syncIndexFromScroll);
    }, { passive: true });

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        track.addEventListener('mouseenter', stopAutoPlay);
        track.addEventListener('mouseleave', startAutoPlay);
    }

    window.addEventListener('resize', debounce(() => {
        updateCarousel(currentIndex, 'auto');
        startAutoPlay();
    }, 150));

    updateDots(currentIndex);
    startAutoPlay();
}

function debounce(callback, wait) {
    let timeoutId;

    return function debouncedFunction(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(...args), wait);
    };
}
