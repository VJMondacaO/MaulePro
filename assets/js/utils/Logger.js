/**
 * Logger Utility
 * Sistema de logging con niveles y control de producción
 * @module Utils/Logger
 */

(function(window) {
    'use strict';

    /**
     * Niveles de logging disponibles
     * @enum {number}
     */
    const LogLevel = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        NONE: 4
    };

    /**
     * Configuración del logger
     * @type {Object}
     */
    const config = {
        // Detectar si estamos en producción
        isProduction: window.location.hostname !== 'localhost' && 
                     window.location.hostname !== '127.0.0.1' &&
                     !window.location.hostname.includes('dev'),
        // Nivel mínimo de log (cambiar según entorno)
        minLevel: LogLevel.INFO,
        // Prefijo para todos los logs
        prefix: '[MaulePro]',
        // Formateo de fecha
        dateFormat: 'iso'
    };

    /**
     * Formatear fecha para logs
     * @param {Date} date - Fecha a formatear
     * @returns {string} Fecha formateada
     * @private
     */
    function formatDate(date) {
        if (config.dateFormat === 'iso') {
            return date.toISOString();
        }
        return date.toLocaleString('es-ES');
    }

    /**
     * Formatear mensaje de log
     * @param {string} level - Nivel del log
     * @param {string} message - Mensaje
     * @param {Array} args - Argumentos adicionales
     * @returns {Array} Array formateado para console
     * @private
     */
    function formatMessage(level, message, args = []) {
        const timestamp = formatDate(new Date());
        const prefix = `${config.prefix} [${timestamp}] [${level}]`;
        return [prefix, message, ...args];
    }

    /**
     * Logger principal
     * @namespace Logger
     */
    const Logger = {
        /**
         * Cambiar nivel mínimo de log
         * @param {number} level - Nuevo nivel mínimo
         */
        setLevel: function(level) {
            if (typeof level === 'number' && level >= LogLevel.DEBUG && level <= LogLevel.NONE) {
                config.minLevel = level;
            }
        },

        /**
         * Obtener nivel actual
         * @returns {number} Nivel actual
         */
        getLevel: function() {
            return config.minLevel;
        },

        /**
         * Habilitar/deshabilitar logs en producción
         * @param {boolean} enabled - Habilitar logs
         */
        setProductionMode: function(enabled) {
            config.isProduction = enabled;
            if (enabled) {
                config.minLevel = LogLevel.WARN; // Solo warnings y errores en producción
            }
        },

        /**
         * Log de debug (solo en desarrollo)
         * @param {string} message - Mensaje
         * @param {...any} args - Argumentos adicionales
         */
        debug: function(message, ...args) {
            if (config.isProduction) return;
            if (config.minLevel > LogLevel.DEBUG) return;
            const formatted = formatMessage('DEBUG', message, args);
            console.log(...formatted);
        },

        /**
         * Log de información
         * @param {string} message - Mensaje
         * @param {...any} args - Argumentos adicionales
         */
        info: function(message, ...args) {
            if (config.minLevel > LogLevel.INFO) return;
            const formatted = formatMessage('INFO', message, args);
            console.log(...formatted);
        },

        /**
         * Log de advertencia
         * @param {string} message - Mensaje
         * @param {...any} args - Argumentos adicionales
         */
        warn: function(message, ...args) {
            if (config.minLevel > LogLevel.WARN) return;
            const formatted = formatMessage('WARN', message, args);
            console.warn(...formatted);
        },

        /**
         * Log de error
         * @param {string} message - Mensaje
         * @param {...any} args - Argumentos adicionales
         */
        error: function(message, ...args) {
            if (config.minLevel > LogLevel.ERROR) return;
            const formatted = formatMessage('ERROR', message, args);
            console.error(...formatted);
        },

        /**
         * Log de grupo (útil para agrupar logs relacionados)
         * @param {string} label - Etiqueta del grupo
         */
        group: function(label) {
            if (config.minLevel > LogLevel.INFO) return;
            console.group(`${config.prefix} ${label}`);
        },

        /**
         * Cerrar grupo de logs
         */
        groupEnd: function() {
            if (config.minLevel > LogLevel.INFO) return;
            console.groupEnd();
        },

        /**
         * Log de tabla (útil para arrays y objetos)
         * @param {any} data - Datos a mostrar en tabla
         * @param {Array<string>} columns - Columnas a mostrar (opcional)
         */
        table: function(data, columns) {
            if (config.minLevel > LogLevel.DEBUG) return;
            if (columns) {
                console.table(data, columns);
            } else {
                console.table(data);
            }
        },

        /**
         * Log con estilos personalizados (solo en desarrollo)
         * @param {string} message - Mensaje
         * @param {string} styles - Estilos CSS
         * @param {...any} args - Argumentos adicionales
         */
        styled: function(message, styles, ...args) {
            if (config.isProduction) return;
            if (config.minLevel > LogLevel.INFO) return;
            console.log(`%c${config.prefix} ${message}`, styles, ...args);
        }
    };

    // Inicializar nivel según entorno
    if (config.isProduction) {
        config.minLevel = LogLevel.WARN;
    } else {
        config.minLevel = LogLevel.DEBUG;
    }

    // Exponer Logger en namespace global
    window.MaulePro = window.MaulePro || {};
    window.MaulePro.Utils = window.MaulePro.Utils || {};
    window.MaulePro.Utils.Logger = Logger;
    window.MaulePro.Utils.LogLevel = LogLevel;

    // Log de inicialización (solo en desarrollo)
    if (!config.isProduction) {
        Logger.debug('Logger inicializado', {
            level: config.minLevel,
            production: config.isProduction
        });
    }

})(window);

