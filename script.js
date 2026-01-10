// TYPED JS
const typed = new Typed('#text', {
    strings: ['a Social Enthusiast', 'an Administrator', 'a Consultant', 'an Academic', 'a Trainer', 'a Researcher', 'a Motivational Speaker'],
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

// CONTACT FORM SUBMISSION
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (contactForm) {
    // Clear invalid styling when typing
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('invalid');
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Custom Validation
        let isValid = true;
        contactForm.querySelectorAll('[required]').forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('invalid');
                isValid = false;
            } else {
                input.classList.remove('invalid');
            }
        });

        if (!isValid) {
            contactStatus.className = 'contact-status-message mt-3 text-center show error';
            contactStatus.textContent = 'Please fill out all required fields.';
            return;
        }

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.contact-submit');
        const originalBtnText = submitBtn.textContent;

        // Reset status
        contactStatus.className = 'contact-status-message mt-3 text-center';

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        contactStatus.classList.add('show', 'loading');
        contactStatus.textContent = 'Sending your message...';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            contactStatus.classList.remove('loading');

            if (response.ok) {
                contactStatus.classList.add('success');
                contactStatus.innerHTML = '<i class="fa-solid fa-circle-check me-2"></i>Thank you! Your message has been sent successfully.';
                contactForm.reset();
            } else {
                const data = await response.json();
                contactStatus.classList.add('error');
                if (Object.hasOwn(data, 'errors')) {
                    contactStatus.textContent = data['errors'].map(error => error['message']).join(', ');
                } else {
                    contactStatus.textContent = 'Oops! There was a problem submitting your form.';
                }
            }
        } catch (error) {
            contactStatus.classList.remove('loading');
            contactStatus.classList.add('error');
            contactStatus.textContent = 'Oops! There was a problem connecting to the server.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;

            // Hide message after 5 seconds
            setTimeout(() => {
                contactStatus.classList.remove('show');
            }, 5000);
        }
    });
}