// Neon Minimalist Login Form - Complete JavaScript

class NeonLoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.emailError = document.getElementById('emailError');
        this.passwordError = document.getElementById('passwordError');
        this.submitBtn = document.querySelector('.login-btn');
        this.successMessage = document.getElementById('successMessage');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.loginCard = document.querySelector('.login-card');
        
        this.init();
    }
    
    init() {
        this.setupEntranceAnimation();
        this.setupPasswordToggle();
        this.setupParallaxEffect();
        this.setupRealTimeValidation();
        this.setupFormSubmission();
        this.setupSocialButtons();
        this.setupForgotPassword();
        this.setupSignupLink();
    }
    
    setupEntranceAnimation() {
        if (this.loginCard) {
            this.loginCard.style.opacity = '0';
            this.loginCard.style.transform = 'translateY(30px) scale(0.95)';
            setTimeout(() => {
                this.loginCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                this.loginCard.style.opacity = '1';
                this.loginCard.style.transform = 'translateY(0) scale(1)';
            }, 100);
        }
    }
    
    setupPasswordToggle() {
        if (this.passwordToggle) {
            this.passwordToggle.addEventListener('click', () => {
                const type = this.passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                this.passwordInput.setAttribute('type', type);
                
                // Update icon
                const toggleIcon = this.passwordToggle.querySelector('.toggle-icon');
                if (toggleIcon) {
                    if (type === 'text') {
                        toggleIcon.style.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300ff88' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'/%3e%3c/svg%3e\")";
                    } else {
                        toggleIcon.style.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a0a0b0' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'/%3e%3c/svg%3e\")";
                    }
                }
            });
        }
    }
    
    setupParallaxEffect() {
        document.addEventListener('mousemove', (e) => {
            const orbs = document.querySelectorAll('.glow-orb');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 30;
                const moveX = (x - 0.5) * speed;
                const moveY = (y - 0.5) * speed;
                orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    showError(input, errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        input.closest('.form-group').classList.add('error');
    }
    
    hideError(input, errorElement) {
        errorElement.classList.remove('show');
        input.closest('.form-group').classList.remove('error');
    }
    
    setupRealTimeValidation() {
        // Email validation
        this.emailInput.addEventListener('input', () => {
            if (this.emailInput.value && !this.validateEmail(this.emailInput.value)) {
                this.showError(this.emailInput, this.emailError, 'Please enter a valid email address');
            } else {
                this.hideError(this.emailInput, this.emailError);
            }
        });
        
        // Password validation
        this.passwordInput.addEventListener('input', () => {
            if (this.passwordInput.value && this.passwordInput.value.length < 6) {
                this.showError(this.passwordInput, this.passwordError, 'Password must be at least 6 characters');
            } else {
                this.hideError(this.passwordInput, this.passwordError);
            }
        });
    }
    
    setupFormSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate email
            if (!this.emailInput.value) {
                this.showError(this.emailInput, this.emailError, 'Email is required');
                isValid = false;
            } else if (!this.validateEmail(this.emailInput.value)) {
                this.showError(this.emailInput, this.emailError, 'Please enter a valid email address');
                isValid = false;
            } else {
                this.hideError(this.emailInput, this.emailError);
            }
            
            // Validate password
            if (!this.passwordInput.value