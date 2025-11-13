/**
 * Filters Module
 * Sistema de búsqueda y filtrado de programas
 * Refactorizado para usar módulos compartidos
 */

(function() {
    'use strict';
    
    const FilterManager = {
        grid: null,
        cards: [],
        q: null,
        estado: null,
        benef: null,
        orden: null,
        form: null,
        count: null,
        // Contadores de estado eliminados
        // cntOpen: null,
        // cntSoon: null,
        // cntClosed: null,
        debouncedApply: null,
        
        init() {
            this.grid = document.getElementById('grid');
            if (!this.grid) return;
            
            // Verificar si el formulario tiene action antes de inicializar filtrado local
            this.form = document.getElementById('searchForm');
            const formAction = this.form?.getAttribute('action');
            const hasRedirectAction = formAction && formAction.trim() !== '' && formAction.trim() !== '#';
            
            // Inicializar tarjetas siempre (necesario para paintDeadlines y otras funcionalidades)
            this.cards = [...this.grid.querySelectorAll('[data-program]')];
            
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
            
            // Crear función debounced para inputs de texto
            const debounce = window.MaulePro?.Utils?.debounce || function(fn, wait) {
                let timeout;
                return function(...args) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => fn.apply(this, args), wait);
                };
            };
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
        
        apply() {
            // Obtener valores de los filtros
            const term = (this.q?.value || '').trim().toLowerCase();
            const fEstado = this.estado?.value || '';
            const fBenef = this.benef?.value || '';
            const fOrden = this.orden?.value || 'relevance';
            
            // Usar módulos compartidos si están disponibles
            const FilterEngine = window.MaulePro?.Search?.FilterEngine;
            const SortEngine = window.MaulePro?.Search?.SortEngine;
            
            // Filtrar tarjetas directamente desde DOM (más eficiente)
            let visible;
            if (FilterEngine) {
                // Convertir cards DOM a array de objetos para usar con FilterEngine
                const programas = this.cards.map(card => ({
                    name: card.dataset.name || '',
                    estado: card.dataset.estado || '',
                    benef: card.dataset.benef || '',
                    close: card.dataset.close || '',
                    elemento: card // Guardar referencia al elemento
                }));
                
                // Filtrar usando FilterEngine
                const resultados = FilterEngine.filtrarProgramas(programas, {
                    q: term,
                    estado: fEstado,
                    benef: fBenef
                });
                
                // Extraer elementos DOM de los resultados
                visible = resultados.map(r => r.elemento);
            } else {
                // Fallback: filtrado manual
                visible = this.cards.filter(c => {
                    const name = (c.dataset.name || '').toLowerCase();
                    const matchQ = !term || name.includes(term);
                    const matchE = !fEstado || c.dataset.estado === fEstado;
                    const matchB = !fBenef || c.dataset.benef === fBenef;
                    return matchQ && matchE && matchB;
                });
            }
            
            // Ordenar
            if (SortEngine && visible.length > 0) {
                // Convertir a objetos con datos necesarios para ordenamiento
                const programasParaOrdenar = visible.map(card => ({
                    elemento: card,
                    name: card.dataset.name || '',
                    estado: card.dataset.estado || '',
                    close: card.dataset.close || ''
                }));
                
                // Ordenar usando SortEngine
                const ordenados = SortEngine.ordenarProgramas(programasParaOrdenar, fOrden);
                visible = ordenados.map(p => p.elemento);
            } else if (visible.length > 0) {
                // Fallback: ordenamiento manual
                const byName = (a, b) => a.dataset.name.localeCompare(b.dataset.name, 'es');
                const toRank = s => ({open: 3, soon: 2, closed: 1}[s] || 0);
                
                if (fOrden === 'alpha') {
                    visible.sort(byName);
                } else if (fOrden === 'openfirst') {
                    visible.sort((a, b) => toRank(b.dataset.estado) - toRank(a.dataset.estado));
                } else if (fOrden === 'date') {
                    visible.sort((a, b) => {
                        const da = Date.parse(a.dataset.close || '9999-12-31');
                        const db = Date.parse(b.dataset.close || '9999-12-31');
                        return da - db;
                    });
                } else {
                    // relevance (default)
                    visible.sort((a, b) => {
                        const r = toRank(b.dataset.estado) - toRank(a.dataset.estado);
                        return r !== 0 ? r : byName(a, b);
                    });
                }
            }
            
            // Ocultar todas las tarjetas primero
            this.cards.forEach(c => {
                c.style.display = 'none';
            });
            
            // Mostrar y reordenar tarjetas visibles usando DocumentFragment para mejor rendimiento
            if (visible.length > 0) {
                const fragment = document.createDocumentFragment();
                visible.forEach(card => {
                    card.style.display = '';
                    fragment.appendChild(card);
                });
                // Limpiar grid y agregar fragment (más eficiente que appendChild individual)
                this.grid.innerHTML = '';
                this.grid.appendChild(fragment);
            } else {
                // Si no hay resultados, limpiar grid
                this.grid.innerHTML = '';
            }
            
            // Actualizar contadores
            this.updateCounters(visible);
        },
        
        updateCounters(visible) {
            if (this.count) this.count.textContent = String(visible.length);
            // Contadores de estado eliminados - solo actualizar contador total
        },
        
        paintDeadlines() {
            const now = new Date();
            document.querySelectorAll('[data-program]').forEach(col => {
                const closeDate = col.dataset.close;
                if (!closeDate) return;
                
                const d = new Date(closeDate);
                const badge = col.querySelector('[data-deadline]');
                if (!badge) return;
                
                if (!d || isNaN(d.getTime())) {
                    badge.style.display = 'none';
                    return;
                }
                
                const days = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
                
                if (days < 0) {
                    badge.style.display = 'none';
                    return;
                }
                
                let text = '';
                let cls = '';
                
                if (days === 0) {
                    text = 'Finaliza hoy';
                    cls = 'urgent';
                } else if (days === 1) {
                    text = 'Finaliza en 1 día';
                    cls = 'urgent';
                } else {
                    text = `Finaliza en ${days} días`;
                    cls = days <= 3 ? 'urgent' : (days <= 10 ? 'soon' : '');
                }
                
                badge.className = `deadline-badge ${cls}`;
                badge.textContent = text;
                badge.style.display = 'inline-block';
            });
        },
        
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
