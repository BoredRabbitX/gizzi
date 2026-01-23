class Carousel {
    constructor(options) {
        this.container = options.container;
        this.track = options.track;
        this.prevBtn = options.prevBtn;
        this.nextBtn = options.nextBtn;
        this.dotsContainer = options.dotsContainer;
        this.itemsPerView = options.itemsPerView || 4;
        this.gap = options.gap || 24;
        this.autoPlay = options.autoPlay !== false;
        this.autoPlayInterval = options.autoPlayInterval || 5000;

        this.currentIndex = 0;
        this.interval = null;

        this.init();
    }

    init() {
        this.updateButtons();
        this.createDots();
        this.updateTrackPosition();

        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        if (this.autoPlay) {
            this.startAutoPlay();
        }

        window.addEventListener('resize', () => this.handleResize());
    }

    getItems() {
        return this.track?.querySelectorAll('.product-card') || [];
    }

    getVisibleItems() {
        const containerWidth = this.container.offsetWidth;
        const itemWidth = this.getItemWidth();
        return Math.floor(containerWidth / itemWidth) || 1;
    }

    getItemWidth() {
        const items = this.getItems();
        if (items.length === 0) return 300;
        return items[0].offsetWidth + this.gap;
    }

    getMaxIndex() {
        const items = this.getItems();
        const visibleItems = this.getVisibleItems();
        return Math.max(0, items.length - visibleItems);
    }

    next() {
        const max = this.getMaxIndex();
        this.currentIndex = this.currentIndex < max ? this.currentIndex + 1 : 0;
        this.updateTrackPosition();
        this.updateButtons();
        this.updateDots();
    }

    prev() {
        const max = this.getMaxIndex();
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : max;
        this.updateTrackPosition();
        this.updateButtons();
        this.updateDots();
    }

    goTo(index) {
        const max = this.getMaxIndex();
        this.currentIndex = Math.min(Math.max(0, index), max);
        this.updateTrackPosition();
        this.updateButtons();
        this.updateDots();
    }

    updateTrackPosition() {
        if (!this.track) return;
        const itemWidth = this.getItemWidth();
        const offset = this.currentIndex * itemWidth;
        this.track.style.transform = `translateX(-${offset}px)`;
    }

    updateButtons() {
        const max = this.getMaxIndex();
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex >= max;
        }
    }

    createDots() {
        if (!this.dotsContainer) return;

        const items = this.getItems();
        const visibleItems = this.getVisibleItems();
        const dotsCount = Math.max(1, items.length - visibleItems + 1);

        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    updateDots() {
        if (!this.dotsContainer) return;

        const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.interval = setInterval(() => this.next(), this.autoPlayInterval);
    }

    stopAutoPlay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    handleResize() {
        this.updateButtons();
        this.createDots();
        this.updateTrackPosition();
    }

    refresh() {
        this.currentIndex = 0;
        this.updateTrackPosition();
        this.updateButtons();
        this.createDots();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎠 Initializing carousel...');
    const featuredCarousel = document.getElementById('featured-carousel');
    if (featuredCarousel) {
        const track = document.getElementById('featured-track');
        const prevBtn = document.getElementById('featured-prev');
        const nextBtn = document.getElementById('featured-next');
        const dotsContainer = document.getElementById('featured-dots');

        window.featuredCarousel = new Carousel({
            container: featuredCarousel,
            track: track,
            prevBtn: prevBtn,
            nextBtn: nextBtn,
            dotsContainer: dotsContainer,
            itemsPerView: 4,
            gap: 24,
            autoPlay: true,
            autoPlayInterval: 5000
        });
        console.log('✅ Carousel initialized');
    } else {
        console.warn('❌ Featured carousel element not found');
    }
});