/**
 * FilterEngine Module
 * Motor de filtrado de programas según múltiples criterios
 * @module Search/FilterEngine
 * @requires window.MaulePro
 */

(function(window) {
    'use strict';

    /**
     * Filtra programas según los parámetros proporcionados
     * @param {Array} programas - Lista de programas a filtrar
     * @param {Object} params - Parámetros de filtrado
     * @param {string} params.q - Texto de búsqueda
     * @param {string} params.estado - Estado del programa (open, soon, closed)
     * @param {string} params.benef - Tipo de beneficiario
     * @param {string} params.region - Región/alcance
     * @returns {Array} Programas filtrados
     */
    function filtrarProgramas(programas, params = {}) {
        if (!Array.isArray(programas) || programas.length === 0) {
            return [];
        }

        // Validar y normalizar parámetros
        const searchTerm = params.q ? String(params.q).trim().toLowerCase() : '';
        const estado = params.estado || '';
        const benef = params.benef || '';
        const region = params.region || '';

        return programas.filter(programa => {
            // Validar que el programa tenga la estructura esperada
            if (!programa || typeof programa !== 'object') {
                return false;
            }

            // Filtro por texto de búsqueda
            if (searchTerm) {
                const name = String(programa.name || '').toLowerCase();
                if (!name.includes(searchTerm)) {
                    return false;
                }
            }

            // Filtro por estado
            if (estado && programa.estado !== estado) {
                return false;
            }

            // Filtro por beneficiario
            if (benef && programa.benef !== benef) {
                return false;
            }

            // Filtro por región (todos son Regional por ahora)
            if (region && region !== 'regional') {
                // Si se solicita otra región que no sea regional, filtrar
                // En el futuro, esto puede expandirse
                if (programa.location && programa.location.toLowerCase() !== region.toLowerCase()) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * Valida los parámetros de búsqueda
     * @param {Object} params - Parámetros a validar
     * @returns {Object} Objeto con isValid y errors
     */
    function validateSearchParams(params) {
        const errors = [];

        if (params.q && typeof params.q !== 'string') {
            errors.push('El parámetro "q" debe ser una cadena de texto');
        }

        if (params.estado && !['open', 'soon', 'closed', ''].includes(params.estado)) {
            errors.push('El estado debe ser: open, soon, closed o vacío');
        }

        if (params.benef && !['municipios', 'servicios', 'org', 'personas', 'empresas', ''].includes(params.benef)) {
            errors.push('El beneficiario no es válido');
        }

        if (params.orden && !['relevance', 'openfirst', 'date', 'alpha'].includes(params.orden)) {
            errors.push('El orden debe ser: relevance, openfirst, date o alpha');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Crear namespace global
    if (!window.MaulePro) {
        window.MaulePro = {};
    }
    if (!window.MaulePro.Search) {
        window.MaulePro.Search = {};
    }

    window.MaulePro.Search.FilterEngine = {
        filtrarProgramas: filtrarProgramas,
        validateSearchParams: validateSearchParams
    };
})(window);
