# 🏛️ MaulePro - Portal de Postulación a Programas y Fondos Regionales

Portal web del Gobierno Regional del Maule para la postulación a programas y fondos regionales.

## 📋 Descripción

MaulePro es un portal web que permite a usuarios acceder a las líneas de financiamiento del Gobierno Regional del Maule. El portal incluye información sobre diferentes programas, requisitos, fechas de postulación y documentación necesaria.

## ✨ Características Principales

- 🎯 **Búsqueda y Filtrado Avanzado**: Sistema de búsqueda con filtros por estado, beneficiario y ordenamiento
- 📱 **Diseño Responsive**: Adaptado para dispositivos móviles, tablets y desktop
- ♿ **Accesibilidad**: Integración con Userway para herramientas de accesibilidad
- 🎨 **Interfaz Moderna**: Diseño limpio y profesional con animaciones suaves
- 🔍 **Búsqueda Inteligente**: Atajo de teclado `/` para acceso rápido al buscador
- 📊 **Estados de Programas**: Visualización clara de programas abiertos, próximos y cerrados
- 🎨 **Manual de Marca**: Diseño alineado con las normas corporativas del GORE Maule
- 🏗️ **Arquitectura Modular**: CSS y JavaScript organizados en módulos reutilizables
- 🔒 **Seguridad**: Renderizado seguro sin riesgos de XSS
- 📝 **Logging Centralizado**: Sistema de logging con niveles para desarrollo y producción

## 🚀 Inicio Rápido

### Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (opcional, solo necesario para desarrollo con Live Server)

### Instalación

Este proyecto es **solo frontend** y no requiere instalación de dependencias. Todas las librerías se cargan desde CDN.

### Ejecución

Este proyecto es **solo frontend estático**. Puedes abrirlo de varias formas:

#### Opción 1: Abrir directamente en el navegador

Simplemente abre el archivo `index.html` en tu navegador.

#### Opción 2: Live Server (Recomendado para desarrollo)

1. Instala la extensión "Live Server" en VS Code
2. Abre `index.html`
3. Click derecho → "Open with Live Server"
4. Se abrirá en `http://127.0.0.1:5500`

#### Opción 3: Servidor local simple (opcional)

Si necesitas un servidor local, puedes usar cualquier servidor HTTP simple:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

## 📁 Estructura del Proyecto

```
MaulePro/
│
├── index.html                    # Página principal
├── login.html                    # Página de login y registro
├── README.md                     # Este archivo
│
├── assets/                       # Recursos estáticos
│   ├── css/
│   │   ├── main.css             # CSS principal (importa módulos)
│   │   └── modules/              # Módulos CSS modulares
│   │       ├── _variables.css   # Variables CSS
│   │       ├── _base.css        # Estilos base
│   │       ├── _navbar.css      # Estilos navbar
│   │       ├── _hero.css        # Estilos hero section
│   │       ├── _program-cards.css # Estilos tarjetas
│   │       ├── _carousel.css   # Estilos carousel
│   │       └── _utilities.css  # Utilidades
│   ├── js/
│   │   ├── script.js            # Orquestador principal
│   │   ├── main.js              # Punto de entrada
│   │   ├── data/                # Datos centralizados
│   │   │   └── programas.js     # Datos de programas
│   │   ├── components/          # Componentes reutilizables
│   │   │   └── BaseComponent.js
│   │   ├── config/              # Configuración
│   │   │   ├── index.js
│   │   │   └── selectors.js
│   │   ├── modules/             # Módulos funcionales
│   │   │   ├── carousel.js
│   │   │   ├── filters.js
│   │   │   ├── userway.js
│   │   │   ├── modals/
│   │   │   │   └── ModalManager.js
│   │   │   ├── forms/
│   │   │   │   └── FormManager.js
│   │   │   └── search/
│   │   │       ├── FilterEngine.js
│   │   │       ├── SortEngine.js
│   │   │       ├── CardRenderer.js
│   │   │       ├── SearchManager.js
│   │   │       └── ModalSearch.js
│   │   └── utils/               # Utilidades
│   │       ├── Logger.js
│   │       ├── DeadlineManager.js
│   │       ├── AccessibilityManager.js
│   │       ├── dom.js
│   │       ├── storage.js
│   │       ├── date.js
│   │       └── debounce.js
│   └── images/                  # Imágenes
│       ├── favicon.png
│       ├── icon-claveunica.png
│       ├── icon-claveunica.svg
│       ├── logo-gore-blanco-horizontal.png
│       ├── logo-gore-footer-blanco.png
│       ├── logo-gore-horizontal-blanco.png
│       ├── logo-gore-horizontal-manual.png
│       ├── logo-gore-horizontal.png
│       ├── logo-gore-negro.png
│       ├── logo-gore-vertical-blanco.png
│       ├── logo-gore.png
│       └── Logo.png
│
├── pages/                        # Subpáginas del portal
│   ├── programas/                # Páginas de programas
│   │   ├── circular-33.html
│   │   ├── fndr-8.html
│   │   ├── fndr-sub31.html
│   │   ├── fril.html
│   │   ├── frpd.html
│   │   └── proyectos-menores.html
│   ├── buscar.html               # Página de búsqueda
│   ├── financiamiento-programas.html
│   ├── postulacion-financiamiento.html
│   └── preguntas-frecuentes.html
│
├── components/                   # Componentes de desarrollo
│   ├── components.html
│   └── preview.html
│
└── docs/                         # Documentación
    ├── README.md                # Documentación técnica
    └── ESTRUCTURA.md            # Estructura detallada
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS, Flexbox y Grid
- **JavaScript (ES6+)**: Vanilla JavaScript modular
- **Bootstrap 5.3.3**: Framework CSS (CDN)
- **Bootstrap Icons 1.11.3**: Iconografía (CDN)
- **Userway**: Widget de accesibilidad
- **Google Fonts**: Tipografía Roboto Sans

## 🎨 Características de Diseño

### Paleta de Colores Institucionales

- **Azul Institucional**: `#093F75` (Tarjetas y elementos principales)
- **Azul Claro**: `#0D47A1` (Elementos secundarios)
- **Verde Abierto**: `#018484` (Estado abierto)
- **Rojo Cerrado**: `#FE6565` (Estado cerrado)
- **Gris Fondo**: `#EEEEEE` (Fondo estático)
- **Gris Cerrado**: `#BBBBBB` (Headers de tarjetas cerradas)

### Logos

- **logo-gore-vertical-blanco.png**: Para navbar móvil
- **logo-gore-horizontal-blanco.png**: Para navbar desktop (horizontal)
- **logo-gore-footer-blanco.png**: Para footer
- **icon-claveunica.svg**: Icono SVG para autenticación
- **favicon.png**: Favicon del sitio

### Componentes

- **Navbar Fijo**: Se mantiene visible al hacer scroll
- **Cards Interactivas**: Efectos hover y animaciones
- **Búsqueda Avanzada**: Filtros por estado, beneficiario y ordenamiento
- **Deadlines**: Indicadores de tiempo restante
- **Footer Institucional**: Información del GORE Maule

## 🔧 Funcionalidades

### Búsqueda y Filtrado

- Búsqueda por nombre o palabra clave
- Filtro por estado (Abiertos, Próximos, Cerrados)
- Filtro por beneficiario (Municipios, Servicios públicos, Organizaciones, etc.)
- Ordenamiento (Relevancia, Abiertos primero, Fecha, A-Z)
- Atajo de teclado `/` para acceso rápido
- Página de resultados de búsqueda (`pages/buscar.html`)

### Programas Disponibles

- **PROYECTOS MENORES A 5.000 UTM**: Abierto
- **Subvenciones FNDR 8%**: Abierto
- **Circular 33**: Cerrado
- **FRIL**: Cerrado
- **FNDR Sub. 31**: Cerrado
- **Financiamiento para Programas**: Cerrado
- **FRPD**: Cerrado

### Accesibilidad

- Integración con Userway
- Navegación por teclado
- Focus visible
- Respeto a `prefers-reduced-motion`
- Widget posicionado en esquina inferior derecha

## 📱 Responsive Design

El sitio es completamente responsive y se adapta a:

- **Desktop**: > 992px
- **Tablet**: 768px - 992px
- **Móvil**: < 768px

## 🌐 Navegadores Compatibles

- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Opera (últimas 2 versiones)

## 🏗️ Arquitectura

### CSS Modular

El proyecto utiliza una arquitectura CSS modular con 7 módulos:

- `_variables.css`: Variables CSS y colores
- `_base.css`: Estilos base y fondo
- `_navbar.css`: Estilos del navbar
- `_hero.css`: Hero section y buscador
- `_program-cards.css`: Tarjetas de programas
- `_carousel.css`: Carousel de información
- `_utilities.css`: Utilidades y helpers

### JavaScript Modular

- **Módulos de Búsqueda**: `FilterEngine.js`, `SortEngine.js`, `CardRenderer.js`, `SearchManager.js`, `ModalSearch.js`
- **Módulos de UI**: `ModalManager.js`, `FormManager.js`, `filters.js`
- **Utilidades**: `Logger.js`, `DeadlineManager.js`, `AccessibilityManager.js`, `debounce.js`
- **Datos**: `programas.js` (fuente única de verdad)

## ⚠️ Limitaciones Actuales

Este es un **prototipo de frontend**. Las siguientes funcionalidades están simuladas:

- ❌ **Login/Registro**: No hay integración con Clave Única real
- ❌ **Postulaciones**: No se envían a ningún servidor
- ❌ **Documentos**: No se descargan realmente
- ❌ **Backend**: No hay comunicación con APIs

### Para Producción se Requiere

- ✅ Integración con Clave Única (sistema de autenticación del Estado de Chile)
- ✅ Backend con API REST
- ✅ Base de datos
- ✅ Sistema de gestión de archivos
- ✅ Sistema de procesamiento de postulaciones
- ✅ Integración con sistemas gubernamentales

## 📚 Documentación Adicional

- `docs/README.md`: Documentación técnica detallada
- `docs/ESTRUCTURA.md`: Estructura detallada del proyecto

## 🤝 Contribución

Este es un proyecto de prototipo. Para contribuciones:

1. Revisa la estructura del proyecto
2. Sigue las convenciones de código existentes
3. Mantén el código limpio y comentado
4. Prueba en múltiples navegadores

## 📄 Licencia

Este proyecto es solo para fines educativos, de demostración y como prototipo de frontend.

## 👥 Autor

Desarrollado para el Gobierno Regional del Maule.

## 🔗 Enlaces

- Portal Original: https://www.maulepro.com/gore/portal/
- Bootstrap: https://getbootstrap.com/
- Bootstrap Icons: https://icons.getbootstrap.com/
- Userway: https://userway.org/

---

**Nota**: Este es un prototipo de frontend que requiere integración con sistemas backend y Clave Única para ser completamente funcional en producción.

**Última actualización**: Noviembre 2025
