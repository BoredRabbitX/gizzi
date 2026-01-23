window.initCarousel = function() {
    const track = document.getElementById('carousel-track');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    let index = 0;

    nextBtn.onclick = () => {
        const items = document.querySelectorAll('.carousel-item');
        const gap = 20;
        const width = items[0].offsetWidth + gap;
        const visible = Math.floor(document.querySelector('.carousel-container').offsetWidth / width);
        const max = items.length - visible;
        
        if (index < max) {
            index++;
            track.style.transform = `translateX(-${index * width}px)`;
        }
    };

    prevBtn.onclick = () => {
        const items = document.querySelectorAll('.carousel-item');
        const gap = 20;
        const width = items[0].offsetWidth + gap;
        
        if (index > 0) {
            index--;
            track.style.transform = `translateX(-${index * width}px)`;
        }
    };
};
