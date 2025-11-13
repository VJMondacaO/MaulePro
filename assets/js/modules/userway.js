/**
 * Userway Widget Module
 * Posiciona el widget de accesibilidad Userway en la esquina inferior derecha
 */

(function() {
    'use strict';
    
    // Cargar script de Userway
    (function() {
        var s = document.createElement("script");
        s.src = "https://cdn.userway.org/widget.js";
        (document.body || document.head).appendChild(s);
    })();
    
    function positionUserwayWidget() {
        const selectors = [
            '.uw-widget-button',
            '[id*="userway-widget"]',
            '[class*="userway-widget"]',
            'iframe[title*="Userway"]',
            'iframe[title*="Accessibility"]',
            'div[id*="userway"]',
            'div[class*="userway"]'
        ];
        
        selectors.forEach(selector => {
            try {
                document.querySelectorAll(selector).forEach(el => {
                    if (el?.style) {
                        const props = {
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            top: 'auto',
                            left: 'auto',
                            'z-index': '9999',
                            margin: '0'
                        };
                        Object.entries(props).forEach(([k, v]) => {
                            el.style.setProperty(k, v, 'important');
                        });
                    }
                });
            } catch(e) {
                // Silenciar errores
            }
        });
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        // Intentar posicionar en múltiples momentos (el widget se carga de forma asíncrona)
        [0, 500, 1000, 2000, 3000, 5000].forEach(delay => {
            setTimeout(positionUserwayWidget, delay);
        });
        
        // Observar cambios en el DOM para cuando el widget se agregue dinámicamente
        if (window.MutationObserver && document.body) {
            let timeoutId;
            const observer = new MutationObserver(() => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(positionUserwayWidget, 500);
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: false
            });
        }
    });
})();

