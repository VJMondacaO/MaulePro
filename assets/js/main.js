/**
 * MaulePro - Main JavaScript
 * Inicializa todos los módulos
 */

// Cargar módulos cuando el DOM esté listo
(function() {
    'use strict';
    
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = false;
            script.defer = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    // Cargar módulos en orden
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Los módulos se cargan automáticamente desde el HTML
        });
    }
})();

