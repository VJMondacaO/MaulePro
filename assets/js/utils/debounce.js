/**
 * Debounce and Throttle Utilities
 * Utilidades para controlar la frecuencia de ejecución de funciones
 */

/**
 * Debounce: Ejecuta la función después de que haya pasado el tiempo de espera
 * Útil para eventos que se disparan frecuentemente (scroll, resize, input)
 * 
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @param {boolean} immediate - Si es true, ejecuta inmediatamente y luego espera
 * @returns {Function} - Función debounced
 */
export function debounce(func, wait = 300, immediate = false) {
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
 * Throttle: Ejecuta la función como máximo una vez por período de tiempo
 * Útil para eventos que deben ejecutarse periódicamente pero no demasiado frecuente
 * 
 * @param {Function} func - Función a ejecutar
 * @param {number} limit - Tiempo límite en ms
 * @returns {Function} - Función throttled
 */
export function throttle(func, limit = 300) {
    let inThrottle;
    
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

