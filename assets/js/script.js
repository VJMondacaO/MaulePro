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
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal(modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
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
            loginError.classList.add('hidden');
        } else {
            // Show error
            loginError.classList.remove('hidden');
        }
    } else {
        if (loginError) loginError.classList.remove('hidden');
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
    if (loginBtn) loginBtn.classList.add('hidden');
    
    // Mobile elements
    const mobileWelcomeUser = document.getElementById('mobileWelcomeUser');
    const mobileUserRut = document.getElementById('mobileUserRut');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    if (mobileWelcomeUser) mobileWelcomeUser.classList.remove('hidden');
    if (mobileUserRut) mobileUserRut.textContent = rut;
    if (mobileLoginBtn) mobileLoginBtn.classList.add('hidden');
}

// Update UI for logged out user
function updateUIForLoggedOutUser() {
    if (loginBtn) loginBtn.classList.remove('hidden');
    
    // Mobile elements
    const mobileWelcomeUser = document.getElementById('mobileWelcomeUser');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    if (mobileWelcomeUser) mobileWelcomeUser.classList.add('hidden');
    if (mobileLoginBtn) mobileLoginBtn.classList.remove('hidden');
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });
    
    // Close menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
}

// Mobile logout and view applications
const mobileLogout = document.getElementById('mobileLogout');
const mobileViewApplications = document.getElementById('mobileViewApplications');

if (mobileLogout) {
    mobileLogout.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('userRut');
        updateUIForLoggedOutUser();
        // Close mobile menu
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            if (menuIcon) menuIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');
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

// Add real-time validation
document.getElementById('username').addEventListener('blur', function() {
    if (!validateRut(this.value) && this.value !== '') {
        this.style.borderColor = '#d32f2f';
    } else {
        this.style.borderColor = '#ddd';
    }
});

document.getElementById('rut').addEventListener('blur', function() {
    if (!validateRut(this.value) && this.value !== '') {
        this.style.borderColor = '#d32f2f';
    } else {
        this.style.borderColor = '#ddd';
    }
});

document.getElementById('email').addEventListener('blur', function() {
    if (!validateEmail(this.value) && this.value !== '') {
        this.style.borderColor = '#d32f2f';
    } else {
        this.style.borderColor = '#ddd';
    }
});

document.getElementById('confirmEmail').addEventListener('blur', function() {
    const email = document.getElementById('email').value;
    if (this.value !== email && this.value !== '') {
        this.style.borderColor = '#d32f2f';
    } else {
        this.style.borderColor = '#ddd';
    }
});

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

// Open search modal
if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
        searchModal.classList.remove('hidden');
        searchModal.classList.add('flex');
        if (searchInput) searchInput.focus();
    });
}

// Close search modal
if (closeSearchModal && searchModal) {
    closeSearchModal.addEventListener('click', () => {
        searchModal.classList.add('hidden');
        searchModal.classList.remove('flex');
        if (searchResults) searchResults.innerHTML = '';
        if (searchInput) searchInput.value = '';
    });
}

// Close modal when clicking outside
if (searchModal) {
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.add('hidden');
            searchModal.classList.remove('flex');
            if (searchResults) searchResults.innerHTML = '';
            if (searchInput) searchInput.value = '';
        }
    });
}

// Search functionality
if (searchForm && searchResults) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        
        if (query === '') {
            searchResults.innerHTML = '<p class="text-gray-600 text-center py-4">Por favor, ingrese un término de búsqueda.</p>';
            return;
        }
        
        // Simple search - search through page content
        const searchableContent = [
            { title: 'FNDR 8%', url: 'fndr-8.html', description: 'Subvenciones para actividades FNDR 8%' },
            { title: 'Circular 33', url: 'circular-33.html', description: 'Fondo Regional de Iniciativa Local (FRIL)' },
            { title: 'FNDR Sub. 31', url: 'fndr-sub31.html', description: 'Postulación FNDR Sub. 31 con Evaluación MIDESOYF' },
            { title: 'Proyectos Menores', url: 'proyectos-menores.html', description: 'Proyectos menores a 5.000 UTM' },
            { title: 'Financiamiento para Programas', url: 'financiamiento-programas.html', description: 'Transferencias Subtítulo 33' },
            { title: 'Programas', url: 'programas.html', description: 'Lista completa de programas disponibles' }
        ];
        
        const results = searchableContent.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)
        );
        
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="text-gray-600 text-center py-4">No se encontraron resultados para su búsqueda.</p>';
        } else {
            searchResults.innerHTML = results.map(item => `
                <a href="${item.url}" class="block p-4 border-2 border-gray-300 hover:border-institucional-azul hover:bg-gray-50 mb-2">
                    <h3 class="font-bold text-institucional-azul mb-1">${item.title}</h3>
                    <p class="text-gray-600 text-sm">${item.description}</p>
                </a>
            `).join('');
        }
    });
}

// Console welcome message
console.log('%c MaulePro Portal ', 'background: #1e3c72; color: white; font-size: 20px; padding: 10px;');
console.log('%c Portal de Postulaciones - Gobierno Regional del Maule ', 'color: #2a5298; font-size: 14px;');

