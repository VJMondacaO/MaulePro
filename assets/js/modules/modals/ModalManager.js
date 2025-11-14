/**
 * ModalManager Module
 * Gestión centralizada de modales (apertura, cierre, eventos)
 * @module Modals/ModalManager
 * @requires window.MaulePro.Utils.Logger
 */

(function(window) {
    'use strict';

    const Logger = window.MaulePro?.Utils?.Logger;

    /**
     * Abre un modal
     * @param {HTMLElement} modal - Elemento del modal
     */
    function openModal(modal) {
        if (!modal) {
            Logger?.warn('Intento de abrir modal que no existe');
            return;
        }
        modal.classList.remove('d-none');
        modal.classList.add('d-flex');
        Logger?.debug('Modal abierto:', modal.id);
    }

    /**
     * Cierra un modal
     * @param {HTMLElement} modal - Elemento del modal
     */
    function closeModal(modal) {
        if (!modal) {
            Logger?.warn('Intento de cerrar modal que no existe');
            return;
        }
        modal.classList.add('d-none');
        modal.classList.remove('d-flex');
        Logger?.debug('Modal cerrado:', modal.id);
    }

    /**
     * Inicializa el sistema de modales
     * Configura listeners para apertura, cierre por X y cierre por clic externo
     */
    function init() {
        // Configurar cierre por botones X
        const closeButtons = document.getElementsByClassName('close');
        Array.from(closeButtons).forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('[id$="Modal"]');
                if (modal) {
                    closeModal(modal);
                }
            });
        });

        // Configurar cierre por clic externo
        window.addEventListener('click', (event) => {
            if (event.target.id === 'loginModal' || event.target.id === 'registerModal') {
                closeModal(event.target);
            }
        });

        Logger?.debug('ModalManager inicializado');
    }

    /**
     * Configura un botón para abrir un modal específico
     * @param {string|HTMLElement} trigger - Selector o elemento del botón trigger
     * @param {string|HTMLElement} modal - Selector o elemento del modal
     * @param {boolean} preventDefault - Si prevenir el comportamiento por defecto
     */
    function setupTrigger(trigger, modal, preventDefault = true) {
        const triggerEl = typeof trigger === 'string' ? document.getElementById(trigger) : trigger;
        const modalEl = typeof modal === 'string' ? document.getElementById(modal) : modal;

        if (!triggerEl || !modalEl) {
            Logger?.warn('Trigger o modal no encontrado:', { trigger, modal });
            return;
        }

        triggerEl.addEventListener('click', (e) => {
            if (preventDefault) {
                e.preventDefault();
            }
            
            if (modalEl) {
                openModal(modalEl);
            } else {
                Logger?.warn('Modal no encontrado, redirigiendo a login.html');
                window.location.href = 'login.html';
            }
        });
    }

    /**
     * Configura un modal para cambiar a otro modal (ej: login -> register)
     * @param {string|HTMLElement} trigger - Selector o elemento del botón trigger
     * @param {string|HTMLElement} fromModal - Modal actual
     * @param {string|HTMLElement} toModal - Modal destino
     */
    function setupModalSwitch(trigger, fromModal, toModal) {
        const triggerEl = typeof trigger === 'string' ? document.getElementById(trigger) : trigger;
        const fromEl = typeof fromModal === 'string' ? document.getElementById(fromModal) : fromModal;
        const toEl = typeof toModal === 'string' ? document.getElementById(toModal) : toModal;

        if (!triggerEl || !fromEl || !toEl) {
            Logger?.warn('Elementos para switch de modal no encontrados');
            return;
        }

        triggerEl.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(fromEl);
            openModal(toEl);
        });
    }

    // Crear namespace global
    if (!window.MaulePro) {
        window.MaulePro = {};
    }
    if (!window.MaulePro.Modals) {
        window.MaulePro.Modals = {};
    }

    window.MaulePro.Modals.ModalManager = {
        open: openModal,
        close: closeModal,
        init: init,
        setupTrigger: setupTrigger,
        setupModalSwitch: setupModalSwitch
    };

})(window);

