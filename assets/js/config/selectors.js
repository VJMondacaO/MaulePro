/**
 * Selectors Helper
 * Utilidades para acceder a elementos del DOM usando CONFIG
 */

import { CONFIG } from './index.js';

/**
 * Obtiene un selector por clave
 * @param {string} key - Clave del selector en CONFIG.selectors
 * @returns {string|null}
 */
export function getSelector(key) {
    const selector = CONFIG.selectors[key];
    if (!selector) {
        console.warn(`Selector "${key}" not found in CONFIG.selectors`);
        return null;
    }
    return selector;
}

/**
 * Obtiene un elemento del DOM por clave
 * @param {string} key - Clave del selector
 * @returns {HTMLElement|null}
 */
export function getElement(key) {
    const selector = getSelector(key);
    if (!selector) return null;
    return document.querySelector(selector);
}

/**
 * Obtiene múltiples elementos del DOM por clave
 * @param {string} key - Clave del selector
 * @returns {NodeList}
 */
export function getElements(key) {
    const selector = getSelector(key);
    if (!selector) return [];
    return document.querySelectorAll(selector);
}

/**
 * Verifica si un elemento existe en el DOM
 * @param {string} key - Clave del selector
 * @returns {boolean}
 */
export function elementExists(key) {
    return getElement(key) !== null;
}

