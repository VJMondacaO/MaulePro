/**
 * Storage Utilities
 * Helpers para LocalStorage con prefijo y manejo de errores
 */

import { CONFIG } from '../config/index.js';

/**
 * Obtiene la clave completa con prefijo
 * @param {string} key - Clave sin prefijo
 * @returns {string}
 */
function getFullKey(key) {
    return `${CONFIG.storage.prefix}${key}`;
}

/**
 * Storage helper object
 */
export const storage = {
    /**
     * Guarda un valor en localStorage
     * @param {string} key - Clave (sin prefijo)
     * @param {*} value - Valor a guardar (será serializado a JSON)
     * @returns {boolean} - true si se guardó correctamente
     */
    set(key, value) {
        const fullKey = getFullKey(key);
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(fullKey, serialized);
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },
    
    /**
     * Obtiene un valor de localStorage
     * @param {string} key - Clave (sin prefijo)
     * @param {*} defaultValue - Valor por defecto si no existe
     * @returns {*} - Valor deserializado o defaultValue
     */
    get(key, defaultValue = null) {
        const fullKey = getFullKey(key);
        try {
            const item = localStorage.getItem(fullKey);
            if (item === null) {
                return defaultValue;
            }
            return JSON.parse(item);
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return defaultValue;
        }
    },
    
    /**
     * Elimina un valor de localStorage
     * @param {string} key - Clave (sin prefijo)
     */
    remove(key) {
        const fullKey = getFullKey(key);
        try {
            localStorage.removeItem(fullKey);
        } catch (e) {
            console.error('Error removing from localStorage:', e);
        }
    },
    
    /**
     * Verifica si existe una clave
     * @param {string} key - Clave (sin prefijo)
     * @returns {boolean}
     */
    has(key) {
        const fullKey = getFullKey(key);
        return localStorage.getItem(fullKey) !== null;
    },
    
    /**
     * Limpia todo el storage del prefijo de la app
     */
    clear() {
        try {
            const prefix = CONFIG.storage.prefix;
            const keysToRemove = [];
            
            // Obtener todas las claves del prefijo
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(prefix)) {
                    keysToRemove.push(key);
                }
            }
            
            // Remover las claves
            keysToRemove.forEach(key => localStorage.removeItem(key));
        } catch (e) {
            console.error('Error clearing localStorage:', e);
        }
    },
    
    /**
     * Obtiene todas las claves del prefijo
     * @returns {string[]} - Array de claves (sin prefijo)
     */
    getAllKeys() {
        const prefix = CONFIG.storage.prefix;
        const keys = [];
        
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(prefix)) {
                    keys.push(key.replace(prefix, ''));
                }
            }
        } catch (e) {
            console.error('Error getting localStorage keys:', e);
        }
        
        return keys;
    }
};

