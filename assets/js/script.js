/**
 * Main Script
 * Script principal de la aplicación - Orquestador de módulos
 * @module Main/Script
 * @requires window.MaulePro.Utils.Logger
 * @requires window.MaulePro.Modals.ModalManager
 * @requires window.MaulePro.Forms.FormManager
 * @requires window.MaulePro.Search.ModalSearch
 * @requires window.MaulePro.Utils.AccessibilityManager
 */

(function(window) {
    'use strict';

    const Logger = window.MaulePro?.Utils?.Logger;
    const ModalManager = window.MaulePro?.Modals?.ModalManager;
    const FormManager = window.MaulePro?.Forms?.FormManager;
    const ModalSearch = window.MaulePro?.Search?.ModalSearch;
    const AccessibilityManager = window.MaulePro?.Utils?.AccessibilityManager;

    /**
     * Inicializa los modales de login y registro
     * @private
     */
    function initModals() {
        if (!ModalManager) {
            if (Logger) {
                Logger.warn('ModalManager no disponible, usando fallback');
            } else {
                console.warn('ModalManager no disponible');
            }
            return;
        }

        ModalManager.init();

        // Configurar triggers de modales
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        if (loginBtn && loginModal) {
            ModalManager.setupTrigger(loginBtn, loginModal);
        }

        const showRegisterBtn = document.getElementById('showRegister');
        const registerModal = document.getElementById('registerModal');
        if (showRegisterBtn && registerModal) {
            ModalManager.setupModalSwitch(showRegisterBtn, loginModal, registerModal);
        }

        const showRecoverBtn = document.getElementById('showRecover');
        if (showRecoverBtn && registerModal) {
            ModalManager.setupModalSwitch(showRecoverBtn, loginModal, registerModal);
        }

        Logger?.debug('Modales inicializados');
    }

    /**
     * Inicializa los formularios
     * @private
     */
    function initForms() {
        if (!FormManager) {
            if (Logger) {
                Logger.warn('FormManager no disponible, usando fallback');
            } else {
                console.warn('FormManager no disponible');
            }
            return;
        }

        FormManager.init();
        Logger?.debug('Formularios inicializados');
    }

    /**
     * Inicializa la búsqueda modal
     * @private
     */
    function initSearch() {
        // Verificar si estamos en la página de búsqueda (buscar.html)
        if (window.location.pathname.includes('buscar.html')) {
            Logger?.debug('Página de búsqueda detectada, no inicializando buscador modal');
            return;
        }

        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        if (!searchForm || !searchInput || !searchResults) {
            Logger?.debug('Elementos de búsqueda modal no encontrados');
            return;
        }

        // Verificar si el formulario tiene action (redirección)
        const formAction = searchForm.getAttribute('action');
        const hasRedirectAction = formAction && formAction.trim() !== '' && formAction.trim() !== '#';

        if (hasRedirectAction) {
            Logger?.debug('Formulario con action detectado, no inicializando búsqueda modal');
            return;
        }

        if (!ModalSearch) {
            if (Logger) {
                Logger.warn('ModalSearch no disponible');
            } else {
                console.warn('ModalSearch no disponible');
            }
            return;
        }

        ModalSearch.init(searchForm, searchInput, searchResults, {
            debounceMs: 300,
            maxRealTimeResults: 5
        });

        Logger?.debug('Búsqueda modal inicializada');
    }

    /**
     * Configura atajos de teclado para búsqueda
     * @private
     */
    function initKeyboardShortcuts() {
        // Atajo "/" para abrir búsqueda
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                const searchModal = document.getElementById('searchModal');
                const searchBtn = document.getElementById('searchBtn');
                
                if (searchModal && searchBtn) {
                    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                        const modal = new bootstrap.Modal(searchModal);
                        modal.show();
                    } else {
                        if (searchBtn) searchBtn.click();
                    }
                }
            }
            
            // ESC para cerrar búsqueda
            if (e.key === 'Escape') {
                const searchModalElement = document.getElementById('searchModal');
                if (searchModalElement) {
                    try {
                        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                            const modal = bootstrap.Modal.getInstance(searchModalElement);
                            if (modal) {
                                modal.hide();
                            }
                        }
                    } catch (error) {
                        Logger?.warn('Error al cerrar modal con ESC:', error);
                    }
                }
            }
        });

        Logger?.debug('Atajos de teclado configurados');
    }

    /**
     * Inicializa la funcionalidad de logout
     * @private
     */
    function initLogout() {
        const logoutBtn = document.getElementById('logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('userRut');
                if (FormManager) {
                    FormManager.updateUIForLoggedOutUser();
                } else {
                    // Fallback manual
                    updateUIForLoggedOutUserFallback();
                }
                Logger?.info('Usuario deslogueado');
            });
        }

        const mobileLogout = document.getElementById('mobileLogout');
        if (mobileLogout) {
            mobileLogout.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('userRut');
                if (FormManager) {
                    FormManager.updateUIForLoggedOutUser();
                } else {
                    updateUIForLoggedOutUserFallback();
                }
                Logger?.info('Usuario deslogueado (móvil)');
            });
        }
    }

    /**
     * Fallback para actualizar UI de logout
     * @private
     */
    function updateUIForLoggedOutUserFallback() {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) loginBtn.classList.remove('d-none');
        
        const mobileWelcomeUser = document.getElementById('mobileWelcomeUser');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        if (mobileWelcomeUser) mobileWelcomeUser.classList.add('d-none');
        if (mobileLoginBtn) mobileLoginBtn.classList.remove('d-none');
    }

    /**
     * Inicializa botones de postulación
     * @private
     */
    function initApplyButtons() {
        const applyButtons = document.querySelectorAll('button:not([type="submit"]):not([type="button"]), button[class*="w-full"]');
        applyButtons.forEach(btn => {
            if (btn.textContent.includes('Postular') || btn.textContent.includes('CREAR') || btn.textContent.includes('Entrar')) {
                btn.addEventListener('click', () => {
                    const userRut = localStorage.getItem('userRut');
                    if (!userRut) {
                        alert('Debe iniciar sesión para postular.');
                        const loginModal = document.getElementById('loginModal');
                        if (loginModal && ModalManager) {
                            ModalManager.open(loginModal);
                        }
                    } else {
                        alert('Redirigiendo al formulario de postulación...');
                    }
                });
            }
        });
    }

    /**
     * Inicializa enlaces de documentos
     * @private
     */
    function initDocumentLinks() {
        const docLinks = document.querySelectorAll('a[href="#"]');
        docLinks.forEach(link => {
            if (link.textContent.includes('Anexo') || 
                link.textContent.includes('Manual') || 
                link.textContent.includes('Instructivo') ||
                link.textContent.includes('Protocolo') ||
                link.textContent.includes('Bases')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const docName = e.target.textContent;
                    alert(`Descargando: ${docName}\n\nEn un entorno real, esto descargaría el documento correspondiente.`);
                });
            }
        });
    }

    /**
     * Inicializa scroll suave
     * @private
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    document.querySelector(href).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Inicializa animaciones de entrada para tarjetas
     * @private
     */
    function initCardAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('section.grid > div, .grid.grid-cols-1 > div').forEach(card => {
            observer.observe(card);
        });
    }

    /**
     * Inicializa menú móvil
     * @private
     */
    function initMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    // Bootstrap maneja el collapse automáticamente
                });
            });
        }

        // Rotación de flecha en submenú de programas
        const programasArrow = document.getElementById('programasArrow');
        if (programasArrow) {
            const submenu = document.getElementById('mobileProgramasSubmenu');
            if (submenu) {
                submenu.addEventListener('show.bs.collapse', () => {
                    programasArrow.style.transform = 'rotate(180deg)';
                });
                submenu.addEventListener('hide.bs.collapse', () => {
                    programasArrow.style.transform = 'rotate(0deg)';
                });
            }
        }
    }

    /**
     * Inicializa botón de ver postulaciones
     * @private
     */
    function initViewApplications() {
        const viewApplicationsBtn = document.getElementById('viewApplications');
        if (viewApplicationsBtn) {
            viewApplicationsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Accediendo a sus postulaciones...');
            });
        }

        const mobileViewApplications = document.getElementById('mobileViewApplications');
        if (mobileViewApplications) {
            mobileViewApplications.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Accediendo a sus postulaciones...');
            });
        }
    }

    /**
     * Verifica el estado de login al cargar la página
     * @private
     */
    function checkLoginStatus() {
        const storedRut = localStorage.getItem('userRut');
        if (storedRut) {
            if (FormManager) {
                FormManager.updateUIForLoggedInUser(storedRut);
            } else {
                // Fallback manual
                const loginBtn = document.getElementById('loginBtn');
                if (loginBtn) loginBtn.classList.add('d-none');
                
                const mobileWelcomeUser = document.getElementById('mobileWelcomeUser');
                const mobileUserRut = document.getElementById('mobileUserRut');
                const mobileLoginBtn = document.getElementById('mobileLoginBtn');
                if (mobileWelcomeUser) mobileWelcomeUser.classList.remove('d-none');
                if (mobileUserRut) mobileUserRut.textContent = storedRut;
                if (mobileLoginBtn) mobileLoginBtn.classList.add('d-none');
            }
        }
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
     * Verifica elementos del buscador modal
     * @private
     */
    function verifySearchElements() {
        if (window.location.pathname.includes('buscar.html')) {
            Logger?.debug('Página de búsqueda detectada, no verificando elementos del buscador modal');
            return;
        }

        const searchElements = {
            searchBtn: document.getElementById('searchBtn'),
            searchModal: document.getElementById('searchModal'),
            searchForm: document.getElementById('searchForm'),
            searchInput: document.getElementById('searchInput'),
            searchResults: document.getElementById('searchResults')
        };

        const missingElements = Object.entries(searchElements)
            .filter(([name, element]) => !element)
            .map(([name]) => name);

        if (missingElements.length > 0 && searchElements.searchModal) {
            Logger?.warn('Elementos del buscador modal no encontrados:', missingElements);
        } else if (!missingElements.length) {
            Logger?.debug('Buscador: Todos los elementos están presentes');
        }
    }

    /**
     * Inicializa la función de accesibilidad
     * @private
     */
    function initAccessibility() {
        if (AccessibilityManager) {
            window.Accesibilidad = function() {
                AccessibilityManager.execute();
            };
        } else {
            // Fallback básico
            window.Accesibilidad = function() {
                const img = document.getElementById("imgAccesibilidad");
                if (img) {
                    img.classList.remove("bg-primary");
                    img.classList.add("spinner-grow");
                    img.classList.remove("rounded-pill");
                }
                if (typeof UserWay !== 'undefined' && UserWay.widgetToggle) {
                    UserWay.widgetToggle();
                }
                setTimeout(function () {
                    if (img) {
                        img.classList.remove("spinner-grow");
                        img.classList.add("bg-primary");
                        img.classList.add("rounded-pill");
                    }
                }, 1000);
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
        verifySearchElements();

        // Inicializar módulos
        initModals();
        initForms();
        initSearch();
        initKeyboardShortcuts();
        initLogout();
        initApplyButtons();
        initDocumentLinks();
        initSmoothScroll();
        initCardAnimations();
        initMobileMenu();
        initViewApplications();
        initAccessibility();

        // Verificar estado de login
        checkLoginStatus();
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
