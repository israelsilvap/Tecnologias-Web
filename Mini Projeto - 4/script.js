document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.register-form');
    const resetButton = document.getElementById('reset-button');

    // Elementos do formulário
    const nameInput = document.getElementById('name');
    const cpfInput = document.getElementById('cpf');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const inputs = document.querySelectorAll('input, select');
    const zipInput = document.getElementById('zip');
    const offersCheckbox = document.getElementById('offers');

    // Função para exibir mensagem de erro
    function showError(input, message) {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        input.classList.add('error');

        // Verifica onde inserir a mensagem de erro
        if (input.type === 'checkbox') {
            errorElement.style.marginRight = '10px';
            if (!input.previousElementSibling || !input.previousElementSibling.classList.contains('error-message')) {
                input.parentElement.insertBefore(errorElement, input);
            }
        } else {
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                input.insertAdjacentElement('afterend', errorElement);
            }
        }
    }

    // Função para limpar mensagens de erro
    function clearError(input) {
        if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
            input.nextElementSibling.remove();
        } else if (input.type === 'checkbox') {
            const errorElement = input.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        }
        input.classList.remove('error');
    }

    // Função para validar campos em tempo real
    function validateInput(input) {
        clearError(input);

        if (input.type === 'text' || input.type === 'email' || input.type === 'password' || input.tagName === 'SELECT') {
            if (input.value.trim() === '') {
                showError(input, `${input.previousElementSibling.textContent.trim()} é obrigatório.`);
            }
        }

        if (input === cpfInput) {
            const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
            if (input.value.trim() !== '' && !cpfRegex.test(input.value.trim())) {
                showError(input, 'CPF inválido. Deve seguir o formato 000.000.000-00.');
            }
        }

        if (input === emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (input.value.trim() !== '' && !emailRegex.test(input.value.trim())) {
                showError(input, 'E-mail inválido.');
            }
        }

        if (input === phoneInput) {
            const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/; // Formato (XX) XXXXX-XXXX
            if (input.value.trim() !== '' && !phoneRegex.test(input.value.trim())) {
                showError(input, 'Número de telefone inválido.');
            }
        }

        if (input === confirmPasswordInput) {
            if (input.value !== passwordInput.value) {
                showError(input, 'As senhas não coincidem.');
            }
        }

        if (input === zipInput) {
            const zipRegex = /^\d{5}-\d{3}$/;
            if (input.value.trim() !== '' && !zipRegex.test(input.value.trim())) {
                showError(input, 'CEP inválido.');
            }
        }
    }

    // Adiciona eventos de input para validação em tempo real
    inputs.forEach(input => {
        input.addEventListener('input', () => validateInput(input));
    });

    cpfInput.addEventListener('input', () => {
        let value = cpfInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (value.length > 11) value = value.slice(0, 11); // Limita o CPF a 11 dígitos

        // Adiciona os pontos e o traço ao CPF
        if (value.length > 3 && value.length <= 6) {
            value = value.replace(/(\d{3})(\d+)/, '$1.$2');
        } else if (value.length > 6 && value.length <= 9) {
            value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
        } else if (value.length > 9) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
        }

        cpfInput.value = value; // Atualiza o valor no campo
    });

    phoneInput.addEventListener('input', () => {
        let value = phoneInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (value.length > 11) value = value.slice(0, 11); // Limita o telefone a 11 dígitos

        // Adiciona a formatação ao telefone
        if (value.length > 2 && value.length <= 6) {
            value = value.replace(/(\d{2})(\d+)/, '($1) $2');
        } else if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
        }

        phoneInput.value = value; // Atualiza o valor no campo
    });

    zipInput.addEventListener('input', () => {
        let value = zipInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (value.length > 8) value = value.slice(0, 8); // Limita o CEP a 8 dígitos
    
        // Adiciona o traço ao CEP
        if (value.length > 5) {
            value = value.replace(/(\d{5})(\d+)/, '$1-$2');
        }
    
        zipInput.value = value; // Atualiza o valor no campo
    });    

    // Interceptar envio do formulário
    form.addEventListener('submit', (event) => {
        let isValid = true;

        inputs.forEach(input => {
            clearError(input); // Limpa mensagens de erro antigas
    
            // Validação para campos vazios
            if (input.value.trim() === '') {
                showError(input, `${input.previousElementSibling.textContent.trim()} é obrigatório.`);
                isValid = false;
            }
    
            // Validações específicas por tipo de campo
            if (input === cpfInput) {
                const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
                if (!cpfRegex.test(input.value.trim())) {
                    showError(input, 'CPF inválido. Deve seguir o formato 000.000.000-00.');
                    isValid = false;
                }
            }
    
            if (input === emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    showError(input, 'E-mail inválido.');
                    isValid = false;
                }
            }
    
            if (input === phoneInput) {
                const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/; // Formato (XX) XXXXX-XXXX
                if (!phoneRegex.test(input.value.trim())) {
                    showError(input, 'Número de telefone inválido.');
                    isValid = false;
                }
            }
    
            if (input === zipInput) {
                const zipRegex = /^\d{5}-\d{3}$/;
                if (!zipRegex.test(input.value.trim())) {
                    showError(input, 'CEP inválido.');
                    isValid = false;
                }
            }
    
            if (input === confirmPasswordInput) {
                if (input.value !== passwordInput.value) {
                    showError(input, 'As senhas não coincidem.');
                    isValid = false;
                }
            }
        });

        if (!isValid && !offersCheckbox.checked) {
            event.preventDefault();
            alert('Por favor, preencha todos os campos obrigatórios corretamente e concorde com os termos para continuar.');
        } else if(!isValid && offersCheckbox.checked) {
            alert('Por favor, preencha todos os campos obrigatórios corretamente para continuar.');
        } else if(isValid && !offersCheckbox.checked) {
            alert('Por favor, concorde com os termos para continuar.');
        }else {
            alert('Formulário enviado com sucesso!');
        }
    });

    // Limpar o formulário
    resetButton.addEventListener('click', () => {
        form.reset();
        inputs.forEach(input => clearError(input));
    });

    // Interatividade extra: Eventos de foco e blur
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = '#3a805c';
        });

        input.addEventListener('blur', () => {
            input.style.borderColor = '#c1c8b8';
        });
    });

    
});
