/**
 * Navbar Spacer Module
 * Calcula dinámicamente la altura del navbar y ajusta el margen del contenido
 * Optimizado: usa ResizeObserver y debounce para mejor performance
 */

(function() {
    'use strict';
    
    let observer = null;
    
    function adjustContentSpacing() {
        const navbar = document.querySelector('.navbar');
        const contentElements = document.querySelectorAll('.mt-header, .bg-azul.bg-01.mt-header');
        
        if (!navbar || contentElements.length === 0) {
            return;
        }
        
        // Calcular la altura real del navbar
        const navbarHeight = navbar.offsetHeight;
        const spacing = navbarHeight + 20; // Agregar 20px de espacio adicional
        
        // Aplicar el margen a todos los elementos con mt-header
        contentElements.forEach(element => {
            element.style.marginTop = spacing + 'px';
        });
    }
    
    // Usar la utilidad debounce existente
    const debounce = window.MaulePro?.Utils?.debounce || function(fn, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), wait);
        };
    };
    
    const debouncedAdjust = debounce(adjustContentSpacing, 150);
    
    /**
     * Inicializa el módulo
     */
    function init() {
        // Ejecutar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                adjustContentSpacing();
                setupObservers();
            });
        } else {
            adjustContentSpacing();
            setupObservers();
        }
    }
    
    /**
     * Configura observadores para cambios en el navbar
     */
    function setupObservers() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        // Usar ResizeObserver si está disponible (mejor performance)
        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(debouncedAdjust);
            observer.observe(navbar);
        }
        
        // Fallback: reajustar cuando la ventana cambie de tamaño
        window.addEventListener('resize', debouncedAdjust);
        
        // Reajustar una vez después de que todo esté renderizado
        // Solo un timeout en lugar de múltiples
        setTimeout(adjustContentSpacing, 200);
    }
    
    /**
     * Limpia recursos cuando se destruye el módulo
     */
    function destroy() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        window.removeEventListener('resize', debouncedAdjust);
    }
    
    // Inicializar
    init();
    
    // Exponer funciones para limpieza si es necesario
    if (typeof window !== 'undefined') {
        window.MaulePro = window.MaulePro || {};
        window.MaulePro.Modules = window.MaulePro.Modules || {};
        window.MaulePro.Modules.NavbarSpacer = {
            destroy: destroy,
            adjust: adjustContentSpacing
        };
    }
})();

