/**
 * Filters Module
 * Sistema de búsqueda y filtrado de programas para index.html
 * Refactorizado para usar módulos compartidos (FilterEngine, SortEngine)
 * @module Filters
 * @requires window.MaulePro.Search.FilterEngine
 * @requires window.MaulePro.Search.SortEngine
 * @requires window.MaulePro.Utils.debounce
 * @requires window.MaulePro.Utils.Logger
 */

(function() {
    'use strict';
    
    /**
     * FilterManager Object
     * Gestiona el filtrado y ordenamiento de programas en index.html
     * @type {Object}
     * @property {HTMLElement} grid - Contenedor de tarjetas
     * @property {Array<HTMLElement>} cards - Array de tarjetas DOM
     * @property {HTMLInputElement} q - Input de búsqueda de texto
     * @property {HTMLSelectElement} estado - Select de estado
     * @property {HTMLSelectElement} benef - Select de beneficiario
     * @property {HTMLSelectElement} orden - Select de ordenamiento
     * @property {HTMLFormElement} form - Formulario de búsqueda
     * @property {HTMLElement} count - Elemento donde mostrar el contador
     * @property {Function} debouncedApply - Función de apply con debounce
     */
    const FilterManager = {
        grid: null,
        cards: [],
        q: null,
        estado: null,
        benef: null,
        orden: null,
        form: null,
        count: null,
        debouncedApply: null,
        
        /**
         * Inicializa el FilterManager
         * Configura elementos DOM y bindea eventos
         * @method init
         */
        init() {
            this.grid = document.getElementById('grid');
            if (!this.grid) return;
            
            // Verificar si el formulario tiene action antes de inicializar filtrado local
            this.form = document.getElementById('searchForm');
            const formAction = this.form?.getAttribute('action');
            const hasRedirectAction = formAction && formAction.trim() !== '' && formAction.trim() !== '#';
            
            // Inicializar tarjetas siempre (necesario para paintDeadlines y otras funcionalidades)
            this.cards = [...this.grid.querySelectorAll('[data-program]')];
            
            // Ordenar tarjetas existentes al cargar (abiertos primero) - siempre
            if (this.cards.length > 0) {
                const SortEngine = window.MaulePro?.Search?.SortEngine;
                if (SortEngine) {
                    const programas = this.cardsToPrograms(this.cards);
                    const ordenados = SortEngine.ordenarProgramas(programas, 'openfirst');
                    const tarjetasOrdenadas = ordenados.map(p => p.elemento);
                    this.updateDOM(tarjetasOrdenadas);
                    this.cards = tarjetasOrdenadas;
                } else {
                    // Fallback: ordenamiento manual
                    const toRank = s => ({open: 3, soon: 2, closed: 1}[s] || 0);
                    const tarjetasOrdenadas = [...this.cards].sort((a, b) => 
                        toRank(b.dataset.estado) - toRank(a.dataset.estado)
                    );
                    this.updateDOM(tarjetasOrdenadas);
                    this.cards = tarjetasOrdenadas;
                }
            }
            
            // Si el formulario tiene action, NO inicializar filtrado local ni interceptar submit
            if (hasRedirectAction) {
                // Inicializar solo funcionalidades que no dependen del formulario
                this.paintDeadlines();
                this.initAnimations();
                this.initRipple();
                this.initToast();
                // NO llamar a bindEvents() ni apply() - dejar que el formulario se envíe normalmente
                return;
            }
            
            // Si NO hay action, inicializar filtrado local normalmente
            this.q = document.getElementById('q');
            this.estado = document.getElementById('estado');
            this.benef = document.getElementById('benef');
            this.orden = document.getElementById('orden');
            this.count = document.getElementById('count');
            // Contadores de estado eliminados
            // this.cntOpen = document.getElementById('cntOpen');
            // this.cntSoon = document.getElementById('cntSoon');
            // this.cntClosed = document.getElementById('cntClosed');
            
            // Crear función debounced para inputs de texto usando utilidad existente
            const debounce = window.MaulePro?.Utils?.debounce || ((fn, wait) => {
                let timeout;
                return (...args) => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => fn(...args), wait);
                };
            });
            this.debouncedApply = debounce(() => this.apply(), 300);
            
            // Inicializar eventos y aplicar filtrado local
            this.bindEvents();
            this.apply();
            
            // Inicializar funcionalidades que no dependen del formulario
            this.paintDeadlines();
            this.initAnimations();
            this.initRipple();
            this.initToast();
        },
        
        /**
         * Bindea eventos a los elementos del formulario
         * Maneja atajos de teclado y eventos de cambio
         * @method bindEvents
         */
        bindEvents() {
            // Atajo de teclado "/" para buscar (funciona siempre, incluso con action)
            document.addEventListener('keydown', (e) => {
                if (e.key === '/' && !e.target.closest('input, textarea')) {
                    e.preventDefault();
                    if (this.q) this.q.focus();
                }
            });
            
            // Event listeners del formulario (solo si NO hay action)
            if (this.form) {
                const formAction = this.form.getAttribute('action');
                const hasRedirectAction = formAction && 
                                         formAction.trim() !== '' && 
                                         formAction.trim() !== '#';
                
                // Solo agregar listeners de interceptación si NO hay action de redirección
                if (!hasRedirectAction) {
                    // Filtrado local: interceptar submit y aplicar filtros
                    this.form.addEventListener('submit', e => {
                        e.preventDefault();
                        this.apply();
                    });
                    
                    // Aplicar filtrado en tiempo real cuando cambian los filtros
                    // Usar debounce para inputs de texto, inmediato para selects
                    if (this.q) {
                        this.q.addEventListener('input', () => this.debouncedApply());
                    }
                    [this.estado, this.benef, this.orden].forEach(el => {
                        if (el) el.addEventListener('change', () => this.apply());
                    });
                }
            }
        },
        
        /**
         * Obtiene los valores actuales de los filtros
         * @method getFilterValues
         * @returns {Object} Objeto con los valores de los filtros
         * @private
         */
        getFilterValues() {
            return {
                q: (this.q?.value || '').trim().toLowerCase(),
                estado: this.estado?.value || '',
                benef: this.benef?.value || '',
                orden: this.orden?.value || 'openfirst'
            };
        },

        /**
         * Convierte elementos DOM de tarjetas a objetos de programas
         * @method cardsToPrograms
         * @param {Array<HTMLElement>} cards - Array de elementos DOM
         * @returns {Array<Object>} Array de objetos de programas
         * @private
         */
        cardsToPrograms(cards) {
            return cards.map(card => ({
                name: card.dataset.name || '',
                estado: card.dataset.estado || '',
                benef: card.dataset.benef || '',
                close: card.dataset.close || '',
                elemento: card
            }));
        },

        /**
         * Filtra las tarjetas usando FilterEngine o fallback manual
         * @method filterCards
         * @param {Array<HTMLElement>} cards - Tarjetas a filtrar
         * @param {Object} filters - Valores de filtros
         * @returns {Array<HTMLElement>} Tarjetas filtradas
         * @private
         */
        filterCards(cards, filters) {
            const FilterEngine = window.MaulePro?.Search?.FilterEngine;
            
            if (FilterEngine) {
                const programas = this.cardsToPrograms(cards);
                const resultados = FilterEngine.filtrarProgramas(programas, filters);
                return resultados.map(r => r.elemento);
            }
            
            // Fallback: filtrado manual
            return cards.filter(c => {
                const name = (c.dataset.name || '').toLowerCase();
                const matchQ = !filters.q || name.includes(filters.q);
                const matchE = !filters.estado || c.dataset.estado === filters.estado;
                const matchB = !filters.benef || c.dataset.benef === filters.benef;
                return matchQ && matchE && matchB;
            });
        },

        /**
         * Ordena las tarjetas usando SortEngine o fallback manual
         * @method sortCards
         * @param {Array<HTMLElement>} cards - Tarjetas a ordenar
         * @param {string} orden - Tipo de ordenamiento
         * @returns {Array<HTMLElement>} Tarjetas ordenadas
         * @private
         */
        sortCards(cards, orden) {
            if (cards.length === 0) return cards;

            const SortEngine = window.MaulePro?.Search?.SortEngine;
            
            if (SortEngine) {
                const programas = this.cardsToPrograms(cards);
                const ordenados = SortEngine.ordenarProgramas(programas, orden);
                return ordenados.map(p => p.elemento);
            }
            
            // Fallback: ordenamiento manual
            const byName = (a, b) => a.dataset.name.localeCompare(b.dataset.name, 'es');
            const toRank = s => ({open: 3, soon: 2, closed: 1}[s] || 0);
            
            const sorted = [...cards];
            
            if (orden === 'alpha') {
                sorted.sort(byName);
            } else if (orden === 'openfirst') {
                sorted.sort((a, b) => toRank(b.dataset.estado) - toRank(a.dataset.estado));
            } else if (orden === 'date') {
                sorted.sort((a, b) => {
                    const da = Date.parse(a.dataset.close || '9999-12-31');
                    const db = Date.parse(b.dataset.close || '9999-12-31');
                    return da - db;
                });
            } else {
                // relevance (default)
                sorted.sort((a, b) => {
                    const r = toRank(b.dataset.estado) - toRank(a.dataset.estado);
                    return r !== 0 ? r : byName(a, b);
                });
            }
            
            return sorted;
        },

        /**
         * Actualiza el DOM con las tarjetas visibles
         * @method updateDOM
         * @param {Array<HTMLElement>} visible - Tarjetas visibles
         * @private
         */
        updateDOM(visible) {
            // Ocultar todas las tarjetas primero
            this.cards.forEach(c => c.style.display = 'none');
            
            // Mostrar solo las tarjetas visibles
            visible.forEach(card => card.style.display = '');
            
            // Reordenar en el DOM si es necesario
            if (visible.length > 0) {
                const fragment = document.createDocumentFragment();
                visible.forEach(card => fragment.appendChild(card));
                this.grid.innerHTML = '';
                this.grid.appendChild(fragment);
            }
        },

        /**
         * Aplica filtros y ordenamiento a las tarjetas
         * Usa FilterEngine y SortEngine si están disponibles
         * @method apply
         */
        apply() {
            const filters = this.getFilterValues();
            
            // Filtrar
            let visible = this.filterCards(this.cards, filters);
            
            // Ordenar
            visible = this.sortCards(visible, filters.orden);
            
            // Actualizar DOM
            this.updateDOM(visible);
            
            // Actualizar contadores
            this.updateCounters(visible);
        },
        
        /**
         * Actualiza los contadores de resultados
         * @method updateCounters
         * @param {Array<HTMLElement>} visible - Array de tarjetas visibles
         */
        updateCounters(visible) {
            if (this.count) this.count.textContent = String(visible.length);
            // Contadores de estado eliminados - solo actualizar contador total
        },
        
        /**
         * Pinta los deadlines dinámicamente según las fechas
         * Usa DeadlineManager si está disponible
         * @method paintDeadlines
         */
        paintDeadlines() {
            const DeadlineManager = window.MaulePro?.Utils?.DeadlineManager;
            if (DeadlineManager) {
                DeadlineManager.paintAllDeadlines('[data-program]');
            }
            // Si DeadlineManager no está disponible, los deadlines se manejan en otro lugar
        },
        
        /**
         * Inicializa animaciones de entrada usando IntersectionObserver
         * @method initAnimations
         */
        initAnimations() {
            const els = document.querySelectorAll('[data-animate]');
            if ('IntersectionObserver' in window) {
                const io = new IntersectionObserver((entries) => {
                    entries.forEach(e => {
                        if (e.isIntersecting) {
                            e.target.classList.add('in');
                            io.unobserve(e.target);
                        }
                    });
                }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
                els.forEach(el => io.observe(el));
            } else {
                els.forEach(el => el.classList.add('in'));
            }
        },
        
        /**
         * Inicializa efecto ripple en botones
         * @method initRipple
         */
        initRipple() {
            document.querySelectorAll('.program-card .btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const prev = this.querySelector('.ripple');
                    if (prev) prev.remove();
                    
                    const r = document.createElement('span');
                    r.className = 'ripple';
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    
                    r.style.width = r.style.height = size + 'px';
                    r.style.left = (e.clientX - rect.left - size / 2) + 'px';
                    r.style.top = (e.clientY - rect.top - size / 2) + 'px';
                    
                    this.style.position = 'relative';
                    this.style.overflow = 'hidden';
                    this.appendChild(r);
                    setTimeout(() => r.remove(), 450);
                });
            });
        },
        
        /**
         * Inicializa toasts de notificación
         * @method initToast
         */
        initToast() {
            document.querySelectorAll('a, button').forEach(el => {
                if (/avisarme/i.test(el.textContent)) {
                    el.addEventListener('click', () => {
                        const toastEl = document.getElementById('toastAviso');
                        if (toastEl && window.bootstrap) {
                            new bootstrap.Toast(toastEl, { delay: 3000 }).show();
                        }
                    });
                }
            });
        }
    };
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => FilterManager.init());
    } else {
        FilterManager.init();
    }
})();
