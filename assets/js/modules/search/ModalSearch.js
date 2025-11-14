/**
 * ModalSearch Module
 * Búsqueda modal con renderizado seguro (sin innerHTML con datos del usuario)
 * @module Search/ModalSearch
 * @requires window.MaulePro.Utils.Logger
 * @requires window.MaulePro.Data.programas
 */

(function(window) {
    'use strict';

    const Logger = window.MaulePro?.Utils?.Logger;

    /**
     * Escapa texto para prevenir XSS
     * @param {string} text - Texto a escapar
     * @returns {string} Texto escapado
     * @private
     */
    function escapeHtml(text) {
        if (typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Construye contenido buscable desde elementos de la página y datos estáticos
     * @returns {Array<Object>} Array de contenido buscable
     * @private
     */
    function buildSearchableContent() {
        const content = [];
        
        // Determinar base path según la página actual
        const currentPath = window.location.pathname;
        let basePath = '';
        if (currentPath.includes('/pages/programas/')) {
            basePath = '../../';
        } else if (currentPath.includes('/pages/')) {
            basePath = '../';
        } else {
            basePath = '';
        }
        
        // Buscar en tarjetas de programa en la página
        const programCards = document.querySelectorAll('[data-program]');
        programCards.forEach(card => {
            const name = card.getAttribute('data-name') || '';
            const estado = card.getAttribute('data-estado') || '';
            const h3 = card.querySelector('h3');
            const meta = card.querySelector('.meta');
            const title = h3 ? h3.textContent.trim() : name;
            const description = meta ? meta.textContent.trim() : '';
            const link = card.querySelector('a[href]');
            let url = link ? link.getAttribute('href') : '#';
            
            // Normalizar URL si es necesario
            if (url && !url.startsWith('http') && !url.startsWith('#') && !url.startsWith('/')) {
                if (basePath && !url.startsWith(basePath)) {
                    if (!url.startsWith('pages/') && !url.startsWith('../')) {
                        url = basePath + url;
                    }
                }
            }
            
            if (title) {
                content.push({
                    title: title,
                    description: description || `Programa ${estado === 'open' ? 'abierto' : estado === 'closed' ? 'cerrado' : 'próximo'}`,
                    url: url,
                    type: 'programa'
                });
            }
        });
        
        // Agregar contenido estático (puede venir de programas.js en el futuro)
        const staticContent = [
            { 
                title: 'PROYECTOS MENORES A 5.000 UTM', 
                url: basePath + 'pages/programas/proyectos-menores.html', 
                description: 'Iniciativas de inversión de menor escala con procesos de evaluación simplificados', 
                keywords: 'proyectos menores utm inversión evaluación simplificada',
                content: 'Iniciativas de inversión de menor escala con procesos de evaluación simplificados. Proyectos menores a 5.000 UTM.',
                type: 'programa' 
            },
            { 
                title: 'Subvenciones para actividades FNDR 8%', 
                url: basePath + 'pages/programas/fndr-8.html', 
                description: 'Subvenciones para actividades y proyectos que contribuyen al desarrollo regional', 
                keywords: 'fndr 8% subvenciones actividades deportivas seguridad ciudadana medio ambiente culturales sociales',
                content: 'Subvenciones para actividades FNDR 8%. Ley de Presupuesto. Actividades deportivas, seguridad ciudadana, participación de niños, actividades sociales, adultos mayores, medio ambiente, educación ambiental, adopción rescate animales, teatros municipales, actividades culturales y patrimoniales. Municipalidades, entidades públicas, instituciones privadas sin fines de lucro.',
                type: 'programa' 
            },
            { 
                title: 'Circular 33', 
                url: basePath + 'pages/programas/circular-33.html', 
                description: 'Instructivo que regula el procedimiento de evaluación y ejecución de proyectos', 
                keywords: 'circular 33 adquisición activos no financieros conservaciones infraestructura pública edificios vehículos mobiliario máquinas equipos',
                content: 'Circular 33. Procedimiento de evaluación y ejecución de proyectos. Adquisición de Activos No Financieros. Conservaciones de Infraestructura Pública. Edificios, vehículos, mobiliario, máquinas, equipos informáticos, programas informáticos. Ministerio de Hacienda.',
                type: 'programa' 
            },
            { 
                title: 'Fondo Regional de Iniciativa Local (FRIL)', 
                url: basePath + 'pages/programas/fril.html', 
                description: 'Financiamiento para proyectos de infraestructura pública y conservación', 
                keywords: 'fril fondo regional iniciativa local municipalidades infraestructura pública conservación glosa subtítulo 33',
                content: 'Fondo Regional de Iniciativa Local FRIL. Municipalidades Región del Maule. Infraestructura pública, conservación, desarrollo territorial. Glosa 6 letra g Subtítulo 33. 9.000 UTM por comuna. 40 días hábiles postulación. Plataforma digital Maule Pro.',
                type: 'programa' 
            },
            { 
                title: 'FNDR Sub. 31 con Evaluación MIDESOYF', 
                url: basePath + 'pages/programas/fndr-sub31.html', 
                description: 'Proyectos de que requieren evaluación del Ministerio de Desarrollo Social y Familia', 
                keywords: 'fndr sub 31 midesoyf ministerio desarrollo social familia proyectos inversión 5000 utm sistema nacional inversiones sni',
                content: 'FNDR Sub. 31 con Evaluación MIDESOYF. Proyectos de inversión menores a 5.000 UTM. Sistema Nacional de Inversiones SNI. Ministerio de Desarrollo Social y Familia. Postulación evaluación proyectos.',
                type: 'programa' 
            },
            { 
                title: 'Financiamiento para Programas', 
                url: basePath + 'pages/financiamiento-programas.html', 
                description: 'Postulación a financiamiento para programas y proyectos regionales', 
                keywords: 'financiamiento programas proyectos regionales transferencias glosa subtítulo 33',
                content: 'Financiamiento para Programas. Postulación a financiamiento para programas y proyectos regionales. Transferencias Subtítulo 33.',
                type: 'programa' 
            },
            { 
                title: 'Fondo Regional para la Productividad y el Desarrollo (FRPD)', 
                url: basePath + 'pages/programas/frpd.html', 
                description: 'Apoyo a iniciativas que fomentan la productividad y el desarrollo regional', 
                keywords: 'frpd fondo regional productividad desarrollo iniciativas productividad desarrollo regional',
                content: 'Fondo Regional para la Productividad y el Desarrollo FRPD. Apoyo a iniciativas que fomentan la productividad y el desarrollo regional.',
                type: 'programa' 
            }
        ];
        
        // Eliminar duplicados basados en título
        const uniqueContent = [];
        const seenTitles = new Set();
        
        [...content, ...staticContent].forEach(item => {
            if (!seenTitles.has(item.title)) {
                seenTitles.add(item.title);
                uniqueContent.push(item);
            }
        });
        
        return uniqueContent;
    }

    /**
     * Realiza búsqueda sobre el contenido buscable
     * @param {string} query - Término de búsqueda
     * @returns {Array<Object>} Resultados ordenados por relevancia
     * @private
     */
    function performSearch(query) {
        const searchableContent = buildSearchableContent();
        const queryLower = query.toLowerCase().trim();
        
        if (!queryLower) return [];
        
        // Dividir query en palabras para mejor matching
        const queryWords = queryLower.split(/\s+/).filter(w => w.length > 0);
        
        const mappedResults = searchableContent.map(item => {
            const titleLower = (item.title || '').toLowerCase();
            const descLower = (item.description || '').toLowerCase();
            const keywordsLower = (item.keywords || '').toLowerCase();
            const contentLower = (item.content || '').toLowerCase();
            
            // Calcular score de relevancia
            let score = 0;
            let matchedFields = [];
            
            // Coincidencias en título (mayor prioridad)
            if (titleLower === queryLower) {
                score += 100;
                matchedFields.push('title');
            } else if (titleLower.startsWith(queryLower)) {
                score += 80;
                matchedFields.push('title');
            } else if (titleLower.includes(queryLower)) {
                score += 60;
                matchedFields.push('title');
            }
            
            // Coincidencias en keywords
            if (keywordsLower.includes(queryLower)) {
                score += 50;
                matchedFields.push('keywords');
            }
            
            // Coincidencias en contenido
            if (contentLower.includes(queryLower)) {
                score += 30;
                matchedFields.push('content');
            }
            
            // Coincidencias en descripción
            if (descLower.includes(queryLower)) {
                score += 40;
                matchedFields.push('description');
            }
            
            // Coincidencias palabra por palabra
            queryWords.forEach(word => {
                if (word.length > 2) {
                    if (titleLower.includes(word)) score += 20;
                    if (keywordsLower.includes(word)) score += 15;
                    if (contentLower.includes(word)) score += 10;
                    if (descLower.includes(word)) score += 5;
                }
            });
            
            // Extraer snippet del contenido donde se encontró la coincidencia
            let snippet = item.description || '';
            if (contentLower.includes(queryLower) && item.content) {
                const index = contentLower.indexOf(queryLower);
                const start = Math.max(0, index - 50);
                const end = Math.min(item.content.length, index + queryLower.length + 50);
                snippet = '...' + item.content.substring(start, end) + '...';
            } else if (contentLower.includes(queryWords[0]) && item.content) {
                const word = queryWords[0];
                const index = contentLower.indexOf(word);
                const start = Math.max(0, index - 50);
                const end = Math.min(item.content.length, index + word.length + 50);
                snippet = '...' + item.content.substring(start, end) + '...';
            }
            
            return {
                ...item,
                score: score,
                matchedFields: matchedFields,
                snippet: snippet
            };
        });
        
        // Filtrar items con coincidencias y ordenar por score de relevancia
        const sortedResults = mappedResults.filter(item => item.score > 0).sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return a.title.localeCompare(b.title, 'es');
        });
        
        return sortedResults;
    }

    /**
     * Crea un elemento de resultado de búsqueda de forma segura
     * @param {Object} item - Item de resultado
     * @returns {HTMLElement} Elemento DOM del resultado
     * @private
     */
    function createResultElement(item) {
        const link = document.createElement('a');
        link.href = item.url || '#';
        link.className = 'd-block p-3 border border-2 border-secondary rounded mb-2 text-decoration-none program-search-result';
        link.style.transition = 'all 0.2s ease';

        const container = document.createElement('div');
        container.className = 'd-flex align-items-start gap-2';

        const icon = document.createElement('i');
        icon.className = `bi ${item.type === 'programa' ? 'bi-folder' : 'bi-file-earmark-text'} text-institucional mt-1`;
        container.appendChild(icon);

        const content = document.createElement('div');
        content.className = 'flex-grow-1';

        const title = document.createElement('h3');
        title.className = 'h6 fw-bold text-institucional mb-1';
        title.textContent = item.title || '';
        content.appendChild(title);

        if (item.snippet && item.snippet !== item.description) {
            const snippet = document.createElement('p');
            snippet.className = 'text-muted small mb-1';
            const snippetEm = document.createElement('em');
            snippetEm.textContent = item.snippet;
            snippet.appendChild(snippetEm);
            content.appendChild(snippet);
        }

        const description = document.createElement('p');
        description.className = 'text-muted small mb-0';
        description.textContent = item.description || '';
        content.appendChild(description);

        container.appendChild(content);

        const arrow = document.createElement('i');
        arrow.className = 'bi bi-arrow-right text-muted';
        container.appendChild(arrow);

        link.appendChild(container);

        // Agregar hover effect
        link.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.borderColor = 'var(--institucional-azul)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.borderColor = '';
        });

        return link;
    }

    /**
     * Crea un mensaje de estado vacío de forma segura
     * @param {string} query - Query de búsqueda (opcional)
     * @param {boolean} isError - Si es un mensaje de error
     * @returns {HTMLElement} Elemento DOM del mensaje
     * @private
     */
    function createEmptyStateElement(query, isError = false) {
        const container = document.createElement('div');
        container.className = 'text-center py-4';

        const icon = document.createElement('i');
        icon.className = `bi ${isError ? 'bi-exclamation-triangle text-warning' : 'bi-search text-muted'}`;
        icon.style.fontSize = '3rem';
        container.appendChild(icon);

        const message = document.createElement('p');
        message.className = 'text-muted mt-2';

        if (isError) {
            message.textContent = 'Ocurrió un error al realizar la búsqueda. Por favor, intente nuevamente.';
        } else if (query) {
            const text1 = document.createTextNode('No se encontraron resultados para "');
            const strong = document.createElement('strong');
            strong.textContent = query;
            const text2 = document.createTextNode('"');
            message.appendChild(text1);
            message.appendChild(strong);
            message.appendChild(text2);
        } else {
            message.textContent = 'Por favor, ingrese un término de búsqueda.';
        }

        container.appendChild(message);

        if (query && !isError) {
            const helpText = document.createElement('p');
            helpText.className = 'text-muted small';
            helpText.textContent = 'Intente con otros términos de búsqueda';
            container.appendChild(helpText);
        }

        return container;
    }

    /**
     * Crea un contador de resultados
     * @param {number} count - Cantidad de resultados
     * @returns {HTMLElement} Elemento DOM del contador
     * @private
     */
    function createResultCountElement(count) {
        const container = document.createElement('div');
        container.className = 'mb-2';

        const text = document.createElement('p');
        text.className = 'text-muted small mb-0';
        const textNode = document.createTextNode('Se encontraron ');
        const strong = document.createElement('strong');
        strong.textContent = count.toString();
        const pluralText = document.createTextNode(` resultado${count > 1 ? 's' : ''}`);
        
        text.appendChild(textNode);
        text.appendChild(strong);
        text.appendChild(pluralText);
        container.appendChild(text);

        return container;
    }

    /**
     * Renderiza resultados de búsqueda de forma segura
     * @param {HTMLElement} container - Contenedor donde renderizar
     * @param {Array<Object>} results - Resultados a renderizar
     * @param {number} maxResults - Máximo de resultados a mostrar (0 = todos)
     */
    function renderResults(container, results, maxResults = 0) {
        if (!container) {
            Logger?.error('No se proporcionó contenedor para renderizar resultados');
            return;
        }

        // Limpiar contenedor
        container.innerHTML = '';

        if (results.length === 0) {
            container.appendChild(createEmptyStateElement(''));
            return;
        }

        const fragment = document.createDocumentFragment();
        fragment.appendChild(createResultCountElement(results.length));

        const toShow = maxResults > 0 ? results.slice(0, maxResults) : results;
        toShow.forEach(item => {
            fragment.appendChild(createResultElement(item));
        });

        // Mensaje si hay más resultados
        if (maxResults > 0 && results.length > maxResults) {
            const moreText = document.createElement('p');
            moreText.className = 'text-muted small text-center mt-2';
            const remaining = results.length - maxResults;
            moreText.textContent = `Y ${remaining} resultado${remaining > 1 ? 's' : ''} más. Presione Enter para ver todos.`;
            fragment.appendChild(moreText);
        }

        container.appendChild(fragment);
    }

    /**
     * Inicializa el sistema de búsqueda modal
     * @param {HTMLElement} searchForm - Formulario de búsqueda
     * @param {HTMLElement} searchInput - Input de búsqueda
     * @param {HTMLElement} searchResults - Contenedor de resultados
     * @param {Object} options - Opciones de configuración
     * @param {number} options.debounceMs - Milisegundos de debounce para búsqueda en tiempo real
     * @param {number} options.maxRealTimeResults - Máximo de resultados en búsqueda en tiempo real
     */
    function init(searchForm, searchInput, searchResults, options = {}) {
        const {
            debounceMs = 300,
            maxRealTimeResults = 5
        } = options;

        if (!searchForm || !searchInput || !searchResults) {
            Logger?.warn('Elementos de búsqueda modal no encontrados');
            return;
        }

        // Verificar si el formulario tiene action (redirección)
        const formAction = searchForm.getAttribute('action');
        const hasRedirectAction = formAction && formAction.trim() !== '' && formAction.trim() !== '#';

        if (hasRedirectAction) {
            Logger?.debug('Formulario con action detectado, no inicializando búsqueda modal');
            return;
        }

        // Manejar envío del formulario
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (!query) {
                searchResults.innerHTML = '';
                searchResults.appendChild(createEmptyStateElement(''));
                return;
            }

            Logger?.info('Búsqueda modal iniciada:', query);

            let results = [];
            try {
                results = performSearch(query);
                Logger?.info('Resultados encontrados:', results.length);
            } catch (error) {
                Logger?.error('Error al realizar búsqueda:', error);
                searchResults.innerHTML = '';
                searchResults.appendChild(createEmptyStateElement('', true));
                return;
            }

            searchResults.innerHTML = '';
            if (results.length === 0) {
                searchResults.appendChild(createEmptyStateElement(query, false));
            } else {
                renderResults(searchResults, results, 0); // Mostrar todos en submit
            }
        });

        // Búsqueda en tiempo real (debounced)
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                try {
                    const results = performSearch(query);
                    searchResults.innerHTML = '';
                    
                    if (results.length === 0) {
                        const emptyContainer = document.createElement('div');
                        emptyContainer.className = 'text-center py-3';
                        const text = document.createElement('p');
                        text.className = 'text-muted small mb-0';
                        const textNode = document.createTextNode('No se encontraron resultados para "');
                        const strong = document.createElement('strong');
                        strong.textContent = query;
                        const textNode2 = document.createTextNode('"');
                        text.appendChild(textNode);
                        text.appendChild(strong);
                        text.appendChild(textNode2);
                        emptyContainer.appendChild(text);
                        searchResults.appendChild(emptyContainer);
                    } else {
                        renderResults(searchResults, results, maxRealTimeResults);
                    }
                } catch (error) {
                    Logger?.error('Error en búsqueda en tiempo real:', error);
                }
            }, debounceMs);
        });

        // Configurar foco al abrir modal
        const searchModalElement = document.getElementById('searchModal');
        if (searchModalElement) {
            searchModalElement.addEventListener('shown.bs.modal', () => {
                searchInput.focus();
            });
            searchModalElement.addEventListener('hidden.bs.modal', () => {
                searchResults.innerHTML = '';
                searchInput.value = '';
            });
        }

        Logger?.debug('ModalSearch inicializado');
    }

    // Crear namespace global
    if (!window.MaulePro) {
        window.MaulePro = {};
    }
    if (!window.MaulePro.Search) {
        window.MaulePro.Search = {};
    }

    window.MaulePro.Search.ModalSearch = {
        init: init,
        performSearch: performSearch,
        buildSearchableContent: buildSearchableContent,
        renderResults: renderResults
    };

})(window);

