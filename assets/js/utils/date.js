/**
 * Date Utilities
 * Utilidades para manejo de fechas
 */

/**
 * Formatea una fecha a formato DD/MM/YYYY
 * @param {Date|string} date - Fecha a formatear
 * @param {string} format - Formato deseado (default: 'DD/MM/YYYY')
 * @returns {string} - Fecha formateada o string vacío si es inválida
 */
export function format(date, format = 'DD/MM/YYYY') {
    if (!date) return '';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return '';
    }
    
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', year)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

/**
 * Calcula días entre dos fechas
 * @param {Date|string} date1 - Primera fecha
 * @param {Date|string} date2 - Segunda fecha (default: hoy)
 * @returns {number} - Diferencia en días (positivo si date2 > date1)
 */
export function daysBetween(date1, date2 = new Date()) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        return 0;
    }
    
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Verifica si una fecha es hoy
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean}
 */
export function isToday(date) {
    if (!date) return false;
    
    const today = new Date();
    const d = new Date(date);
    
    if (isNaN(d.getTime())) return false;
    
    return d.toDateString() === today.toDateString();
}

/**
 * Verifica si una fecha es en el futuro
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean}
 */
export function isFuture(date) {
    if (!date) return false;
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return false;
    
    return d > new Date();
}

/**
 * Verifica si una fecha es en el pasado
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean}
 */
export function isPast(date) {
    if (!date) return false;
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return false;
    
    return d < new Date();
}

/**
 * Obtiene el inicio del día (00:00:00)
 * @param {Date|string} date - Fecha (default: hoy)
 * @returns {Date}
 */
export function startOfDay(date = new Date()) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * Obtiene el fin del día (23:59:59)
 * @param {Date|string} date - Fecha (default: hoy)
 * @returns {Date}
 */
export function endOfDay(date = new Date()) {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
}

/**
 * Formatea días restantes de forma legible
 * @param {number} days - Número de días
 * @returns {string} - Texto formateado
 */
export function formatDaysRemaining(days) {
    if (days < 0) {
        return 'Cerró';
    }
    
    if (days === 0) {
        return 'Finaliza hoy';
    }
    
    if (days === 1) {
        return 'Finaliza en 1 día';
    }
    
    return `Finaliza en ${days} días`;
}

