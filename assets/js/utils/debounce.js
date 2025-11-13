/**
 * Debounce Utility
 * Función debounce para optimizar eventos frecuentes
 */

(function(window) {
    'use strict';

    /**
     * Crea una función debounced
     * @param {Function} func - Función a ejecutar
     * @param {number} wait - Tiempo de espera en ms
     * @param {boolean} immediate - Si true, ejecutar inmediatamente en el primer call
     * @returns {Function} Función debounced
     */
    function debounce(func, wait = 300, immediate = false) {
        let timeout;
        
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            
            if (callNow) func.apply(this, args);
        };
    }

    /**
     * Crea una función throttle
     * @param {Function} func - Función a ejecutar
     * @param {number} limit - Tiempo límite en ms
     * @returns {Function} Función throttled
     */
    function throttle(func, limit = 300) {
        let inThrottle;
        
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Crear namespace global
    if (!window.MaulePro) {
        window.MaulePro = {};
    }
    if (!window.MaulePro.Utils) {
        window.MaulePro.Utils = {};
    }

    window.MaulePro.Utils.debounce = debounce;
    window.MaulePro.Utils.throttle = throttle;
})(window);
