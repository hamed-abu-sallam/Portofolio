/**
 * ContactForm Handler - Disabled
 * Email functionality is not enabled
 */

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit, false);
    }
    
    // Watch for when user enters contact section
    const contactSection = document.getElementById('contact') || document.querySelector('[id="contact"]');
    if (contactSection) {
        // Show message when contact section becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    showMessage('لم يتم إضافة خاصية الإرسال بعد - سيتم إضافتها قريباً | Email sending feature not added yet - coming soon', 'info', true);
                    observer.unobserve(contactSection);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(contactSection);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    showMessage('لم يتم إضافة خاصية الإرسال بعد - سيتم إضافتها قريباً | Email sending feature not added yet - coming soon', 'info', true);
    return false;
}

function showMessage(message, type, persistent = false) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) return;
    
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    if (type === 'info') {
        messageDiv.style.backgroundColor = '#2196F3';
        messageDiv.style.color = 'white';
    }
    
    // Only auto-hide if not persistent
    if (!persistent) {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeContactForm);
} else {
    initializeContactForm();
}

