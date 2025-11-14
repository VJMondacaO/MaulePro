# Implementación: Sistema de Administración de Programas
## Stack Tecnológico: PHP + MySQL + JavaScript

**Fecha:** Noviembre 2025  
**Stack:** PHP (Backend), MySQL (Base de Datos), JavaScript (Frontend)

---

## 📋 Índice

1. [Base de Datos MySQL](#1-base-de-datos-mysql)
2. [Backend PHP](#2-backend-php)
3. [API REST PHP](#3-api-rest-php)
4. [Frontend JavaScript Admin](#4-frontend-javascript-admin)
5. [Integración con Frontend Actual](#5-integración-con-frontend-actual)
6. [Seguridad y Autenticación](#6-seguridad-y-autenticación)
7. [Estructura de Archivos](#7-estructura-de-archivos)
8. [Plan de Implementación](#8-plan-de-implementación)

---

## 1. Base de Datos MySQL

### 1.1 Estructura de Tablas

#### Tabla: `programas`

```sql
CREATE TABLE programas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    benef VARCHAR(50) NOT NULL,
    estado ENUM('open', 'soon', 'closed') NOT NULL DEFAULT 'closed',
    close_date DATE NULL,
    location VARCHAR(100) DEFAULT 'Regional',
    beneficiarios VARCHAR(255) NOT NULL,
    fechas TEXT,
    montos TEXT,
    link VARCHAR(255) NOT NULL,
    has_deadline BOOLEAN DEFAULT FALSE,
    deadline_urgent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT NULL,
    updated_by INT NULL,
    INDEX idx_estado (estado),
    INDEX idx_benef (benef),
    INDEX idx_close_date (close_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id`: ID único autoincremental
- `name`: Nombre del programa
- `benef`: Tipo de beneficiario (municipios, org, empresas, servicios)
- `estado`: Estado (open, soon, closed)
- `close_date`: Fecha de cierre (YYYY-MM-DD o NULL)
- `location`: Ubicación (por defecto "Regional")
- `beneficiarios`: Texto descriptivo de beneficiarios
- `fechas`: Texto con fechas de inicio/fin
- `montos`: Texto con información de montos
- `link`: Ruta a la página del programa
- `has_deadline`: Boolean, tiene fecha límite
- `deadline_urgent`: Boolean, fecha urgente (< 7 días)
- `created_at`, `updated_at`: Timestamps
- `created_by`, `updated_by`: IDs de usuarios que crearon/modificaron

#### Tabla: `usuarios`

```sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(255),
    rol ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
    activo BOOLEAN DEFAULT TRUE,
    ultimo_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_rol (rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id`: ID único
- `username`: Nombre de usuario único
- `email`: Email único
- `password_hash`: Hash de contraseña (bcrypt)
- `nombre`: Nombre completo
- `rol`: Rol del usuario (admin, editor, viewer)
- `activo`: Si el usuario está activo
- `ultimo_login`: Último login registrado

#### Tabla: `auditoria`

```sql
CREATE TABLE auditoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tabla VARCHAR(100) NOT NULL,
    registro_id INT NOT NULL,
    accion ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    datos_anteriores JSON NULL,
    datos_nuevos JSON NULL,
    usuario_id INT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tabla_registro (tabla, registro_id),
    INDEX idx_usuario (usuario_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- Registro de todas las acciones (crear, editar, eliminar)
- Datos anteriores y nuevos en JSON
- Usuario, IP, User-Agent

#### Tabla: `sesiones`

```sql
CREATE TABLE sesiones (
    id VARCHAR(128) PRIMARY KEY,
    usuario_id INT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    datos TEXT,
    ultima_actividad TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_usuario (usuario_id),
    INDEX idx_ultima_actividad (ultima_actividad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- Almacenamiento de sesiones PHP
- Última actividad para limpieza automática

---

## 2. Backend PHP

### 2.1 Estructura de Directorios

```
api/
├── config/
│   ├── database.php          # Configuración MySQL
│   ├── constants.php         # Constantes globales
│   └── security.php          # Configuración seguridad
├── models/
│   ├── Programa.php          # Modelo Programa
│   ├── Usuario.php           # Modelo Usuario
│   └── BaseModel.php         # Modelo base
├── controllers/
│   ├── ProgramasController.php
│   ├── AuthController.php
│   └── BaseController.php
├── middleware/
│   ├── AuthMiddleware.php    # Verificar autenticación
│   ├── RoleMiddleware.php    # Verificar roles
│   └── ValidationMiddleware.php
├── utils/
│   ├── Database.php          # Clase conexión DB
│   ├── Response.php          # Respuestas JSON estandarizadas
│   ├── Validator.php         # Validación de datos
│   └── Security.php          # Funciones de seguridad
├── .htaccess                 # Rewrite rules Apache
└── index.php                 # Entry point
```

### 2.2 Archivos Clave

#### `api/config/database.php`
**Funcionalidad:**
- Configuración de conexión MySQL
- Variables de entorno (host, usuario, contraseña, nombre DB)
- Función de conexión singleton
- Manejo de errores

**Configuración necesaria:**
```php
DB_HOST = 'localhost'
DB_NAME = 'maulepro'
DB_USER = 'usuario'
DB_PASS = 'contraseña'
DB_CHARSET = 'utf8mb4'
```

#### `api/utils/Database.php`
**Funcionalidad:**
- Clase singleton para conexión PDO
- Métodos: `query()`, `prepare()`, `execute()`, `fetch()`, `fetchAll()`
- Transacciones: `beginTransaction()`, `commit()`, `rollback()`
- Manejo de errores PDO

#### `api/models/BaseModel.php`
**Funcionalidad:**
- Clase abstracta base para todos los modelos
- Métodos CRUD genéricos: `find()`, `findAll()`, `create()`, `update()`, `delete()`
- Validación básica
- Timestamps automáticos

#### `api/models/Programa.php`
**Funcionalidad:**
- Extiende `BaseModel`
- Validación específica de campos
- Métodos: `getAll()`, `getById()`, `getByEstado()`, `getByBenef()`, `search()`
- Cálculo automático de `has_deadline` y `deadline_urgent`
- Relaciones con tabla `auditoria`

#### `api/utils/Response.php`
**Funcionalidad:**
- Métodos estáticos para respuestas JSON estandarizadas
- `success($data, $message, $code)`
- `error($message, $code, $errors)`
- Formato consistente: `{success: true/false, data: {}, message: "", errors: []}`

#### `api/utils/Validator.php`
**Funcionalidad:**
- Validación de campos requeridos
- Validación de tipos (string, int, date, enum)
- Validación de formatos (email, date, URL)
- Validación de rangos
- Mensajes de error personalizados

#### `api/utils/Security.php`
**Funcionalidad:**
- Sanitización de inputs (XSS prevention)
- Hash de contraseñas (`password_hash()`)
- Verificación de contraseñas (`password_verify()`)
- Generación de tokens JWT o sesiones
- CSRF token generation/verification

---

## 3. API REST PHP

### 3.1 Endpoints Necesarios

#### Autenticación

**POST `/api/auth/login`**
- Body: `{username: string, password: string}`
- Respuesta: `{success: true, data: {token: string, user: {id, username, rol}}}`
- Función: Autenticar usuario, crear sesión, retornar token

**POST `/api/auth/logout`**
- Headers: `Authorization: Bearer {token}`
- Respuesta: `{success: true, message: "Sesión cerrada"}`
- Función: Cerrar sesión, invalidar token

**GET `/api/auth/me`**
- Headers: `Authorization: Bearer {token}`
- Respuesta: `{success: true, data: {user: {...}}}`
- Función: Obtener información del usuario actual

#### Programas

**GET `/api/programas`**
- Query params opcionales: `?estado=open&benef=municipios&q=busqueda&page=1&limit=10`
- Respuesta: `{success: true, data: {programas: [...], total: number, page: number, limit: number}}`
- Función: Listar todos los programas (paginado, filtros)

**GET `/api/programas/:id`**
- Respuesta: `{success: true, data: {programa: {...}}}`
- Función: Obtener un programa específico

**POST `/api/programas`**
- Headers: `Authorization: Bearer {token}`
- Body: Objeto programa completo
- Respuesta: `{success: true, data: {programa: {...}}, message: "Programa creado"}`
- Función: Crear nuevo programa
- Validación: Todos los campos requeridos
- Auditoría: Registrar creación

**PUT `/api/programas/:id`**
- Headers: `Authorization: Bearer {token}`
- Body: Objeto programa con campos a actualizar
- Respuesta: `{success: true, data: {programa: {...}}, message: "Programa actualizado"}`
- Función: Actualizar programa existente
- Validación: Campos a actualizar
- Auditoría: Guardar datos anteriores y nuevos

**DELETE `/api/programas/:id`**
- Headers: `Authorization: Bearer {token}`
- Respuesta: `{success: true, message: "Programa eliminado"}`
- Función: Eliminar programa (soft delete o hard delete)
- Auditoría: Guardar datos antes de eliminar

**GET `/api/programas/search`**
- Query params: `?q=texto&estado=open&benef=municipios&orden=relevancia`
- Respuesta: `{success: true, data: {programas: [...], total: number}}`
- Función: Búsqueda avanzada (mismo formato que frontend actual)

### 3.2 Archivo `.htaccess`

**Funcionalidad:**
- Rewrite rules para URLs amigables (`/api/programas` en lugar de `/api/index.php?endpoint=programas`)
- Headers CORS para permitir peticiones desde frontend
- Headers de seguridad (X-Frame-Options, X-Content-Type-Options)
- Manejo de errores HTTP

**Reglas necesarias:**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^api/(.*)$ api/index.php?endpoint=$1 [QSA,L]

Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"
```

### 3.3 Router en `api/index.php`

**Funcionalidad:**
- Entry point único de la API
- Parsear URL y extraer endpoint
- Identificar método HTTP (GET, POST, PUT, DELETE)
- Aplicar middleware (Auth, Role, Validation)
- Llamar al controlador correspondiente
- Retornar respuesta JSON
- Manejo de errores globales

---

## 4. Frontend JavaScript Admin

### 4.1 Estructura de Archivos

```
admin/
├── index.html                  # Dashboard principal
├── login.html                  # Login admin
├── programa-form.html          # Formulario crear/editar
├── programas-list.html         # Lista de programas
├── assets/
│   ├── css/
│   │   └── admin.css           # Estilos específicos admin
│   └── js/
│       ├── admin-api.js        # Cliente API (fetch a endpoints PHP)
│       ├── admin-auth.js       # Manejo de autenticación
│       ├── admin-form.js       # Lógica formulario crear/editar
│       ├── admin-list.js       # Lógica lista de programas
│       └── admin-utils.js      # Utilidades admin
```

### 4.2 Archivos JavaScript

#### `admin/assets/js/admin-api.js`
**Funcionalidad:**
- Clase o funciones para comunicación con API PHP
- Métodos: `get()`, `post()`, `put()`, `delete()`
- Manejo de autenticación (headers con token)
- Manejo de errores HTTP
- Interceptores para tokens expirados

**Estructura:**
```javascript
const AdminAPI = {
    baseURL: '/api',
    token: null,
    
    setToken(token) {...},
    getToken() {...},
    
    async request(endpoint, method, data) {...},
    async get(endpoint) {...},
    async post(endpoint, data) {...},
    async put(endpoint, data) {...},
    async delete(endpoint) {...}
};
```

#### `admin/assets/js/admin-auth.js`
**Funcionalidad:**
- Login de usuario admin
- Guardar token en localStorage/sessionStorage
- Verificar si usuario está autenticado
- Redirigir a login si no está autenticado
- Logout
- Obtener datos del usuario actual

#### `admin/assets/js/admin-form.js`
**Funcionalidad:**
- Cargar formulario vacío (crear) o con datos (editar)
- Validación frontend de campos
- Envío de datos a API (POST o PUT)
- Preview de tarjeta antes de guardar
- Manejo de éxito/error al guardar
- Redirección después de guardar

**Campos del formulario:**
- Nombre (text, required)
- Beneficiarios (select: municipios, org, empresas, servicios)
- Estado (radio/select: open, soon, closed)
- Fecha de cierre (date picker, opcional si estado != closed)
- Beneficiarios texto (text, required)
- Fechas (text, required)
- Montos (text, required)
- Link (text, required)
- Checkbox: Has deadline
- Checkbox: Deadline urgent

#### `admin/assets/js/admin-list.js`
**Funcionalidad:**
- Cargar lista de programas desde API
- Paginación
- Filtros (estado, beneficiario, búsqueda)
- Botones de acción: Editar, Eliminar, Duplicar
- Confirmación antes de eliminar
- Refresh automático después de acciones

#### `admin/assets/js/admin-utils.js`
**Funcionalidad:**
- Utilidades generales
- Formateo de fechas
- Validación de campos
- Mensajes de éxito/error
- Confirmaciones (modal)

### 4.3 Páginas HTML

#### `admin/login.html`
**Estructura:**
- Formulario de login (username, password)
- Validación frontend
- Llamada a API `/api/auth/login`
- Guardar token
- Redirigir a dashboard

#### `admin/index.html` (Dashboard)
**Estructura:**
- Header con logout y info de usuario
- Estadísticas rápidas (total programas, por estado)
- Lista de programas con acciones
- Botón "Nuevo Programa"
- Filtros y búsqueda
- Paginación

#### `admin/programa-form.html`
**Estructura:**
- Formulario completo con todos los campos
- Validación en tiempo real
- Botón "Guardar"
- Botón "Cancelar" (volver a lista)
- Sección "Preview" (mostrar cómo se verá la tarjeta)
- Mensajes de éxito/error

#### `admin/programas-list.html`
**Estructura:**
- Tabla o cards con todos los programas
- Columnas: Nombre, Estado, Beneficiario, Fecha cierre, Acciones
- Filtros superiores
- Paginación inferior
- Botón "Nuevo" flotante o en header

---

## 5. Integración con Frontend Actual

### 5.1 Modificar `assets/js/data/programas.js`

**Cambios necesarios:**

**Antes:**
```javascript
const programas = [
    {name: "...", ...},
    // ... array estático
];
```

**Después:**
```javascript
(function(window) {
    'use strict';
    
    let programas = [];
    let isLoading = false;
    let lastFetch = null;
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
    
    async function loadProgramas(force = false) {
        // Si hay cache válido y no force, retornar cache
        if (!force && lastFetch && (Date.now() - lastFetch) < CACHE_DURATION) {
            return programas;
        }
        
        try {
            isLoading = true;
            const response = await fetch('/api/programas');
            const result = await response.json();
            
            if (result.success) {
                programas = result.data.programas || result.data;
                lastFetch = Date.now();
                // Disparar evento para notificar a otros módulos
                window.dispatchEvent(new CustomEvent('programasLoaded', {detail: programas}));
                return programas;
            } else {
                throw new Error(result.message || 'Error cargando programas');
            }
        } catch (error) {
            console.error('Error cargando programas:', error);
            // Retornar array vacío o cache anterior si existe
            return programas.length > 0 ? programas : [];
        } finally {
            isLoading = false;
        }
    }
    
    // Cargar inmediatamente al inicializar
    loadProgramas();
    
    // Exponer funciones
    window.MaulePro.Data = {
        programas: programas,
        getAllProgramas: async () => {
            await loadProgramas();
            return [...programas];
        },
        loadProgramas: loadProgramas,
        isLoading: () => isLoading
    };
    
})(window);
```

**Cambios:**
1. Cambiar array estático a función async `loadProgramas()`
2. Fetch a `/api/programas`
3. Cache con duración configurable
4. Evento `programasLoaded` para notificar a otros módulos
5. Manejo de errores (retornar cache o array vacío)

### 5.2 Modificar `assets/js/modules/filters.js`

**Cambios necesarios:**
- Esperar a que `programas.js` cargue datos antes de inicializar
- Escuchar evento `programasLoaded`
- O usar `await window.MaulePro.Data.getAllProgramas()` antes de aplicar filtros

### 5.3 Modificar `pages/buscar.html`

**Cambios necesarios:**
- Similar a `filters.js`
- Esperar carga de datos desde API
- Mismo comportamiento, solo cambia la fuente de datos

### 5.4 Actualizar `index.html`

**Cambios necesarios:**
- Mantener estructura HTML igual
- JavaScript cargará datos dinámicamente desde API
- Mostrar loading mientras cargan datos
- Manejar errores de carga

---

## 6. Seguridad y Autenticación

### 6.1 Autenticación en PHP

**Opción A: Sesiones PHP**
- Usar `$_SESSION` nativo de PHP
- Almacenar en tabla `sesiones` para persistencia
- Cookie `PHPSESSID` segura (HttpOnly, Secure, SameSite)

**Opción B: JWT (JSON Web Tokens)**
- Generar token al login
- Validar token en cada request
- Token en header `Authorization: Bearer {token}`
- Ventaja: Stateless, escalable

**Recomendación:** Sesiones PHP para simplicidad inicial, JWT si necesitas escalabilidad.

### 6.2 Roles y Permisos

**Roles:**
- `admin`: Acceso total (CRUD completo)
- `editor`: Crear y editar (sin eliminar)
- `viewer`: Solo lectura (GET)

**Middleware `RoleMiddleware.php`:**
- Verificar rol del usuario
- Comparar con rol requerido para endpoint
- Retornar 403 si no tiene permisos

### 6.3 Validación y Sanitización

**Backend (`api/utils/Validator.php`):**
- Validar todos los campos requeridos
- Validar tipos (string, date, enum)
- Validar formatos (fechas YYYY-MM-DD, URLs relativas)
- Sanitizar con `htmlspecialchars()`, `filter_var()`

**Frontend (`admin/assets/js/admin-form.js`):**
- Validación antes de enviar
- Feedback visual inmediato
- Evitar envíos inválidos

### 6.4 Seguridad Adicional

**Headers de seguridad:**
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Content-Security-Policy`

**SQL Injection Prevention:**
- Usar PDO con prepared statements
- Nunca concatenar variables en queries

**XSS Prevention:**
- Sanitizar todos los inputs
- `htmlspecialchars()` al mostrar datos
- Validar y sanitizar JSON

**CSRF Protection:**
- Tokens CSRF en formularios
- Verificar token en POST/PUT/DELETE

---

## 7. Estructura de Archivos Completa

```
MaulePro/
├── api/                         # Backend PHP (NUEVO)
│   ├── config/
│   │   ├── database.php
│   │   ├── constants.php
│   │   └── security.php
│   ├── models/
│   │   ├── BaseModel.php
│   │   ├── Programa.php
│   │   └── Usuario.php
│   ├── controllers/
│   │   ├── BaseController.php
│   │   ├── ProgramasController.php
│   │   └── AuthController.php
│   ├── middleware/
│   │   ├── AuthMiddleware.php
│   │   ├── RoleMiddleware.php
│   │   └── ValidationMiddleware.php
│   ├── utils/
│   │   ├── Database.php
│   │   ├── Response.php
│   │   ├── Validator.php
│   │   └── Security.php
│   ├── .htaccess
│   └── index.php
│
├── admin/                       # Frontend Admin (NUEVO)
│   ├── index.html              # Dashboard
│   ├── login.html              # Login admin
│   ├── programa-form.html      # Formulario crear/editar
│   ├── programas-list.html     # Lista de programas
│   └── assets/
│       ├── css/
│       │   └── admin.css
│       └── js/
│           ├── admin-api.js
│           ├── admin-auth.js
│           ├── admin-form.js
│           ├── admin-list.js
│           └── admin-utils.js
│
├── assets/
│   └── js/
│       └── data/
│           └── programas.js    # MODIFICAR: Cargar desde API
│
├── pages/
│   └── buscar.html             # Mantener igual, datos desde API
│
├── index.html                  # MODIFICAR: Esperar carga de API
│
└── ... (resto del proyecto)
```

---

## 8. Plan de Implementación

### Fase 1: Setup Inicial (1-2 días)

1. **Base de Datos:**
   - Crear base de datos MySQL
   - Ejecutar scripts SQL (crear tablas)
   - Insertar datos iniciales de `programas.js` actual

2. **Configuración PHP:**
   - Crear estructura de carpetas `/api`
   - Configurar `database.php` con credenciales
   - Crear `.htaccess` básico
   - Probar conexión a MySQL

3. **Modelo Base:**
   - Implementar `Database.php` (conexión PDO)
   - Implementar `BaseModel.php` (CRUD básico)
   - Implementar `Response.php` (respuestas JSON)

### Fase 2: API Básica (2-3 días)

1. **Modelo Programa:**
   - Implementar `Programa.php`
   - Métodos: `getAll()`, `getById()`, `create()`, `update()`, `delete()`

2. **Controlador:**
   - Implementar `ProgramasController.php`
   - Endpoints: GET, GET/:id, POST, PUT/:id, DELETE/:id

3. **Router:**
   - Implementar routing en `api/index.php`
   - Probar todos los endpoints con Postman/curl

### Fase 3: Autenticación (1-2 días)

1. **Modelo Usuario:**
   - Implementar `Usuario.php`
   - Métodos de autenticación

2. **Middleware:**
   - Implementar `AuthMiddleware.php`
   - Verificar token/sesión en requests

3. **Controller Auth:**
   - Implementar `AuthController.php`
   - Endpoints: POST `/login`, POST `/logout`, GET `/me`

### Fase 4: Frontend Admin Básico (2-3 días)

1. **Cliente API:**
   - Implementar `admin-api.js`
   - Probar comunicación con backend

2. **Autenticación Frontend:**
   - Implementar `admin-auth.js`
   - Página `login.html`

3. **Lista de Programas:**
   - Implementar `admin-list.js`
   - Página `programas-list.html` o `index.html`
   - Mostrar programas desde API

### Fase 5: Formulario CRUD (2-3 días)

1. **Formulario:**
   - Implementar `admin-form.js`
   - Página `programa-form.html`
   - Validación frontend
   - Envío a API (POST/PUT)

2. **Acciones:**
   - Crear nuevo programa
   - Editar programa existente
   - Eliminar programa (con confirmación)
   - Duplicar programa

### Fase 6: Integración Frontend (1-2 días)

1. **Modificar `programas.js`:**
   - Cambiar a carga desde API
   - Implementar cache
   - Eventos de carga

2. **Actualizar módulos:**
   - `filters.js`: Esperar carga de datos
   - `pages/buscar.html`: Cargar desde API

3. **Testing:**
   - Probar flujo completo
   - Verificar que frontend actual sigue funcionando

### Fase 7: Seguridad y Mejoras (1-2 días)

1. **Seguridad:**
   - Validación robusta backend
   - Sanitización de inputs
   - Headers de seguridad
   - CSRF tokens

2. **Auditoría:**
   - Implementar tabla `auditoria`
   - Registrar todas las acciones

3. **Mejoras:**
   - Paginación en lista admin
   - Filtros en lista admin
   - Búsqueda en lista admin
   - Preview de tarjeta antes de guardar

---

## 9. Archivos de Configuración

### `.env` (Variables de Entorno - OPCIONAL)

```
DB_HOST=localhost
DB_NAME=maulepro
DB_USER=usuario
DB_PASS=contraseña_segura
DB_CHARSET=utf8mb4

API_BASE_URL=/api
ADMIN_BASE_URL=/admin

JWT_SECRET=clave_secreta_muy_larga_y_aleatoria
SESSION_LIFETIME=3600
```

### `api/config/constants.php`

```php
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'maulepro');
define('DB_USER', 'usuario');
define('DB_PASS', 'contraseña');
define('DB_CHARSET', 'utf8mb4');

define('API_BASE_URL', '/api');
define('ADMIN_BASE_URL', '/admin');

define('JWT_SECRET', 'clave_secreta');
define('SESSION_LIFETIME', 3600);

define('CORS_ORIGIN', '*'); // O dominio específico en producción
?>
```

---

## 10. Consideraciones Adicionales

### 10.1 Migración de Datos Actuales

**Script de migración:**
- Extraer datos de `programas.js` actual
- Insertar en base de datos MySQL
- Verificar que todos los programas se migraron correctamente

### 10.2 Hosting

**Requisitos:**
- PHP 7.4 o superior
- MySQL 5.7 o superior (o MariaDB 10.3+)
- Apache con mod_rewrite (o Nginx con rewrite rules)
- SSL/HTTPS recomendado

**Configuración:**
- DocumentRoot apunta a carpeta raíz del proyecto
- `.htaccess` habilitado
- Permisos de escritura para backups/sesiones

### 10.3 Backup

**Estrategia:**
- Backup diario automático de base de datos
- Script PHP para exportar a SQL
- Almacenar backups en carpeta segura fuera de webroot

### 10.4 Testing

**Puntos a probar:**
- CRUD completo de programas
- Autenticación y autorización
- Validación de datos
- Manejo de errores
- Integración con frontend actual
- Rendimiento con muchos programas

---

## 11. Recursos y Referencias

### PHP
- [PHP PDO Documentation](https://www.php.net/manual/en/book.pdo.php)
- [PHP Sessions](https://www.php.net/manual/en/book.session.php)
- [PHP Password Hashing](https://www.php.net/manual/en/password.php)

### MySQL
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [MySQL Indexes](https://dev.mysql.com/doc/refman/8.0/en/mysql-indexes.html)

### JavaScript (Frontend)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

### Seguridad
- [OWASP PHP Security](https://cheatsheetseries.owasp.org/cheatsheets/PHP_Configuration_Cheat_Sheet.html)
- [PHP Security Best Practices](https://www.php.net/manual/en/security.php)

---

**Estado:** 📝 Documentación completa  
**Próximo paso:** Comenzar Fase 1 - Setup Inicial

