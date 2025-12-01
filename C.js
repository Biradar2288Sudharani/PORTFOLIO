/*=========== Toggle Icon Navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    
    // Prevent background scrolling when menu is open
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
};

// Close navbar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target) && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
            document.body.style.overflow = '';
        }
    }
});

// Close navbar when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
            document.body.style.overflow = '';
        }
    });
});

/*------------ Scroll Sections Active Link --------*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    // Active link
    let scrollY = window.pageYOffset;
    
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (scrollY >= offset && scrollY < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
            });
        }
    });
    
    // Sticky header
    header.classList.toggle('sticky', scrollY > 100);
    
    // Hide navbar on scroll for mobile
    if (window.innerWidth <= 768) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
        document.body.style.overflow = '';
    }
};

/*======= Scroll Reveal ======*/
ScrollReveal({
    reset: false,
    distance: '50px',
    duration: 1500,
    delay: 200,
    mobile: true
});

// Home section
ScrollReveal().reveal('.home-content h3', { 
    origin: 'top',
    interval: 200
});
ScrollReveal().reveal('.home-content h1', { 
    origin: 'left',
    delay: 400
});
ScrollReveal().reveal('.home-content h2', { 
    origin: 'right',
    delay: 600
});
ScrollReveal().reveal('.home-content p', { 
    origin: 'bottom',
    delay: 800
});
ScrollReveal().reveal('.social-media', { 
    origin: 'bottom',
    delay: 1000
});
ScrollReveal().reveal('.btn', { 
    origin: 'bottom',
    delay: 1200
});
ScrollReveal().reveal('.home-img img', { 
    origin: 'right',
    delay: 600
});

// About section
ScrollReveal().reveal('.heading', { 
    origin: 'top',
    delay: 200
});
ScrollReveal().reveal('.about-img', { 
    origin: 'left',
    delay: 400
});
ScrollReveal().reveal('.about-text', { 
    origin: 'right',
    delay: 600
});

// Education section
ScrollReveal().reveal('.edu-card', { 
    origin: 'bottom',
    interval: 300
});

// Skills section
ScrollReveal().reveal('.skills-box', { 
    origin: 'bottom',
    interval: 200,
    delay: 200
});

// Contact section
ScrollReveal().reveal('.contact .heading', { 
    origin: 'top',
    delay: 200
});
ScrollReveal().reveal('.contact-table-container', { 
    origin: 'bottom',
    delay: 400
});
ScrollReveal().reveal('.contact .social-media', { 
    origin: 'bottom',
    delay: 600
});
ScrollReveal().reveal('.contact .btn', { 
    origin: 'bottom',
    delay: 800
});

/*======= Smooth Scrolling ======*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*======= Touch-friendly Improvements ======*/
// Add touch feedback for buttons
document.querySelectorAll('.btn, .social-media a, .marksheet-btn, .navbar a').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    element.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});

/*======= Loader ======*/
window.addEventListener('load', function() {
    // Add loaded class to body for transition effects
    document.body.classList.add('loaded');
    
    // Hide loading indicator if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

/*======= Back to Top Button ======*/
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="bx bx-chevron-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--main-color);
    color: var(--bg-color);
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    box-shadow: 0 0 20px rgba(0, 238, 255, 0.3);
    transition: all 0.3s ease;
`;
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Touch feedback for back to top button
backToTopButton.addEventListener('touchstart', function() {
    this.style.transform = 'scale(0.9)';
});
backToTopButton.addEventListener('touchend', function() {
    this.style.transform = 'scale(1)';
});

/*======= Performance Optimization ======*/
// Debounce scroll events
let scrollTimer;
window.addEventListener('scroll', () => {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        // Update sticky header
        header.classList.toggle('sticky', window.pageYOffset > 100);
    }, 10);
});

// Lazy load images
const lazyImages = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    if (img.dataset.src) {
        imageObserver.observe(img);
    }
});

// Prevent zoom on double-tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);/*=========== Toggle Icon Navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    
    // Prevent background scrolling when menu is open
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
};

// Close navbar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target) && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
            document.body.style.overflow = '';
        }
    }
});

// Close navbar when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
            document.body.style.overflow = '';
        }
    });
});

/*------------ Scroll Sections Active Link --------*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    // Active link
    let scrollY = window.pageYOffset;
    
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (scrollY >= offset && scrollY < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
            });
        }
    });
    
    // Sticky header
    header.classList.toggle('sticky', scrollY > 100);
    
    // Hide navbar on scroll for mobile
    if (window.innerWidth <= 768) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
        document.body.style.overflow = '';
    }
};

/*======= Scroll Reveal ======*/
ScrollReveal({
    reset: false,
    distance: '50px',
    duration: 1500,
    delay: 200,
    mobile: true
});

// Home section
ScrollReveal().reveal('.home-content h3', { 
    origin: 'top',
    interval: 200
});
ScrollReveal().reveal('.home-content h1', { 
    origin: 'left',
    delay: 400
});
ScrollReveal().reveal('.home-content h2', { 
    origin: 'right',
    delay: 600
});
ScrollReveal().reveal('.home-content p', { 
    origin: 'bottom',
    delay: 800
});
ScrollReveal().reveal('.social-media', { 
    origin: 'bottom',
    delay: 1000
});
ScrollReveal().reveal('.btn', { 
    origin: 'bottom',
    delay: 1200
});
ScrollReveal().reveal('.home-img img', { 
    origin: 'right',
    delay: 600
});

// About section
ScrollReveal().reveal('.heading', { 
    origin: 'top',
    delay: 200
});
ScrollReveal().reveal('.about-img', { 
    origin: 'left',
    delay: 400
});
ScrollReveal().reveal('.about-text', { 
    origin: 'right',
    delay: 600
});

// Education section
ScrollReveal().reveal('.edu-card', { 
    origin: 'bottom',
    interval: 300
});

// Skills section
ScrollReveal().reveal('.skills-box', { 
    origin: 'bottom',
    interval: 200,
    delay: 200
});

// Contact section
ScrollReveal().reveal('.contact .heading', { 
    origin: 'top',
    delay: 200
});
ScrollReveal().reveal('.contact-table-container', { 
    origin: 'bottom',
    delay: 400
});
ScrollReveal().reveal('.contact .social-media', { 
    origin: 'bottom',
    delay: 600
});
ScrollReveal().reveal('.contact .btn', { 
    origin: 'bottom',
    delay: 800
});

/*======= Smooth Scrolling ======*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*======= Touch-friendly Improvements ======*/
// Add touch feedback for buttons
document.querySelectorAll('.btn, .social-media a, .marksheet-btn, .navbar a').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    element.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});

/*======= Loader ======*/
window.addEventListener('load', function() {
    // Add loaded class to body for transition effects
    document.body.classList.add('loaded');
    
    // Hide loading indicator if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

/*======= Back to Top Button ======*/
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="bx bx-chevron-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--main-color);
    color: var(--bg-color);
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    box-shadow: 0 0 20px rgba(0, 238, 255, 0.3);
    transition: all 0.3s ease;
`;
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Touch feedback for back to top button
backToTopButton.addEventListener('touchstart', function() {
    this.style.transform = 'scale(0.9)';
});
backToTopButton.addEventListener('touchend', function() {
    this.style.transform = 'scale(1)';
});

/*======= Performance Optimization ======*/
// Debounce scroll events
let scrollTimer;
window.addEventListener('scroll', () => {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        // Update sticky header
        header.classList.toggle('sticky', window.pageYOffset > 100);
    }, 10);
});

// Lazy load images
const lazyImages = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    if (img.dataset.src) {
        imageObserver.observe(img);
    }
});

// Prevent zoom on double-tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);/*=========== Toggle Icon Navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    
    // Prevent background scrolling when menu is open
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
};

// Close navbar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target) && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
            document.body.style.overflow = '';
        }
    }
});

// Close navbar when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
            document.body.style.overflow = '';
        }
    });
});

/*------------ Scroll Sections Active Link --------*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    // Active link
    let scrollY = window.pageYOffset;
    
    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (scrollY >= offset && scrollY < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
            });
        }
    });
    
    // Sticky header
    header.classList.toggle('sticky', scrollY > 100);
    
    // Hide navbar on scroll for mobile
    if (window.innerWidth <= 768) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
        document.body.style.overflow = '';
    }
};

/*======= Scroll Reveal ======*/
ScrollReveal({
    reset: false,
    distance: '50px',
    duration: 1500,
    delay: 200,
    mobile: true
});

// Home section
ScrollReveal().reveal('.home-content h3', { 
    origin: 'top',
    interval: 200
});
ScrollReveal().reveal('.home-content h1', { 
    origin: 'left',
    delay: 400
});
ScrollReveal().reveal('.home-content h2', { 
    origin: 'right',
    delay: 600
});
ScrollReveal().reveal('.home-content p', { 
    origin: 'bottom',
    delay: 800
});
ScrollReveal().reveal('.social-media', { 
    origin: 'bottom',
    delay: 1000
});
ScrollReveal().reveal('.btn', { 
    origin: 'bottom',
    delay: 1200
});
ScrollReveal().reveal('.home-img img', { 
    origin: 'right',
    delay: 600
});

// About section
ScrollReveal().reveal('.heading', { 
    origin: 'top',
    delay: 200
});
ScrollReveal().reveal('.about-img', { 
    origin: 'left',
    delay: 400
});
ScrollReveal().reveal('.about-text', { 
    origin: 'right',
    delay: 600
});

// Education section
ScrollReveal().reveal('.edu-card', { 
    origin: 'bottom',
    interval: 300
});

// Skills section
ScrollReveal().reveal('.skills-box', { 
    origin: 'bottom',
    interval: 200,
    delay: 200
});

// Contact section
ScrollReveal().reveal('.contact .heading', { 
    origin: 'top',
    delay: 200
});
ScrollReveal().reveal('.contact-table-container', { 
    origin: 'bottom',
    delay: 400
});
ScrollReveal().reveal('.contact .social-media', { 
    origin: 'bottom',
    delay: 600
});
ScrollReveal().reveal('.contact .btn', { 
    origin: 'bottom',
    delay: 800
});

/*======= Smooth Scrolling ======*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*======= Touch-friendly Improvements ======*/
// Add touch feedback for buttons
document.querySelectorAll('.btn, .social-media a, .marksheet-btn, .navbar a').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    element.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});

/*======= Loader ======*/
window.addEventListener('load', function() {
    // Add loaded class to body for transition effects
    document.body.classList.add('loaded');
    
    // Hide loading indicator if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

/*======= Back to Top Button ======*/
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="bx bx-chevron-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--main-color);
    color: var(--bg-color);
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    box-shadow: 0 0 20px rgba(0, 238, 255, 0.3);
    transition: all 0.3s ease;
`;
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Touch feedback for back to top button
backToTopButton.addEventListener('touchstart', function() {
    this.style.transform = 'scale(0.9)';
});
backToTopButton.addEventListener('touchend', function() {
    this.style.transform = 'scale(1)';
});

/*======= Performance Optimization ======*/
// Debounce scroll events
let scrollTimer;
window.addEventListener('scroll', () => {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        // Update sticky header
        header.classList.toggle('sticky', window.pageYOffset > 100);
    }, 10);
});

// Lazy load images
const lazyImages = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    if (img.dataset.src) {
        imageObserver.observe(img);
    }
});

// Prevent zoom on double-tap (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);