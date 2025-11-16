// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Handle old mobile menu button (for index.html)
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu && window.innerWidth < 768) {
                    navMenu.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                }
            }
        });
    });

    // Seller form handling
    const sellerForm = document.getElementById('sellerForm');
    if (sellerForm) {
        const formInputs = sellerForm.querySelectorAll('input, textarea');
        const fileInputs = sellerForm.querySelectorAll('input[type="file"]');
        
        // Handle file input changes
        fileInputs.forEach(input => {
            input.addEventListener('change', function() {
                const fileName = this.files[0]?.name;
                const fileNameElement = document.getElementById(this.id + 'Name');
                if (fileNameElement && fileName) {
                    fileNameElement.textContent = fileName;
                } else if (fileNameElement && !fileName) {
                    fileNameElement.textContent = 'No file chosen';
                }
            });
        });

        // Form validation
        sellerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.form-error').forEach(error => {
                error.classList.remove('show');
                error.textContent = '';
            });
            
            const submitBtn = document.getElementById('submitBtn');
            const submitText = document.getElementById('submitText');
            const successMessage = document.getElementById('successMessage');
            
            // Get form data
            const formData = new FormData(sellerForm);
            const errors = [];
            
            // Validate required fields
            const fullName = formData.get('fullName')?.trim();
            const email = formData.get('email')?.trim();
            const phone = formData.get('phone')?.trim();
            const nicNumber = formData.get('nicNumber')?.trim();
            const nicFile = formData.get('nicFile');
            const gemRegFile = formData.get('gemRegFile');
            
            if (!fullName) {
                errors.push({ field: 'fullName', message: 'Full name is required.' });
            }
            
            if (!email) {
                errors.push({ field: 'email', message: 'Email is required.' });
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errors.push({ field: 'email', message: 'Please enter a valid email address.' });
            }
            
            if (!phone) {
                errors.push({ field: 'phone', message: 'Contact number is required.' });
            }
            
            if (!nicNumber) {
                errors.push({ field: 'nicNumber', message: 'NIC number is required.' });
            }
            
            if (!nicFile || nicFile.size === 0) {
                errors.push({ field: 'nicFile', message: 'NIC scan is required.' });
            }
            
            if (!gemRegFile || gemRegFile.size === 0) {
                errors.push({ field: 'gemRegFile', message: 'GemReg certificate is required.' });
            }
            
            // Display errors
            if (errors.length > 0) {
                errors.forEach(error => {
                    const errorElement = document.getElementById(error.field + 'Error');
                    if (errorElement) {
                        errorElement.textContent = error.message;
                        errorElement.classList.add('show');
                    }
                });
                return;
            }
            
            // Disable submit button
            submitBtn.disabled = true;
            submitText.textContent = 'Submitting application...';
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                sellerForm.reset();
                
                // Clear file names
                document.querySelectorAll('.file-name').forEach(el => {
                    el.textContent = 'No file chosen';
                });
                
                // Show success message
                if (successMessage) {
                    successMessage.textContent = 'Thank you! Your application has been received. Our onboarding team will contact you soon.';
                    successMessage.classList.add('show');
                }
                
                // Reset submit button
                submitBtn.disabled = false;
                submitText.textContent = 'Submit Application';
                
                // Scroll to success message
                if (successMessage) {
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
                // Hide success message after 10 seconds
                setTimeout(() => {
                    if (successMessage) {
                        successMessage.classList.remove('show');
                    }
                }, 10000);
            }, 1200);
        });
        
        // Clear errors on input
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorElement = document.getElementById(this.name + 'Error');
                if (errorElement) {
                    errorElement.classList.remove('show');
                    errorElement.textContent = '';
                }
            });
        });
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const newsletterInput = newsletterForm.querySelector('.newsletter-input');
        const newsletterBtn = newsletterForm.querySelector('.newsletter-btn');
        
        if (newsletterBtn) {
            newsletterBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const email = newsletterInput?.value.trim();
                
                if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    // Simulate subscription
                    alert('Thank you for subscribing! You will receive updates from GemMarket.');
                    if (newsletterInput) {
                        newsletterInput.value = '';
                    }
                } else {
                    alert('Please enter a valid email address.');
                }
            });
        }
    }

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .feature-card, .workflow-step, .testimonial-card, .plan-card, .featured-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.nav');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        });
    }
});

// Button handlers for index.html
function handleContactSeller() {
    if (confirm('Please sign in to contact sellers. Would you like to go to the login page?')) {
        window.location.href = 'login.html';
    }
}

function handleChoosePlan() {
    alert('Redirecting to seller registration...');
    window.location.href = 'seller.html';
}

function handlePremiumBoost() {
    alert('Premium boost feature. Please sign in to activate premium boosts for your listings.');
    window.location.href = 'login.html';
}

// Make functions globally available
window.handleContactSeller = handleContactSeller;
window.handleChoosePlan = handleChoosePlan;
window.handlePremiumBoost = handlePremiumBoost;

// Add click handlers for all contact seller buttons
document.addEventListener('DOMContentLoaded', function() {
    // Handle contact seller buttons that don't have onclick
    document.querySelectorAll('.btn-featured, .btn-card').forEach(button => {
        if (!button.onclick && button.textContent.toLowerCase().includes('contact')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                handleContactSeller();
            });
        }
    });
    
    // Handle choose plan buttons
    document.querySelectorAll('.btn-plan').forEach(button => {
        if (!button.onclick) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                handleChoosePlan();
            });
        }
    });
});

