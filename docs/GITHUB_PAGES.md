# 🚀 Configuración para GitHub Pages

## Problema Común: "No se ve nada en GitHub Pages"

Si al subir tu sitio a GitHub Pages no se ve nada, sigue estos pasos:

## ✅ Solución 1: Archivo `.nojekyll`

GitHub Pages usa Jekyll por defecto, pero este proyecto no necesita Jekyll. Se ha creado el archivo `.nojekyll` en la raíz del proyecto para desactivar Jekyll.

**Verificar que existe:**
```bash
ls -la .nojekyll
```

Si no existe, créalo:
```bash
touch .nojekyll
```

## ✅ Solución 2: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Source**, selecciona:
   - **Branch**: `main` (o `master`)
   - **Folder**: `/ (root)`
5. Click en **Save**

## ✅ Solución 3: Verificar Estructura

Asegúrate de que tu estructura sea:

```
MaulePro/
├── .nojekyll          ← IMPORTANTE
├── index.html         ← Debe estar en la raíz
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── pages/
└── ...
```

## ✅ Solución 4: Rutas Relativas

Todas las rutas en el proyecto usan rutas relativas desde la raíz:

- ✅ `assets/css/main.css` (correcto)
- ✅ `assets/images/logo-gore-horizontal.png` (correcto)
- ✅ `pages/programas/fndr-8.html` (correcto)

**NO uses rutas absolutas que empiecen con `/`** porque no funcionarán en GitHub Pages a menos que uses un dominio personalizado.

## ✅ Solución 5: Verificar que los Archivos Están Commiteados

```bash
# Verificar que .nojekyll está en git
git status

# Si no está, agregarlo
git add .nojekyll
git commit -m "Add .nojekyll for GitHub Pages"
git push
```

## ✅ Solución 6: Esperar la Activación

Después de configurar GitHub Pages:
1. Espera 1-2 minutos para que GitHub procese el sitio
2. Ve a: `https://TU_USUARIO.github.io/MaulePro/`
3. Si no funciona, verifica que la rama esté actualizada

## 🔍 Verificar que Funciona

1. Abre la consola del navegador (F12)
2. Ve a la pestaña **Network** (Red)
3. Recarga la página
4. Verifica que los archivos CSS y JS se cargan correctamente:
   - `assets/css/main.css` → Status 200
   - `assets/js/script.js` → Status 200
   - `assets/images/logo-gore-horizontal.png` → Status 200

Si ves errores 404, las rutas están mal configuradas.

## ⚠️ Problemas Comunes

### Error: "404 - File not found"
- Verifica que `index.html` esté en la raíz
- Verifica que las rutas sean relativas (sin `/` al inicio)
- Verifica que `.nojekyll` exista

### Error: "Página en blanco"
- Abre la consola del navegador (F12)
- Revisa errores en la pestaña **Console**
- Verifica que los archivos CSS/JS se carguen (pestaña **Network**)

### Error: "CSS no se aplica"
- Verifica que `assets/css/main.css` exista
- Verifica que los módulos CSS estén en `assets/css/modules/`
- Verifica que los `@import` en `main.css` usen rutas relativas

## 📝 Checklist Final

- [ ] Archivo `.nojekyll` existe en la raíz
- [ ] `index.html` está en la raíz del proyecto
- [ ] GitHub Pages está configurado en Settings → Pages
- [ ] La rama `main` (o `master`) está actualizada
- [ ] Todos los archivos están commiteados y pusheados
- [ ] Esperaste 1-2 minutos después de configurar
- [ ] La URL es: `https://TU_USUARIO.github.io/MaulePro/`

## 🔗 URLs de GitHub Pages

Si tu repositorio es: `https://github.com/USUARIO/MaulePro`

Tu sitio estará en: `https://USUARIO.github.io/MaulePro/`

---

**Nota**: Si el repositorio se llama exactamente `MaulePro`, la URL será `https://USUARIO.github.io/MaulePro/`. Si el repositorio tiene otro nombre, ajusta la URL.

