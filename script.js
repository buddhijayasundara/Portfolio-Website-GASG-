// TYPED JS
const typed = new Typed('#text', {
    strings: ['a Consultant.', 'an Academic.', 'a Trainer.', 'a Researcher.', 'a motivational speaker.'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
});

// SHOW SKILLS
const skillBtn = document.querySelector('.skill_btn');
const skillDet = document.querySelector('.about_bottom');

if (skillBtn && skillDet) {
    skillBtn.addEventListener('click', () => {
        skillDet.classList.toggle('show_skills');
        skillBtn.textContent = skillDet.classList.contains('show_skills') ? 'Hide my capabilities' : 'Show my capabilities';
    });
}

// STICKY NAVIGATION BAR
const nav = document.querySelector('.navbar');
const navbarCollapse = document.querySelector('#navbarNav');
const navbarToggler = document.querySelector('.navbar-toggler');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('sticky_nav');
    } else {
        nav.classList.remove('sticky_nav');
    }

    // Close navbar on scroll if it's expanded
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
            bsCollapse.hide();
        } else {
            // If no instance exists, create one and hide it
            new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
        }
    }
});

// Close navbar when clicking outside
document.addEventListener('click', (event) => {
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // Check if click is outside navbar
        const isClickInsideNavbar = nav.contains(event.target);

        if (!isClickInsideNavbar) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            } else {
                new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
            }
        }
    }
});

// Close navbar when clicking on nav links (for smooth navigation)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            } else {
                new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
            }
        }
    });
});

// TESTIMONIAL SWIPER SLIDER
const testimonialSwiper = new Swiper('.testSwiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Portfolio MixItUp and Swiper are now handled by portfolio-loader.js

// BLOGS SWIPER SLIDER
const blogSwiper = new Swiper('.blogSwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});