/**
 * SortEngine Module
 * Motor de ordenamiento de programas según múltiples criterios
 * Lógica unificada para index.html y buscar.html
 * @module Search/SortEngine
 * @requires window.MaulePro
 */

(function(window) {
    'use strict';

    /**
     * Ordena programas según el criterio especificado
     * @param {Array} programas - Lista de programas a ordenar
     * @param {string} orden - Tipo de ordenamiento (relevance, openfirst, date, alpha)
     * @returns {Array} Programas ordenados (nueva instancia, no modifica el original)
     */
    function ordenarProgramas(programas, orden = 'openfirst') {
        if (!Array.isArray(programas) || programas.length === 0) {
            return [];
        }

        // Crear copia para no modificar el array original
        const programasOrdenados = [...programas];

        // Funciones auxiliares
        const byName = (a, b) => {
            const nameA = String(a.name || '').localeCompare(String(b.name || ''), 'es');
            return nameA;
        };

        const toRank = (estado) => {
            const ranks = { open: 3, soon: 2, closed: 1 };
            return ranks[estado] || 0;
        };

        // Aplicar ordenamiento según el tipo
        switch (orden) {
            case 'alpha':
                // Ordenamiento alfabético
                return programasOrdenados.sort(byName);

            case 'openfirst':
                // Ordenar por estado (abiertos primero)
                return programasOrdenados.sort((a, b) => {
                    const rankA = toRank(a.estado);
                    const rankB = toRank(b.estado);
                    return rankB - rankA;
                });

            case 'date':
                // Ordenar por fecha de cierre
                return programasOrdenados.sort((a, b) => {
                    const dateA = a.close ? Date.parse(a.close) : Date.parse('9999-12-31');
                    const dateB = b.close ? Date.parse(b.close) : Date.parse('9999-12-31');
                    
                    // Validar fechas
                    if (isNaN(dateA) && isNaN(dateB)) return 0;
                    if (isNaN(dateA)) return 1;
                    if (isNaN(dateB)) return -1;
                    
                    return dateA - dateB;
                });

            case 'relevance':
            default:
                // Ordenamiento por relevancia:
                // 1. Por estado (abiertos primero)
                // 2. Por nombre (alfabético)
                return programasOrdenados.sort((a, b) => {
                    const rankA = toRank(a.estado);
                    const rankB = toRank(b.estado);
                    
                    // Si tienen el mismo estado, ordenar alfabéticamente
                    if (rankA === rankB) {
                        return byName(a, b);
                    }
                    
                    // Ordenar por estado (mayor rank primero)
                    return rankB - rankA;
                });
        }
    }

    /**
     * Valida el tipo de ordenamiento
     * @param {string} orden - Tipo de ordenamiento
     * @returns {boolean} True si es válido
     */
    function isValidSortOrder(orden) {
        const validOrders = ['relevance', 'openfirst', 'date', 'alpha'];
        return validOrders.includes(orden);
    }

    // Crear namespace global
    if (!window.MaulePro) {
        window.MaulePro = {};
    }
    if (!window.MaulePro.Search) {
        window.MaulePro.Search = {};
    }

    window.MaulePro.Search.SortEngine = {
        ordenarProgramas: ordenarProgramas,
        isValidSortOrder: isValidSortOrder
    };
})(window);
