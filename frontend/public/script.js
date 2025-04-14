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
  
    // Change from absolute to relative URL
    const API_URL = '/api/form/submit';
    
    console.log("API endpoint configured:", API_URL);
  
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
            console.log("Sending form data:", formData);
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
  
            console.log("Response status:", response.status);
            console.log("Response headers:", Object.fromEntries([...response.headers]));
            
            // Get the raw text response first
            const responseText = await response.text();
            console.log("Response text:", responseText);
            
            // Only try to parse as JSON if it looks like JSON
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error("JSON parse error:", e);
                throw new Error(`Invalid JSON response. Received: ${responseText.substring(0, 100)}...`);
            }
            
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
  
  
  
  
  
  
  
  
  
  // page bg
  document.addEventListener('DOMContentLoaded', () => {
      const canvas = document.getElementById('cosmosCanvas');
      
      // Check if canvas is supported
      if (!canvas || !canvas.getContext) {
          console.error('Canvas not supported');
          return;
      }
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
          console.error('Canvas context not available');
          return;
      }
      
      // Set canvas dimensions to window size
      function resizeCanvas() {
          // Use device pixel ratio for sharper rendering on high DPI screens
          const dpr = window.devicePixelRatio || 1;
          canvas.width = window.innerWidth * dpr;
          canvas.height = window.innerHeight * dpr;
          
          // Scale context according to device pixel ratio
          ctx.scale(dpr, dpr);
          
          // Set canvas CSS dimensions
          canvas.style.width = `${window.innerWidth}px`;
          canvas.style.height = `${window.innerHeight}px`;
          
          // Redraw everything after resize
          initializeStars();
      }
      
      // Handle window resize
      window.addEventListener('resize', debounce(resizeCanvas, 200));
      
      // Debounce function to limit resize events
      function debounce(func, wait) {
          let timeout;
          return function() {
              clearTimeout(timeout);
              timeout = setTimeout(() => func.apply(this, arguments), wait);
          };
      }
      
      // Star properties
      const baseColor = '#282828';
      const starColors = ['#ffffff', '#efefef', '#d8d8d8', '#cccccc', '#f0f0f0'];
      let galaxies = [];
      let stars = [];
      let animationId = null;
      
      // Initialize galaxies (subtle background elements)
      function initializeGalaxies() {
          galaxies = [];
          
          const width = window.innerWidth;
          const height = window.innerHeight;
          
          for (let i = 0; i < 3; i++) {
              galaxies.push({
                  x: Math.random() * width,
                  y: Math.random() * height,
                  radius: Math.random() * 300 + 200,
                  opacity: Math.random() * 0.05 + 0.02
              });
          }
      }
      
      // Initialize stars
      function initializeStars() {
          // Cancel any existing animation before recreating
          if (animationId) {
              cancelAnimationFrame(animationId);
          }
          
          // Clear arrays
          stars = [];
          
          // Create 3 layers of stars for parallax effect
          const width = window.innerWidth;
          const height = window.innerHeight;
          const starDensity = Math.min(width, height) / 10; // Adjust based on screen size
          
          createStarLayer(Math.floor(starDensity * 0.7), 0.5, 1.2, 0.2); // far layer
          createStarLayer(Math.floor(starDensity * 0.5), 1, 1.8, 0.5);   // mid layer
          createStarLayer(Math.floor(starDensity * 0.2), 1.5, 2.2, 0.8); // near layer
          
          // Initialize galaxies
          initializeGalaxies();
          
          // Initial draw
          drawScene();
      }
      
      function createStarLayer(count, minSize, maxSize, speed) {
          const width = window.innerWidth;
          const height = window.innerHeight;
          
          for (let i = 0; i < count; i++) {
              stars.push({
                  x: Math.random() * width,
                  y: Math.random() * height,
                  radius: Math.random() * (maxSize - minSize) + minSize,
                  color: starColors[Math.floor(Math.random() * starColors.length)],
                  opacity: Math.random() * 0.3 + 0.3,
                  twinkleSpeed: Math.random() * 0.01 + 0.005,
                  twinklePhase: Math.random() * Math.PI * 2,
                  velocity: speed * (Math.random() * 0.05 + 0.02)
              });
          }
      }
      
      // Draw the entire scene
      function drawScene() {
          try {
              // Clear canvas
              ctx.fillStyle = baseColor;
              ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
              
              // Draw galaxies
              galaxies.forEach(galaxy => {
                  const gradient = ctx.createRadialGradient(
                      galaxy.x, galaxy.y, 0,
                      galaxy.x, galaxy.y, galaxy.radius
                  );
                  gradient.addColorStop(0, `rgba(58, 58, 58, ${galaxy.opacity})`);
                  gradient.addColorStop(0.7, 'rgba(40, 40, 40, 0)');
                  
                  ctx.beginPath();
                  ctx.fillStyle = gradient;
                  ctx.arc(galaxy.x, galaxy.y, galaxy.radius, 0, Math.PI * 2);
                  ctx.fill();
              });
              
              // Draw stars
              const height = window.innerHeight;
              const width = window.innerWidth;
              
              stars.forEach(star => {
                  // Calculate twinkle effect
                  const time = Date.now() * star.twinkleSpeed;
                  const twinkle = 0.3 * Math.sin(time + star.twinklePhase) + 0.7;
                  
                  ctx.beginPath();
                  ctx.fillStyle = star.color;
                  ctx.globalAlpha = star.opacity * twinkle;
                  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                  ctx.fill();
                  ctx.globalAlpha = 1;
                  
                  // Add subtle glow for larger stars
                  if (star.radius > 1.3) {
                      ctx.beginPath();
                      const glowGradient = ctx.createRadialGradient(
                          star.x, star.y, 0,
                          star.x, star.y, star.radius * 4
                      );
                      glowGradient.addColorStop(0, `rgba(255, 255, 255, ${0.1 * twinkle * star.opacity})`);
                      glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                      
                      ctx.fillStyle = glowGradient;
                      ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
                      ctx.fill();
                  }
                  
                  // Move stars slightly for subtle parallax
                  star.y += star.velocity;
                  
                  // Reset position when out of bounds
                  if (star.y > height) {
                      star.y = 0;
                      star.x = Math.random() * width;
                  }
              });
              
              // Add noise texture overlay (optimized)
              addNoiseTexture();
              
              // Animation loop
              animationId = requestAnimationFrame(drawScene);
          } catch (error) {
              console.error('Error in animation loop:', error);
              cancelAnimationFrame(animationId);
          }
      }
      
      function addNoiseTexture() {
          // Optimized noise effect - only apply to a subset of pixels
          const width = window.innerWidth;
          const height = window.innerHeight;
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
          
          // Sparse noise points
          for (let i = 0; i < width * height / 10000; i++) {
              const x = Math.random() * width;
              const y = Math.random() * height;
              const size = Math.random() + 0.5;
              
              ctx.beginPath();
              ctx.arc(x, y, size/2, 0, Math.PI * 2);
              ctx.fill();
          }
      }
      
      // Initialize and start animation
      resizeCanvas();
  });