# 📚 Documentación Técnica - MaulePro

Documentación técnica detallada del portal MaulePro del Gobierno Regional del Maule.

## 📋 Índice

1. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [CSS Modular](#css-modular)
4. [JavaScript Modular](#javascript-modular)
5. [Manual de Marca](#manual-de-marca)
6. [Mejoras Implementadas](#mejoras-implementadas)
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
├── script.js                   # Funcionalidad principal (login/registro)
├── main.js                     # Punto de entrada principal
├── components/                 # Componentes reutilizables
│   └── BaseComponent.js        # Clase base
├── config/                     # Configuración centralizada
│   ├── index.js                # CONFIG principal
│   └── selectors.js            # Helpers de selectores
├── modules/                    # Módulos funcionales
│   ├── carousel.js             # Gestión del carousel
│   ├── filters.js              # Sistema de búsqueda
│   └── userway.js              # Integración Userway
└── utils/                      # Utilidades compartidas
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

---

## 💻 JavaScript Modular

### Módulos Funcionales

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

### Componentes

#### `components/BaseComponent.js`
- Clase base para componentes reutilizables
- Gestión automática de event listeners
- Métodos helpers comunes
- Validación de elementos

### Configuración

#### `config/index.js`
- Configuración centralizada
- Selectores DOM
- Claves de localStorage
- Configuración de features
- Configuración de Userway
- Configuración de animaciones

#### `config/selectors.js`
- Helpers para acceder a elementos del DOM
- Funciones: `getSelector()`, `getElement()`, `getElements()`, `elementExists()`

### Utilidades

#### `utils/dom.js`
- `create()` - Crea elementos con opciones
- `exists()` - Verifica existencia
- `waitFor()` - Espera elemento
- `scrollTo()` - Scroll suave
- `closest()` - Busca padre
- `clear()` - Limpia hijos
- `insertAfter()` / `insertBefore()` - Inserta elementos

#### `utils/storage.js`
- Helpers de localStorage con prefijo automático
- Serialización JSON automática
- Manejo de errores

#### `utils/date.js`
- `format()` - Formatea fechas
- `daysBetween()` - Calcula días entre fechas
- `formatDaysRemaining()` - Formatea días restantes
- Y más utilidades de fecha

#### `utils/debounce.js`
- `debounce()` - Debounce function
- `throttle()` - Throttle function

---

## 🎨 Manual de Marca

### Logos Implementados

- ✅ **Logo Horizontal**: `logo-gore-horizontal.png` - Para navbar
- ✅ **Logo Blanco**: `logo-gore-blanco.png` - Para footer y fondos oscuros
- ✅ **Logo Negro**: `logo-gore-negro.png` - Para fondos claros
- ✅ **Logo Estándar**: `logo-gore.png` - Versión general

### Colores Institucionales

- **Pantone 7421**: `#611616` (Rojo institucional)
- **Pantone 7420**: `#9B3D3D` (Rojo claro)
- **Pantone Black 7C**: `#3A3A3A` (Gris oscuro)

### Implementaciones

- ✅ Logo horizontal en navbar (todas las páginas)
- ✅ Logo blanco en footer
- ✅ Área de exclusión del logo definida
- ✅ Tamaños mínimos y máximos establecidos
- ✅ Sistema de espaciado corporativo

### Pendiente

- ⏭️ Verificar colores exactos en manual PDF
- ⏭️ Identificar tipografía corporativa
- ⏭️ Implementar tipografía corporativa
- ⏭️ Revisar especificaciones de espaciado
- ⏭️ Implementar patrones decorativos (si aplica)

Ver `SUGERENCIAS_MANUAL_MARCA.md` para más detalles.

---

## ✅ Mejoras Implementadas

### Refactorización
- ✅ CSS modularizado (7 módulos)
- ✅ JavaScript modularizado (3 módulos)
- ✅ Reducción de código: ~53.5%
- ✅ 11 páginas HTML actualizadas

### Arquitectura Modular - Fase 1
- ✅ BaseComponent implementado
- ✅ Configuración centralizada
- ✅ Utilidades compartidas (4 módulos)
- ✅ Helpers de selectores

### Diseño
- ✅ Buscador mejorado
- ✅ Título "Líneas de postulación" mejorado
- ✅ Deadlines con contorno amarillo
- ✅ Badges de deadline en header
- ✅ Footer con logo blanco
- ✅ Scrollbar personalizada
- ✅ Ocultación de scrollbar durante carga

### Funcionalidad
- ✅ Scroll automático a resultados
- ✅ Mensaje "no hay resultados"
- ✅ Búsqueda en tiempo real
- ✅ Contadores integrados en header

---

## 📊 Estado del Proyecto

### Completado ✅
- Refactorización CSS/JS
- Arquitectura Modular Fase 1
- Implementación de logos del manual de marca
- Mejoras de diseño y funcionalidad

### En Progreso ⏭️
- Fase 2: Componentes (pendiente)
- Fase 3: Sistema de Eventos (pendiente)
- Verificación de colores del manual (pendiente)
- Implementación de tipografía corporativa (pendiente)

### Pendiente 📋
- Optimización de imágenes
- Preconnect a CDNs
- Lazy loading
- Build system
- Testing

---

## 🔧 Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Flexbox, Grid
- **JavaScript ES6+**: Vanilla JavaScript modular
- **Bootstrap 5.3.3**: Framework CSS (CDN)
- **Bootstrap Icons 1.11.3**: Iconografía (CDN)
- **Userway**: Widget de accesibilidad

---

## 📚 Documentación Relacionada

- `ESTRUCTURA.md` - Estructura detallada del proyecto
- `REFACTORIZACION_COMPLETA.md` - Resumen de refactorización
- `FASE1_COMPLETADA.md` - Documentación de Fase 1
- `RESUMEN_SESION.md` - Resumen de sesión de desarrollo
- `MEJORAS_ARQUITECTURA_MODULAR.md` - Sugerencias de arquitectura
- `SUGERENCIAS_MANUAL_MARCA.md` - Sugerencias basadas en manual de marca

---

**Última actualización**: Noviembre 2025  
**Versión**: 1.0  
**Estado**: Fase 1 completada, listo para Fase 2
