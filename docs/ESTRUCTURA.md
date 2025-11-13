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
│   │   ├── script.js            # Funcionalidad principal (login/registro)
│   │   ├── main.js              # Punto de entrada principal
│   │   ├── components/          # Componentes reutilizables
│   │   │   └── BaseComponent.js # Clase base para componentes
│   │   ├── config/              # Configuración centralizada
│   │   │   ├── index.js         # Configuración principal
│   │   │   └── selectors.js    # Helpers de selectores
│   │   ├── modules/             # Módulos JavaScript
│   │   │   ├── carousel.js      # Gestión del carousel
│   │   │   ├── filters.js      # Sistema de búsqueda y filtrado
│   │   │   └── userway.js      # Integración con Userway
│   │   └── utils/               # Utilidades compartidas
│   │       ├── dom.js           # Utilidades DOM
│   │       ├── storage.js       # LocalStorage helpers
│   │       ├── date.js          # Utilidades de fecha
│   │       └── debounce.js      # Debounce/throttle
│   └── images/                   # Imágenes
│       ├── logo-gore-horizontal.png # Logo horizontal (navbar)
│       ├── logo-gore-blanco.png     # Logo blanco (footer)
│       ├── logo-gore-negro.png      # Logo negro
│       ├── logo-gore.png            # Logo estándar
│       └── Logo.png                 # Logo legacy
│
├── pages/                        # Subpáginas del portal
│   ├── programas/                # Páginas de programas específicos
│   │   ├── circular-33.html     # Circular 33
│   │   ├── fndr-8.html          # Subvenciones FNDR 8%
│   │   ├── fndr-sub31.html      # FNDR Sub. 31 con Evaluación MIDESOYF
│   │   ├── fril.html            # Fondo Regional de Iniciativa Local
│   │   ├── frpd.html            # Fondo Regional para la Productividad y el Desarrollo
│   │   └── proyectos-menores.html # Proyectos Menores a 5.000 UTM
│   ├── financiamiento-programas.html
│   ├── postulacion-financiamiento.html
│   └── preguntas-frecuentes.html # Página de preguntas frecuentes
│
├── components/                   # Componentes de desarrollo
│   ├── components.html          # Componentes reutilizables (referencia)
│   └── preview.html             # Vista previa de componentes
│
├── docs/                         # Documentación adicional
│   ├── README.md                # Documentación técnica detallada
│   ├── ESTRUCTURA.md            # Este archivo
│   ├── REFACTORIZACION_COMPLETA.md
│   ├── FASE1_COMPLETADA.md
│   ├── RESUMEN_SESION.md
│   ├── MEJORAS_ARQUITECTURA_MODULAR.md
│   ├── SUGERENCIAS_MANUAL_MARCA.md
│   └── INSTRUCCIONES.txt        # Instrucciones adicionales
│
├── RV_ Manual de marca actualizado/ # Manual de marca
│   ├── LOGO GORE HORIZONTAL.png
│   ├── LOGO NUEVO GORE BLANCO.png
│   ├── LOGO NUEVO GORE NEGRO.png
│   ├── Logo Nuevo Gore.png
│   └── MANUAL CORPORATIVO (2).pdf
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
- Hero section con información general y tarjetas de características
- Sistema de búsqueda y filtrado de programas con diseño mejorado
- Grid de programas con estados (Abiertos, Próximos, Cerrados)
- Contadores por estado integrados en el header
- Navbar fijo con navegación
- Carousel de información con botón de cierre
- Sección de información importante
- Footer con logo blanco

#### `login.html`
- Página de autenticación
- Formulario de inicio de sesión
- Formulario de registro
- Recuperación de contraseña
- Validación de RUT y correo electrónico

### Páginas de Programas

#### `pages/programas/circular-33.html`
- Circular 33 (FRIL - Fondo Regional de Iniciativa Local)
- Información sobre el programa
- Tipos de proyectos
- Bases y anexos
- Manual de postulación

#### `pages/programas/fndr-8.html`
- Subvenciones para actividades FNDR 8%
- Categorías de postulación (Cultural, Social, Deportiva, etc.)
- Documentación y anexos
- Sección de rendición
- Botón "Postular aquí" estandarizado

#### `pages/programas/fndr-sub31.html`
- FNDR Sub. 31 con Evaluación MIDESOYF
- Requisitos y documentación
- Manual de postulación
- Proceso de evaluación
- Botón "Postular aquí" estandarizado

#### `pages/programas/fril.html`
- Fondo Regional de Iniciativa Local (FRIL)
- Información detallada del programa
- Bases y documentación
- Botón "Postular aquí" estandarizado

#### `pages/programas/frpd.html`
- Fondo Regional para la Productividad y el Desarrollo (FRPD)
- Información del programa
- Requisitos y documentación
- Botón "Postular aquí" estandarizado

#### `pages/programas/proyectos-menores.html`
- Proyectos Menores a 5.000 UTM
- Información sobre proyectos menores
- Bases y anexos
- Estado de postulación
- Botón "Postular aquí" estandarizado

#### `pages/financiamiento-programas.html`
- Financiamiento para Programas
- Transferencias Subtítulo 33
- Glosas 7.1, 7.7 y 5.12
- Instructivos y manuales
- Botón "Postular aquí" estandarizado

#### `pages/postulacion-financiamiento.html`
- Postulación a Financiamiento
- Formularios y documentación

#### `pages/preguntas-frecuentes.html`
- Página de preguntas frecuentes
- Accordion de Bootstrap
- Información sobre postulaciones
- Enlaces de ayuda

## 🎨 Recursos Estáticos

### CSS Modular (`assets/css/modules/`)

#### `_variables.css`
- Variables CSS para colores institucionales
- Variables de espaciado
- Colores Pantone del manual de marca

#### `_base.css`
- Estilos base de `html` y `body`
- Fondos con gradientes y animaciones
- Ocultación de scrollbar durante carga
- Estilos de scrollbar personalizados

#### `_navbar.css`
- Estilos del navbar
- Logo con área de exclusión
- Responsive design
- Estados hover y active

#### `_hero.css`
- Hero section
- Tarjetas de características
- Estilos del buscador mejorado
- Responsive design

#### `_program-cards.css`
- Tarjetas de programas
- Header con fondo institucional
- Body con información estructurada
- Badges de estado y deadline
- Animaciones y efectos hover

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

#### `script.js`
- Funcionalidad principal de login/registro
- Manejo de modales
- Validación de formularios
- Persistencia con localStorage

#### `modules/carousel.js`
- Gestión del carousel de información
- Botón de cierre
- Persistencia de estado en localStorage

#### `modules/filters.js`
- Sistema de búsqueda y filtrado
- Filtros por estado, beneficiario y ordenamiento
- Actualización de contadores
- Cálculo de deadlines
- Scroll automático a resultados
- Mensaje "no hay resultados"
- Animaciones de entrada
- Efecto ripple en botones

#### `modules/userway.js`
- Integración con Userway
- Posicionamiento del widget en esquina inferior derecha
- Observador de cambios en el DOM

#### `components/BaseComponent.js`
- Clase base para componentes reutilizables
- Gestión automática de event listeners
- Métodos helpers comunes

#### `config/index.js`
- Configuración centralizada
- Selectores DOM
- Claves de localStorage
- Configuración de features

#### `config/selectors.js`
- Helpers para acceder a elementos del DOM
- Funciones: `getSelector()`, `getElement()`, `getElements()`, `elementExists()`

#### `utils/dom.js`
- Utilidades DOM: `create()`, `exists()`, `waitFor()`, `scrollTo()`, etc.

#### `utils/storage.js`
- Helpers de localStorage con prefijo automático
- Serialización JSON automática

#### `utils/date.js`
- Utilidades de fecha: `format()`, `daysBetween()`, `formatDaysRemaining()`, etc.

#### `utils/debounce.js`
- Funciones `debounce()` y `throttle()`

### Imágenes (`assets/images/`)

#### Logos del Manual de Marca
- `logo-gore-horizontal.png`: Logo horizontal para navbar (1641x619px)
- `logo-gore-blanco.png`: Logo blanco para fondos oscuros (942x1023px)
- `logo-gore-negro.png`: Logo negro para fondos claros (1176x1287px)
- `logo-gore.png`: Logo estándar (1641x1216px)
- `Logo.png`: Logo legacy (mantenido por compatibilidad)

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
- Información sobre el desarrollo
- Limitaciones y mejoras futuras

### `docs/ESTRUCTURA.md`
- Este archivo
- Descripción detallada de la estructura del proyecto

### `docs/REFACTORIZACION_COMPLETA.md`
- Resumen de la refactorización CSS/JS
- Métricas de reducción de código
- Beneficios obtenidos

### `docs/FASE1_COMPLETADA.md`
- Documentación de la Fase 1 de arquitectura modular
- Componentes creados
- Utilidades implementadas

### `docs/RESUMEN_SESION.md`
- Resumen de sesión de desarrollo
- Estado del proyecto
- Próximos pasos

### `docs/MEJORAS_ARQUITECTURA_MODULAR.md`
- Sugerencias detalladas para mejorar la arquitectura
- Plan de implementación por fases
- Ejemplos de código

### `docs/SUGERENCIAS_MANUAL_MARCA.md`
- Sugerencias basadas en el manual de marca
- Uso correcto de logos
- Colores institucionales
- Tipografía corporativa

## 🔗 Navegación

La navegación está implementada en todas las páginas con:

- **Navbar fijo**: Se mantiene visible al hacer scroll
- **Menú responsive**: Adaptado para móvil, tablet y desktop
- **Enlaces internos**: Entre programas relacionados
- **Logo institucional**: Logo horizontal del GORE Maule

## 🎯 Convenciones de Nomenclatura

- **Archivos HTML**: kebab-case (ej: `fndr-8.html`)
- **Clases CSS**: kebab-case (ej: `program-card`)
- **IDs**: camelCase (ej: `searchForm`)
- **Variables JavaScript**: camelCase (ej: `userwayBtn`)
- **Módulos CSS**: snake_case con prefijo `_` (ej: `_variables.css`)

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
- LocalStorage para persistencia
- Intersection Observer API
- Arquitectura modular (componentes, config, utils, modules)

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
- Logos del manual de marca disponibles en `assets/images/`
- Manual de marca disponible en `RV_ Manual de marca actualizado/`

## 🎨 Manual de Marca

El proyecto incluye el manual de marca del Gobierno Regional del Maule:

- **Ubicación**: `RV_ Manual de marca actualizado/`
- **Logos**: Disponibles en múltiples variantes (horizontal, blanco, negro)
- **PDF**: `MANUAL CORPORATIVO (2).pdf`
- **Implementación**: Logos movidos a `assets/images/` y referencias actualizadas

## 📊 Estadísticas del Proyecto

- **Páginas HTML**: 11
- **Módulos CSS**: 7
- **Módulos JavaScript**: 3
- **Componentes**: 1 (BaseComponent)
- **Utilidades**: 20+ funciones
- **Logos**: 4 variantes
- **Reducción de código**: ~58.6% después de refactorización
