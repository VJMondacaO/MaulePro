/**
 * Datos de Programas
 * Fuente única de verdad para todos los programas disponibles
 */

(function(window) {
    'use strict';

    const programas = [
        {
            name: "PROYECTOS MENORES A 5.000 UTM",
            benef: "municipios",
            estado: "open",
            close: "2025-11-30",
            location: "Regional",
            beneficiarios: "Municipalidades",
            fechas: "Inicio: 01-10-2025 | Fin: 30-11-2025",
            montos: "Hasta 5.000 UTM",
            link: "pages/programas/proyectos-menores.html",
            hasDeadline: true,
            deadlineUrgent: true
        },
        {
            name: "Subvenciones para actividades FNDR 8%",
            benef: "org",
            estado: "open",
            close: "2025-12-15",
            location: "Regional",
            beneficiarios: "Organizaciones",
            fechas: "Inicio: 01-11-2025 | Fin: 15-12-2025",
            montos: "Subvenciones variables",
            link: "pages/programas/fndr-8.html",
            hasDeadline: true,
            deadlineUrgent: false
        },
        {
            name: "Circular 33",
            benef: "municipios",
            estado: "closed",
            close: "",
            location: "Regional",
            beneficiarios: "Municipalidades",
            fechas: "Sin convocatoria vigente",
            montos: "Según instructivo",
            link: "pages/programas/circular-33.html",
            hasDeadline: false,
            deadlineUrgent: false
        },
        {
            name: "Fondo Regional de Iniciativa Local (FRIL)",
            benef: "municipios",
            estado: "closed",
            close: "",
            location: "Regional",
            beneficiarios: "Municipalidades",
            fechas: "Sin convocatoria vigente",
            montos: "Según bases",
            link: "pages/programas/fril.html",
            hasDeadline: false,
            deadlineUrgent: false
        },
        {
            name: "FNDR Sub. 31 con Evaluación MIDESOYF",
            benef: "municipios",
            estado: "closed",
            close: "",
            location: "Regional",
            beneficiarios: "Municipalidades",
            fechas: "Sin convocatoria vigente",
            montos: "Según evaluación",
            link: "pages/programas/fndr-sub31.html",
            hasDeadline: false,
            deadlineUrgent: false
        },
        {
            name: "Financiamiento para Programas",
            benef: "servicios",
            estado: "closed",
            close: "",
            location: "Regional",
            beneficiarios: "Servicios públicos",
            fechas: "Sin convocatoria vigente",
            montos: "Variables",
            link: "pages/financiamiento-programas.html",
            hasDeadline: false,
            deadlineUrgent: false
        },
        {
            name: "Fondo Regional para la Productividad y el Desarrollo (FRPD)",
            benef: "empresas",
            estado: "closed",
            close: "",
            location: "Regional",
            beneficiarios: "Empresas",
            fechas: "Sin convocatoria vigente",
            montos: "Según proyecto",
            link: "pages/programas/frpd.html",
            hasDeadline: false,
            deadlineUrgent: false
        }
    ];

    // Crear namespace global
    if (!window.MaulePro) {
        window.MaulePro = {};
    }
    if (!window.MaulePro.Data) {
        window.MaulePro.Data = {};
    }

    window.MaulePro.Data.programas = programas;

    /**
     * Obtener todos los programas
     * @returns {Array} Lista de programas
     */
    window.MaulePro.Data.getAllProgramas = function() {
        return [...programas];
    };

    /**
     * Obtener programa por nombre
     * @param {string} name - Nombre del programa
     * @returns {Object|null} Programa encontrado o null
     */
    window.MaulePro.Data.getProgramaByName = function(name) {
        return programas.find(p => p.name === name) || null;
    };

    /**
     * Obtener programas por estado
     * @param {string} estado - Estado del programa (open, soon, closed)
     * @returns {Array} Lista de programas filtrados
     */
    window.MaulePro.Data.getProgramasByEstado = function(estado) {
        return programas.filter(p => p.estado === estado);
    };

    /**
     * Obtener programas por beneficiario
     * @param {string} benef - Tipo de beneficiario
     * @returns {Array} Lista de programas filtrados
     */
    window.MaulePro.Data.getProgramasByBenef = function(benef) {
        return programas.filter(function(p) {
            return p.benef === benef;
        });
    };
})(window);
