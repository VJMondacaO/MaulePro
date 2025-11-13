/**
 * Filters Module
 * Sistema de búsqueda y filtrado de programas
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
        cntOpen: null,
        cntSoon: null,
        cntClosed: null,
        
        init() {
            this.grid = document.getElementById('grid');
            if (!this.grid) return;
            
            this.cards = [...this.grid.querySelectorAll('[data-program]')];
            this.q = document.getElementById('q');
            this.estado = document.getElementById('estado');
            this.benef = document.getElementById('benef');
            this.orden = document.getElementById('orden');
            this.form = document.getElementById('searchForm');
            this.count = document.getElementById('count');
            this.cntOpen = document.getElementById('cntOpen');
            this.cntSoon = document.getElementById('cntSoon');
            this.cntClosed = document.getElementById('cntClosed');
            
            this.bindEvents();
            this.apply();
            this.paintDeadlines();
            this.initAnimations();
            this.initRipple();
            this.initToast();
        },
        
        bindEvents() {
            // Atajo de teclado "/" para buscar
            document.addEventListener('keydown', (e) => {
                if (e.key === '/' && !e.target.closest('input, textarea')) {
                    e.preventDefault();
                    if (this.q) this.q.focus();
                }
            });
            
            // Event listeners
            if (this.form) {
                this.form.addEventListener('submit', e => {
                    e.preventDefault();
                    this.apply();
                });
            }
            
            [this.q, this.estado, this.benef, this.orden].forEach(el => {
                if (el) el.addEventListener('change', () => this.apply());
            });
        },
        
        apply() {
            const term = (this.q?.value || '').toLowerCase();
            const fEstado = this.estado?.value;
            const fBenef = this.benef?.value;
            
            // Filtrar
            this.cards.forEach(c => {
                const name = (c.dataset.name || '').toLowerCase();
                const matchQ = !term || name.includes(term);
                const matchE = !fEstado || c.dataset.estado === fEstado;
                const matchB = !fBenef || c.dataset.benef === fBenef;
                c.style.display = (matchQ && matchE && matchB) ? '' : 'none';
            });
            
            // Ordenar
            let visible = this.cards.filter(c => c.style.display !== 'none');
            const byName = (a, b) => a.dataset.name.localeCompare(b.dataset.name, 'es');
            const toRank = s => ({open: 3, soon: 2, closed: 1}[s] || 0);
            
            if (this.orden?.value === 'alpha') {
                visible.sort(byName);
            } else if (this.orden?.value === 'openfirst') {
                visible.sort((a, b) => toRank(b.dataset.estado) - toRank(a.dataset.estado));
            } else if (this.orden?.value === 'date') {
                visible.sort((a, b) => {
                    const da = Date.parse(a.dataset.close || '9999-12-31');
                    const db = Date.parse(b.dataset.close || '9999-12-31');
                    return da - db;
                });
            } else {
                visible.sort((a, b) => {
                    const r = toRank(b.dataset.estado) - toRank(a.dataset.estado);
                    return r !== 0 ? r : byName(a, b);
                });
            }
            
            // Reordenar DOM
            visible.forEach(card => this.grid.appendChild(card));
            
            // Actualizar contadores
            if (this.count) this.count.textContent = String(visible.length);
            const get = s => visible.filter(c => c.dataset.estado === s).length;
            if (this.cntOpen) this.cntOpen.textContent = get('open');
            if (this.cntSoon) this.cntSoon.textContent = get('soon');
            if (this.cntClosed) this.cntClosed.textContent = get('closed');
        },
        
        paintDeadlines() {
            const now = new Date();
            document.querySelectorAll('[data-program]').forEach(col => {
                const d = col.dataset.close ? new Date(col.dataset.close) : null;
                const badge = col.querySelector('[data-deadline]');
                if (!badge) return;
                
                if (!d || isNaN(d)) {
                    badge.style.display = 'none';
                    return;
                }
                
                const days = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
                let cls = '';
                let text = '';
                
                if (days < 0) {
                    badge.style.display = 'none';
                    return;
                } else if (days === 0) {
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

