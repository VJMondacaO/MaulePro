/**
 * CardRenderer
 * Generador de HTML para tarjetas de programas
 * Usa createElement para evitar inyección XSS
 */

(function(window) {
    'use strict';

    /**
     * Escapa texto para prevenir XSS
     * @param {string} text - Texto a escapar
     * @returns {string} Texto escapado
     */
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
    }

    /**
     * Crea un elemento DOM de tarjeta de programa
     * @param {Object} programa - Datos del programa
     * @returns {HTMLElement} Elemento DOM de la columna con la tarjeta
     */
    function crearTarjetaElement(programa) {
        // Validar datos del programa
        if (!programa || typeof programa !== 'object') {
            console.error('Programa inválido:', programa);
            return null;
        }

        // Crear contenedor principal (col)
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-3';
        col.setAttribute('data-program', '');
        col.setAttribute('data-name', escapeHtml(programa.name));
        col.setAttribute('data-benef', programa.benef || '');
        col.setAttribute('data-estado', programa.estado || '');
        col.setAttribute('data-close', programa.close || '');
        if (programa.hasDeadline) {
            col.setAttribute('data-animate', '');
        }

        // Crear artículo
        const article = document.createElement('article');
        article.className = 'program-card';

        // Crear header
        const header = crearHeader(programa);
        article.appendChild(header);

        // Crear body
        const body = crearBody(programa);
        article.appendChild(body);

        col.appendChild(article);
        return col;
    }

    /**
     * Crea el header de la tarjeta
     * @param {Object} programa - Datos del programa
     * @returns {HTMLElement} Elemento header
     */
    function crearHeader(programa) {
        const header = document.createElement('div');
        header.className = 'program-card-header';

        // Header top
        const headerTop = document.createElement('div');
        headerTop.className = 'program-card-header-top';

        if (programa.hasDeadline) {
            // Tarjetas con deadline (abiertas/próximas)
            const badgeContainer = document.createElement('div');
            badgeContainer.className = 'd-flex align-items-center gap-2 flex-wrap';

            // Badge de estado
            const estadoBadge = crearEstadoBadge(programa.estado);
            badgeContainer.appendChild(estadoBadge);

            // Badge de deadline
            const deadlineBadge = document.createElement('span');
            deadlineBadge.className = `deadline-badge ${programa.deadlineUrgent ? 'urgent' : 'soon'}`;
            deadlineBadge.setAttribute('data-deadline', '');
            badgeContainer.appendChild(deadlineBadge);

            headerTop.appendChild(badgeContainer);
        } else {
            // Tarjetas sin deadline (cerradas)
            const estadoBadge = crearEstadoBadge(programa.estado);
            headerTop.appendChild(estadoBadge);
        }

        // Location - Removido según solicitud del usuario
        // const location = document.createElement('span');
        // location.className = 'program-card-location';
        // 
        // const locationIcon = document.createElement('i');
        // locationIcon.className = 'bi bi-geo-alt-fill';
        // location.appendChild(locationIcon);
        // 
        // const locationText = document.createElement('span');
        // locationText.textContent = programa.location || 'Regional';
        // location.appendChild(locationText);
        // 
        // headerTop.appendChild(location);
        header.appendChild(headerTop);

        // Título
        const title = document.createElement('h3');
        title.textContent = programa.name || '';
        header.appendChild(title);

        return header;
    }

    /**
     * Crea el badge de estado
     * @param {string} estado - Estado del programa
     * @returns {HTMLElement} Elemento badge
     */
    function crearEstadoBadge(estado) {
        const badge = document.createElement('span');
        const estados = {
            open: { class: 'status-badge-open', text: 'Abierto' },
            soon: { class: 'status-badge-soon', text: 'Próximo' },
            closed: { class: 'status-badge-closed', text: 'Cerrado' }
        };
        
        const estadoInfo = estados[estado] || estados.closed;
        badge.className = `program-card-status-badge ${estadoInfo.class}`;
        badge.textContent = estadoInfo.text;
        
        return badge;
    }

    /**
     * Crea el body de la tarjeta
     * @param {Object} programa - Datos del programa
     * @returns {HTMLElement} Elemento body
     */
    function crearBody(programa) {
        const body = document.createElement('div');
        body.className = 'program-card-body';

        // Info container
        const info = document.createElement('div');
        info.className = 'program-card-info';

        // Beneficiarios
        info.appendChild(crearInfoItem('bi-people-fill', 'Beneficiarios/as:', programa.beneficiarios));
        
        // Fechas
        info.appendChild(crearInfoItem('bi-calendar-event', 'Fechas:', programa.fechas));
        
        // Montos
        info.appendChild(crearInfoItem('bi-cash-stack', 'Montos:', programa.montos));

        body.appendChild(info);

        // Footer
        const footer = document.createElement('div');
        footer.className = 'program-card-footer';

        const link = document.createElement('a');
        link.className = 'btn btn-outline-dark';
        link.href = programa.link || '#';
        link.textContent = 'Ver detalles ';
        
        const arrowIcon = document.createElement('i');
        arrowIcon.className = 'bi bi-arrow-right ms-2';
        link.appendChild(arrowIcon);
        
        footer.appendChild(link);
        body.appendChild(footer);

        return body;
    }

    /**
     * Crea un item de información
     * @param {string} iconClass - Clase del ícono
     * @param {string} label - Etiqueta
     * @param {string} value - Valor
     * @returns {HTMLElement} Elemento item
     */
    function crearInfoItem(iconClass, label, value) {
        const item = document.createElement('div');
        item.className = 'program-card-info-item';

        const icon = document.createElement('i');
        icon.className = `bi ${iconClass}`;
        item.appendChild(icon);

        const content = document.createElement('div');
        content.className = 'program-card-info-item-content';

        const strong = document.createElement('strong');
        strong.textContent = label;
        content.appendChild(strong);

        const span = document.createElement('span');
        span.textContent = value || '';
        content.appendChild(span);

        item.appendChild(content);
        return item;
    }

    // Crear namespace global
    if (!window.MaulePro) {
        window.MaulePro = {};
    }
    if (!window.MaulePro.Search) {
        window.MaulePro.Search = {};
    }

    window.MaulePro.Search.CardRenderer = {
        crearTarjetaElement: crearTarjetaElement,
        escapeHtml: escapeHtml
    };
})(window);
