/**
 * Configuración Centralizada
 * Todas las constantes, selectores y configuraciones de la aplicación
 */

export const CONFIG = {
    // Selectores DOM
    selectors: {
        // Búsqueda y filtros
        grid: '#grid',
        searchInput: '#q',
        estadoFilter: '#estado',
        benefFilter: '#benef',
        ordenFilter: '#orden',
        searchForm: '#searchForm',
        count: '#count',
        cntOpen: '#cntOpen',
        cntSoon: '#cntSoon',
        cntClosed: '#cntClosed',
        
        // Carousel
        carousel: '#infoCarousel',
        carouselCloseBtn: '#carouselCloseBtn',
        
        // Navbar
        navbar: '.navbar',
        navbarNav: '#navbarNav',
        
        // Toast
        toast: '#toastAviso',
        
        // Program cards
        programCards: '[data-program]',
        deadlineBadge: '[data-deadline]'
    },
    
    // Storage keys
    storage: {
        prefix: 'maulepro_',
        keys: {
            bannerClosed: 'banner_closed',
            userRut: 'user_rut',
            filtersState: 'filters_state'
        }
    },
    
    // API endpoints (si aplica en el futuro)
    api: {
        baseUrl: '/api',
        endpoints: {
            programs: '/programs',
            search: '/search',
            notifications: '/notifications'
        },
        timeout: 5000
    },
    
    // Feature flags
    features: {
        animations: true,
        ripple: true,
        lazyLoad: false,
        userway: true
    },
    
    // Userway widget
    userway: {
        position: {
            bottom: '20px',
            right: '20px'
        },
        selectors: [
            '.uw-widget-button',
            '[id*="userway-widget"]',
            '[class*="userway-widget"]',
            'iframe[title*="Userway"]',
            'iframe[title*="Accessibility"]',
            'div[id*="userway"]',
            'div[class*="userway"]'
        ],
        positioningDelays: [0, 500, 1000, 2000, 3000, 5000]
    },
    
    // Animaciones
    animations: {
        fadeSlideUp: {
            duration: 500,
            easing: 'ease',
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        },
        ripple: {
            duration: 450
        }
    },
    
    // Atajos de teclado
    keyboard: {
        searchShortcut: '/'
    }
};

