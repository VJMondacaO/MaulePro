/**
 * AccessibilityManager Utility
 * Gestión centralizada de funcionalidades de accesibilidad
 * @module Utils/AccessibilityManager
 * @requires window.MaulePro.Utils.Logger
 */

(function(window) {
    'use strict';

    /**
     * AccessibilityManager Object
     * @namespace AccessibilityManager
     */
    const AccessibilityManager = {
        /**
         * Toggle del widget de accesibilidad UserWay
         * @method toggleUserWay
         */
        toggleUserWay: function() {
            if (typeof UserWay !== 'undefined' && UserWay.widgetToggle) {
                UserWay.widgetToggle();
                const Logger = window.MaulePro?.Utils?.Logger;
                if (Logger) {
                    Logger.debug('Widget de accesibilidad UserWay activado');
                }
            } else {
                const Logger = window.MaulePro?.Utils?.Logger;
                if (Logger) {
                    Logger.warn('UserWay no está disponible');
                }
            }
        },

        /**
         * Muestra el spinner de accesibilidad
         * @method showSpinner
         * @param {string|HTMLElement} elementOrId - ID o elemento del ícono
         */
        showSpinner: function(elementOrId) {
            const element = typeof elementOrId === 'string' 
                ? document.getElementById(elementOrId)
                : elementOrId;

            if (element) {
                element.classList.remove('bg-primary');
                element.classList.add('spinner-grow');
                element.classList.remove('rounded-pill');
            }
        },

        /**
         * Oculta el spinner de accesibilidad
         * @method hideSpinner
         * @param {string|HTMLElement} elementOrId - ID o elemento del ícono
         */
        hideSpinner: function(elementOrId) {
            const element = typeof elementOrId === 'string' 
                ? document.getElementById(elementOrId)
                : elementOrId;

            if (element) {
                element.classList.remove('spinner-grow');
                element.classList.add('bg-primary');
                element.classList.add('rounded-pill');
            }
        },

        /**
         * Ejecuta la acción completa de accesibilidad con spinner
         * @method execute
         * @param {string} iconId - ID del ícono de accesibilidad (default: 'imgAccesibilidad')
         */
        execute: function(iconId = 'imgAccesibilidad') {
            this.showSpinner(iconId);
            this.toggleUserWay();
            
            // Ocultar spinner después de 1 segundo
            setTimeout(() => {
                this.hideSpinner(iconId);
            }, 1000);
        }
    };

    // Exponer función global de accesibilidad
    window.Accesibilidad = function() {
        AccessibilityManager.execute();
    };

    // Exponer en namespace global
    window.MaulePro = window.MaulePro || {};
    window.MaulePro.Utils = window.MaulePro.Utils || {};
    window.MaulePro.Utils.AccessibilityManager = AccessibilityManager;

})(window);

