# 📚 Documentación Técnica - MaulePro

Documentación técnica detallada del portal MaulePro del Gobierno Regional del Maule.

## 📋 Índice

1. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [CSS Modular](#css-modular)
4. [JavaScript Modular](#javascript-modular)
5. [Sistema de Logging](#sistema-de-logging)
6. [Seguridad](#seguridad)
7. [Estado del Proyecto](#estado-del-proyecto)

---

## 🏗️ Arquitectura del Proyecto

### Arquitectura CSS Modular

El proyecto utiliza una arquitectura CSS modular con 7 módulos independientes:

```
assets/css/
├── main.css                    # Punto de entrada (importa módulos)
└── modules/
    ├── _variables.css          # Variables CSS y colores
    ├── _base.css               # Estilos base y fondo
    ├── _navbar.css             # Navbar component
    ├── _hero.css               # Hero section y buscador
    ├── _program-cards.css      # Tarjetas de programas
    ├── _carousel.css           # Carousel component
    └── _utilities.css          # Utilidades y helpers
```

**Ventajas**:
- ✅ Separación de concerns
- ✅ Fácil mantenimiento
- ✅ Reutilización de estilos
- ✅ Sin duplicación de código

### Arquitectura JavaScript Modular

```
assets/js/
├── script.js                   # Orquestador principal
├── main.js                     # Punto de entrada principal
├── data/                       # Datos centralizados
│   └── programas.js            # Fuente única de verdad para programas
├── components/                 # Componentes reutilizables
│   └── BaseComponent.js        # Clase base
├── config/                     # Configuración centralizada
│   ├── index.js                # CONFIG principal
│   └── selectors.js            # Helpers de selectores
├── modules/                    # Módulos funcionales
│   ├── carousel.js             # Gestión del carousel
│   ├── filters.js              # Sistema de búsqueda (index.html)
│   ├── userway.js              # Integración Userway
│   ├── modals/                 # Gestión de modales
│   │   └── ModalManager.js     # Apertura/cierre de modales
│   ├── forms/                  # Gestión de formularios
│   │   └── FormManager.js      # Validación y envío de formularios
│   └── search/                 # Módulos de búsqueda
│       ├── FilterEngine.js     # Motor de filtrado
│       ├── SortEngine.js       # Motor de ordenamiento
│       ├── CardRenderer.js     # Renderizado seguro de tarjetas
│       ├── SearchManager.js    # Gestor unificado de búsqueda
│       └── ModalSearch.js      # Búsqueda modal segura
└── utils/                      # Utilidades compartidas
    ├── Logger.js               # Sistema de logging con niveles
    ├── DeadlineManager.js      # Gestión de deadlines
    ├── AccessibilityManager.js # Gestión de accesibilidad
    ├── dom.js                  # Utilidades DOM
    ├── storage.js              # LocalStorage helpers
    ├── date.js                 # Utilidades de fecha
    └── debounce.js             # Debounce/throttle
```

---

## 📁 Estructura de Archivos

Ver `ESTRUCTURA.md` para una descripción detallada de todos los archivos del proyecto.

---

## 🎨 CSS Modular

### Módulos CSS

#### `_variables.css`
- Variables CSS para colores institucionales
- Variables de espaciado responsive
- Colores: azul institucional (`#093F75`), verde abierto (`#018484`), rojo cerrado (`#FE6565`)

#### `_base.css`
- Estilos base de `html` y `body`
- Fondo estático (`#EEEEEE`)
- Tipografía: Google Fonts (Roboto Sans)
- Texto justificado
- Estilos de scrollbar personalizados

#### `_navbar.css`
- Estilos del navbar
- Logo responsive (diferente en móvil y desktop)
- ClaveÚnica button
- Menú hamburguesa para móvil
- Estados hover y active

#### `_hero.css`
- Hero section
- Tarjetas de características
- Estilos del buscador mejorado
- Responsive design

#### `_program-cards.css`
- Tarjetas de programas
- Header con fondo institucional (azul) o gris (cerrado)
- Body con información estructurada
- Badges de estado y deadline
- Animaciones y efectos hover
- Dimensiones estandarizadas (min-height)

#### `_carousel.css`
- Carousel de información
- Botón de cierre
- Banners con colores pastel
- Responsive design

#### `_utilities.css`
- Utilidades y helpers
- Badges de estado
- Botones institucionales
- Animaciones
- Estilos del footer
- Sistema de espaciado corporativo

---

## 💻 JavaScript Modular

### Módulos de Búsqueda

#### `modules/search/FilterEngine.js`
- Motor de filtrado reutilizable
- Filtra por nombre, estado, beneficiario, región
- Validación de parámetros
- Usado por `index.html` y `buscar.html`

#### `modules/search/SortEngine.js`
- Motor de ordenamiento reutilizable
- Ordena por relevancia, abiertos primero, fecha, alfabético
- Usado por `index.html` y `buscar.html`

#### `modules/search/CardRenderer.js`
- Renderizado seguro de tarjetas (sin XSS)
- Usa `createElement` y `textContent`
- Crea estructura completa de tarjeta
- Funciones: `crearTarjetaElement`, `escapeHtml`

#### `modules/search/SearchManager.js`
- Gestor unificado de búsqueda
- Orquesta FilterEngine, SortEngine y CardRenderer
- Maneja URL params
- Renderiza resultados y estados vacíos
- Actualiza contadores

#### `modules/search/ModalSearch.js`
- Búsqueda modal completa
- Renderizado seguro sin `innerHTML` con datos del usuario
- Búsqueda en tiempo real (debounced)
- Construye contenido buscable desde DOM y datos estáticos

### Módulos de UI

#### `modules/modals/ModalManager.js`
- Gestión centralizada de modales
- Funciones: `open`, `close`, `init`, `setupTrigger`, `setupModalSwitch`
- Integración con Bootstrap Modal API
- Fallbacks para compatibilidad

#### `modules/forms/FormManager.js`
- Gestión de formularios
- Validación: RUT, email, match de emails
- Validación en tiempo real
- Handlers: login, registro, recuperación de contraseña
- Gestión de UI de usuario logueado/deslogueado

#### `modules/filters.js`
- Sistema de búsqueda y filtrado para `index.html`
- Integración con FilterEngine y SortEngine
- Actualización de contadores
- Cálculo de deadlines (usa DeadlineManager)
- Animaciones de entrada

#### `modules/carousel.js`
- Gestión del carousel de información
- Botón de cierre
- Persistencia de estado en localStorage

#### `modules/userway.js`
- Integración con Userway
- Posicionamiento del widget
- Observador de cambios en el DOM

### Datos

#### `data/programas.js`
- Fuente única de verdad para todos los programas
- Array de objetos de programas
- Funciones: `getAllProgramas`, `getProgramaByName`, `getProgramasByEstado`, `getProgramasByBenef`
- Namespace: `window.MaulePro.Data.programas`

### Utilidades

#### `utils/Logger.js`
- Sistema de logging con niveles (DEBUG, INFO, WARN, ERROR)
- Deshabilitación automática en producción
- Formato consistente con timestamp
- Integración: `window.MaulePro.Utils.Logger`

#### `utils/DeadlineManager.js`
- Gestión centralizada de deadlines
- Calcula días restantes
- Aplica clases CSS (urgent, soon)
- Funciones: `paintAllDeadlines`, `paintDeadline`, `getDaysRemaining`

#### `utils/AccessibilityManager.js`
- Gestión de accesibilidad
- Spinner y toggle de UserWay
- Funciones: `execute`, `showSpinner`, `hideSpinner`, `toggleUserWay`

#### `utils/dom.js`
- Utilidades DOM: `create()`, `exists()`, `waitFor()`, `scrollTo()`, etc.

#### `utils/storage.js`
- Helpers de localStorage con prefijo automático
- Serialización JSON automática

#### `utils/date.js`
- Utilidades de fecha: `format()`, `daysBetween()`, `formatDaysRemaining()`, etc.

#### `utils/debounce.js`
- Funciones `debounce()` y `throttle()`

### Componentes

#### `components/BaseComponent.js`
- Clase base para componentes reutilizables
- Gestión automática de event listeners
- Métodos helpers comunes

### Configuración

#### `config/index.js`
- Configuración centralizada
- Selectores DOM
- Claves de localStorage
- Configuración de features

#### `config/selectors.js`
- Helpers para acceder a elementos del DOM
- Funciones: `getSelector()`, `getElement()`, `getElements()`, `elementExists()`

---

## 📝 Sistema de Logging

### Logger Module (`utils/Logger.js`)

Sistema de logging centralizado con niveles:

- **DEBUG**: Solo en desarrollo (deshabilitado en producción)
- **INFO**: Información general
- **WARN**: Advertencias
- **ERROR**: Errores

### Uso

```javascript
const Logger = window.MaulePro?.Utils?.Logger;

Logger?.debug('Mensaje de depuración');
Logger?.info('Información importante');
Logger?.warn('Advertencia');
Logger?.error('Error crítico', errorObjeto);
```

### Características

- ✅ Control automático de entorno (producción vs desarrollo)
- ✅ Formato consistente con timestamp
- ✅ Prefijo `[MaulePro <NIVEL>]`
- ✅ Fallback a `console.log` si Logger no está disponible

---

## 🔒 Seguridad

### Prevención de XSS

El proyecto implementa renderizado seguro:

- ✅ **Sin `innerHTML` con datos del usuario**: Todos los datos se renderizan usando `createElement` y `textContent`
- ✅ **Función `escapeHtml`**: Helper para escapar texto cuando sea necesario
- ✅ **Validación de parámetros**: Todos los inputs se validan antes de procesar

### Módulos Seguros

- `CardRenderer.js`: Renderiza tarjetas de forma segura
- `ModalSearch.js`: Renderiza resultados de búsqueda de forma segura
- `SearchManager.js`: Maneja renderizado seguro

### Ejemplo de Renderizado Seguro

```javascript
// ❌ INSEGURO (no se usa en el proyecto)
container.innerHTML = `<div>${userInput}</div>`;

// ✅ SEGURO (implementado)
const div = document.createElement('div');
div.textContent = userInput; // Escapa automáticamente
container.appendChild(div);
```

---

## 📊 Estado del Proyecto

### Completado ✅

- ✅ Arquitectura CSS modular (7 módulos)
- ✅ Arquitectura JavaScript modular (20+ archivos)
- ✅ Sistema de búsqueda unificado
- ✅ Sistema de logging centralizado
- ✅ Gestión de deadlines centralizada
- ✅ Gestión de accesibilidad centralizada
- ✅ Renderizado seguro (sin XSS)
- ✅ Refactorización de `script.js` (946 → 515 líneas, -45.5%)
- ✅ Documentación JSDoc completa
- ✅ Todas las imágenes en `assets/images/`
- ✅ Eliminación de carpeta del manual de marca

### Arquitectura Actual

- **Módulos JS**: 20+ archivos organizados en módulos
- **Módulos CSS**: 7 módulos independientes
- **Datos centralizados**: `programas.js` como fuente única de verdad
- **Utilidades compartidas**: Logger, DeadlineManager, AccessibilityManager, etc.
- **Namespace global**: `window.MaulePro` para organización

### Características de Código

- ✅ **JSDoc completo**: 100% de cobertura en módulos principales
- ✅ **Sin duplicación**: < 5% de código duplicado
- ✅ **Funciones pequeñas**: Ninguna función > 50 líneas
- ✅ **Principios SOLID**: SRP bien aplicado
- ✅ **Testeable**: Separación de lógica y presentación

### Pendiente 📋

- ⏭️ Tests unitarios
- ⏭️ Optimización de imágenes (WebP)
- ⏭️ Preconnect a CDNs
- ⏭️ Lazy loading
- ⏭️ Build system (opcional)
- ⏭️ TypeScript (opcional)

---

## 🔧 Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Flexbox, Grid
- **JavaScript ES6+**: Vanilla JavaScript modular
- **Bootstrap 5.3.3**: Framework CSS (CDN)
- **Bootstrap Icons 1.11.3**: Iconografía (CDN)
- **Userway**: Widget de accesibilidad
- **Google Fonts**: Roboto Sans

---

## 📚 Documentación Relacionada

- `ESTRUCTURA.md` - Estructura detallada del proyecto
- `README.md` (raíz) - Documentación principal del proyecto

---

**Última actualización**: Noviembre 2025  
**Versión**: 2.0  
**Estado**: Arquitectura modular completa, refactorización completada
