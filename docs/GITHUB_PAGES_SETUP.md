# Configuración de GitHub Pages

## ✅ Archivos Necesarios

### `.nojekyll`
✅ Archivo creado en la raíz del proyecto para deshabilitar Jekyll en GitHub Pages. Esto permite servir los archivos HTML estáticos directamente sin procesamiento.

### `.gitignore`
Archivo creado para ignorar archivos del sistema operativo y dependencias.

## 🔍 Problemas Comunes y Soluciones

### 1. Rutas Relativas

**Problema**: Las rutas relativas pueden fallar si el repositorio no está en la raíz.

**Solución**: Todas las rutas en `index.html` usan rutas relativas desde la raíz:
- ✅ `assets/css/main.css` (correcto)
- ✅ `assets/images/logo.png` (correcto)
- ✅ `pages/buscar.html` (correcto)

### 2. Caracteres Especiales en Nombres de Archivos

**Problema**: El archivo `logo-diseño-sin-titulo.png` tiene una "ñ" que puede causar problemas.

**Solución**: Si hay problemas, considerar renombrar el archivo o usar encoding UTF-8.

### 3. Módulos CSS con @import

**Problema**: GitHub Pages puede tener problemas con `@import` en CSS.

**Solución**: Los módulos usan rutas relativas correctas:
```css
@import url('modules/_variables.css');
```

### 4. Archivos JavaScript

**Problema**: Verificar que todos los archivos JS existan y estén en las rutas correctas.

**Verificación**:
- ✅ `assets/js/utils/Logger.js`
- ✅ `assets/js/utils/DeadlineManager.js`
- ✅ `assets/js/utils/AccessibilityManager.js`
- ✅ `assets/js/data/programas.js`
- ✅ `assets/js/modules/modals/ModalManager.js`
- ✅ `assets/js/modules/forms/FormManager.js`
- ✅ `assets/js/modules/search/*.js`

## 🚀 Pasos para Publicar en GitHub Pages

1. **Crear repositorio en GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

2. **Configurar GitHub Pages**
   - Ir a Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
   - Save

3. **Verificar archivos necesarios**
   - ✅ `.nojekyll` en la raíz
   - ✅ `index.html` en la raíz
   - ✅ Todos los assets en sus carpetas

## 🔧 Verificación Post-Deploy

Después de desplegar, verificar:

1. ✅ La página carga correctamente
2. ✅ Los estilos CSS se aplican
3. ✅ Las imágenes se muestran
4. ✅ Los scripts JavaScript funcionan
5. ✅ Las rutas entre páginas funcionan

## ⚠️ Errores Comunes

### Error 404 en assets
**Causa**: Rutas incorrectas o archivos faltantes
**Solución**: Verificar que todas las rutas sean relativas desde la raíz

### CSS no se carga
**Causa**: Problema con `@import` o ruta incorrecta
**Solución**: Verificar `main.css` y sus imports

### JavaScript no funciona
**Causa**: Archivos faltantes o errores de sintaxis
**Solución**: Verificar la consola del navegador para errores específicos

### Imágenes no se muestran
**Causa**: Rutas incorrectas o caracteres especiales en nombres
**Solución**: Verificar rutas y considerar renombrar archivos con caracteres especiales

---

## 📝 Nota sobre Jekyll

Este proyecto usa `.nojekyll` para servir archivos estáticos directamente. Los archivos `_config.yml` y `Gemfile` están presentes pero **no se usarán** debido a `.nojekyll`. Si en el futuro quieres usar Jekyll, simplemente elimina el archivo `.nojekyll`.

---

**Última actualización**: Diciembre 2025

