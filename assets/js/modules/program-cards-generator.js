/**
 * Program Cards Generator Module
 * Genera tarjetas de programas dinámicamente desde programas.js
 * Simplifica el HTML eliminando tarjetas hardcodeadas
 * @module ProgramCardsGenerator
 * @requires window.MaulePro.Data.programas
 * @requires window.MaulePro.Search.CardRenderer
 */

(function() {
    'use strict';
    
    /**
     * Genera y renderiza todas las tarjetas de programas
     * @param {string} containerId - ID del contenedor donde renderizar (default: 'grid')
     */
    function generateProgramCards(containerId = 'grid') {
        const container = document.getElementById(containerId);
        if (!container) {
            const Logger = window.MaulePro?.Utils?.Logger;
            Logger?.warn(`Contenedor #${containerId} no encontrado`);
            return;
        }

        const programas = window.MaulePro?.Data?.programas;
        if (!programas || !Array.isArray(programas)) {
            const Logger = window.MaulePro?.Utils?.Logger;
            Logger?.error('No se encontraron programas en window.MaulePro.Data.programas');
            return;
        }

        const CardRenderer = window.MaulePro?.Search?.CardRenderer;
        if (!CardRenderer || !CardRenderer.crearTarjetaElement) {
            const Logger = window.MaulePro?.Utils?.Logger;
            Logger?.error('CardRenderer no está disponible');
            return;
        }

        // Limpiar contenedor si tiene contenido hardcodeado
        // Solo limpiar si no hay tarjetas con data-program (ya generadas)
        const existingCards = container.querySelectorAll('[data-program]');
        if (existingCards.length === 0) {
            container.innerHTML = '';
        } else {
            // Ya hay tarjetas, no generar (puede ser que se carguen desde HTML)
            return;
        }

        // Ordenar programas: abiertos primero
        const SortEngine = window.MaulePro?.Search?.SortEngine;
        let programasOrdenados = [...programas];
        if (SortEngine) {
            programasOrdenados = SortEngine.ordenarProgramas(programas, 'openfirst');
        } else {
            // Fallback: ordenamiento manual por estado
            const toRank = (estado) => ({ open: 3, soon: 2, closed: 1 }[estado] || 0);
            programasOrdenados.sort((a, b) => toRank(b.estado) - toRank(a.estado));
        }

        // Generar tarjetas usando CardRenderer
        const fragment = document.createDocumentFragment();
        programasOrdenados.forEach(programa => {
            const tarjeta = CardRenderer.crearTarjetaElement(programa);
            if (tarjeta) {
                fragment.appendChild(tarjeta);
            }
        });

        container.appendChild(fragment);

        // Pintar deadlines después de generar las tarjetas
        const DeadlineManager = window.MaulePro?.Utils?.DeadlineManager;
        if (DeadlineManager) {
            DeadlineManager.paintAllDeadlines('[data-program]');
        }

        // Actualizar contador
        const countElement = document.getElementById('count');
        if (countElement) {
            countElement.textContent = String(programas.length);
        }

        const Logger = window.MaulePro?.Utils?.Logger;
        Logger?.debug(`Generadas ${programas.length} tarjetas de programas`);
    }

    /**
     * Inicializa el generador cuando el DOM está listo
     */
    function init() {
        // Esperar a que programas.js y CardRenderer estén cargados
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                // Pequeño delay para asegurar que los scripts estén cargados
                setTimeout(() => generateProgramCards(), 100);
            });
        } else {
            setTimeout(() => generateProgramCards(), 100);
        }
    }

    // Exponer función global para uso manual si es necesario
    window.MaulePro = window.MaulePro || {};
    window.MaulePro.Modules = window.MaulePro.Modules || {};
    window.MaulePro.Modules.ProgramCardsGenerator = {
        generate: generateProgramCards
    };

    // Inicializar automáticamente
    init();
})();

