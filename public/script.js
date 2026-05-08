// Rubric #13: Client-side validation 
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const errorElement = document.getElementById('error-message');

            if (!email.includes('@')) {
                e.preventDefault();
                errorElement.innerText = "Please enter a valid email address."; // 
            } else if (message.length < 10) {
                e.preventDefault();
                errorElement.innerText = "Message must be at least 10 characters long."; // 
            }
        });
    }
});