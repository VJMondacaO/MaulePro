/**
 * FormManager Module
 * Gestión de formularios (validación, envío, gestión de estado)
 * @module Forms/FormManager
 * @requires window.MaulePro.Utils.Logger
 * @requires window.MaulePro.Modals.ModalManager
 */

(function(window) {
    'use strict';

    const Logger = window.MaulePro?.Utils?.Logger;
    const ModalManager = window.MaulePro?.Modals?.ModalManager;

    /**
     * Valida un RUT chileno
     * @param {string} rut - RUT a validar
     * @returns {boolean} true si es válido
     */
    function validateRut(rut) {
        if (!rut || typeof rut !== 'string') return false;
        // Validación básica: 7-8 dígitos
        const rutRegex = /^[0-9]{7,8}$/;
        return rutRegex.test(rut.trim());
    }

    /**
     * Valida un email
     * @param {string} email - Email a validar
     * @returns {boolean} true si es válido
     */
    function validateEmail(email) {
        if (!email || typeof email !== 'string') return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    /**
     * Valida que dos emails coincidan
     * @param {string} email1 - Primer email
     * @param {string} email2 - Segundo email
     * @returns {boolean} true si coinciden
     */
    function validateEmailMatch(email1, email2) {
        return email1 && email2 && email1.trim() === email2.trim();
    }

    /**
     * Muestra error visual en un input
     * @param {HTMLElement} input - Input a marcar como error
     */
    function showInputError(input) {
        if (input) {
            input.style.borderColor = '#d32f2f';
            Logger?.debug('Error mostrado en input:', input.id);
        }
    }

    /**
     * Oculta error visual en un input
     * @param {HTMLElement} input - Input a limpiar
     */
    function clearInputError(input) {
        if (input) {
            input.style.borderColor = '#ddd';
            Logger?.debug('Error limpiado en input:', input.id);
        }
    }

    /**
     * Configura validación en tiempo real para un input
     * @param {HTMLElement} input - Input a configurar
     * @param {Function} validator - Función validadora
     */
    function setupRealTimeValidation(input, validator) {
        if (!input || !validator) return;

        input.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !validator(value)) {
                showInputError(this);
            } else {
                clearInputError(this);
            }
        });

        Logger?.debug('Validación en tiempo real configurada para:', input.id);
    }

    /**
     * Maneja el envío del formulario de login
     * @param {HTMLFormElement} form - Formulario de login
     */
    function handleLoginSubmit(form) {
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username')?.value;
            const password = document.getElementById('password')?.value;
            const loginError = document.getElementById('loginError');
            const loginModal = document.getElementById('loginModal');
            
            if (!username || !password) {
                if (loginError) loginError.classList.remove('d-none');
                Logger?.warn('Intento de login sin usuario o contraseña');
                return;
            }
            
            // Validación simple (en producción sería llamada a API)
            if (username.length >= 7) {
                // Login exitoso
                localStorage.setItem('userRut', username);
                updateUIForLoggedInUser(username);
                
                if (ModalManager) {
                    ModalManager.close(loginModal);
                } else {
                    // Fallback manual
                    if (loginModal) {
                        loginModal.classList.add('d-none');
                        loginModal.classList.remove('d-flex');
                    }
                }
                
                if (loginError) loginError.classList.add('d-none');
                Logger?.info('Login exitoso para usuario:', username);
            } else {
                // Error de validación
                if (loginError) loginError.classList.remove('d-none');
                Logger?.warn('Login fallido: usuario inválido');
            }
        });
    }

    /**
     * Maneja el envío del formulario de registro
     * @param {HTMLFormElement} form - Formulario de registro
     */
    function handleRegisterSubmit(form) {
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const rut = document.getElementById('rut')?.value;
            const email = document.getElementById('email')?.value;
            const confirmEmail = document.getElementById('confirmEmail')?.value;
            const registerModal = document.getElementById('registerModal');
            
            if (!rut || !email || !confirmEmail) {
                alert('Por favor, complete todos los campos.');
                Logger?.warn('Intento de registro con campos incompletos');
                return;
            }
            
            if (!validateEmailMatch(email, confirmEmail)) {
                alert('Los correos electrónicos no coinciden.');
                Logger?.warn('Registro fallido: emails no coinciden');
                return;
            }
            
            // Registro exitoso (en producción sería llamada a API)
            alert('Registro exitoso. Por favor, revise su correo electrónico para confirmar su cuenta.');
            
            if (ModalManager) {
                ModalManager.close(registerModal);
            } else {
                // Fallback manual
                if (registerModal) {
                    registerModal.classList.add('d-none');
                    registerModal.classList.remove('d-flex');
                }
            }
            
            Logger?.info('Registro exitoso para RUT:', rut);
        });
    }

    /**
     * Maneja la recuperación de contraseña
     * @param {HTMLElement} button - Botón de recuperar contraseña
     */
    function handlePasswordRecovery(button) {
        if (!button) return;

        button.addEventListener('click', () => {
            const rut = document.getElementById('rut')?.value;
            const email = document.getElementById('email')?.value;
            const registerModal = document.getElementById('registerModal');
            
            if (!rut || !email) {
                alert('Por favor, ingrese su RUT y correo electrónico.');
                Logger?.warn('Recuperación de contraseña: campos faltantes');
                return;
            }
            
            alert('Se ha enviado un correo electrónico con instrucciones para recuperar su contraseña.');
            
            if (ModalManager) {
                ModalManager.close(registerModal);
            }
            
            Logger?.info('Recuperación de contraseña solicitada para RUT:', rut);
        });
    }

    /**
     * Inicializa todos los formularios
     */
    function init() {
        // Configurar validación en tiempo real
        const usernameInput = document.getElementById('username');
        if (usernameInput) {
            setupRealTimeValidation(usernameInput, validateRut);
        }

        const rutInput = document.getElementById('rut');
        if (rutInput) {
            setupRealTimeValidation(rutInput, validateRut);
        }

        const emailInput = document.getElementById('email');
        if (emailInput) {
            setupRealTimeValidation(emailInput, validateEmail);
        }

        const confirmEmailInput = document.getElementById('confirmEmail');
        if (confirmEmailInput) {
            confirmEmailInput.addEventListener('blur', function() {
                const email = emailInput ? emailInput.value : '';
                const value = this.value.trim();
                if (value && !validateEmailMatch(value, email)) {
                    showInputError(this);
                } else {
                    clearInputError(this);
                }
            });
        }

        // Configurar handlers de formularios
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            handleLoginSubmit(loginForm);
        }

        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            handleRegisterSubmit(registerForm);
        }

        const recoverPasswordBtn = document.getElementById('recoverPassword');
        if (recoverPasswordBtn) {
            handlePasswordRecovery(recoverPasswordBtn);
        }

        Logger?.debug('FormManager inicializado');
    }

    /**
     * Actualiza la UI para usuario logueado
     * @param {string} rut - RUT del usuario
     */
    function updateUIForLoggedInUser(rut) {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) loginBtn.classList.add('d-none');
        
        // Elementos móviles
        const mobileWelcomeUser = document.getElementById('mobileWelcomeUser');
        const mobileUserRut = document.getElementById('mobileUserRut');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        if (mobileWelcomeUser) mobileWelcomeUser.classList.remove('d-none');
        if (mobileUserRut) mobileUserRut.textContent = rut;
        if (mobileLoginBtn) mobileLoginBtn.classList.add('d-none');
        
        Logger?.debug('UI actualizada para usuario logueado:', rut);
    }

    /**
     * Actualiza la UI para usuario deslogueado
     */
    function updateUIForLoggedOutUser() {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) loginBtn.classList.remove('d-none');
        
        // Elementos móviles
        const mobileWelcomeUser = document.getElementById('mobileWelcomeUser');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        if (mobileWelcomeUser) mobileWelcomeUser.classList.add('d-none');
        if (mobileLoginBtn) mobileLoginBtn.classList.remove('d-none');
        
        Logger?.debug('UI actualizada para usuario deslogueado');
    }

    // Crear namespace global
    if (!window.MaulePro) {
        window.MaulePro = {};
    }
    if (!window.MaulePro.Forms) {
        window.MaulePro.Forms = {};
    }

    window.MaulePro.Forms.FormManager = {
        init: init,
        validateRut: validateRut,
        validateEmail: validateEmail,
        validateEmailMatch: validateEmailMatch,
        setupRealTimeValidation: setupRealTimeValidation,
        showInputError: showInputError,
        clearInputError: clearInputError,
        updateUIForLoggedInUser: updateUIForLoggedInUser,
        updateUIForLoggedOutUser: updateUIForLoggedOutUser
    };

    // Exponer funciones globales para compatibilidad
    window.updateUIForLoggedInUser = updateUIForLoggedInUser;
    window.updateUIForLoggedOutUser = updateUIForLoggedOutUser;

})(window);

