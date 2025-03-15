document.addEventListener('DOMContentLoaded', () => {
  const heading = document.getElementById('service-heading');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heading.classList.add('visible');
        } else {
          heading.classList.remove('visible');
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(heading);
});

// Service section
const toggleButton = document.querySelector('.service-view-more-btn');
const container = document.querySelector('.service-container');
const hiddenItems = document.querySelectorAll('.services-option.hidden');
const buttonContainer = document.querySelector('.button-container');
const servicesSection = document.getElementById('services');

let isExpanded = false;

toggleButton.addEventListener('click', () => {
  if (!isExpanded) {
    // Expand to show all rows
    hiddenItems.forEach((item) => {
      item.classList.remove('hidden'); // Show all items
    });
    // Adjust section height
    servicesSection.style.height = '1300px';
    // servicesSection.style.height = `${container.offsetHeight + 700}px`;
    toggleButton.textContent = 'View Less'; // Change button text
    isExpanded = true;
  } else {
    // Collapse to show only the first row
    hiddenItems.forEach((item) => {
      item.classList.add('hidden'); // Hide rows
    });
    // Reset section height
    servicesSection.style.height = '';
    toggleButton.textContent = 'View More'; // Reset button text
    isExpanded = false;
  }

  // Adjust button position dynamically
  let buttonOffset;
  if (isExpanded) {
    buttonOffset = container.scrollHeight - 300;
  } else {
    buttonOffset = -10;
  }
  buttonContainer.style.transform = `translateY(${buttonOffset}px)`;
});

// Handle first set of service items (service-logo, service-heading-in, service-des)
document.addEventListener("DOMContentLoaded", function () {
  const serviceLogo = document.querySelectorAll(".service-logo");
  const serviceHeading = document.querySelectorAll(".service-heading-in");
  const serviceDes = document.querySelectorAll(".service-des");

  function handleScroll() {
    const elements = [...serviceLogo, ...serviceHeading, ...serviceDes];
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
      if (isVisible) {
        el.classList.add("all-service-visible");
      }
    });
  }

  // Trigger on scroll
  window.addEventListener("scroll", handleScroll);

  // Trigger on page load in case elements are already visible
  handleScroll();
});






  





function createStars() {
  const starsContainer = document.querySelector('.stars');
  const numberOfStars = 150;
  
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.width = `${Math.random() * 2 + 1}px`;
    star.style.height = star.style.width;
    starsContainer.appendChild(star);
  }
}

createStars();




















//Team - Mobile
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.team-column-mobile');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const slideWidth = 190 + 20; // slide width + gap

  let currentIndex = 1;
  let startX;
  let isDragging = false;
  let currentTranslate = 0;
  let prevTranslate = 0;

  function moveToSlide(index, animate = true) {
      if (!animate) {
          track.classList.add('no-transition');
      }

      currentIndex = index;
      currentTranslate = -(currentIndex * slideWidth);
      track.style.transform = `translateX(${currentTranslate}px)`;
      
      if (!animate) {
          track.offsetHeight; // Force reflow
          track.classList.remove('no-transition');
      }

      updateSlideBlur();

      // Handle infinite scroll
      if (currentIndex === 4) {
          setTimeout(() => {
              moveToSlide(1, false);
          }, 500);
      } else if (currentIndex === 0) {
          setTimeout(() => {
              moveToSlide(3, false);
          }, 500);
      }
  }

  function updateSlideBlur() {
      slides.forEach((slide, index) => {
          if (index === currentIndex) {
              slide.classList.remove('blur');
          } else {
              slide.classList.add('blur');
          }
      });
  }

  prevButton.addEventListener('click', () => {
      moveToSlide(currentIndex - 1);
  });

  nextButton.addEventListener('click', () => {
      moveToSlide(currentIndex + 1);
  });

  // Touch events
  track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      prevTranslate = currentTranslate;
  });

  track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      currentTranslate = prevTranslate + diff;
      track.style.transform = `translateX(${currentTranslate}px)`;
  });

  track.addEventListener('touchend', () => {
      isDragging = false;
      const threshold = slideWidth / 4;
      const diff = currentTranslate - prevTranslate;

      if (Math.abs(diff) > threshold) {
          if (diff > 0) {
              moveToSlide(currentIndex - 1);
          } else {
              moveToSlide(currentIndex + 1);
          }
      } else {
          moveToSlide(currentIndex);
      }
  });

  // Initialize
  moveToSlide(1, false);
}); 













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

  



// alert box




//form validation

