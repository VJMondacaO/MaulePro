// DOM Elements (check if they exist)
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterBtn = document.getElementById('showRegister');
const showRecoverBtn = document.getElementById('showRecover');
const recoverPasswordBtn = document.getElementById('recoverPassword');
const userRutSpan = document.getElementById('userRut');
const logoutBtn = document.getElementById('logout');
const viewApplicationsBtn = document.getElementById('viewApplications');
const loginError = document.getElementById('loginError');

// Close buttons for modals
const closeButtons = document.getElementsByClassName('close');

// Modal Functions
function openModal(modal) {
    modal.classList.remove('d-none');
    modal.classList.add('d-flex');
}

function closeModal(modal) {
    modal.classList.add('d-none');
    modal.classList.remove('d-flex');
}

// Event Listeners for opening modals (only if elements exist)
if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginModal) {
            openModal(loginModal);
        } else {
            window.location.href = 'login.html';
        }
    });
}

if (showRegisterBtn && registerModal) {
    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginModal) closeModal(loginModal);
        if (registerModal) openModal(registerModal);
    });
}

if (showRecoverBtn && registerModal) {
    showRecoverBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginModal) closeModal(loginModal);
        if (registerModal) openModal(registerModal);
    });
}

// Close modal when clicking X
Array.from(closeButtons).forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('[id$="Modal"]');
        if (modal) {
            closeModal(modal);
        }
    });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target.id === 'loginModal' || event.target.id === 'registerModal') {
        closeModal(event.target);
    }
});

// Login Form Submission (only if form exists)
if (loginForm) {
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (in real app, this would be server-side)
    if (username && password) {
        // Simulate successful login
        // In production, this would call an API
        if (username.length >= 7) {
            // Success
            localStorage.setItem('userRut', username);
            updateUIForLoggedInUser(username);
            closeModal(loginModal);
            loginError.classList.add('d-none');
        } else {
            // Show error
            loginError.classList.remove('d-none');
        }
    } else {
        if (loginError) loginError.classList.remove('d-none');
    }
});
}

// Register Form Submission (only if form exists)
if (registerForm) {
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const rut = document.getElementById('rut').value;
    const email = document.getElementById('email').value;
    const confirmEmail = document.getElementById('confirmEmail').value;
    
    if (rut && email && confirmEmail) {
        if (email === confirmEmail) {
            alert('Registro exitoso. Por favor, revise su correo electrónico para confirmar su cuenta.');
            closeModal(registerModal);
        } else {
            alert('Los correos electrónicos no coinciden.');
        }
    } else {
        alert('Por favor, complete todos los campos.');
    }
});
}

// Recover Password (only if button exists)
if (recoverPasswordBtn) {
recoverPasswordBtn.addEventListener('click', () => {
    const rut = document.getElementById('rut').value;
    const email = document.getElementById('email').value;
    
    if (rut && email) {
        alert('Se ha enviado un correo electrónico con instrucciones para recuperar su contraseña.');
        closeModal(registerModal);
    } else {
        alert('Por favor, ingrese su RUT y correo electrónico.');
    }
});
}

// Logout (only if button exists)
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('userRut');
        updateUIForLoggedOutUser();
    });
}

// View Applications (only if button exists)
if (viewApplicationsBtn) {
    viewApplicationsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Accediendo a sus postulaciones...');
    });
}

// Update UI for logged in user
function updateUIForLoggedInUser(rut) {
    if (loginBtn) loginBtn.classList.add('d-none');
    
    // Mobile elements
    const mobileWelcomeUser = document.getElementById('mobileWelcomeUser');
    const mobileUserRut = document.getElementById('mobileUserRut');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    if (mobileWelcomeUser) mobileWelcomeUser.classList.remove('d-none');
    if (mobileUserRut) mobileUserRut.textContent = rut;
    if (mobileLoginBtn) mobileLoginBtn.classList.add('d-none');
}

// Update UI for logged out user
function updateUIForLoggedOutUser() {
    if (loginBtn) loginBtn.classList.remove('d-none');
    
    // Mobile elements
    const mobileWelcomeUser = document.getElementById('mobileWelcomeUser');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    if (mobileWelcomeUser) mobileWelcomeUser.classList.add('d-none');
    if (mobileLoginBtn) mobileLoginBtn.classList.remove('d-none');
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

// Mobile menu is now handled by Bootstrap collapse, but we keep this for compatibility
if (mobileMenuBtn && mobileMenu) {
    // Bootstrap handles the collapse, but we can add custom behavior if needed
    // Close menu when clicking on a link
    if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
                // Bootstrap will handle the collapse automatically
            });
        });
    }
}

// Mobile Programas Submenu Toggle - Now handled by Bootstrap collapse
// The collapse is handled automatically by Bootstrap's data-bs-toggle="collapse"
// We can add custom arrow rotation if needed
const programasArrow = document.getElementById('programasArrow');
if (programasArrow) {
    const submenu = document.getElementById('mobileProgramasSubmenu');
    if (submenu) {
        submenu.addEventListener('show.bs.collapse', () => {
            programasArrow.style.transform = 'rotate(180deg)';
        });
        submenu.addEventListener('hide.bs.collapse', () => {
            programasArrow.style.transform = 'rotate(0deg)';
        });
    }
}

// Mobile logout and view applications
const mobileLogout = document.getElementById('mobileLogout');
const mobileViewApplications = document.getElementById('mobileViewApplications');

if (mobileLogout) {
    mobileLogout.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('userRut');
        updateUIForLoggedOutUser();
        // Close mobile menu - Bootstrap handles this automatically
        if (mobileMenu) {
            // Bootstrap collapse will handle the menu state
        }
    });
}

if (mobileViewApplications) {
    mobileViewApplications.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Accediendo a sus postulaciones...');
    });
}

// Check if user is already logged in on page load
window.addEventListener('DOMContentLoaded', () => {
    const storedRut = localStorage.getItem('userRut');
    if (storedRut) {
        updateUIForLoggedInUser(storedRut);
    }
    
    // Highlight active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Application buttons (buttons with "Postular" text or full width buttons in sections)
const applyButtons = document.querySelectorAll('button:not([type="submit"]):not([type="button"]), button[class*="w-full"]');
applyButtons.forEach(btn => {
    if (btn.textContent.includes('Postular') || btn.textContent.includes('CREAR') || btn.textContent.includes('Entrar')) {
        btn.addEventListener('click', () => {
            const userRut = localStorage.getItem('userRut');
            if (!userRut) {
                alert('Debe iniciar sesión para postular.');
                openModal(loginModal);
            } else {
                alert('Redirigiendo al formulario de postulación...');
            }
        });
    }
});

// Program cards (first grid section) - Removed alert on click

// Document links (all links in document sections)
const docLinks = document.querySelectorAll('a[href="#"]');
docLinks.forEach(link => {
    // Only handle document links, not navigation or form links
    if (link.textContent.includes('Anexo') || 
        link.textContent.includes('Manual') || 
        link.textContent.includes('Instructivo') ||
        link.textContent.includes('Protocolo') ||
        link.textContent.includes('Bases')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const docName = e.target.textContent;
            alert(`Descargando: ${docName}\n\nEn un entorno real, esto descargaría el documento correspondiente.`);
        });
    }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form validation helpers
function validateRut(rut) {
    // Basic RUT validation (simplified)
    const rutRegex = /^[0-9]{7,8}$/;
    return rutRegex.test(rut);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add real-time validation (only if elements exist)
const usernameInput = document.getElementById('username');
if (usernameInput) {
    usernameInput.addEventListener('blur', function() {
    if (!validateRut(this.value) && this.value !== '') {
        this.style.borderColor = '#d32f2f';
    } else {
        this.style.borderColor = '#ddd';
    }
});
}

const rutInput = document.getElementById('rut');
if (rutInput) {
    rutInput.addEventListener('blur', function() {
    if (!validateRut(this.value) && this.value !== '') {
        this.style.borderColor = '#d32f2f';
    } else {
        this.style.borderColor = '#ddd';
    }
});
}

const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
    if (!validateEmail(this.value) && this.value !== '') {
        this.style.borderColor = '#d32f2f';
    } else {
        this.style.borderColor = '#ddd';
    }
});
}

const confirmEmailInput = document.getElementById('confirmEmail');
if (confirmEmailInput) {
    confirmEmailInput.addEventListener('blur', function() {
        const email = emailInput ? emailInput.value : '';
    if (this.value !== email && this.value !== '') {
        this.style.borderColor = '#d32f2f';
    } else {
        this.style.borderColor = '#ddd';
    }
});
}

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards (using grid items)
document.querySelectorAll('section.grid > div, .grid.grid-cols-1 > div').forEach(card => {
    observer.observe(card);
});

// Search Modal Functionality
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearchModal = document.getElementById('closeSearchModal');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Search modal is now handled by Bootstrap modal
// The modal is opened via data-bs-toggle="modal" data-bs-target="#searchModal"
// We just need to handle the search functionality
if (searchInput) {
    // Focus input when modal is shown
    const searchModalElement = document.getElementById('searchModal');
    if (searchModalElement) {
        searchModalElement.addEventListener('shown.bs.modal', () => {
            searchInput.focus();
        });
        searchModalElement.addEventListener('hidden.bs.modal', () => {
        if (searchResults) searchResults.innerHTML = '';
        if (searchInput) searchInput.value = '';
    });
}

    // Keyboard shortcut: "/" to open search (when not typing in an input)
    document.addEventListener('keydown', (e) => {
        // Only trigger if not typing in an input/textarea
        if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
            e.preventDefault();
            const searchModal = document.getElementById('searchModal');
            if (searchModal && searchBtn) {
                // Use Bootstrap modal API if available
                if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                    const modal = new bootstrap.Modal(searchModal);
                    modal.show();
                } else {
                    // Fallback: trigger click on search button
                    if (searchBtn) searchBtn.click();
                }
            }
        }
        
        // ESC to close search modal
        if (e.key === 'Escape' && searchModalElement) {
            try {
                if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                    const modal = bootstrap.Modal.getInstance(searchModalElement);
                    if (modal) {
                        modal.hide();
                    }
                }
            } catch (error) {
                // Fallback: just close the modal manually if Bootstrap is not available
                console.warn('Bootstrap Modal API not available:', error);
            }
        }
    });
}

// Search functionality - Wait for DOM to be ready
function initSearch() {
    // Verificar si estamos en la página de búsqueda (buscar.html)
    // En esa página, el buscador se maneja de forma diferente
    if (window.location.pathname.includes('buscar.html')) {
        console.log('Página de búsqueda detectada, no inicializando buscador modal');
        return;
    }
    
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    // Verificar si es el modal de búsqueda (requiere searchInput y searchResults)
    // Si es el formulario de búsqueda principal (index.html), tiene action y no necesita esto
    if (!searchInput || !searchResults) {
        // No es un error si no hay modal de búsqueda
        return;
    }
    
    // Verificar si el formulario tiene action (redirección)
    // Si tiene action, no inicializar el buscador modal
    if (searchForm) {
        const formAction = searchForm.getAttribute('action');
        const hasRedirectAction = formAction && formAction.trim() !== '' && formAction.trim() !== '#';
        if (hasRedirectAction) {
            console.log('Formulario con action detectado, no inicializando buscador modal');
            return;
        }
    }
    
    console.log('✅ Buscador inicializado correctamente');
    // Build searchable content from page elements
    function buildSearchableContent() {
        const content = [];
        
        // Determine base path based on current page location
        const currentPath = window.location.pathname;
        let basePath = '';
        if (currentPath.includes('/pages/programas/')) {
            basePath = '../../';
        } else if (currentPath.includes('/pages/')) {
            basePath = '../';
        } else {
            basePath = '';
        }
        
        // Search in program cards on the page
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
            
            // Normalize URL if needed
            if (url && !url.startsWith('http') && !url.startsWith('#') && !url.startsWith('/')) {
                // If URL is relative and we're in a subdirectory, adjust it
                if (basePath && !url.startsWith(basePath)) {
                    // Check if URL already has correct path
                    if (url.startsWith('pages/') || url.startsWith('../')) {
                        // Already has path, use as is
                    } else {
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
        
        // Add static content with correct paths and searchable text content
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
        
        // Remove duplicates based on title
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
    
    // Perform search
    function performSearch(query) {
        const searchableContent = buildSearchableContent();
        const queryLower = query.toLowerCase().trim();
        
        if (!queryLower) return [];
        
        // Split query into words for better matching
        const queryWords = queryLower.split(/\s+/).filter(w => w.length > 0);
        
        const mappedResults = searchableContent.map(item => {
            const titleLower = (item.title || '').toLowerCase();
            const descLower = (item.description || '').toLowerCase();
            const keywordsLower = (item.keywords || '').toLowerCase();
            const contentLower = (item.content || '').toLowerCase();
            
            // Calculate relevance score
            let score = 0;
            let matchedFields = [];
            
            // Title matches (highest priority)
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
            
            // Keywords matches
            if (keywordsLower.includes(queryLower)) {
                score += 50;
                matchedFields.push('keywords');
            }
            
            // Content matches
            if (contentLower.includes(queryLower)) {
                score += 30;
                matchedFields.push('content');
            }
            
            // Description matches
            if (descLower.includes(queryLower)) {
                score += 40;
                matchedFields.push('description');
            }
            
            // Word-by-word matching
            queryWords.forEach(word => {
                if (word.length > 2) { // Only match words longer than 2 characters
                    if (titleLower.includes(word)) score += 20;
                    if (keywordsLower.includes(word)) score += 15;
                    if (contentLower.includes(word)) score += 10;
                    if (descLower.includes(word)) score += 5;
                }
            });
            
            // Extract snippet from content where match was found
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
        
        // Filter items with matches and sort by relevance score (highest first)
        const sortedResults = mappedResults.filter(item => item.score > 0).sort((a, b) => {
            // First by score
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            // Then alphabetically by title
            return a.title.localeCompare(b.title, 'es');
        });
        
        return sortedResults;
    }
    
    // Verificar si el formulario tiene un action (redirección a otra página)
    const formAction = searchForm.getAttribute('action');
    const hasRedirectAction = formAction && formAction !== '' && formAction !== '#' && !formAction.startsWith('#');
    
    // Solo interceptar si NO hay action (búsqueda modal/local)
    if (!hasRedirectAction) {
        // Handle form submission - Solo para búsqueda modal/local
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('🔍 Formulario de búsqueda enviado');
            const query = searchInput.value.trim();
            
            if (query === '') {
                searchResults.innerHTML = '<div class="text-center py-4"><i class="bi bi-search text-muted" style="font-size: 3rem;"></i><p class="text-muted mt-2">Por favor, ingrese un término de búsqueda.</p></div>';
                return;
            }
        
            console.log('🔍 Buscando:', query);
            let results = [];
            try {
                results = performSearch(query);
                console.log('✅ Resultados encontrados:', results.length);
            } catch (error) {
                console.error('❌ Error al realizar la búsqueda:', error);
                searchResults.innerHTML = `
                    <div class="text-center py-4">
                        <i class="bi bi-exclamation-triangle text-warning" style="font-size: 3rem;"></i>
                        <p class="text-muted mt-2">Ocurrió un error al realizar la búsqueda. Por favor, intente nuevamente.</p>
                    </div>
                `;
                return;
            }
            
            if (results.length === 0) {
                searchResults.innerHTML = `
                    <div class="text-center py-4">
                        <i class="bi bi-search text-muted" style="font-size: 3rem;"></i>
                        <p class="text-muted mt-2 mb-1">No se encontraron resultados para "<strong>${query}</strong>"</p>
                        <p class="text-muted small">Intente con otros términos de búsqueda</p>
                    </div>
                `;
            } else {
                searchResults.innerHTML = `
                    <div class="mb-2">
                        <p class="text-muted small mb-0">Se encontraron <strong>${results.length}</strong> resultado${results.length > 1 ? 's' : ''}</p>
                    </div>
                    ${results.map(item => `
                        <a href="${item.url}" class="d-block p-3 border border-2 border-secondary rounded mb-2 text-decoration-none program-search-result" style="transition: all 0.2s ease;">
                            <div class="d-flex align-items-start gap-2">
                                <i class="bi ${item.type === 'programa' ? 'bi-folder' : 'bi-file-earmark-text'} text-institucional mt-1"></i>
                                <div class="flex-grow-1">
                                    <h3 class="h6 fw-bold text-institucional mb-1">${item.title}</h3>
                                    ${item.snippet && item.snippet !== item.description ? `<p class="text-muted small mb-1"><em>${item.snippet}</em></p>` : ''}
                                    <p class="text-muted small mb-0">${item.description}</p>
                                </div>
                                <i class="bi bi-arrow-right text-muted"></i>
                            </div>
                        </a>
                    `).join('')}
                `;
                
                // Add hover effect
                searchResults.querySelectorAll('.program-search-result').forEach(result => {
                    result.addEventListener('mouseenter', function() {
                        this.style.backgroundColor = '#f8f9fa';
                        this.style.borderColor = 'var(--institucional-azul)';
                    });
                    result.addEventListener('mouseleave', function() {
                        this.style.backgroundColor = '';
                        this.style.borderColor = '';
                    });
                });
            }
        });
        
        // Real-time search as user types (debounced) - Solo si no hay action
        let searchTimeout;
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                const query = this.value.trim();
                
                if (query.length < 2) {
                    searchResults.innerHTML = '';
                    return;
                }
                
                searchTimeout = setTimeout(() => {
                    let results = [];
                    try {
                        results = performSearch(query);
                    } catch (error) {
                        console.error('Error en búsqueda en tiempo real:', error);
                        return;
                    }
                    
                    if (results.length === 0 && query.length >= 2) {
                        searchResults.innerHTML = `
                            <div class="text-center py-3">
                                <p class="text-muted small mb-0">No se encontraron resultados para "<strong>${query}</strong>"</p>
                            </div>
                        `;
                    } else if (results.length > 0) {
                        searchResults.innerHTML = `
                            <div class="mb-2">
                                <p class="text-muted small mb-0">Se encontraron <strong>${results.length}</strong> resultado${results.length > 1 ? 's' : ''}</p>
                            </div>
                            ${results.slice(0, 5).map(item => `
                                <a href="${item.url}" class="d-block p-3 border border-2 border-secondary rounded mb-2 text-decoration-none program-search-result" style="transition: all 0.2s ease;">
                                    <div class="d-flex align-items-start gap-2">
                                        <i class="bi ${item.type === 'programa' ? 'bi-folder' : 'bi-file-earmark-text'} text-institucional mt-1"></i>
                                        <div class="flex-grow-1">
                                            <h3 class="h6 fw-bold text-institucional mb-1">${item.title}</h3>
                                            ${item.snippet && item.snippet !== item.description ? `<p class="text-muted small mb-1"><em>${item.snippet}</em></p>` : ''}
                                            <p class="text-muted small mb-0">${item.description}</p>
                                        </div>
                                        <i class="bi bi-arrow-right text-muted"></i>
                                    </div>
                                </a>
                            `).join('')}
                            ${results.length > 5 ? `<p class="text-muted small text-center mt-2">Y ${results.length - 5} resultado${results.length - 5 > 1 ? 's' : ''} más. Presione Enter para ver todos.</p>` : ''}
                        `;
                        
                        // Add hover effect
                        searchResults.querySelectorAll('.program-search-result').forEach(result => {
                            result.addEventListener('mouseenter', function() {
                                this.style.backgroundColor = '#f8f9fa';
                                this.style.borderColor = 'var(--institucional-azul)';
                            });
                            result.addEventListener('mouseleave', function() {
                                this.style.backgroundColor = '';
                                this.style.borderColor = '';
                            });
                        });
                    }
                }, 300); // 300ms debounce
            });
        }
    }
    // Si hay action, no interceptar - dejar que el formulario se envíe normalmente
}

// Console welcome message
console.log('%c MaulePro Portal ', 'background: #1e3c72; color: white; font-size: 20px; padding: 10px;');
console.log('%c Portal de Postulaciones - Gobierno Regional del Maule ', 'color: #2a5298; font-size: 14px;');

// Verificar funcionalidad del buscador al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    // Verificar si estamos en la página de búsqueda (buscar.html)
    // En esa página, el buscador se maneja de forma diferente
    if (window.location.pathname.includes('buscar.html')) {
        console.log('Página de búsqueda detectada, no verificando elementos del buscador modal');
        // Verificar que Bootstrap esté cargado
        if (typeof bootstrap !== 'undefined') {
            console.log('✅ Bootstrap está cargado correctamente');
        } else {
            console.warn('⚠️ Bootstrap no está disponible. Algunas funcionalidades pueden no funcionar.');
        }
        return;
    }
    
    // Verificar que todos los elementos del buscador estén presentes
    const searchElements = {
        searchBtn: document.getElementById('searchBtn'),
        searchModal: document.getElementById('searchModal'),
        searchForm: document.getElementById('searchForm'),
        searchInput: document.getElementById('searchInput'),
        searchResults: document.getElementById('searchResults')
    };
    
    const missingElements = Object.entries(searchElements)
        .filter(([name, element]) => !element)
        .map(([name]) => name);
    
    // Solo mostrar advertencia si falta el modal de búsqueda completo
    // No es un error si el formulario tiene action (redirección a página de búsqueda)
    if (missingElements.length > 0 && searchElements.searchModal) {
        console.warn('⚠️ Elementos del buscador modal no encontrados:', missingElements);
    } else if (!missingElements.length) {
        console.log('✅ Buscador: Todos los elementos están presentes');
    }
    
    // Verificar que Bootstrap esté cargado
    if (typeof bootstrap !== 'undefined') {
        console.log('✅ Bootstrap está cargado correctamente');
    } else {
        console.warn('⚠️ Bootstrap no está disponible. Algunas funcionalidades pueden no funcionar.');
    }
    
    // Inicializar el buscador
    initSearch();
});

// Función de Accesibilidad - Activar widget Userway
function Accesibilidad() {
    spinnerAccesibilidad();
    
    // Intentar activar el widget de Userway
    if (typeof UserWay !== 'undefined' && UserWay.widgetToggle) {
        UserWay.widgetToggle();
    } else if (typeof window.Userway !== 'undefined' && window.Userway.widgetToggle) {
        window.Userway.widgetToggle();
    } else {
        // Intentar buscar el botón de Userway y hacer clic
        const userwayButtons = [
            '.uw-widget-button',
            '[id*="userway"]',
            '[class*="userway"]',
            'iframe[title*="Userway"]',
            'iframe[title*="Accessibility"]'
        ];
        
        let found = false;
        userwayButtons.forEach(selector => {
            if (!found) {
                const element = document.querySelector(selector);
                if (element) {
                    element.click();
                    found = true;
                }
            }
        });
    }
    
    setTimeout(function () {
        ocultarspinnerAccesibilidad();
    }, 1000);
}

function spinnerAccesibilidad() {
    var elemento = document.getElementById("imgAccesibilidad");
    if (elemento) {
        elemento.classList.remove("bg-primary");
        elemento.classList.add("spinner-grow");
        elemento.classList.remove("rounded-pill");
    }
}

function ocultarspinnerAccesibilidad() {
    var elemento = document.getElementById("imgAccesibilidad");
    if (elemento) {
        elemento.classList.remove("spinner-grow");
        elemento.classList.add("bg-primary");
        elemento.classList.add("rounded-pill");
    }
}

