document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.register-form');
    const resetButton = document.getElementById('reset-button');

    // Elementos do formulário
    const inputs = {
        name: document.getElementById('name'),
        cpf: document.getElementById('cpf'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirm-password'),
        zip: document.getElementById('zip'),
        offers: document.getElementById('offers'),
    };

    const inputList = document.querySelectorAll('input, select');

    // Utilitários
    const regexes = {
        cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\(\d{2}\) \d{5}-\d{4}$/,
        zip: /^\d{5}-\d{3}$/,
    };

    // Exibir e limpar mensagens de erro
    function showError(input, message) {
        clearError(input);
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        input.classList.add('error');
        
        if (input.type === 'checkbox') {
            errorElement.style.marginRight = '10px';
            input.parentElement.insertBefore(errorElement, input);
        } else {
            input.insertAdjacentElement('afterend', errorElement);
        }
    }

    function clearError(input) {
        const errorElement = input.nextElementSibling?.classList.contains('error-message')
            ? input.nextElementSibling
            : input.parentElement.querySelector('.error-message');

        if (errorElement) errorElement.remove();
        input.classList.remove('error');
    }

    // Validação individual
    function validateInput(input) {
        clearError(input);

        if (input.value.trim() === '') {
            showError(input, `${input.previousElementSibling?.textContent.trim()} é obrigatório.`);
            return false;
        }

        if (input === inputs.cpf && !regexes.cpf.test(input.value)) {
            showError(input, 'CPF inválido. Deve seguir o formato 000.000.000-00.');
            return false;
        }

        if (input === inputs.email && !regexes.email.test(input.value)) {
            showError(input, 'E-mail inválido.');
            return false;
        }

        if (input === inputs.phone && !regexes.phone.test(input.value)) {
            showError(input, 'Número de telefone inválido.');
            return false;
        }

        if (input === inputs.zip && !regexes.zip.test(input.value)) {
            showError(input, 'CEP inválido.');
            return false;
        }

        if (input === inputs.confirmPassword && input.value !== inputs.password.value) {
            showError(input, 'As senhas não coincidem.');
            return false;
        }

        return true;
    }

    // Formatar valores de entrada
    function formatInput(input, regex, formatter) {
        let value = input.value.replace(/\D/g, '');
        value = value.slice(0, formatter.maxLength);

        if (formatter.format) {
            value = value.replace(regex, formatter.format);
        }

        input.value = value;
    }

    inputs.cpf.addEventListener('input', () => {
        formatInput(inputs.cpf, /^(\d{3})(\d{3})?(\d{3})?(\d{2})?$/, {
            maxLength: 11,
            format: (match, p1, p2, p3, p4) => `${p1}${p2 ? '.' + p2 : ''}${p3 ? '.' + p3 : ''}${p4 ? '-' + p4 : ''}`,
        });
    });

    inputs.phone.addEventListener('input', () => {
        formatInput(inputs.phone, /^(\d{2})(\d{5})?(\d{4})?$/, {
            maxLength: 11,
            format: (match, p1, p2, p3) => `(${p1}) ${p2 || ''}${p3 ? '-' + p3 : ''}`,
        });
    });

    inputs.zip.addEventListener('input', () => {
        formatInput(inputs.zip, /^(\d{5})(\d{3})?$/, {
            maxLength: 8,
            format: (match, p1, p2) => `${p1}${p2 ? '-' + p2 : ''}`,
        });
    });

    // Validação de formulário
    form.addEventListener('submit', (event) => {
        let isValid = true;

        inputList.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (!inputs.offers.checked) {
            alert('Por favor, concorde com os termos para continuar.');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        } else {
            alert('Formulário enviado com sucesso!');
        }
    });

    // Limpar o formulário
    resetButton.addEventListener('click', () => {
        form.reset();
        inputList.forEach(clearError);
    });

    // Efeitos de foco
    inputList.forEach(input => {
        input.addEventListener('focus', () => input.style.borderColor = '#3a805c');
        input.addEventListener('blur', () => input.style.borderColor = '#c1c8b8');
    });
});
