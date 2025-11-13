/**
 * Carousel Module
 * Maneja el cierre del banner/carousel informativo
 */

(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.getElementById('infoCarousel');
        const closeBtn = document.getElementById('carouselCloseBtn');
        
        if (!carousel) return;
        
        // Restaurar estado guardado
        if (localStorage.getItem('bannerClosed') === 'true') {
            carousel.classList.add('hidden');
        }
        
        // Cerrar banner al hacer click
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                carousel.classList.add('hidden');
                localStorage.setItem('bannerClosed', 'true');
            });
        }
    });
})();

