// Get DOM elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');

// Create hamburger menu button
function createHamburgerMenu() {
  // Create hamburger button
  const hamburger = document.createElement('div');
  hamburger.className = 'hamburger-menu';
  hamburger.innerHTML = `
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  `;
  
  // Add click event listener to toggle menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('change');
    navLinks.classList.toggle('active');
  });
  
  // Insert hamburger before navLinks
  navbar.insertBefore(hamburger, navLinks);
}

// Initialize hamburger menu
createHamburgerMenu();

// Add CSS styles dynamically
function addHamburgerStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Hamburger Menu Styles */
    .hamburger-menu {
      display: none;
      cursor: pointer;
      z-index: 100;
    }
    
    .bar1, .bar2, .bar3 {
      width: 35px;
      height: 5px;
      background-color: #333;
      margin: 6px 0;
      transition: 0.4s;
      border-radius: 3px;
    }
    
    /* Hamburger animation */
    .change .bar1 {
      transform: rotate(-45deg) translate(-9px, 6px);
    }
    
    .change .bar2 {
      opacity: 0;
    }
    
    .change .bar3 {
      transform: rotate(45deg) translate(-8px, -8px);
    }
    
    /* Mobile styles */
    @media (max-width: 768px) {
      .hamburger-menu {
        display: block;
        position: absolute;
        top: 20px;
        right: 20px;
      }
      
      .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 70%;
        height: 100vh;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: right 0.5s ease;
        box-shadow: -5px 0 15px rgba(0,0,0,0.1);
        z-index: 90;
        padding: 50px 0;
      }
      
      .nav-links.active {
        right: 0;
      }
      
      .nav-links li {
        margin: 15px 0;
      }
      
      /* Prevent body scrolling when menu is open */
      body.menu-open {
        overflow: hidden;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Add event listener to prevent body scrolling when menu is open
function handleBodyScroll() {
  const hamburger = document.querySelector('.hamburger-menu');
  
  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(event.target) && 
        !hamburger.contains(event.target)) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('change');
      document.body.classList.remove('menu-open');
    }
  });
  
  // Close menu when clicking on a nav link
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('change');
      document.body.classList.remove('menu-open');
    });
  });
}

// Initialize everything
function init() {
  addHamburgerStyles();
  handleBodyScroll();
  
  // Add resize handler to reset menu state on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      document.querySelector('.hamburger-menu').classList.remove('change');
      document.body.classList.remove('menu-open');
    }
  });
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

