/**
 * Programas Data Module
 * Fuente única de verdad para todos los programas disponibles
 * @module Data/Programas
 * @requires window.MaulePro
 */

(function(window) {
    'use strict';

    /**
     * Array de programas disponibles
     * @type {Array<Object>}
     * @property {string} name - Nombre del programa
     * @property {string} benef - Tipo de beneficiario (municipios, org, personas)
     * @property {string} estado - Estado del programa (open, soon, closed)
     * @property {string} close - Fecha de cierre (formato ISO)
     * @property {string} location - Ubicación/alcance del programa
     * @property {string} beneficiarios - Descripción de beneficiarios
     * @property {string} fechas - Rango de fechas
     * @property {string} montos - Información de montos
     * @property {string} link - Ruta relativa a la página del programa
     * @property {boolean} hasDeadline - Si tiene deadline visible
     * @property {boolean} deadlineUrgent - Si el deadline es urgente
     */

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
            deadlineUrgent: true,
            subtitle: "Financiamiento para proyectos de inversión municipal de menor envergadura en la región del Maule."
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
            deadlineUrgent: false,
            subtitle: "Apoyo financiero para la creación artística, el rescate patrimonial y la difusión cultural en el Maule."
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
            deadlineUrgent: false,
            subtitle: "Normativa que regula la transferencia de recursos y programas de inversión para municipalidades."
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
            deadlineUrgent: false,
            subtitle: "Fondo destinado a financiar iniciativas locales de desarrollo comunal y mejoramiento de infraestructura."
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
            deadlineUrgent: false,
            subtitle: "Fondo Nacional de Desarrollo Regional con evaluación del Ministerio de Desarrollo Social y Familia."
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
            link: "pages/programas/financiamiento-programas.html",
            hasDeadline: false,
            deadlineUrgent: false,
            subtitle: "Apoyo financiero para programas y proyectos de servicios públicos en la región del Maule."
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
            deadlineUrgent: false,
            subtitle: "Fondo destinado a promover la productividad y el desarrollo empresarial en la región del Maule."
        },
        {
            name: "Actividades de Seguridad Ciudadana",
            benef: "org",
            estado: "open",
            close: "2025-12-15",
            location: "Regional",
            beneficiarios: "Organizaciones",
            fechas: "Inicio: 01-11-2025 | Fin: 15-12-2025",
            montos: "$2.000.000 - $5.000.000",
            link: "pages/programas/fndr-8.html",
            hasDeadline: true,
            deadlineUrgent: false,
            subtitle: "Iniciativas que promueven la seguridad y prevención en las comunidades del Maule."
        },
        {
            name: "Actividades de Carácter Social",
            benef: "org",
            estado: "open",
            close: "2025-12-15",
            location: "Regional",
            beneficiarios: "Organizaciones",
            fechas: "Inicio: 01-11-2025 | Fin: 15-12-2025",
            montos: "$2.000.000 - $5.000.000",
            link: "pages/programas/fndr-8.html",
            hasDeadline: true,
            deadlineUrgent: false,
            subtitle: "Proyectos que fortalecen el tejido social y mejoran la calidad de vida de las comunidades."
        },
        {
            name: "Actividades Deportivas",
            benef: "org",
            estado: "open",
            close: "2025-12-15",
            location: "Regional",
            beneficiarios: "Organizaciones",
            fechas: "Inicio: 01-11-2025 | Fin: 15-12-2025",
            montos: "$2.000.000 - $5.000.000",
            link: "pages/programas/fndr-8.html",
            hasDeadline: true,
            deadlineUrgent: false,
            subtitle: "Fomento del deporte y la actividad física para el desarrollo integral de la comunidad."
        },
        {
            name: "Actividades de protección del medio Ambiente",
            benef: "org",
            estado: "open",
            close: "2025-12-15",
            location: "Regional",
            beneficiarios: "Organizaciones",
            fechas: "Inicio: 01-11-2025 | Fin: 15-12-2025",
            montos: "$2.000.000 - $5.000.000",
            link: "pages/programas/fndr-8.html",
            hasDeadline: true,
            deadlineUrgent: false,
            subtitle: "Proyectos de conservación ambiental y educación para el cuidado del entorno natural."
        },
        {
            name: "Actividades de Rescate y Atención Animal",
            benef: "org",
            estado: "open",
            close: "2025-12-15",
            location: "Regional",
            beneficiarios: "Organizaciones",
            fechas: "Inicio: 01-11-2025 | Fin: 15-12-2025",
            montos: "$2.000.000 - $5.000.000",
            link: "pages/programas/fndr-8.html",
            hasDeadline: true,
            deadlineUrgent: false,
            subtitle: "Iniciativas de adopción, rescate, atención veterinaria y gestión de residuos animales."
        },
        {
            name: "Actividades Artísticas, Culturales y Patrimoniales",
            benef: "org",
            estado: "open",
            close: "2025-12-15",
            location: "Regional",
            beneficiarios: "Organizaciones",
            fechas: "Inicio: 01-11-2025 | Fin: 15-12-2025",
            montos: "$2.000.000 - $5.000.000",
            link: "pages/programas/fndr-8.html",
            hasDeadline: true,
            deadlineUrgent: false,
            subtitle: "Apoyo a la creación artística, el rescate patrimonial y la difusión cultural regional."
        },
        {
            name: "Actividades Culturales y Programación de Teatros",
            benef: "org",
            estado: "open",
            close: "2025-12-15",
            location: "Regional",
            beneficiarios: "Organizaciones",
            fechas: "Inicio: 01-11-2025 | Fin: 15-12-2025",
            montos: "$2.000.000 - $5.000.000",
            link: "pages/programas/fndr-8.html",
            hasDeadline: true,
            deadlineUrgent: false,
            subtitle: "Fomento de la programación cultural y actividades teatrales en modalidad presencial."
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
     * Obtener todos los programas disponibles
     * @function getAllProgramas
     * @returns {Array<Object>} Copia del array de programas
     * @memberof window.MaulePro.Data
     */
    window.MaulePro.Data.getAllProgramas = function() {
        return [...programas];
    };

    /**
     * Obtener programa por nombre exacto
     * @function getProgramaByName
     * @param {string} name - Nombre exacto del programa
     * @returns {Object|null} Programa encontrado o null si no existe
     * @memberof window.MaulePro.Data
     */
    window.MaulePro.Data.getProgramaByName = function(name) {
        return programas.find(p => p.name === name) || null;
    };

    /**
     * Obtener programas filtrados por estado
     * @function getProgramasByEstado
     * @param {string} estado - Estado del programa ('open', 'soon', 'closed')
     * @returns {Array<Object>} Lista de programas con el estado especificado
     * @memberof window.MaulePro.Data
     */
    window.MaulePro.Data.getProgramasByEstado = function(estado) {
        return programas.filter(p => p.estado === estado);
    };

    /**
     * Obtener programas filtrados por tipo de beneficiario
     * @function getProgramasByBenef
     * @param {string} benef - Tipo de beneficiario ('municipios', 'org', 'personas')
     * @returns {Array<Object>} Lista de programas para el tipo de beneficiario especificado
     * @memberof window.MaulePro.Data
     */
    window.MaulePro.Data.getProgramasByBenef = function(benef) {
        return programas.filter(function(p) {
            return p.benef === benef;
        });
    };
})(window);
