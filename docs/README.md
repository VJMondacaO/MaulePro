# MaulePro - Portal Reversion

**Reversión del portal de postulaciones del Gobierno Regional del Maule** (https://www.maulepro.com/gore/portal/)

## ⚠️ Importante

Este proyecto es una **reversión/prototipo de frontend** que representa una idea visual y funcional del portal MaulePro. 

**Limitaciones actuales:**
- ✅ Interfaz de usuario completa y responsive
- ✅ Diseño visual basado en el portal original
- ❌ **Falta la integración con el sistema de Clave Única**
- ❌ No hay backend funcional
- ❌ Las funcionalidades de autenticación son simuladas

## Descripción

Este es un prototipo de frontend del portal MaulePro que permite visualizar:

- Información sobre diferentes programas de financiamiento (FRIL, FNDR, FIC, FRPD)
- Interfaz de inicio de sesión y registro (simulada)
- Acceso a documentación y manuales
- Estructura de postulación a diferentes iniciativas (Culturales, Sociales, Deportivas, etc.)

**Nota**: El sistema de autenticación actual es simulado. Para producción, se requiere la integración con el sistema de Clave Única del Estado de Chile.

## Estructura del Proyecto

```
MaulePro/
│
├── index.html                    # Página principal
├── login.html                    # Página de login y registro
│
├── pages/                        # Subpáginas del portal
│   ├── programas/                # Páginas de programas
│   │   ├── programas.html        # Lista de todos los programas
│   │   ├── fndr-8.html          # FNDR 8%
│   │   ├── fndr-sub31.html      # FNDR Sub. 31
│   │   ├── fril.html            # FRIL
│   │   ├── frpd.html            # FRPD
│   │   ├── proyectos-menores.html
│   │   └── circular-33.html     # Circular 33
│   ├── postulacion-financiamiento.html
│   └── financiamiento-programas.html
│
├── assets/                       # Recursos estáticos
│   ├── js/
│   │   └── script.js            # Funcionalidad JavaScript
│   ├── css/
│   │   └── styles.css           # Estilos (si se usa)
│   └── images/                  # Imágenes
│       └── Logo.png            # Logo del Gobierno Regional del Maule
│
├── docs/                         # Documentación
│   ├── README.md                # Este archivo
│   ├── ESTRUCTURA.md
│   └── INSTRUCCIONES.txt
│
├── utils/                        # Utilidades y scripts
│   ├── server.py                # Servidor Python local
│   ├── start.sh                 # Script de inicio
│   └── package.json
│
└── components/                   # Componentes de desarrollo
    ├── components.html
    └── preview.html
```

## Características

### Funcionalidades Implementadas

1. **Sistema de Login/Registro**
   - Modal de inicio de sesión
   - Modal de registro
   - Recuperación de contraseña
   - Persistencia de sesión con localStorage
   - Validación de RUT y correo electrónico

2. **Interfaz de Usuario**
   - Diseño responsive (móvil, tablet, desktop)
   - Animaciones suaves
   - Cards interactivas
   - Modales elegantes
   - Gradientes y sombras modernas

3. **Secciones del Portal**
   - FNDR 8% (Subvenciones para actividades)
   - Circular 33 (FRIL)
   - Postulación FNDR Sub. 31
   - Proyectos menores a 5.000 UTM
   - Postulación a Financiamiento para Programas
   - FIC (Fondo de Innovación para la Competitividad)
   - FRPD (Fondo Regional para la Productividad)

4. **Categorías de Postulación**
   - Iniciativas Culturales
   - Iniciativas Sociales
   - Iniciativas de Seguridad Ciudadana
   - Iniciativas Medio Ambiente
   - Iniciativas de Adopción y Rescate Animal
   - Iniciativas Deportivas

5. **Documentación**
   - Enlaces a manuales de postulación
   - Instructivos
   - Anexos
   - Bases de concursos

## Cómo Usar

### Opción 1: Abrir directamente
Simplemente abre el archivo `index.html` en tu navegador web favorito.

### Opción 2: Servidor local
Para una mejor experiencia, usa un servidor local:

```bash
# Con Python 3
python3 -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000

# Con Node.js (npx)
npx serve

# Con PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000` en tu navegador.

## Credenciales de Prueba

El sistema acepta cualquier RUT de 7-8 dígitos para el login de demostración:

- **Usuario**: 11111111 (o cualquier número de 7-8 dígitos)
- **Contraseña**: cualquier texto

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript (Vanilla)**: Sin dependencias externas
- **LocalStorage**: Para persistencia de sesión

## Características Responsive

El sitio es completamente responsive y se adapta a:

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Móvil**: < 480px

## Navegadores Compatibles

- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Opera (últimas 2 versiones)

## Notas Importantes

Este es un **prototipo de frontend** que representa una idea visual del portal. Las funcionalidades de backend no están implementadas:

- ❌ **El login es simulado** - Falta integración con Clave Única
- ❌ Las postulaciones no se envían a ningún servidor
- ❌ Los documentos no se descargan realmente
- ❌ Los datos no se guardan en una base de datos
- ❌ No hay comunicación con APIs del backend

### Para un entorno de producción, se necesitaría:

- ✅ **Integración con Clave Única** (sistema de autenticación del Estado de Chile)
- Backend con API REST (Node.js, PHP, Python, etc.)
- Base de datos (MySQL, PostgreSQL, MongoDB)
- Sistema de autenticación real con Clave Única
- Sistema de gestión de archivos
- Sistema de procesamiento de postulaciones
- Integración con sistemas gubernamentales

## Mejoras Futuras / Pendientes

- [ ] **Integración con Clave Única** (prioritario)
- [ ] Integración con backend
- [ ] Base de datos real
- [ ] Sistema de autenticación real con Clave Única
- [ ] Carga y descarga de documentos real
- [ ] Panel de administración
- [ ] Sistema de notificaciones
- [ ] Búsqueda y filtros avanzados
- [ ] Historial de postulaciones
- [ ] Sistema de seguimiento de estado

## Autor

Reversión/prototipo desarrollado como idea de frontend del portal MaulePro.

## Licencia

Este proyecto es solo para fines educativos, de demostración y como prototipo de frontend.

---

**Nota**: Este es un prototipo no oficial del portal MaulePro del Gobierno Regional del Maule. No tiene afiliación oficial con el gobierno. Es una reversión de frontend que requiere integración con sistemas backend y Clave Única para ser funcional.

