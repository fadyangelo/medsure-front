// Mobile Menu Functionality
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

// Carousel Functionality
let currentSlide = 0;
const totalSlides = 7;

function updateCarousel() {
    const carousel = document.getElementById('imageCarousel');
    const indicators = document.querySelectorAll('.indicator');
    const isRTL = document.documentElement.dir === 'rtl';
    
    // Update carousel position with RTL support
    const translateX = isRTL ? currentSlide * 25 : -currentSlide * 25;
    carousel.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}
/* function updateCarousel() {
    const carousel = document.getElementById('imageCarousel');
    const indicators = document.querySelectorAll('.indicator');
    
    // Update carousel position
    carousel.style.transform = `translateX(-${currentSlide * 25}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}*/





function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Auto-advance carousel
setInterval(nextSlide, 5000);

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.metric-number');
    const speed = 100; // The lower the faster
    let animationStarted = false;

    function startCounters() {
        if (animationStarted) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            let count = 0;
            counter.innerText = '0';
            
            // Calculate increment based on target to make all counters finish at similar time
            const increment = Math.ceil(target / speed);
            
            function updateCounter() {
                count += increment;
                if (count < target) {
                    counter.innerText = count.toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            }
            
            // Start counter after a small delay
            setTimeout(updateCounter, 100);
        });
        
        animationStarted = true;
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add scroll event listener
    function handleScroll() {
        const metricsSection = document.getElementById('metrics');
        if (metricsSection && isInViewport(metricsSection)) {
            // Make sure counters are visible
            document.querySelectorAll('.metric-number').forEach(counter => {
                counter.style.opacity = '1';
                counter.style.transform = 'translateY(0)';
            });
            
            // Animate cards
            metricsSection.querySelectorAll('.metric-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animated');
                }, index * 150);
            });
            
            // Start counters after a small delay
            setTimeout(() => {
                startCounters();
                // Remove the event listener after animation starts
                window.removeEventListener('scroll', handleScroll);
            }, 500);
        }
    }

    // Initial check in case the section is already in view
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize counter animation when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Wait a bit to ensure all elements are rendered
        setTimeout(animateCounters, 500);
    });
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Initialize carousel
    updateCarousel();
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .service-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const metricsSection = document.querySelector('.metrics-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  });

  observer.observe(metricsSection);
});

// Language Selector
function toggleLangMenu(event) {
  event.stopPropagation();
  const menu = document.querySelector('.lang-menu');
  if (!menu) return;
  menu.classList.toggle('hidden');

  function onDocClick(ev) {
    if (!menu.contains(ev.target)) {
      menu.classList.add('hidden');
      document.removeEventListener('click', onDocClick);
    }
  }
  // Attach a one-time outside click listener to close the menu
  document.addEventListener('click', onDocClick);
}

function setLanguage(lang) {
    loadLanguage(lang);
    // RELOAD THE PAGE
    // This forces a new request to the server.
    // The server reads the cookie -> Fetches Strapi (AR) -> Sends back Arabic HTML.
    window.location.reload(); 
}

// function setLanguage(lang) {
//   try {
//     alert('setLanguage');
//     // 1. Set the cookie so Astro Server can read it
//     document.cookie = `site_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    
//     // 2. Update LocalStorage (Optional backup)
//     localStorage.setItem('site_lang', lang);

//     // 3. RELOAD THE PAGE
//     // This forces a new request to the server.
//     // The server reads the cookie -> Fetches Strapi (AR) -> Sends back Arabic HTML.
//     window.location.reload(); 
    
//     // alert(lang);
//   } catch (e) { /* ignore */ }

//   // Update button label
//   const label = document.querySelector('.current-lang-label');
//   if (label) label.textContent = lang === 'ar' ? 'AR' : 'EN';

//   // Update checked state in menu
//   document.querySelectorAll('.lang-option').forEach(opt => {
//     const isChecked = opt.getAttribute('data-lang') === lang;
//     opt.setAttribute('aria-checked', isChecked ? 'true' : 'false');
//   });

//   // Apply language and direction to <html>
//   const html = document.documentElement;
//   html.setAttribute('lang', lang);
//   html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  
//   // Update all translations on the page
//   if (typeof updateTranslations === 'function') {
//     updateTranslations(lang);
//   }

//   // Close menu if open
//   const menu = document.querySelector('.lang-menu');
//   if (menu) menu.classList.add('hidden');
// }

function loadLanguage(lang) {
  try {
    //alert('loadLanguage');
    // 1. Set the cookie so Astro Server can read it
    document.cookie = `site_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    
    // 2. Update LocalStorage (Optional backup)
    localStorage.setItem('site_lang', lang);

    // 3. RELOAD THE PAGE
    // This forces a new request to the server.
    // The server reads the cookie -> Fetches Strapi (AR) -> Sends back Arabic HTML.
    
    // alert(lang);
  } catch (e) { /* ignore */ }

  // Update button label
  const label = document.querySelector('.current-lang-label');
  if (label) label.textContent = lang === 'ar' ? 'AR' : 'EN';

  // Update checked state in menu
  document.querySelectorAll('.lang-option').forEach(opt => {
    const isChecked = opt.getAttribute('data-lang') === lang;
    opt.setAttribute('aria-checked', isChecked ? 'true' : 'false');
  });

  // Apply language and direction to <html>
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  
  // Update all translations on the page
  if (typeof updateTranslations === 'function') {
    updateTranslations(lang);
  }

  // Close menu if open
  const menu = document.querySelector('.lang-menu');
  if (menu) menu.classList.add('hidden');
}
// Initialize language on load (default EN)
document.addEventListener('DOMContentLoaded', function() {
  let lang = 'en';
  try {
    lang = localStorage.getItem('site_lang') || 'en';
  } catch (e) { /* ignore */ }
  loadLanguage(lang);

// const savedLang = localStorage.getItem('site_lang');
// let lang = 'en';
//   // 2. If it does NOT exist, set default
//   if (!savedLang) {
//     alert('en');
//     setLanguage('en');
//   } 
//   else 
//   {
//     lang = savedLang;
//   }
});
