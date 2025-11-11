# Estructura del Proyecto MaulePro

## 📁 Organización de Páginas

El proyecto está organizado en múltiples páginas HTML para una mejor navegación y organización del contenido.

### Páginas Principales

1. **index.html** - Página de inicio
   - Hero section con bienvenida
   - Acceso rápido a programas principales
   - Información general

2. **programas.html** - Lista de todos los programas
   - Vista general de todos los programas disponibles
   - Enlaces a cada programa específico

3. **login.html** - Página de autenticación
   - Formulario de inicio de sesión
   - Formulario de registro
   - Recuperación de contraseña

### Páginas de Programas

4. **fndr-8.html** - Subvenciones FNDR 8%
   - Información sobre el programa
   - Categorías de postulación (Cultural, Social, Deportiva, etc.)
   - Documentación y anexos
   - Sección de rendición

5. **circular-33.html** - Circular 33 (FRIL)
   - Fondo Regional de Iniciativa Local
   - Tipos de proyectos
   - Bases y anexos
   - Manual de postulación

6. **fndr-sub31.html** - FNDR Sub. 31
   - Postulación con Evaluación MIDESOYF
   - Requisitos y documentación
   - Manual de postulación

7. **proyectos-menores.html** - Proyectos Menores a 5.000 UTM
   - Información sobre proyectos menores
   - Bases y anexos
   - Estado de postulación

8. **financiamiento-programas.html** - Financiamiento para Programas
   - Transferencias Subtítulo 33
   - Glosas 7.1, 7.7 y 5.12
   - Instructivos y manuales

## 🎨 Diseño

- **Framework**: Tailwind CSS (CDN)
- **Colores Institucionales**: Azul (#1e3c72) y Blanco
- **Bordes**: Cuadrados (sin border-radius)
- **Tipografía**: Arial/Helvetica (seria y profesional)
- **Responsive**: Diseño adaptable a móvil, tablet y desktop

## 🧩 Componentes

- **Header**: Navegación principal con logo y acceso de usuario
- **Nav**: Barra de navegación con enlaces a todas las secciones
- **Footer**: Información del portal y copyright

## 📝 Archivos de Soporte

- **script.js**: Funcionalidad JavaScript compartida
  - Manejo de login/logout
  - Navegación entre páginas
  - Validación de formularios
  - Detección de página activa

- **components.html**: Componentes reutilizables (referencia)

## 🔗 Navegación

La navegación está implementada en todas las páginas con:
- Menú superior con enlaces a todas las secciones
- Resaltado de la página activa
- Enlaces internos entre programas relacionados

## 🚀 Uso

1. Abrir `index.html` en el navegador
2. Navegar entre las diferentes secciones usando el menú
3. Para postular, iniciar sesión desde `login.html` o el botón en el header

## 📱 Responsive

Todas las páginas son completamente responsive:
- **Desktop**: Layout completo con múltiples columnas
- **Tablet**: Layout adaptado con 2 columnas
- **Móvil**: Layout de una columna optimizado

