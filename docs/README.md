# 📚 Documentación Técnica Extendida - Portal MaulePro

**Versión:** 2.1  
**Fecha:** Noviembre 2025  
**Autor:** Equipo de Desarrollo MaulePro

---

## 📋 Tabla de Contenidos

1. [Arquitectura General](#arquitectura-general)
2. [Script Principal (script.js)](#script-principal-scriptjs)
3. [Módulos de Búsqueda](#módulos-de-búsqueda)
4. [Módulos de UI](#módulos-de-ui)
5. [Utilidades](#utilidades)
6. [Datos](#datos)
7. [Flujos de Trabajo](#flujos-de-trabajo)
8. [API Pública](#api-pública)

---

## 🏗️ Arquitectura General

### Patrón de Diseño

El proyecto utiliza el patrón **IIFE (Immediately Invoked Function Expression)** con namespace global `window.MaulePro` para evitar contaminación del scope global y mantener compatibilidad sin necesidad de bundlers.

### Estructura de Namespace

```javascript
window.MaulePro = {
    Data: { ... },           // Datos centralizados
    Utils: { ... },          // Utilidades
    Search: { ... },         // Módulos de búsqueda
    Modules: { ... }         // Módulos de UI
}
```

### Orden de Carga de Scripts

1. **Bootstrap JS** (CDN)
2. **Utils básicos**: Logger, debounce
3. **Data y Managers**: programas.js, DeadlineManager, AccessibilityManager
4. **Search Modules**: CardRenderer
5. **Script principal**: script.js
6. **Módulos**: navbar-spacer, program-cards-generator, filters (defer), userway (defer)

---

## 📄 Script Principal (script.js)

### Descripción

Script orquestador principal que inicializa las funcionalidades esenciales del portal.

### Funciones Principales

#### `initSmoothScroll()`

**Propósito:** Inicializa scroll suave para anclas internas.

**Funcionamiento:**
- Busca todos los enlaces con `href` que comienzan con `#`
- Intercepta el evento `click` para prevenir el comportamiento por defecto
- Usa `scrollIntoView({ behavior: 'smooth' })` para scroll suave
- Valida que el elemento destino exista antes de hacer scroll

**Parámetros:** Ninguno

**Retorno:** `void`

**Ejemplo de uso:**
```html
<a href="#nosotros">Ir a Nosotros</a>
```

---

#### `initCardAnimations()`

**Propósito:** Inicializa animaciones de entrada para tarjetas usando IntersectionObserver.

**Funcionamiento:**
- Verifica si hay elementos con `[data-animate]`
- Si `filters.js` ya maneja las animaciones, no duplica la funcionalidad
- Crea un `IntersectionObserver` con threshold 0.1 y rootMargin negativo
- Cuando un elemento entra en el viewport, agrega la clase `in`
- Deja de observar el elemento después de la primera animación

**Parámetros:** Ninguno

**Retorno:** `void`

**Configuración del Observer:**
```javascript
{
    threshold: 0.1,                    // 10% del elemento visible
    rootMargin: '0px 0px -50px 0px'    // Trigger 50px antes del viewport
}
```

---

#### `highlightActiveNavLink()`

**Propósito:** Resalta el enlace de navegación activo según la página actual.

**Funcionamiento:**
- Obtiene el nombre del archivo actual desde `window.location.pathname`
- Compara con el `href` de cada `.nav-link`
- Agrega clase `active` al enlace coincidente
- Remueve `active` de los demás enlaces

**Parámetros:** Ninguno

**Retorno:** `void`

**Lógica de comparación:**
- Compara el nombre del archivo (ej: `index.html`)
- Maneja el caso especial de la raíz (`''` → `index.html`)

---

#### `verifyBootstrap()`

**Propósito:** Verifica que Bootstrap esté cargado correctamente.

**Funcionamiento:**
- Verifica si `window.bootstrap` está definido
- Registra mensaje de debug si está disponible
- Registra warning si no está disponible

**Parámetros:** Ninguno

**Retorno:** `void`

**Uso del Logger:**
```javascript
Logger?.debug('Bootstrap cargado correctamente');
Logger?.warn('Bootstrap no está disponible...');
```

---

#### `initAccessibility()`

**Propósito:** Inicializa la función de accesibilidad.

**Funcionamiento:**
- Verifica si `window.Accesibilidad` ya existe (expuesto por AccessibilityManager)
- Si no existe y AccessibilityManager está disponible, crea un fallback
- El fallback llama a `AccessibilityManager.execute()`

**Parámetros:** Ninguno

**Retorno:** `void`

**Nota:** La función `window.Accesibilidad` es expuesta globalmente por `AccessibilityManager.js` para uso desde HTML.

---

#### `init()`

**Propósito:** Función principal de inicialización.

**Funcionamiento:**
- Se ejecuta cuando el DOM está listo
- Verifica dependencias (Bootstrap)
- Inicializa todas las funcionalidades esenciales:
  1. Scroll suave
  2. Animaciones de tarjetas
  3. Accesibilidad
  4. Resaltado de enlace activo

**Parámetros:** Ninguno

**Retorno:** `void`

**Orden de inicialización:**
1. `verifyBootstrap()`
2. `initSmoothScroll()`
3. `initCardAnimations()`
4. `initAccessibility()`
5. `highlightActiveNavLink()`

---

## 🔍 Módulos de Búsqueda

### FilterEngine.js

**Propósito:** Motor de filtrado de programas según múltiples criterios.

#### `filtrarProgramas(programas, params)`

**Descripción:** Filtra un array de programas según parámetros de búsqueda.

**Parámetros:**
- `programas` (Array): Lista de programas a filtrar
- `params` (Object): Objeto con parámetros de filtrado
  - `q` (string): Texto de búsqueda (opcional)
  - `estado` (string): Estado del programa - `'open'`, `'soon'`, `'closed'` (opcional)
  - `benef` (string): Tipo de beneficiario (opcional)
  - `region` (string): Región/alcance (opcional)

**Retorno:** `Array` - Programas filtrados

**Funcionamiento:**
1. Valida que `programas` sea un array no vacío
2. Normaliza parámetros (trim, toLowerCase)
3. Aplica filtros en secuencia:
   - Filtro por texto: busca en `programa.name`
   - Filtro por estado: comparación exacta
   - Filtro por beneficiario: comparación exacta
   - Filtro por región: comparación case-insensitive
4. Retorna programas que pasan todos los filtros activos

**Ejemplo:**
```javascript
const resultados = FilterEngine.filtrarProgramas(programas, {
    q: 'fndr',
    estado: 'open',
    benef: 'org'
});
```

---

#### `validateSearchParams(params)`

**Descripción:** Valida parámetros de búsqueda.

**Parámetros:**
- `params` (Object): Parámetros a validar

**Retorno:** `Object` con:
- `isValid` (boolean): Si los parámetros son válidos
- `errors` (Array): Array de mensajes de error

**Validaciones:**
- `q` debe ser string
- `estado` debe ser: `'open'`, `'soon'`, `'closed'` o `''`
- `benef` debe ser válido: `'municipios'`, `'servicios'`, `'org'`, `'personas'`, `'empresas'` o `''`
- `orden` debe ser: `'relevance'`, `'openfirst'`, `'date'`, `'alpha'`

---

### SortEngine.js

**Propósito:** Motor de ordenamiento de programas según múltiples criterios.

#### `ordenarProgramas(programas, orden)`

**Descripción:** Ordena un array de programas según el criterio especificado.

**Parámetros:**
- `programas` (Array): Lista de programas a ordenar
- `orden` (string): Tipo de ordenamiento - `'relevance'` (default), `'openfirst'`, `'date'`, `'alpha'`

**Retorno:** `Array` - Nueva instancia ordenada (no modifica el original)

**Tipos de Ordenamiento:**

1. **`'alpha'`**: Ordenamiento alfabético por nombre
   - Usa `localeCompare` con locale `'es'`

2. **`'openfirst'`**: Ordena por estado (abiertos primero)
   - Ranking: `open: 3`, `soon: 2`, `closed: 1`
   - Mayor rank primero

3. **`'date'`**: Ordena por fecha de cierre
   - Fechas válidas se ordenan ascendente
   - Programas sin fecha van al final (fecha `9999-12-31`)

4. **`'relevance'`** (default): Ordenamiento por relevancia
   - Primero por estado (abiertos primero)
   - Luego por nombre alfabético si tienen el mismo estado

**Ejemplo:**
```javascript
const ordenados = SortEngine.ordenarProgramas(programas, 'openfirst');
```

---

#### `isValidSortOrder(orden)`

**Descripción:** Valida si un tipo de ordenamiento es válido.

**Parámetros:**
- `orden` (string): Tipo de ordenamiento a validar

**Retorno:** `boolean`

---

### CardRenderer.js

**Propósito:** Generador de elementos DOM para tarjetas de programas con seguridad XSS.

#### `escapeHtml(text)`

**Descripción:** Escapa texto para prevenir inyección XSS.

**Parámetros:**
- `text` (string): Texto a escapar

**Retorno:** `string` - Texto escapado

**Funcionamiento:**
- Crea un elemento `div` temporal
- Usa `textContent` para escapar automáticamente
- Retorna `innerHTML` del elemento (ya escapado)

**Nota:** Este método previene XSS al convertir caracteres especiales a entidades HTML.

---

#### `crearTarjetaElement(programa)`

**Descripción:** Crea un elemento DOM completo de tarjeta de programa.

**Parámetros:**
- `programa` (Object): Objeto con datos del programa
  - `name` (string): Nombre del programa
  - `benef` (string): Tipo de beneficiario
  - `estado` (string): Estado del programa
  - `close` (string): Fecha de cierre (ISO)
  - `beneficiarios` (string): Descripción de beneficiarios
  - `fechas` (string): Rango de fechas
  - `montos` (string): Información de montos
  - `link` (string): Ruta a la página del programa
  - `hasDeadline` (boolean): Si tiene deadline visible
  - `deadlineUrgent` (boolean): Si el deadline es urgente

**Retorno:** `HTMLElement|null` - Elemento DOM de la columna con la tarjeta, o `null` si el programa es inválido

**Estructura Generada:**
```html
<div class="col-12 col-md-6 col-lg-3" data-program data-name="..." data-benef="..." data-estado="..." data-close="...">
    <article class="program-card">
        <div class="program-card-header">
            <div class="program-card-header-top">
                <span class="program-card-status-badge">...</span>
                <span class="deadline-badge" data-deadline></span>
            </div>
            <h3>Nombre del Programa</h3>
        </div>
        <div class="program-card-body">
            <div class="program-card-info">
                <!-- Items de información -->
            </div>
            <div class="program-card-footer">
                <a class="btn btn-outline-dark" href="...">Ver detalles</a>
            </div>
        </div>
    </article>
</div>
```

**Funcionamiento:**
1. Valida que el programa sea un objeto válido
2. Crea contenedor principal con atributos `data-*`
3. Crea header con badge de estado y deadline
4. Crea body con información del programa
5. Usa `createElement` y `textContent` para prevenir XSS

---

#### `crearHeader(programa)`

**Descripción:** Crea el header de la tarjeta.

**Parámetros:**
- `programa` (Object): Datos del programa

**Retorno:** `HTMLElement` - Elemento header

**Funcionamiento:**
- Si `hasDeadline` es `true`: crea contenedor con badge de estado y badge de deadline
- Si `hasDeadline` es `false`: solo crea badge de estado
- Agrega título del programa

---

#### `crearEstadoBadge(estado)`

**Descripción:** Crea el badge de estado.

**Parámetros:**
- `estado` (string): Estado del programa

**Retorno:** `HTMLElement` - Elemento badge

**Estados:**
- `'open'`: Badge verde con texto "Abierto"
- `'soon'`: Badge amarillo con texto "Próximo"
- `'closed'`: Badge gris con texto "Cerrado" (default)

---

#### `crearBody(programa)`

**Descripción:** Crea el body de la tarjeta.

**Parámetros:**
- `programa` (Object): Datos del programa

**Retorno:** `HTMLElement` - Elemento body

**Contenido:**
- Información de beneficiarios
- Información de fechas
- Información de montos
- Botón "Ver detalles" con enlace

---

#### `crearInfoItem(iconClass, label, value)`

**Descripción:** Crea un item de información.

**Parámetros:**
- `iconClass` (string): Clase del ícono Bootstrap Icons
- `label` (string): Etiqueta del campo
- `value` (string): Valor del campo

**Retorno:** `HTMLElement` - Elemento item

---

### SearchManager.js

**Propósito:** Gestor unificado de búsqueda y filtrado de programas.

#### `SearchManager(options)`

**Descripción:** Constructor de la clase SearchManager.

**Parámetros:**
- `options` (Object): Opciones de configuración
  - `programas` (Array): Lista de programas
  - `container` (HTMLElement): Contenedor donde renderizar
  - `onResultsChange` (Function): Callback cuando cambian los resultados
  - `onCountChange` (Function): Callback cuando cambian los contadores

**Propiedades:**
- `this.programas`: Array de programas
- `this.container`: Contenedor DOM
- `this.currentResults`: Resultados actuales
- `this.currentParams`: Parámetros actuales

---

#### `search(params)`

**Descripción:** Ejecuta búsqueda y filtrado.

**Parámetros:**
- `params` (Object): Parámetros de búsqueda
  - `q` (string): Texto de búsqueda
  - `estado` (string): Estado
  - `benef` (string): Beneficiario
  - `orden` (string): Tipo de ordenamiento
  - `region` (string): Región

**Retorno:** `Array` - Resultados filtrados y ordenados

**Funcionamiento:**
1. Valida parámetros usando `FilterEngine.validateSearchParams`
2. Normaliza parámetros
3. Filtra usando `FilterEngine.filtrarProgramas`
4. Ordena usando `SortEngine.ordenarProgramas`
5. Guarda resultados y parámetros
6. Ejecuta callbacks si están definidos

---

#### `renderResults(resultados, container)`

**Descripción:** Renderiza resultados en el contenedor.

**Parámetros:**
- `resultados` (Array, opcional): Resultados a renderizar (usa `this.currentResults` si no se proporciona)
- `container` (HTMLElement, opcional): Contenedor (usa `this.container` si no se proporciona)

**Retorno:** `void`

**Funcionamiento:**
1. Limpia el contenedor
2. Si no hay resultados, renderiza estado vacío
3. Usa `CardRenderer.crearTarjetaElement` para cada programa
4. Usa `DocumentFragment` para mejor rendimiento
5. Actualiza contadores

---

#### `renderEmptyState(container)`

**Descripción:** Renderiza estado vacío cuando no hay resultados.

**Parámetros:**
- `container` (HTMLElement): Contenedor

**Retorno:** `void`

---

#### `updateCounters(resultados)`

**Descripción:** Actualiza contadores de resultados.

**Parámetros:**
- `resultados` (Array, opcional): Resultados actuales

**Retorno:** `void`

**Funcionamiento:**
- Calcula total, abiertos, próximos y cerrados
- Ejecuta callback `onCountChange` con los contadores

---

#### `SearchManager.getUrlParams()`

**Descripción:** Obtiene parámetros de búsqueda desde URL.

**Retorno:** `Object` - Parámetros normalizados

**Ejemplo:**
```javascript
// URL: buscar.html?q=fndr&estado=open
const params = SearchManager.getUrlParams();
// { q: 'fndr', estado: 'open', benef: '', orden: 'relevance', region: '' }
```

---

#### `SearchManager.fillForm(params, formElements)`

**Descripción:** Llena formularios con parámetros.

**Parámetros:**
- `params` (Object): Parámetros a usar
- `formElements` (Object): Objeto con IDs de elementos del formulario
  - `q` (string): ID del input de búsqueda
  - `estado` (string): ID del select de estado
  - `benef` (string): ID del select de beneficiario
  - `orden` (string): ID del select de ordenamiento

**Retorno:** `void`

---

## 🎨 Módulos de UI

### filters.js

**Propósito:** Sistema de búsqueda y filtrado de programas para `index.html`.

#### `FilterManager`

**Descripción:** Objeto que gestiona el filtrado y ordenamiento de programas.

**Propiedades:**
- `grid` (HTMLElement): Contenedor de tarjetas
- `cards` (Array): Array de tarjetas DOM
- `q` (HTMLInputElement): Input de búsqueda
- `estado` (HTMLSelectElement): Select de estado
- `benef` (HTMLSelectElement): Select de beneficiario
- `orden` (HTMLSelectElement): Select de ordenamiento
- `form` (HTMLFormElement): Formulario de búsqueda
- `count` (HTMLElement): Elemento contador
- `debouncedApply` (Function): Función apply con debounce

---

#### `init()`

**Descripción:** Inicializa el FilterManager.

**Funcionamiento:**
1. Obtiene el contenedor `#grid`
2. Verifica si el formulario tiene `action` (redirección)
3. Si tiene `action`: solo inicializa funcionalidades no dependientes del formulario
4. Si no tiene `action`: inicializa filtrado local completo
5. Crea función debounced para inputs de texto (300ms)
6. Bindea eventos y aplica filtrado inicial

---

#### `bindEvents()`

**Descripción:** Bindea eventos a los elementos del formulario.

**Funcionamiento:**
- Atajo de teclado `/`: enfoca el input de búsqueda
- Si no hay `action`: intercepta submit y aplica filtros localmente
- Input de texto: usa debounce (300ms)
- Selects: aplicación inmediata

---

#### `getFilterValues()`

**Descripción:** Obtiene los valores actuales de los filtros.

**Retorno:** `Object` con:
- `q` (string): Texto de búsqueda (lowercase, trimmed)
- `estado` (string): Estado seleccionado
- `benef` (string): Beneficiario seleccionado
- `orden` (string): Ordenamiento seleccionado (default: `'relevance'`)

---

#### `cardsToPrograms(cards)`

**Descripción:** Convierte elementos DOM de tarjetas a objetos de programas.

**Parámetros:**
- `cards` (Array): Array de elementos DOM

**Retorno:** `Array` - Array de objetos de programas con propiedad `elemento`

---

#### `filterCards(cards, filters)`

**Descripción:** Filtra las tarjetas usando FilterEngine o fallback manual.

**Parámetros:**
- `cards` (Array): Tarjetas a filtrar
- `filters` (Object): Valores de filtros

**Retorno:** `Array` - Tarjetas filtradas

**Funcionamiento:**
- Si `FilterEngine` está disponible: usa `FilterEngine.filtrarProgramas`
- Si no: usa filtrado manual básico

---

#### `sortCards(cards, orden)`

**Descripción:** Ordena las tarjetas usando SortEngine o fallback manual.

**Parámetros:**
- `cards` (Array): Tarjetas a ordenar
- `orden` (string): Tipo de ordenamiento

**Retorno:** `Array` - Tarjetas ordenadas

---

#### `updateDOM(visible)`

**Descripción:** Actualiza el DOM con las tarjetas visibles.

**Parámetros:**
- `visible` (Array): Tarjetas visibles

**Retorno:** `void`

**Funcionamiento:**
1. Oculta todas las tarjetas
2. Muestra solo las tarjetas visibles
3. Reordena en el DOM usando `DocumentFragment`

---

#### `apply()`

**Descripción:** Aplica filtros y ordenamiento a las tarjetas.

**Retorno:** `void`

**Funcionamiento:**
1. Obtiene valores de filtros
2. Filtra tarjetas
3. Ordena tarjetas
4. Actualiza DOM
5. Actualiza contadores

---

#### `updateCounters(visible)`

**Descripción:** Actualiza los contadores de resultados.

**Parámetros:**
- `visible` (Array): Array de tarjetas visibles

**Retorno:** `void`

---

#### `paintDeadlines()`

**Descripción:** Pinta los deadlines dinámicamente según las fechas.

**Retorno:** `void`

**Funcionamiento:**
- Usa `DeadlineManager.paintAllDeadlines('[data-program]')`

---

#### `initAnimations()`

**Descripción:** Inicializa animaciones de entrada usando IntersectionObserver.

**Retorno:** `void`

**Funcionamiento:**
- Observa elementos con `[data-animate]`
- Cuando entran en viewport, agrega clase `in`
- Usa `rootMargin: '0px 0px -10% 0px'` y `threshold: 0.1`

---

#### `initRipple()`

**Descripción:** Inicializa efecto ripple en botones.

**Retorno:** `void`

**Funcionamiento:**
- Agrega listener de click a botones `.program-card .btn`
- Crea elemento `span.ripple` en la posición del click
- Calcula tamaño basado en el botón
- Remueve el ripple después de 450ms

---

#### `initToast()`

**Descripción:** Inicializa toasts de notificación.

**Retorno:** `void`

**Funcionamiento:**
- Busca elementos con texto "avisarme"
- Al hacer click, muestra toast `#toastAviso` usando Bootstrap Toast

---

### navbar-spacer.js

**Propósito:** Calcula dinámicamente la altura del navbar y ajusta el margen del contenido.

#### `adjustContentSpacing()`

**Descripción:** Ajusta el margen superior de los elementos con clase `.mt-header`.

**Funcionamiento:**
1. Obtiene el navbar
2. Calcula su altura real (`offsetHeight`)
3. Agrega 20px de espacio adicional
4. Aplica `marginTop` a todos los elementos `.mt-header`

**Retorno:** `void`

---

#### `setupObservers()`

**Descripción:** Configura observadores para cambios en el navbar.

**Funcionamiento:**
1. Si `ResizeObserver` está disponible: observa cambios de tamaño del navbar
2. Agrega listener de `resize` de ventana como fallback
3. Ejecuta ajuste inicial después de 200ms

**Retorno:** `void`

---

#### `destroy()`

**Descripción:** Limpia recursos cuando se destruye el módulo.

**Funcionamiento:**
- Desconecta `ResizeObserver`
- Remueve listener de `resize`

**Retorno:** `void`

**API Pública:**
```javascript
window.MaulePro.Modules.NavbarSpacer.destroy();
window.MaulePro.Modules.NavbarSpacer.adjust();
```

---

### program-cards-generator.js

**Propósito:** Genera tarjetas de programas dinámicamente desde `programas.js`.

#### `generateProgramCards(containerId)`

**Descripción:** Genera y renderiza todas las tarjetas de programas.

**Parámetros:**
- `containerId` (string, opcional): ID del contenedor (default: `'grid'`)

**Retorno:** `void`

**Funcionamiento:**
1. Obtiene el contenedor
2. Verifica que `programas.js` esté cargado
3. Verifica que `CardRenderer` esté disponible
4. Si ya hay tarjetas con `[data-program]`, no genera (fallback)
5. Genera tarjetas usando `CardRenderer.crearTarjetaElement`
6. Usa `DocumentFragment` para mejor rendimiento
7. Pinta deadlines usando `DeadlineManager`
8. Actualiza contador

**API Pública:**
```javascript
window.MaulePro.Modules.ProgramCardsGenerator.generate('grid');
```

---

### userway.js

**Propósito:** Posiciona el widget de accesibilidad Userway en la esquina inferior derecha.

**Funcionamiento:**
1. Carga script de Userway desde CDN
2. Intenta posicionar el widget en múltiples momentos (0ms, 500ms, 1s, 2s, 3s, 5s)
3. Usa `MutationObserver` para detectar cuando el widget se agrega dinámicamente
4. Aplica estilos CSS con `!important`:
   - `position: fixed`
   - `bottom: 20px`
   - `right: 20px`
   - `z-index: 9999`

**Selectores buscados:**
- `.uw-widget-button`
- `[id*="userway-widget"]`
- `[class*="userway-widget"]`
- `iframe[title*="Userway"]`
- `iframe[title*="Accessibility"]`

---

## 🛠️ Utilidades

### Logger.js

**Propósito:** Sistema de logging con niveles y control de producción.

#### Configuración

```javascript
const config = {
    isProduction: // Detecta automáticamente si no es localhost
    minLevel: LogLevel.INFO,  // Nivel mínimo
    prefix: '[MaulePro]',
    dateFormat: 'iso'
};
```

#### Niveles de Logging

- `LogLevel.DEBUG` (0): Solo en desarrollo
- `LogLevel.INFO` (1): Información general
- `LogLevel.WARN` (2): Advertencias
- `LogLevel.ERROR` (3): Errores
- `LogLevel.NONE` (4): Sin logs

#### Métodos

##### `Logger.debug(message, ...args)`

**Descripción:** Log de debug (solo en desarrollo).

**Parámetros:**
- `message` (string): Mensaje
- `...args` (any): Argumentos adicionales

---

##### `Logger.info(message, ...args)`

**Descripción:** Log de información.

---

##### `Logger.warn(message, ...args)`

**Descripción:** Log de advertencia.

---

##### `Logger.error(message, ...args)`

**Descripción:** Log de error.

---

##### `Logger.setLevel(level)`

**Descripción:** Cambia el nivel mínimo de log.

**Parámetros:**
- `level` (number): Nuevo nivel mínimo

---

##### `Logger.setProductionMode(enabled)`

**Descripción:** Habilita/deshabilita logs en producción.

**Parámetros:**
- `enabled` (boolean): Habilitar logs

---

##### `Logger.group(label)`

**Descripción:** Inicia un grupo de logs.

---

##### `Logger.groupEnd()`

**Descripción:** Cierra un grupo de logs.

---

##### `Logger.table(data, columns)`

**Descripción:** Muestra datos en formato tabla.

---

##### `Logger.styled(message, styles, ...args)`

**Descripción:** Log con estilos CSS personalizados.

---

### DeadlineManager.js

**Propósito:** Gestión centralizada de deadlines y fechas de cierre.

#### `paintAllDeadlines(selector)`

**Descripción:** Pinta todos los deadlines en elementos con `data-program` y `data-close`.

**Parámetros:**
- `selector` (string, opcional): Selector CSS (default: `'[data-program][data-close]'`)

**Retorno:** `void`

**Funcionamiento:**
1. Busca todos los elementos con el selector
2. Para cada elemento, busca badge `[data-deadline]`
3. Calcula días restantes
4. Actualiza texto y clase CSS del badge

---

#### `paintDeadline(elementOrSelector)`

**Descripción:** Pinta el deadline de un elemento específico.

**Parámetros:**
- `elementOrSelector` (HTMLElement|string): Elemento o selector CSS

**Retorno:** `boolean` - `true` si se pintó exitosamente

---

#### `getDaysRemaining(closeDate)`

**Descripción:** Calcula días restantes para una fecha.

**Parámetros:**
- `closeDate` (Date|string): Fecha de cierre

**Retorno:** `number|null` - Días restantes o `null` si la fecha es inválida

**Funcionamiento:**
- Calcula diferencia entre fecha de cierre y fecha actual
- Retorna `null` si la fecha es inválida o ya pasó

---

#### `getDeadlineInfo(closeDate)`

**Descripción:** Obtiene información completa de deadline para una fecha.

**Parámetros:**
- `closeDate` (Date|string): Fecha de cierre

**Retorno:** `Object` con:
- `days` (number|null): Días restantes
- `text` (string): Texto del deadline
- `className` (string): Clase CSS
- `isUrgent` (boolean): Si es urgente (≤3 días)
- `show` (boolean): Si debe mostrarse

**Textos generados:**
- `0 días`: "Finaliza hoy"
- `1 día`: "Finaliza en 1 día"
- `>1 día`: "Finaliza en X días"

**Clases CSS:**
- `urgent`: ≤3 días
- `soon`: 4-10 días
- `''`: >10 días

---

### AccessibilityManager.js

**Propósito:** Gestión centralizada de funcionalidades de accesibilidad.

#### `toggleUserWay()`

**Descripción:** Toggle del widget de accesibilidad UserWay.

**Retorno:** `void`

**Funcionamiento:**
- Verifica si `UserWay` está disponible
- Llama a `UserWay.widgetToggle()`

---

#### `showSpinner(elementOrId)`

**Descripción:** Muestra el spinner de accesibilidad.

**Parámetros:**
- `elementOrId` (string|HTMLElement): ID o elemento del ícono

**Retorno:** `void`

**Funcionamiento:**
- Remueve `bg-primary` y `rounded-pill`
- Agrega `spinner-grow`

---

#### `hideSpinner(elementOrId)`

**Descripción:** Oculta el spinner de accesibilidad.

**Parámetros:**
- `elementOrId` (string|HTMLElement): ID o elemento del ícono

**Retorno:** `void`

---

#### `execute(iconId)`

**Descripción:** Ejecuta la acción completa de accesibilidad con spinner.

**Parámetros:**
- `iconId` (string, opcional): ID del ícono (default: `'imgAccesibilidad'`)

**Retorno:** `void`

**Funcionamiento:**
1. Muestra spinner
2. Toggle UserWay
3. Oculta spinner después de 1 segundo

**Función Global:**
```javascript
window.Accesibilidad(); // Expuesta globalmente
```

---

### debounce.js

**Propósito:** Utilidades para optimizar eventos frecuentes.

#### `debounce(func, wait, immediate)`

**Descripción:** Crea una función debounced.

**Parámetros:**
- `func` (Function): Función a ejecutar
- `wait` (number, opcional): Tiempo de espera en ms (default: 300)
- `immediate` (boolean, opcional): Si ejecutar inmediatamente en el primer call (default: false)

**Retorno:** `Function` - Función debounced

**Funcionamiento:**
- Cancela la ejecución anterior si se llama antes de `wait` ms
- Si `immediate` es `true`, ejecuta inmediatamente en el primer call

**Ejemplo:**
```javascript
const debouncedSearch = debounce(() => {
    // Búsqueda
}, 300);

input.addEventListener('input', debouncedSearch);
```

---

#### `throttle(func, limit)`

**Descripción:** Crea una función throttled.

**Parámetros:**
- `func` (Function): Función a ejecutar
- `limit` (number, opcional): Tiempo límite en ms (default: 300)

**Retorno:** `Function` - Función throttled

**Funcionamiento:**
- Ejecuta la función máximo una vez cada `limit` ms

**Ejemplo:**
```javascript
const throttledScroll = throttle(() => {
    // Manejo de scroll
}, 100);

window.addEventListener('scroll', throttledScroll);
```

---

## 📊 Datos

### programas.js

**Propósito:** Fuente única de verdad para todos los programas disponibles.

#### Estructura de un Programa

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

#### `window.MaulePro.Data.programas`

**Descripción:** Array con todos los programas disponibles.

**Tipo:** `Array<Object>`

---

#### `getAllProgramas()`

**Descripción:** Obtiene todos los programas disponibles.

**Retorno:** `Array<Object>` - Copia del array de programas

---

#### `getProgramaByName(name)`

**Descripción:** Obtiene programa por nombre exacto.

**Parámetros:**
- `name` (string): Nombre exacto del programa

**Retorno:** `Object|null` - Programa encontrado o `null`

---

#### `getProgramasByEstado(estado)`

**Descripción:** Obtiene programas filtrados por estado.

**Parámetros:**
- `estado` (string): Estado del programa - `'open'`, `'soon'`, `'closed'`

**Retorno:** `Array<Object>` - Lista de programas con el estado especificado

---

#### `getProgramasByBenef(benef)`

**Descripción:** Obtiene programas filtrados por tipo de beneficiario.

**Parámetros:**
- `benef` (string): Tipo de beneficiario

**Retorno:** `Array<Object>` - Lista de programas para el tipo de beneficiario

---

## 🔄 Flujos de Trabajo

### Flujo de Inicialización

1. **Carga de Scripts:**
   - Bootstrap JS
   - Logger, debounce
   - programas.js, DeadlineManager, AccessibilityManager
   - CardRenderer
   - script.js
   - navbar-spacer, program-cards-generator
   - filters (defer), userway (defer)

2. **Inicialización de script.js:**
   - Verifica Bootstrap
   - Inicializa scroll suave
   - Inicializa animaciones
   - Inicializa accesibilidad
   - Resalta enlace activo

3. **Inicialización de navbar-spacer:**
   - Ajusta márgenes del contenido
   - Configura observadores

4. **Inicialización de program-cards-generator:**
   - Genera tarjetas si el contenedor está vacío
   - Pinta deadlines

5. **Inicialización de filters:**
   - Obtiene tarjetas del DOM
   - Bindea eventos
   - Aplica filtrado inicial
   - Pinta deadlines
   - Inicializa animaciones, ripple, toast

---

### Flujo de Búsqueda y Filtrado

1. **Usuario interactúa con filtros:**
   - Escribe en input de búsqueda (debounce 300ms)
   - Cambia select de estado (inmediato)
   - Cambia select de beneficiario (inmediato)
   - Cambia select de ordenamiento (inmediato)

2. **FilterManager.apply():**
   - Obtiene valores de filtros
   - Filtra tarjetas usando FilterEngine
   - Ordena tarjetas usando SortEngine
   - Actualiza DOM
   - Actualiza contadores

3. **Actualización del DOM:**
   - Oculta todas las tarjetas
   - Muestra solo las visibles
   - Reordena usando DocumentFragment

---

### Flujo de Generación de Tarjetas

1. **program-cards-generator detecta contenedor vacío:**
   - Verifica que no haya tarjetas con `[data-program]`

2. **Generación:**
   - Itera sobre `window.MaulePro.Data.programas`
   - Usa `CardRenderer.crearTarjetaElement` para cada programa
   - Agrega tarjetas a DocumentFragment

3. **Renderizado:**
   - Inserta fragment en el contenedor
   - Pinta deadlines usando DeadlineManager
   - Actualiza contador

---

### Flujo de Deadlines

1. **DeadlineManager.paintAllDeadlines():**
   - Busca elementos con `[data-program][data-close]`
   - Para cada elemento:
     - Obtiene fecha de `data-close`
     - Calcula días restantes
     - Genera texto y clase CSS
     - Actualiza badge `[data-deadline]`

2. **Cálculo de días:**
   - `calcularDiasRestantes()`: diferencia entre fecha de cierre y hoy
   - Retorna `null` si la fecha es inválida o ya pasó

3. **Generación de texto:**
   - `0 días`: "Finaliza hoy" (urgent)
   - `1 día`: "Finaliza en 1 día" (urgent)
   - `>1 día`: "Finaliza en X días"
   - `≤3 días`: clase `urgent`
   - `4-10 días`: clase `soon`
   - `>10 días`: sin clase especial

---

## 🔌 API Pública

### Namespace Global

```javascript
window.MaulePro = {
    Data: {
        programas: Array,
        getAllProgramas: Function,
        getProgramaByName: Function,
        getProgramasByEstado: Function,
        getProgramasByBenef: Function
    },
    Utils: {
        Logger: Object,
        DeadlineManager: Object,
        AccessibilityManager: Object,
        debounce: Function,
        throttle: Function
    },
    Search: {
        FilterEngine: Object,
        SortEngine: Object,
        CardRenderer: Object,
        SearchManager: Function
    },
    Modules: {
        NavbarSpacer: Object,
        ProgramCardsGenerator: Object
    }
};
```

### Funciones Globales

```javascript
window.Accesibilidad(); // Activa herramientas de accesibilidad
```

---

## 📝 Notas de Implementación

### Seguridad XSS

- **CardRenderer** usa `createElement` y `textContent` en lugar de `innerHTML` con datos del usuario
- **escapeHtml()** escapa texto antes de usar en atributos `data-*`

### Performance

- **DocumentFragment** se usa para operaciones masivas de DOM
- **Debounce** en inputs de texto (300ms)
- **IntersectionObserver** para animaciones (mejor que scroll events)
- **ResizeObserver** para ajustes de navbar (mejor que resize events)

### Compatibilidad

- **Fallbacks** para módulos no disponibles
- **Verificación de dependencias** antes de usar
- **Polyfills** no necesarios (navegadores modernos)

---

## 🐛 Debugging

### Logger

```javascript
// Cambiar nivel de log
window.MaulePro.Utils.Logger.setLevel(0); // DEBUG

// Ver logs en consola
window.MaulePro.Utils.Logger.debug('Mensaje de debug');
window.MaulePro.Utils.Logger.info('Información');
window.MaulePro.Utils.Logger.warn('Advertencia');
window.MaulePro.Utils.Logger.error('Error');
```

### Verificar Módulos

```javascript
// Verificar que un módulo esté cargado
console.log(window.MaulePro?.Search?.FilterEngine);

// Verificar programas
console.log(window.MaulePro?.Data?.programas);

// Verificar utilidades
console.log(window.MaulePro?.Utils?.Logger);
```

---

**Última actualización:** Noviembre 2025

