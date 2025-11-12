# Estructura del Proyecto MaulePro

## 📁 Organización de Archivos

```
MaulePro/
│
├── index.html                    # Página principal del portal
├── login.html                    # Página de login y registro
├── README.md                     # Documentación principal
├── CÓMO_EJECUTAR.md             # Guía de ejecución
│
├── assets/                       # Recursos estáticos
│   ├── css/
│   │   └── styles.css           # Estilos adicionales (si se usa)
│   ├── js/
│   │   └── script.js            # Funcionalidad JavaScript compartida
│   └── images/
│       └── Logo.png             # Logo del Gobierno Regional del Maule
│
├── pages/                        # Subpáginas del portal
│   ├── programas/                # Páginas de programas específicos
│   │   ├── circular-33.html     # Circular 33 (FRIL)
│   │   ├── fndr-8.html          # Subvenciones FNDR 8%
│   │   ├── fndr-sub31.html      # FNDR Sub. 31 con Evaluación MIDESOYF
│   │   ├── fril.html            # Fondo Regional de Iniciativa Local
│   │   ├── frpd.html            # Fondo Regional para la Productividad y el Desarrollo
│   │   └── proyectos-menores.html # Proyectos Menores a 5.000 UTM
│   ├── financiamiento-programas.html
│   └── postulacion-financiamiento.html
│
├── components/                   # Componentes de desarrollo
│   ├── components.html          # Componentes reutilizables (referencia)
│   └── preview.html             # Vista previa de componentes
│
├── docs/                         # Documentación adicional
│   ├── README.md                # Documentación técnica detallada
│   ├── ESTRUCTURA.md            # Este archivo
│   └── INSTRUCCIONES.txt        # Instrucciones adicionales
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
- Contadores por estado
- Navbar fijo con navegación

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

#### `pages/programas/fndr-sub31.html`
- FNDR Sub. 31 con Evaluación MIDESOYF
- Requisitos y documentación
- Manual de postulación
- Proceso de evaluación

#### `pages/programas/fril.html`
- Fondo Regional de Iniciativa Local (FRIL)
- Información detallada del programa
- Bases y documentación

#### `pages/programas/frpd.html`
- Fondo Regional para la Productividad y el Desarrollo (FRPD)
- Información del programa
- Requisitos y documentación

#### `pages/programas/proyectos-menores.html`
- Proyectos Menores a 5.000 UTM
- Información sobre proyectos menores
- Bases y anexos
- Estado de postulación

#### `pages/financiamiento-programas.html`
- Financiamiento para Programas
- Transferencias Subtítulo 33
- Glosas 7.1, 7.7 y 5.12
- Instructivos y manuales

#### `pages/postulacion-financiamiento.html`
- Postulación a Financiamiento
- Formularios y documentación

## 🎨 Recursos Estáticos

### `assets/css/styles.css`
- Estilos adicionales (si se requiere)
- Actualmente los estilos están en el `<style>` de cada HTML

### `assets/js/script.js`
- Funcionalidad JavaScript compartida
- Manejo de login/logout
- Navegación entre páginas
- Validación de formularios
- Detección de página activa

### `assets/images/Logo.png`
- Logo del Gobierno Regional del Maule
- Usado en el navbar de todas las páginas

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

### `CÓMO_EJECUTAR.md`
- Guía detallada de ejecución
- Múltiples opciones de servidor
- Solución de problemas

### `docs/README.md`
- Documentación técnica detallada
- Información sobre el desarrollo
- Limitaciones y mejoras futuras

### `docs/ESTRUCTURA.md`
- Este archivo
- Descripción de la estructura del proyecto

## 🔗 Navegación

La navegación está implementada en todas las páginas con:

- **Navbar fijo**: Se mantiene visible al hacer scroll
- **Menú responsive**: Adaptado para móvil, tablet y desktop
- **Enlaces internos**: Entre programas relacionados
- **Breadcrumbs**: (si se implementa)

## 🎯 Convenciones de Nomenclatura

- **Archivos HTML**: kebab-case (ej: `fndr-8.html`)
- **Clases CSS**: kebab-case (ej: `program-card`)
- **IDs**: camelCase (ej: `searchForm`)
- **Variables JavaScript**: camelCase (ej: `userwayBtn`)

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

### CSS
- Variables CSS
- Flexbox y Grid
- Media queries para responsive
- Animaciones CSS

### JavaScript
- Vanilla JavaScript (sin dependencias)
- ES6+ sintaxis
- LocalStorage para persistencia
- Intersection Observer API

## 🚀 Flujo de Desarrollo

1. Editar archivos HTML/CSS/JS
2. Abrir con Live Server o servidor local
3. Probar en múltiples navegadores
4. Verificar responsive design
5. Optimizar y depurar

## 📝 Notas Importantes

- Todos los archivos HTML son independientes
- Los estilos están principalmente en `<style>` dentro de cada HTML
- El JavaScript está en `assets/js/script.js` y también inline en algunos HTML
- No hay sistema de build - archivos estáticos directos
- Las dependencias se cargan desde CDN
