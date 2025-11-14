# 📁 Estructura del Proyecto MaulePro

## Organización de Archivos

```
MaulePro/
│
├── index.html                    # Página principal del portal
├── login.html                    # Página de login y registro
├── README.md                     # Documentación principal
│
├── assets/                       # Recursos estáticos
│   ├── css/
│   │   ├── main.css             # CSS principal (importa módulos)
│   │   ├── styles.css           # Estilos adicionales (legacy)
│   │   └── modules/             # Módulos CSS modulares
│   │       ├── _variables.css   # Variables CSS y colores
│   │       ├── _base.css        # Estilos base y fondo
│   │       ├── _navbar.css      # Estilos del navbar
│   │       ├── _hero.css        # Hero section y buscador
│   │       ├── _program-cards.css # Tarjetas de programas
│   │       ├── _carousel.css    # Carousel de información
│   │       └── _utilities.css   # Utilidades y helpers
│   ├── js/
│   │   ├── script.js            # Orquestador principal (515 líneas)
│   │   ├── main.js              # Punto de entrada principal
│   │   ├── data/                # Datos centralizados
│   │   │   └── programas.js     # Fuente única de verdad para programas
│   │   ├── components/          # Componentes reutilizables
│   │   │   └── BaseComponent.js # Clase base para componentes
│   │   ├── config/              # Configuración centralizada
│   │   │   ├── index.js         # Configuración principal
│   │   │   └── selectors.js     # Helpers de selectores
│   │   ├── modules/             # Módulos JavaScript
│   │   │   ├── carousel.js      # Gestión del carousel
│   │   │   ├── filters.js       # Sistema de búsqueda (index.html)
│   │   │   ├── userway.js       # Integración Userway
│   │   │   ├── modals/          # Gestión de modales
│   │   │   │   └── ModalManager.js # Apertura/cierre de modales
│   │   │   ├── forms/           # Gestión de formularios
│   │   │   │   └── FormManager.js # Validación y envío
│   │   │   └── search/          # Módulos de búsqueda
│   │   │       ├── FilterEngine.js    # Motor de filtrado
│   │   │       ├── SortEngine.js      # Motor de ordenamiento
│   │   │       ├── CardRenderer.js    # Renderizado seguro
│   │   │       ├── SearchManager.js   # Gestor unificado
│   │   │       └── ModalSearch.js     # Búsqueda modal
│   │   └── utils/               # Utilidades compartidas
│   │       ├── Logger.js        # Sistema de logging con niveles
│   │       ├── DeadlineManager.js     # Gestión de deadlines
│   │       ├── AccessibilityManager.js # Gestión de accesibilidad
│   │       ├── dom.js           # Utilidades DOM
│   │       ├── storage.js       # LocalStorage helpers
│   │       ├── date.js          # Utilidades de fecha
│   │       └── debounce.js      # Debounce/throttle
│   └── images/                  # Imágenes (todas centralizadas aquí)
│       ├── logo-gore-blanco-nuevo.png # Logo móvil navbar
│       ├── logo-diseño-sin-titulo.png # Logo desktop navbar
│       ├── logo-gore-blanco.png  # Logo footer
│       ├── logo-gore-horizontal.png # Logo horizontal
│       ├── logo-gore-negro.png   # Logo negro
│       ├── logo-gore.png         # Logo estándar
│       ├── claveunica-icon.svg   # Icono ClaveÚnica
│       └── ...
│
├── pages/                        # Subpáginas del portal
│   ├── buscar.html               # Página de resultados de búsqueda
│   ├── programas/                # Páginas de programas específicos
│   │   ├── circular-33.html     # Circular 33
│   │   ├── fndr-8.html          # Subvenciones FNDR 8%
│   │   ├── fndr-sub31.html      # FNDR Sub. 31 con Evaluación MIDESOYF
│   │   ├── fril.html            # Fondo Regional de Iniciativa Local
│   │   ├── frpd.html            # Fondo Regional para la Productividad
│   │   └── proyectos-menores.html # Proyectos Menores a 5.000 UTM
│   ├── financiamiento-programas.html
│   ├── postulacion-financiamiento.html
│   └── preguntas-frecuentes.html
│
├── components/                   # Componentes de desarrollo
│   ├── components.html          # Componentes reutilizables (referencia)
│   └── preview.html             # Vista previa de componentes
│
├── docs/                         # Documentación
│   ├── README.md                # Documentación técnica detallada
│   └── ESTRUCTURA.md            # Este archivo
│
└── utils/                        # Utilidades y scripts
    ├── server.py                 # Servidor Python local
    ├── start.sh                  # Script de inicio (macOS/Linux)
    └── package.json              # Configuración (si se usa)
```

## 📄 Descripción de Archivos Principales

### Páginas Principales

#### `index.html`
- Página de inicio del portal
- Hero section con información general
- Sistema de búsqueda y filtrado de programas
- Grid de programas con estados (Abiertos, Próximos, Cerrados)
- Navbar fijo con navegación
- Carousel de información con botón de cierre
- Footer institucional con logo blanco

#### `login.html`
- Página de autenticación
- Formulario de inicio de sesión
- Formulario de registro
- Recuperación de contraseña
- Validación de RUT y correo electrónico

#### `pages/buscar.html`
- Página de resultados de búsqueda
- Formulario de búsqueda avanzada
- Renderizado de resultados usando SearchManager
- Integración con módulos de búsqueda compartidos

### Páginas de Programas

Todas las páginas de programas (`pages/programas/*.html`) incluyen:
- Información detallada del programa
- Bases y documentación
- Botón "Postular aquí" estandarizado
- Navbar y footer consistentes

## 🎨 Recursos Estáticos

### CSS Modular (`assets/css/modules/`)

#### `_variables.css`
- Variables CSS para colores institucionales
- Variables de espaciado responsive
- Colores: azul (`#093F75`), verde abierto (`#018484`), rojo cerrado (`#FE6565`)

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
- Header con fondo institucional o gris (cerrado)
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

### JavaScript Modular (`assets/js/`)

#### Orquestador Principal

**`script.js`** (515 líneas)
- Orquestador principal de la aplicación
- Inicializa todos los módulos
- Maneja eventos globales
- Integración con Bootstrap
- Fallbacks para compatibilidad

#### Datos Centralizados

**`data/programas.js`**
- Fuente única de verdad para todos los programas
- Array de objetos de programas
- Funciones: `getAllProgramas`, `getProgramaByName`, `getProgramasByEstado`, `getProgramasByBenef`
- Namespace: `window.MaulePro.Data.programas`

#### Módulos de Búsqueda (`modules/search/`)

**`FilterEngine.js`**
- Motor de filtrado reutilizable
- Filtra por nombre, estado, beneficiario, región
- Validación de parámetros

**`SortEngine.js`**
- Motor de ordenamiento reutilizable
- Ordena por relevancia, abiertos primero, fecha, alfabético

**`CardRenderer.js`**
- Renderizado seguro de tarjetas (sin XSS)
- Usa `createElement` y `textContent`
- Funciones: `crearTarjetaElement`, `escapeHtml`

**`SearchManager.js`**
- Gestor unificado de búsqueda
- Orquesta FilterEngine, SortEngine y CardRenderer
- Maneja URL params
- Renderiza resultados y estados vacíos

**`ModalSearch.js`**
- Búsqueda modal completa
- Renderizado seguro sin `innerHTML` con datos del usuario
- Búsqueda en tiempo real (debounced)

#### Módulos de UI

**`modules/modals/ModalManager.js`**
- Gestión centralizada de modales
- Funciones: `open`, `close`, `init`, `setupTrigger`, `setupModalSwitch`

**`modules/forms/FormManager.js`**
- Gestión de formularios
- Validación: RUT, email, match de emails
- Handlers: login, registro, recuperación de contraseña
- Gestión de UI de usuario logueado/deslogueado

**`modules/filters.js`**
- Sistema de búsqueda y filtrado para `index.html`
- Integración con FilterEngine y SortEngine
- Actualización de contadores
- Cálculo de deadlines (usa DeadlineManager)

**`modules/carousel.js`**
- Gestión del carousel de información
- Botón de cierre
- Persistencia de estado en localStorage

**`modules/userway.js`**
- Integración con Userway
- Posicionamiento del widget
- Observador de cambios en el DOM

#### Utilidades (`utils/`)

**`Logger.js`**
- Sistema de logging con niveles (DEBUG, INFO, WARN, ERROR)
- Deshabilitación automática en producción
- Formato consistente con timestamp

**`DeadlineManager.js`**
- Gestión centralizada de deadlines
- Calcula días restantes
- Aplica clases CSS (urgent, soon)

**`AccessibilityManager.js`**
- Gestión de accesibilidad
- Spinner y toggle de UserWay

**`dom.js`**, **`storage.js`**, **`date.js`**, **`debounce.js`**
- Utilidades DOM, localStorage, fecha y debounce

#### Componentes

**`components/BaseComponent.js`**
- Clase base para componentes reutilizables
- Gestión automática de event listeners
- Métodos helpers comunes

#### Configuración

**`config/index.js`** y **`config/selectors.js`**
- Configuración centralizada
- Selectores DOM
- Helpers de acceso al DOM

### Imágenes (`assets/images/`)

Todas las imágenes están centralizadas en `assets/images/`:

- **`logo-gore-blanco-nuevo.png`**: Logo para navbar móvil
- **`logo-diseño-sin-titulo.png`**: Logo para navbar desktop (horizontal)
- **`logo-gore-blanco.png`**: Logo para footer
- **`logo-gore-horizontal.png`**: Logo horizontal (alternativo)
- **`logo-gore-negro.png`**: Logo negro para fondos claros
- **`logo-gore.png`**: Logo estándar
- **`claveunica-icon.svg`**: Icono ClaveÚnica
- **`claveunica-icon.png`**: Icono ClaveÚnica (PNG)

**Nota**: La carpeta del manual de marca ha sido eliminada. Todas las imágenes usadas están en `assets/images/`.

## 🛠️ Utilidades

### `utils/server.py`
- Servidor HTTP simple en Python
- Para desarrollo local
- Puerto por defecto: 8000

### `utils/start.sh`
- Script de inicio para macOS/Linux
- Ejecuta el servidor Python
- Requiere permisos de ejecución

## 📚 Documentación

### `README.md` (raíz)
- Documentación principal del proyecto
- Guía de inicio rápido
- Características y tecnologías
- Estructura básica

### `docs/README.md`
- Documentación técnica detallada
- Arquitectura del proyecto
- Sistema de logging
- Seguridad
- Estado del proyecto

### `docs/ESTRUCTURA.md`
- Este archivo
- Descripción detallada de la estructura del proyecto

## 🎯 Convenciones de Nomenclatura

- **Archivos HTML**: kebab-case (ej: `fndr-8.html`)
- **Clases CSS**: kebab-case (ej: `program-card`)
- **IDs**: camelCase (ej: `searchForm`)
- **Variables JavaScript**: camelCase (ej: `userwayBtn`)
- **Módulos CSS**: snake_case con prefijo `_` (ej: `_variables.css`)
- **Módulos JS**: PascalCase (ej: `ModalManager.js`)

## 📱 Responsive Design

Todas las páginas son completamente responsive:

- **Desktop**: > 992px - Layout completo
- **Tablet**: 768px - 992px - Layout adaptado
- **Móvil**: < 768px - Layout de una columna

## 🔧 Tecnologías por Archivo

### HTML
- HTML5 semántico
- Bootstrap 5.3.3 (CDN)
- Bootstrap Icons 1.11.3 (CDN)
- Estructura modular y accesible

### CSS
- Variables CSS
- Flexbox y Grid
- Media queries para responsive
- Animaciones CSS
- Arquitectura modular (7 módulos)

### JavaScript
- Vanilla JavaScript (sin dependencias)
- ES6+ sintaxis
- Módulos con IIFE
- Namespace global: `window.MaulePro`
- LocalStorage para persistencia
- Intersection Observer API
- Arquitectura modular (20+ archivos)

## 📊 Estadísticas del Proyecto

- **Páginas HTML**: 11+
- **Módulos CSS**: 7
- **Módulos JavaScript**: 20+
- **Componentes**: 1 (BaseComponent)
- **Utilidades**: 7 módulos
- **Imágenes**: 10+ variantes centralizadas
- **Reducción de código**: ~45.5% en `script.js` (946 → 515 líneas)

## 🚀 Flujo de Desarrollo

1. Editar archivos HTML/CSS/JS
2. Abrir con Live Server o servidor local
3. Probar en múltiples navegadores
4. Verificar responsive design
5. Optimizar y depurar

## 📝 Notas Importantes

- Todos los archivos HTML son independientes
- Los estilos están en módulos CSS externos (`assets/css/modules/`)
- El JavaScript está modularizado en `assets/js/modules/`
- No hay sistema de build - archivos estáticos directos
- Las dependencias se cargan desde CDN
- Todas las imágenes están en `assets/images/`
- Namespace global: `window.MaulePro` para organización

---

**Última actualización**: Noviembre 2025  
**Versión**: 2.0
