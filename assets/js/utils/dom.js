/**
 * DOM Utilities
 * Utilidades para manipulación del DOM
 */

/**
 * Crea un elemento con opciones
 * @param {string} tag - Tag del elemento
 * @param {Object} options - Opciones del elemento
 * @param {string} options.className - Clases CSS
 * @param {Object} options.attributes - Atributos HTML
 * @param {string} options.text - Texto del elemento
 * @param {string} options.html - HTML interno
 * @param {HTMLElement} options.parent - Elemento padre (opcional)
 * @returns {HTMLElement}
 */
export function create(tag, options = {}) {
    const el = document.createElement(tag);
    
    if (options.className) {
        el.className = options.className;
    }
    
    if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            el.setAttribute(key, value);
        });
    }
    
    if (options.text) {
        el.textContent = options.text;
    }
    
    if (options.html) {
        el.innerHTML = options.html;
    }
    
    if (options.parent) {
        options.parent.appendChild(el);
    }
    
    return el;
}

/**
 * Verifica si un elemento existe en el DOM
 * @param {string} selector - Selector CSS
 * @returns {boolean}
 */
export function exists(selector) {
    return document.querySelector(selector) !== null;
}

/**
 * Espera a que un elemento exista en el DOM
 * @param {string} selector - Selector CSS
 * @param {number} timeout - Timeout en ms (default: 5000)
 * @returns {Promise<HTMLElement>}
 */
export function waitFor(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        
        const check = () => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
            } else if (Date.now() - startTime > timeout) {
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            } else {
                requestAnimationFrame(check);
            }
        };
        
        check();
    });
}

/**
 * Scroll suave a un elemento
 * @param {HTMLElement|string} element - Elemento o selector
 * @param {Object} options - Opciones de scrollIntoView
 */
export function scrollTo(element, options = {}) {
    const el = typeof element === 'string' 
        ? document.querySelector(element) 
        : element;
    
    if (!el) {
        console.warn('Element not found for scrollTo');
        return;
    }
    
    const defaultOptions = {
        behavior: 'smooth',
        block: 'start'
    };
    
    el.scrollIntoView({ ...defaultOptions, ...options });
}

/**
 * Obtiene el elemento padre más cercano que coincida con el selector
 * @param {HTMLElement} element - Elemento inicial
 * @param {string} selector - Selector CSS
 * @returns {HTMLElement|null}
 */
export function closest(element, selector) {
    return element?.closest(selector) || null;
}

/**
 * Remueve todos los hijos de un elemento
 * @param {HTMLElement} element - Elemento
 */
export function clear(element) {
    if (element) {
        element.innerHTML = '';
    }
}

/**
 * Inserta un elemento después de otro
 * @param {HTMLElement} newElement - Elemento a insertar
 * @param {HTMLElement} referenceElement - Elemento de referencia
 */
export function insertAfter(newElement, referenceElement) {
    if (referenceElement && referenceElement.parentNode) {
        referenceElement.parentNode.insertBefore(
            newElement,
            referenceElement.nextSibling
        );
    }
}

/**
 * Inserta un elemento antes de otro
 * @param {HTMLElement} newElement - Elemento a insertar
 * @param {HTMLElement} referenceElement - Elemento de referencia
 */
export function insertBefore(newElement, referenceElement) {
    if (referenceElement && referenceElement.parentNode) {
        referenceElement.parentNode.insertBefore(newElement, referenceElement);
    }
}

