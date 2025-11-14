/**
 * DeadlineManager Utility
 * Gestión centralizada de deadlines y fechas de cierre de programas
 * @module Utils/DeadlineManager
 * @requires window.MaulePro.Utils.Logger
 */

(function(window) {
    'use strict';

    /**
     * Calcula los días restantes hasta una fecha
     * @param {Date|string} closeDate - Fecha de cierre
     * @returns {number|null} Días restantes o null si la fecha es inválida
     * @private
     */
    function calcularDiasRestantes(closeDate) {
        if (!closeDate) return null;
        
        const date = typeof closeDate === 'string' ? new Date(closeDate) : closeDate;
        if (!date || isNaN(date.getTime())) return null;
        
        const now = new Date();
        const days = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
        
        return days < 0 ? null : days;
    }

    /**
     * Obtiene el texto y clase CSS para un deadline según los días restantes
     * @param {number} days - Días restantes
     * @returns {Object} Objeto con text y className
     * @private
     */
    function obtenerTextoDeadline(days) {
        if (days === null || days === undefined) {
            return { text: '', className: '', show: false };
        }

        let text = '';
        let className = '';

        if (days === 0) {
            text = 'Finaliza hoy';
            className = 'urgent';
        } else if (days === 1) {
            text = 'Finaliza en 1 día';
            className = 'urgent';
        } else {
            text = `Finaliza en ${days} días`;
            className = days <= 3 ? 'urgent' : (days <= 10 ? 'soon' : '');
        }

        return { text, className, show: true };
    }

    /**
     * Pinta un deadline en un elemento badge
     * @param {HTMLElement} element - Elemento contenedor con data-close
     * @param {HTMLElement} badge - Elemento badge donde mostrar el deadline
     * @returns {boolean} true si se pintó exitosamente, false si no
     * @private
     */
    function pintarDeadlineEnElemento(element, badge) {
        if (!element || !badge) return false;

        const closeDate = element.getAttribute('data-close') || element.dataset.close;
        if (!closeDate) {
            badge.style.display = 'none';
            return false;
        }

        const days = calcularDiasRestantes(closeDate);
        if (days === null) {
            badge.style.display = 'none';
            return false;
        }

        const { text, className, show } = obtenerTextoDeadline(days);
        
        if (!show) {
            badge.style.display = 'none';
            return false;
        }

        badge.className = `deadline-badge ${className}`;
        badge.textContent = text;
        badge.style.display = 'inline-block';
        
        return true;
    }

    /**
     * DeadlineManager Object
     * @namespace DeadlineManager
     */
    const DeadlineManager = {
        /**
         * Pinta todos los deadlines en elementos con data-program y data-close
         * @method paintAllDeadlines
         * @param {string} selector - Selector CSS para elementos (default: '[data-program][data-close]')
         */
        paintAllDeadlines: function(selector = '[data-program][data-close]') {
            const elements = document.querySelectorAll(selector);
            const Logger = window.MaulePro?.Utils?.Logger;
            
            if (Logger) {
                Logger.debug(`Pintando deadlines para ${elements.length} elementos`);
            }

            let painted = 0;
            elements.forEach(element => {
                const badge = element.querySelector('[data-deadline]');
                if (badge && pintarDeadlineEnElemento(element, badge)) {
                    painted++;
                }
            });

            if (Logger) {
                Logger.debug(`Deadlines pintados: ${painted}/${elements.length}`);
            }
        },

        /**
         * Pinta el deadline de un elemento específico
         * @method paintDeadline
         * @param {HTMLElement|string} elementOrSelector - Elemento o selector CSS
         * @returns {boolean} true si se pintó exitosamente
         */
        paintDeadline: function(elementOrSelector) {
            const element = typeof elementOrSelector === 'string' 
                ? document.querySelector(elementOrSelector)
                : elementOrSelector;

            if (!element) return false;

            const badge = element.querySelector('[data-deadline]');
            return badge ? pintarDeadlineEnElemento(element, badge) : false;
        },

        /**
         * Calcula días restantes para una fecha
         * @method getDaysRemaining
         * @param {Date|string} closeDate - Fecha de cierre
         * @returns {number|null} Días restantes o null
         */
        getDaysRemaining: function(closeDate) {
            return calcularDiasRestantes(closeDate);
        },

        /**
         * Obtiene información de deadline para una fecha
         * @method getDeadlineInfo
         * @param {Date|string} closeDate - Fecha de cierre
         * @returns {Object} Objeto con days, text, className, isUrgent
         */
        getDeadlineInfo: function(closeDate) {
            const days = calcularDiasRestantes(closeDate);
            if (days === null) {
                return {
                    days: null,
                    text: '',
                    className: '',
                    isUrgent: false,
                    show: false
                };
            }

            const { text, className, show } = obtenerTextoDeadline(days);
            return {
                days,
                text,
                className,
                isUrgent: days <= 3,
                show
            };
        }
    };

    // Exponer en namespace global
    window.MaulePro = window.MaulePro || {};
    window.MaulePro.Utils = window.MaulePro.Utils || {};
    window.MaulePro.Utils.DeadlineManager = DeadlineManager;

})(window);

