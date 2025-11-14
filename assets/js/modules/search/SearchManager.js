/**
 * SearchManager Module
 * Gestor unificado de búsqueda y filtrado de programas
 * Centraliza toda la lógica de búsqueda para index.html y buscar.html
 * @module Search/SearchManager
 * @requires window.MaulePro.Search.FilterEngine
 * @requires window.MaulePro.Search.SortEngine
 * @requires window.MaulePro.Search.CardRenderer
 * @requires window.MaulePro.Utils.Logger
 */

(function(window) {
    'use strict';

    /**
     * Clase SearchManager
     * @param {Object} options - Opciones de configuración
     * @param {Array} options.programas - Lista de programas
     * @param {HTMLElement} options.container - Contenedor donde renderizar
     * @param {Function} options.onResultsChange - Callback cuando cambian los resultados
     * @param {Function} options.onCountChange - Callback cuando cambian los contadores
     */
    function SearchManager(options = {}) {
        this.programas = options.programas || [];
        this.container = options.container || null;
        this.onResultsChange = options.onResultsChange || null;
        this.onCountChange = options.onCountChange || null;
        this.currentResults = [];
        this.currentParams = {};
    }

    /**
     * Ejecuta búsqueda y filtrado
     * @param {Object} params - Parámetros de búsqueda
     * @returns {Array} Resultados filtrados y ordenados
     */
    SearchManager.prototype.search = function(params = {}) {
        // Validar parámetros
        const FilterEngine = window.MaulePro?.Search?.FilterEngine;
        const Logger = window.MaulePro?.Utils?.Logger;
        if (FilterEngine) {
            const validation = FilterEngine.validateSearchParams(params);
            if (!validation.isValid) {
                if (Logger) {
                    Logger.warn('Parámetros de búsqueda inválidos:', validation.errors);
                } else {
                    console.warn('Parámetros de búsqueda inválidos:', validation.errors);
                }
            }
        }

        // Normalizar parámetros
        const normalizedParams = {
            q: params.q ? String(params.q).trim().toLowerCase() : '',
            estado: params.estado || '',
            benef: params.benef || '',
            orden: params.orden || 'relevance',
            region: params.region || ''
        };

        // Filtrar
        let resultados = [];
        if (FilterEngine) {
            resultados = FilterEngine.filtrarProgramas(this.programas, normalizedParams);
        } else {
            // Fallback si FilterEngine no está disponible
            resultados = this.programas.filter(p => {
                if (normalizedParams.q && !String(p.name || '').toLowerCase().includes(normalizedParams.q)) {
                    return false;
                }
                if (normalizedParams.estado && p.estado !== normalizedParams.estado) {
                    return false;
                }
                if (normalizedParams.benef && p.benef !== normalizedParams.benef) {
                    return false;
                }
                return true;
            });
        }

        // Si no hay resultados pero tampoco hay filtros, mostrar todos
        if (resultados.length === 0 && 
            !normalizedParams.q && 
            !normalizedParams.estado && 
            !normalizedParams.benef && 
            !normalizedParams.region) {
            resultados = [...this.programas];
        }

        // Ordenar
        const SortEngine = window.MaulePro?.Search?.SortEngine;
        if (SortEngine) {
            resultados = SortEngine.ordenarProgramas(resultados, normalizedParams.orden);
        }

        // Guardar resultados y parámetros
        this.currentResults = resultados;
        this.currentParams = normalizedParams;

        // Notificar cambios
        if (this.onResultsChange) {
            this.onResultsChange(resultados, normalizedParams);
        }

        return resultados;
    };

    /**
     * Renderiza resultados en el contenedor
     * @param {Array} resultados - Resultados a renderizar
     * @param {HTMLElement} container - Contenedor donde renderizar (opcional, usa this.container si no se proporciona)
     */
    SearchManager.prototype.renderResults = function(resultados = null, container = null) {
        const results = resultados || this.currentResults;
        const targetContainer = container || this.container;

        if (!targetContainer) {
            const Logger = window.MaulePro?.Utils?.Logger;
            if (Logger) {
                Logger.error('No se proporcionó contenedor para renderizar');
            } else {
                console.error('No se proporcionó contenedor para renderizar');
            }
            return;
        }

        // Limpiar contenedor
        targetContainer.innerHTML = '';

        if (results.length === 0) {
            this.renderEmptyState(targetContainer);
            return;
        }

        // Usar DocumentFragment para mejor rendimiento
        const fragment = document.createDocumentFragment();
        const CardRenderer = window.MaulePro?.Search?.CardRenderer;

        results.forEach(programa => {
            let tarjeta;
            if (CardRenderer) {
                tarjeta = CardRenderer.crearTarjetaElement(programa);
            } else {
                // Fallback: crear elemento básico
                tarjeta = document.createElement('div');
                tarjeta.className = 'col-12 col-md-6 col-lg-3';
                tarjeta.innerHTML = `<p>${programa.name || 'Programa sin nombre'}</p>`;
            }
            
            if (tarjeta) {
                fragment.appendChild(tarjeta);
            }
        });

        targetContainer.appendChild(fragment);

        // Actualizar contadores
        this.updateCounters(results);
    };

    /**
     * Renderiza estado vacío
     * @param {HTMLElement} container - Contenedor
     */
    SearchManager.prototype.renderEmptyState = function(container) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'col-12';
        emptyDiv.innerHTML = `
            <p class="text-center text-muted py-5">No se encontraron resultados para la búsqueda realizada.</p>
            <p class="text-center">
                <a href="../index.html" class="btn btn-primary">Volver al inicio</a>
            </p>
        `;
        container.appendChild(emptyDiv);
    };

    /**
     * Actualiza contadores de resultados
     * @param {Array} resultados - Resultados actuales
     */
    SearchManager.prototype.updateCounters = function(resultados = null) {
        const results = resultados || this.currentResults;

        if (this.onCountChange) {
            const counts = {
                total: results.length,
                open: results.filter(p => p.estado === 'open').length,
                soon: results.filter(p => p.estado === 'soon').length,
                closed: results.filter(p => p.estado === 'closed').length
            };
            this.onCountChange(counts);
        }
    };

    /**
     * Obtiene parámetros de búsqueda desde URL
     * @returns {Object} Parámetros normalizados
     */
    SearchManager.getUrlParams = function() {
        const params = new URLSearchParams(window.location.search);
        return {
            q: params.get('q') || '',
            estado: params.get('estado') || '',
            benef: params.get('benef') || '',
            orden: params.get('orden') || 'relevance',
            region: params.get('region') || ''
        };
    };

    /**
     * Llena formularios con parámetros
     * @param {Object} params - Parámetros a usar
     * @param {Object} formElements - Objeto con IDs de elementos del formulario
     */
    SearchManager.fillForm = function(params, formElements = {}) {
        const elements = {
            q: formElements.q ? document.getElementById(formElements.q) : null,
            estado: formElements.estado ? document.getElementById(formElements.estado) : null,
            benef: formElements.benef ? document.getElementById(formElements.benef) : null,
            orden: formElements.orden ? document.getElementById(formElements.orden) : null,
            region: formElements.region ? document.getElementById(formElements.region) : null
        };

        if (elements.q) elements.q.value = params.q || '';
        if (elements.estado) elements.estado.value = params.estado || '';
        if (elements.benef) elements.benef.value = params.benef || '';
        if (elements.orden) elements.orden.value = params.orden || 'relevance';
        if (elements.region) elements.region.value = params.region || '';
    };

    // Crear namespace global
    if (!window.MaulePro) {
        window.MaulePro = {};
    }
    if (!window.MaulePro.Search) {
        window.MaulePro.Search = {};
    }

    window.MaulePro.Search.SearchManager = SearchManager;
})(window);
