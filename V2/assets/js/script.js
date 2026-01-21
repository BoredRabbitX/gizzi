function moveCarousel(direction) {
    const track = document.getElementById('carousel-track');
    if (!track || track.children.length <= 1) return;
    
    const itemWidth = track.children[0].offsetWidth + 32;
    const visibleItems = Math.floor(track.parentElement.offsetWidth / itemWidth);
    const maxIndex = track.children.length - visibleItems;
    
    carouselIndex += direction;
    
    if (carouselIndex < 0) carouselIndex = 0;
    if (carouselIndex > maxIndex) carouselIndex = maxIndex;
    
    track.style.transform = `translateX(-${carouselIndex * itemWidth}px)`;
    updateCarouselButtons();
}

function updateCarouselButtons() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const itemWidth = track.children[0].offsetWidth + 32;
    const visibleItems = Math.floor(track.parentElement.offsetWidth / itemWidth);
    const maxIndex = track.children.length - visibleItems;
    
    prevBtn.classList.toggle('disabled', carouselIndex === 0);
    nextBtn.classList.toggle('disabled', carouselIndex >= maxIndex);
}

function startCarousel() {
    setInterval(() => {
        const track = document.getElementById('carousel-track');
        if (!track || track.children.length <= 1) return;
        
        const itemWidth = track.children[0].offsetWidth + 32;
        const visibleItems = Math.floor(track.parentElement.offsetWidth / itemWidth);
        const maxIndex = track.children.length - visibleItems;
        
        carouselIndex++;
        if (carouselIndex > maxIndex) carouselIndex = 0;
        
        track.style.transform = `translateX(-${carouselIndex * itemWidth}px)`;
        updateCarouselButtons();
    }, 4000);
}