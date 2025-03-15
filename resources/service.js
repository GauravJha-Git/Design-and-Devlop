const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          const card = entry.target;
          card.classList.add('visible');
          
          const iconWrapper = card.querySelector('.icon-wrapper');
          const title = card.querySelector('.title');
          const description = card.querySelector('.description');
          
          iconWrapper.classList.add('visible');
          title.classList.add('visible');
          description.classList.add('visible');
      }
  });
}, observerOptions);

const serviceCard = document.querySelector('.service-card');
observer.observe(serviceCard);

function handleCardClick(event) {
  event.preventDefault();
  // Add your click handler here
  console.log('Card clicked!');
  alert('Service Card Clicked!');
}







const toggleButton = document.querySelector('.service-view-more-btn');
const container = document.querySelector('.service-box');
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
    servicesSection.style.height = '1100px';
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
    buttonOffset = container.scrollHeight - 375;
  } else {
    buttonOffset = -50;
  }
  buttonContainer.style.transform = `translateY(${buttonOffset}px)`;
});
