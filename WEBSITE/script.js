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
  const starsContainer = document.querySelector('.stars-footer');
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

if (nextMobile) {
    nextMobile.addEventListener('click', nextSlideMobile);
}
if (prevMobile) {
    prevMobile.addEventListener('click', prevSlideMobile);
}
updateSliderMobile();

let touchStartX = 0;
let touchStartY = 0;

if (track) {
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
}

  







//form 
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const submitButton = document.getElementById("form-button");
  const afterSuc = document.getElementById("afterSuc");
  
  // Validation patterns
  const namePattern = /^[A-Za-z]+$/; // Only letters, no spaces
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^[0-9]{10}$/;

  // Reset border color when user starts typing
  document.querySelectorAll("#contact-form input, #contact-form select, #contact-form textarea").forEach(input => {
      input.addEventListener("input", function () {
          this.style.borderColor = "#ccc";
      });
  });

  const API_URL = 'http://localhost:5001/api/form/submit';

  submitButton.addEventListener("click", async function (event) {
      event.preventDefault();
      
      // Quick validation without trim
      const firstName = document.getElementById("firstName");
      const lastName = document.getElementById("lastName");
      const email = document.getElementById("email");
      const number = document.getElementById("number");
      const watsNumber = document.getElementById("watsNumber");
      const service = document.getElementById("service");
      
      // Fast validation check - last name is optional
      if (!namePattern.test(firstName.value) || 
          !emailPattern.test(email.value) || 
          !phonePattern.test(number.value) ||
          (watsNumber.value && !phonePattern.test(watsNumber.value)) ||
          !service.value) {
          alert("Please fill all required fields correctly");
          return;
      }

      // Store form data before reset
      const formData = {
          firstName: firstName.value,
          lastName: lastName.value || "", // Use empty string if last name is not provided
          email: email.value,
          number: number.value,
          watsNumber: watsNumber.value || "",
          service: service.value,
          comments: document.getElementById("comments").value || ""
      };

      // Reset form immediately
      document.getElementById("contact-form").reset();
      
      // Reset border colors
      document.querySelectorAll("#contact-form input, #contact-form select, #contact-form textarea").forEach(input => {
          input.style.borderColor = "#ccc";
      });

      try {
          const response = await fetch(API_URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData)
          });

          const data = await response.json();
          
          if (response.ok) {
              // Show success message
              afterSuc.style.display = "block";
              afterSuc.style.opacity = "1";
              
              // Hide success message after 5 seconds
              setTimeout(() => {
                  afterSuc.style.opacity = "0";
                  setTimeout(() => {
                      afterSuc.style.display = "none";
                  }, 500);
              }, 3000);
              
              return;
          } else {
              throw new Error(data.message || 'Failed to submit form');
          }
      } catch (error) {
          console.error("Form submission error:", error);
          alert("❌ Error submitting form: " + error.message);
      }
  });
});

// Star animation code
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const stars = [];
  const starCount = 100;
  
  for (let i = 0; i < starCount; i++) {
      stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.05
      });
  }
  
  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.fill();
          
          star.opacity += Math.random() * 0.01 - 0.005;
          if (star.opacity < 0.2) star.opacity = 0.2;
          if (star.opacity > 1) star.opacity = 1;
          
          star.y += star.speed;
          
          if (star.y > canvas.height) {
              star.y = 0;
              star.x = Math.random() * canvas.width;
          }
      });
      
      requestAnimationFrame(animate);
  }
  
  animate();
});




