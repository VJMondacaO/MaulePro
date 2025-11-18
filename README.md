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
- ⚡ **Código Optimizado**: Código simplificado y optimizado para mejor rendimiento

## 🚀 Inicio Rápido

### Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge - últimas 2 versiones)
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
├── login.html                    # Página de login
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
│   │       ├── _login.css       # Estilos login
│   │       └── _utilities.css   # Utilidades
│   ├── js/
│   │   ├── script.js            # Script principal
│   │   ├── data/                # Datos centralizados
│   │   │   └── programas.js     # Datos de programas (fuente única)
│   │   ├── modules/             # Módulos funcionales
│   │   │   ├── filters.js       # Filtrado y búsqueda en index.html
│   │   │   ├── navbar-spacer.js # Ajuste de márgenes del navbar
│   │   │   ├── program-cards-generator.js # Generación dinámica de tarjetas
│   │   │   ├── userway.js       # Integración Userway
│   │   │   └── search/          # Módulos de búsqueda
│   │   │       ├── FilterEngine.js    # Motor de filtrado
│   │   │       ├── SortEngine.js      # Motor de ordenamiento
│   │   │       ├── CardRenderer.js    # Renderizado seguro de tarjetas
│   │   │       └── SearchManager.js   # Gestor de búsqueda
│   │   └── utils/               # Utilidades
│   │       ├── Logger.js        # Sistema de logging
│   │       ├── DeadlineManager.js # Gestión de deadlines
│   │       ├── AccessibilityManager.js # Gestión de accesibilidad
│   │       └── debounce.js      # Utilidad debounce/throttle
│   └── images/                  # Imágenes y logos
│       ├── favicon.png
│       ├── icon-claveunica.svg
│       └── logo-gore-*.png      # Varios logos del GORE
│
├── pages/                        # Subpáginas del portal
│   ├── programas/                # Páginas de programas
│   │   ├── circular-33.html
│   │   ├── fndr-8.html
│   │   ├── fndr-sub31.html
│   │   ├── fril.html
│   │   ├── frpd.html
│   │   ├── proyectos-menores.html
│   │   ├── financiamiento-programas.html
│   │   └── postulacion-financiamiento.html
│   ├── buscar.html               # Página de búsqueda avanzada
│   └── preguntas-frecuentes.html
│
└── components/                   # Componentes de desarrollo
    ├── components.html
    └── preview.html
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS, Flexbox y Grid
- **JavaScript (ES6+)**: Vanilla JavaScript modular (IIFE pattern)
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

### Componentes

- **Navbar Fijo**: Se mantiene visible al hacer scroll
- **Cards Interactivas**: Efectos hover y animaciones
- **Búsqueda Avanzada**: Filtros por estado, beneficiario y ordenamiento
- **Deadlines**: Indicadores de tiempo restante con colores según urgencia
- **Footer Institucional**: Información del GORE Maule

## 🔧 Funcionalidades

### Búsqueda y Filtrado

- Búsqueda por nombre o palabra clave
- Filtro por estado (Abiertos, Próximos, Cerrados)
- Filtro por beneficiario (Municipios, Servicios públicos, Organizaciones, etc.)
- Ordenamiento (Relevancia, Abiertos primero, Fecha, A-Z)
- Atajo de teclado `/` para acceso rápido al buscador
- Página de resultados de búsqueda (`pages/buscar.html`)

### Programas Disponibles

Los programas se gestionan centralizadamente en `assets/js/data/programas.js`:

- **PROYECTOS MENORES A 5.000 UTM**: Abierto
- **Subvenciones FNDR 8%**: Abierto
- **Circular 33**: Cerrado
- **FRIL**: Cerrado
- **FNDR Sub. 31**: Cerrado
- **Financiamiento para Programas**: Cerrado
- **FRPD**: Cerrado
- **Actividades FNDR 8%**: Varias actividades abiertas

### Accesibilidad

- Integración con Userway
- Navegación por teclado completa
- Focus visible
- Respeto a `prefers-reduced-motion`
- Widget posicionado en esquina inferior derecha
- Función global `Accesibilidad()` para activar herramientas

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

El proyecto utiliza una arquitectura CSS modular con 7 módulos importados en `main.css`:

1. `_variables.css`: Variables CSS y colores institucionales
2. `_base.css`: Estilos base y fondo
3. `_navbar.css`: Estilos del navbar fijo
4. `_hero.css`: Hero section y buscador
5. `_program-cards.css`: Tarjetas de programas
6. `_login.css`: Estilos de login
7. `_utilities.css`: Utilidades y helpers

### JavaScript Modular

El proyecto utiliza un patrón IIFE (Immediately Invoked Function Expression) con namespace global `window.MaulePro`:

#### Módulos de Búsqueda (`modules/search/`)
- **FilterEngine.js**: Motor de filtrado reutilizable
- **SortEngine.js**: Motor de ordenamiento reutilizable
- **CardRenderer.js**: Renderizado seguro de tarjetas (sin XSS)
- **SearchManager.js**: Gestor unificado de búsqueda

#### Módulos de UI (`modules/`)
- **filters.js**: Filtrado y búsqueda en `index.html`
- **navbar-spacer.js**: Ajuste dinámico de márgenes según altura del navbar
- **program-cards-generator.js**: Generación dinámica de tarjetas desde `programas.js`
- **userway.js**: Integración con widget de accesibilidad

#### Utilidades (`utils/`)
- **Logger.js**: Sistema de logging con niveles (debug, info, warn, error)
- **DeadlineManager.js**: Gestión centralizada de deadlines y fechas
- **AccessibilityManager.js**: Gestión de funcionalidades de accesibilidad
- **debounce.js**: Utilidades debounce y throttle

#### Datos (`data/`)
- **programas.js**: Fuente única de verdad para todos los programas

### Flujo de Carga de Scripts

Los scripts se cargan en el siguiente orden en `index.html`:

1. **Bootstrap JS** (CDN)
2. **Utils básicos**: Logger, debounce
3. **Data y Managers**: programas.js, DeadlineManager, AccessibilityManager
4. **Search Modules**: CardRenderer (para generación de tarjetas)
5. **Script principal**: script.js
6. **Módulos**: navbar-spacer, program-cards-generator, filters (defer), userway (defer)

## 📊 Generación Dinámica de Tarjetas

El módulo `program-cards-generator.js` permite generar tarjetas dinámicamente desde `programas.js`, eliminando la necesidad de mantener HTML hardcodeado.

**Características:**
- Genera tarjetas automáticamente desde `programas.js`
- Usa `CardRenderer` para renderizado seguro
- Integra automáticamente con `DeadlineManager`
- Actualiza contadores automáticamente
- No reemplaza tarjetas existentes (fallback seguro)

**Uso:**
El módulo se inicializa automáticamente. Si el contenedor `#grid` está vacío, genera las tarjetas. Si ya hay tarjetas, no las reemplaza.

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

## 🔍 Desarrollo

### Agregar un Nuevo Programa

1. Edita `assets/js/data/programas.js`
2. Agrega un nuevo objeto al array `programas` con la estructura:
   ```javascript
   {
       name: "Nombre del Programa",
       benef: "municipios|org|personas|servicios|empresas",
       estado: "open|soon|closed",
       close: "2025-12-31", // Fecha ISO o vacío
       location: "Regional",
       beneficiarios: "Descripción de beneficiarios",
       fechas: "Rango de fechas",
       montos: "Información de montos",
       link: "pages/programas/nombre-programa.html",
       hasDeadline: true,
       deadlineUrgent: false
   }
   ```
3. Si usas generación dinámica, la tarjeta aparecerá automáticamente
4. Si usas HTML hardcodeado, agrega la tarjeta manualmente en `index.html`

### Modificar Estilos

Los estilos están organizados en módulos CSS. Edita el módulo correspondiente en `assets/css/modules/`.

### Agregar Nueva Funcionalidad

1. Crea un nuevo módulo en `assets/js/modules/`
2. Usa el patrón IIFE con namespace `window.MaulePro`
3. Agrega el script en `index.html` en el orden apropiado

## 🤝 Contribución

Este es un proyecto de prototipo. Para contribuciones:

1. Revisa la estructura del proyecto
2. Sigue las convenciones de código existentes
3. Mantén el código limpio y comentado
4. Prueba en múltiples navegadores
5. Usa el patrón IIFE para módulos
6. Documenta funciones públicas con JSDoc

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

**Última actualización**: 18 Noviembre 2025
