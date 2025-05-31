document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    const successModal = document.getElementById('successModal');
    const closeButton = document.querySelector('.close-button');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });

    function validateForm() {
        let isValid = true;

        if (nameInput.value.trim() === '') {
            displayError(nameInput, nameError, 'Por favor, digite seu nome.');
            isValid = false;
        } else {
            clearError(nameInput, nameError);
        }

        if (emailInput.value.trim() === '') {
            displayError(emailInput, emailError, 'Por favor, digite seu email.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            displayError(emailInput, emailError, 'Por favor, digite um email válido.');
            isValid = false;
        } else {
            clearError(emailInput, emailError);
        }

        if (messageInput.value.trim() === '') {
            displayError(messageInput, messageError, 'Por favor, digite sua mensagem.');
            isValid = false;
        } else {
            clearError(messageInput, messageError);
        }

        if (isValid) {
            successModal.style.display = 'flex';
            contactForm.reset();
        } else {
            successModal.style.display = 'none';
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function displayError(inputElement, errorElement, message) {
        inputElement.classList.add('error');
        errorElement.textContent = message;
    }

    function clearError(inputElement, errorElement) {
        inputElement.classList.remove('error');
        errorElement.textContent = '';
    }

    function submitForm() {
        console.log('Formulário enviado!');
    }

    if (closeButton && successModal) {
        closeButton.addEventListener('click', () => {
            successModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    }
});