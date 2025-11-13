/**
 * BaseComponent
 * Clase base para todos los componentes reutilizables
 * Proporciona funcionalidad común: inicialización, eventos, renderizado
 */

export class BaseComponent {
    /**
     * @param {string|HTMLElement} selector - Selector CSS o elemento DOM
     * @param {Object} options - Opciones de configuración del componente
     */
    constructor(selector, options = {}) {
        // Resolver el elemento
        if (typeof selector === 'string') {
            this.element = document.querySelector(selector);
        } else if (selector instanceof HTMLElement) {
            this.element = selector;
        } else {
            this.element = selector;
        }
        
        // Validar que el elemento existe
        if (!this.element) {
            throw new Error(`Element not found: ${selector}`);
        }
        
        // Merge de opciones con defaults
        this.options = { ...this.defaultOptions, ...options };
        
        // Estado del componente
        this.isDestroyed = false;
        
        // Inicializar
        this.init();
    }
    
    /**
     * Opciones por defecto (override en subclases)
     * @returns {Object}
     */
    get defaultOptions() {
        return {};
    }
    
    /**
     * Inicialización del componente
     * Orden: bindEvents -> render
     */
    init() {
        if (this.isDestroyed) {
            console.warn('Component is destroyed, cannot initialize');
            return;
        }
        
        this.bindEvents();
        this.render();
    }
    
    /**
     * Bind de eventos (override en subclases)
     */
    bindEvents() {
        // Override en subclases
    }
    
    /**
     * Renderizado del componente (override en subclases)
     */
    render() {
        // Override en subclases
    }
    
    /**
     * Obtiene un elemento hijo por selector
     * @param {string} selector - Selector CSS
     * @returns {HTMLElement|null}
     */
    querySelector(selector) {
        return this.element?.querySelector(selector) || null;
    }
    
    /**
     * Obtiene múltiples elementos hijos por selector
     * @param {string} selector - Selector CSS
     * @returns {NodeList}
     */
    querySelectorAll(selector) {
        return this.element?.querySelectorAll(selector) || [];
    }
    
    /**
     * Agrega una clase al elemento
     * @param {string} className - Nombre de la clase
     */
    addClass(className) {
        this.element?.classList.add(className);
    }
    
    /**
     * Remueve una clase del elemento
     * @param {string} className - Nombre de la clase
     */
    removeClass(className) {
        this.element?.classList.remove(className);
    }
    
    /**
     * Toggle de una clase
     * @param {string} className - Nombre de la clase
     */
    toggleClass(className) {
        this.element?.classList.toggle(className);
    }
    
    /**
     * Verifica si tiene una clase
     * @param {string} className - Nombre de la clase
     * @returns {boolean}
     */
    hasClass(className) {
        return this.element?.classList.contains(className) || false;
    }
    
    /**
     * Muestra el elemento
     */
    show() {
        if (this.element) {
            this.element.style.display = '';
        }
    }
    
    /**
     * Oculta el elemento
     */
    hide() {
        if (this.element) {
            this.element.style.display = 'none';
        }
    }
    
    /**
     * Verifica si el elemento está visible
     * @returns {boolean}
     */
    isVisible() {
        if (!this.element) return false;
        const style = window.getComputedStyle(this.element);
        return style.display !== 'none' && style.visibility !== 'hidden';
    }
    
    /**
     * Destruye el componente y limpia recursos
     */
    destroy() {
        // Remover event listeners si están guardados
        if (this._eventListeners) {
            this._eventListeners.forEach(({ element, event, handler }) => {
                element.removeEventListener(event, handler);
            });
            this._eventListeners = [];
        }
        
        // Marcar como destruido
        this.isDestroyed = true;
        
        // Limpiar referencia
        this.element = null;
        this.options = null;
    }
    
    /**
     * Helper para agregar event listeners con cleanup automático
     * @param {HTMLElement|Window|Document} element - Elemento al que agregar el listener
     * @param {string} event - Nombre del evento
     * @param {Function} handler - Handler del evento
     * @param {Object} options - Opciones del addEventListener
     */
    on(element, event, handler, options = {}) {
        if (!element) return;
        
        element.addEventListener(event, handler, options);
        
        // Guardar para cleanup
        if (!this._eventListeners) {
            this._eventListeners = [];
        }
        this._eventListeners.push({ element, event, handler });
    }
    
    /**
     * Helper para remover event listeners
     * @param {HTMLElement|Window|Document} element - Elemento
     * @param {string} event - Nombre del evento
     * @param {Function} handler - Handler del evento
     */
    off(element, event, handler) {
        if (!element) return;
        element.removeEventListener(event, handler);
        
        // Remover de la lista
        if (this._eventListeners) {
            this._eventListeners = this._eventListeners.filter(
                listener => !(listener.element === element && 
                             listener.event === event && 
                             listener.handler === handler)
            );
        }
    }
}

