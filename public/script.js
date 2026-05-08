// client-side validation and UI effects
document.addEventListener('DOMContentLoaded', () => {
    const textareas = document.querySelectorAll('textarea');

    // Auto-expand textareas as user types
    textareas.forEach(area => {
        area.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    // Simple password strength logger
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
        passwordInput.addEventListener('keyup', (e) => {
            if (e.target.value.length < 6) {
                e.target.style.borderColor = "red";
            } else {
                e.target.style.borderColor = "#27ae60";
            }
        });
    }
});