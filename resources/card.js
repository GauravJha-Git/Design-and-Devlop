const track = document.querySelector('.service-container-mobile');
const prevMobile = document.querySelector('.prev-mobile');
const nextMobile = document.querySelector('.next-mobile');
const itemsMobile = Array.from(document.querySelectorAll('.itemMobile'));
let index = 0;

function updateSliderMobile() {
    itemsMobile.forEach((item, i) => {
        item.classList.remove('active');
        if (i === index) {
            item.classList.add('active');
        }
    });
}

function nextSlideMobile() {
    index = (index + 1) % itemsMobile.length;
    updateSliderMobile();
}

function prevSlideMobile() {
    index = (index - 1 + itemsMobile.length) % itemsMobile.length;
    updateSliderMobile();
}

nextMobile.addEventListener('click', nextSlideMobile);
prevMobile.addEventListener('click', prevSlideMobile);
updateSliderMobile();

let touchStartX = 0;
let touchStartY = 0;

track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

track.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - e.changedTouches[0].clientY);
    
    if (Math.abs(diffX) > 50 && diffY < 50) {
        if (diffX > 0) nextSlideMobile();
        else prevSlideMobile();
    }
});
