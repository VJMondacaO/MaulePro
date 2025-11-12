# 🏛️ MaulePro - Portal de Postulación a Programas y Fondos Regionales

Portal web del Gobierno Regional del Maule para la postulación a programas y fondos regionales.

## 📋 Descripción

MaulePro es un portal web que permite a usuarios acceder a las líneas de financiamiento del Gobierno Regional del Maule. El portal incluye información sobre diferentes programas, requisitos, fechas de postulación y documentación necesaria.

## ✨ Características Principales

- 🎯 **Búsqueda y Filtrado**: Sistema de búsqueda avanzada con filtros por estado, beneficiario y ordenamiento
- 📱 **Diseño Responsive**: Adaptado para dispositivos móviles, tablets y desktop
- ♿ **Accesibilidad**: Integración con Userway para herramientas de accesibilidad
- 🎨 **Interfaz Moderna**: Diseño limpio y profesional con animaciones suaves
- 🔍 **Búsqueda Inteligente**: Atajo de teclado `/` para acceso rápido al buscador
- 📊 **Estados de Programas**: Visualización clara de programas abiertos, próximos y cerrados

## 🚀 Inicio Rápido

### Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (opcional pero recomendado)

### Instalación

Este proyecto es **solo frontend** y no requiere instalación de dependencias. Todas las librerías se cargan desde CDN.

### Ejecución

#### Opción 1: Live Server (Recomendado)

1. Instala la extensión "Live Server" en VS Code
2. Abre `index.html`
3. Click derecho → "Open with Live Server"
4. Se abrirá en `http://127.0.0.1:5500`

#### Opción 2: Servidor Python

```bash
# Desde la raíz del proyecto
cd utils
python3 server.py
```

O directamente:
```bash
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`

#### Opción 3: Otros Servidores

```bash
# Node.js
npx serve

# PHP
php -S localhost:8000
```

📖 **Ver `CÓMO_EJECUTAR.md` para instrucciones detalladas.**

## 📁 Estructura del Proyecto

```
MaulePro/
│
├── index.html                    # Página principal
├── login.html                    # Página de login y registro
├── README.md                     # Este archivo
├── CÓMO_EJECUTAR.md             # Guía de ejecución
│
├── assets/                       # Recursos estáticos
│   ├── css/
│   │   └── styles.css           # Estilos adicionales
│   ├── js/
│   │   └── script.js            # Funcionalidad JavaScript
│   └── images/
│       └── Logo.png             # Logo del Gobierno Regional del Maule
│
├── pages/                        # Subpáginas del portal
│   ├── programas/                # Páginas de programas
│   │   ├── circular-33.html     # Circular 33
│   │   ├── fndr-8.html          # FNDR 8%
│   │   ├── fndr-sub31.html      # FNDR Sub. 31
│   │   ├── fril.html            # FRIL
│   │   ├── frpd.html            # FRPD
│   │   └── proyectos-menores.html
│   ├── financiamiento-programas.html
│   └── postulacion-financiamiento.html
│
├── components/                   # Componentes de desarrollo
│   ├── components.html
│   └── preview.html
│
├── docs/                         # Documentación adicional
│   ├── README.md                # Documentación técnica
│   ├── ESTRUCTURA.md            # Estructura del proyecto
│   └── INSTRUCCIONES.txt        # Instrucciones adicionales
│
└── utils/                        # Utilidades y scripts
    ├── server.py                 # Servidor Python local
    ├── start.sh                  # Script de inicio (macOS/Linux)
    └── package.json
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS, Flexbox y Grid
- **JavaScript (Vanilla)**: Sin dependencias externas
- **Bootstrap 5.3.3**: Framework CSS (CDN)
- **Bootstrap Icons 1.11.3**: Iconografía (CDN)
- **Userway**: Widget de accesibilidad

## 🎨 Características de Diseño

### Paleta de Colores

- **Azul Institucional**: `#1e3c72`
- **Azul Claro**: `#2563eb`
- **Azul Oscuro**: `#1e40af`
- **Fondo**: `#F6F8FA`

### Componentes

- **Navbar Fijo**: Se mantiene visible al hacer scroll
- **Cards Interactivas**: Efectos hover y animaciones
- **Búsqueda Avanzada**: Filtros por estado, beneficiario y ordenamiento
- **Contadores de Estado**: Badges para programas abiertos, próximos y cerrados
- **Deadlines**: Indicadores de tiempo restante para cierre

## 🔧 Funcionalidades

### Búsqueda y Filtrado

- Búsqueda por nombre o palabra clave
- Filtro por estado (Abiertos, Próximos, Cerrados)
- Filtro por beneficiario (Municipios, Servicios públicos, Organizaciones, etc.)
- Ordenamiento (Relevancia, Abiertos primero, Fecha, A-Z)
- Atajo de teclado `/` para acceso rápido

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

## ⚠️ Limitaciones Actuales

Este es un **prototipo de frontend**. Las siguientes funcionalidades están simuladas:

- ❌ **Login/Registro**: No hay integración con Clave Única
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

## 📝 Scripts Disponibles

### Servidor Python

```bash
cd utils
python3 server.py
```

### Script de Inicio (macOS/Linux)

```bash
cd utils
chmod +x start.sh
./start.sh
```

## 🔍 Desarrollo

### Estructura de Código

- **CSS**: Variables CSS para colores y estilos reutilizables
- **JavaScript**: Código modular y organizado
- **HTML**: Estructura semántica y accesible

### Mejores Prácticas

- Código limpio y comentado
- Nombres descriptivos de variables y funciones
- Separación de responsabilidades
- Optimización de rendimiento

## 📚 Documentación Adicional

- `CÓMO_EJECUTAR.md`: Guía detallada de ejecución
- `docs/README.md`: Documentación técnica
- `docs/ESTRUCTURA.md`: Estructura del proyecto
- `docs/INSTRUCCIONES.txt`: Instrucciones adicionales

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

