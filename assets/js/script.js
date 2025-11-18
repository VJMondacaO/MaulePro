/**
 * Main Script
 * Script principal de la aplicación - Versión simplificada
 * @module Main/Script
 * @requires window.MaulePro.Utils.Logger
 * @requires window.MaulePro.Utils.AccessibilityManager
 */

(function(window) {
    'use strict';

    const Logger = window.MaulePro?.Utils?.Logger;
    const AccessibilityManager = window.MaulePro?.Utils?.AccessibilityManager;

    /**
     * Inicializa scroll suave
     * @private
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    /**
     * Inicializa animaciones de entrada para tarjetas
     * @private
     */
    function initCardAnimations() {
        // Si filters.js ya maneja las animaciones, no duplicar
        if (document.querySelectorAll('[data-animate]').length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('[data-animate]').forEach(card => {
            observer.observe(card);
        });
    }

    /**
     * Resalta el enlace de navegación activo
     * @private
     */
    function highlightActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Verifica que Bootstrap esté cargado
     * @private
     */
    function verifyBootstrap() {
        if (typeof bootstrap !== 'undefined') {
            Logger?.debug('Bootstrap cargado correctamente');
        } else {
            Logger?.warn('Bootstrap no está disponible. Algunas funcionalidades pueden no funcionar.');
        }
    }

    /**
     * Inicializa la función de accesibilidad
     * Nota: window.Accesibilidad ya está expuesto por AccessibilityManager.js
     * @private
     */
    function initAccessibility() {
        // La función Accesibilidad ya está expuesta por AccessibilityManager.js
        // Solo verificamos que esté disponible
        if (!window.Accesibilidad && AccessibilityManager) {
            window.Accesibilidad = function() {
                AccessibilityManager.execute();
            };
        }
    }

    /**
     * Inicializa la aplicación cuando el DOM está listo
     */
    function init() {
        Logger?.info('Inicializando MaulePro Portal');

        // Verificar dependencias
        verifyBootstrap();

        // Inicializar funcionalidades esenciales
        initSmoothScroll();
        initCardAnimations();
        initAccessibility();
        highlightActiveNavLink();

        Logger?.info('MaulePro Portal inicializado correctamente');
    }

    // Mensaje de bienvenida en consola
    if (typeof console !== 'undefined' && console.log) {
        console.log('%c MaulePro Portal ', 'background: #1e3c72; color: white; font-size: 20px; padding: 10px;');
        console.log('%c Portal de Postulaciones - Gobierno Regional del Maule ', 'color: #2a5298; font-size: 14px;');
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(window);
