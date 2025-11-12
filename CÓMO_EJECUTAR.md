# 🚀 Cómo Ejecutar MaulePro Portal

Este proyecto es **solo frontend** y no requiere instalación de dependencias. Todas las librerías (Bootstrap, Bootstrap Icons) se cargan desde CDN.

## ✅ Opción 1: Live Server (Recomendado para VS Code)

**Live Server es perfecto para este proyecto** y es la opción más fácil:

1. **Instalar Live Server en VS Code:**
   - Abre VS Code
   - Ve a Extensiones (Ctrl+Shift+X / Cmd+Shift+X)
   - Busca "Live Server" de Ritwick Dey
   - Haz clic en "Install"

2. **Ejecutar:**
   - Abre el archivo `index.html`
   - Haz clic derecho en el archivo
   - Selecciona "Open with Live Server"
   - O haz clic en el botón "Go Live" en la barra inferior de VS Code

3. **El navegador se abrirá automáticamente en:** `http://127.0.0.1:5500`

**Ventajas:**
- ✅ Recarga automática al guardar cambios
- ✅ Muy fácil de usar
- ✅ No requiere configuración adicional

---

## ✅ Opción 2: Servidor Python (Ya incluido)

El proyecto incluye un servidor Python listo para usar:

### En macOS/Linux:
```bash
# Desde la raíz del proyecto
cd utils
chmod +x start.sh
./start.sh
```

### En Windows:
```bash
# Desde la raíz del proyecto
cd utils
python server.py
```

### O directamente desde la raíz:
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Luego abre: `http://localhost:8000`

---

## ✅ Opción 3: Otros Servidores

### Con Node.js (npx):
```bash
npx serve
```

### Con PHP:
```bash
php -S localhost:8000
```

### Con http-server (Node.js):
```bash
npm install -g http-server
http-server -p 8000
```

---

## ✅ Opción 4: Abrir Directamente (Limitado)

Puedes abrir `index.html` directamente en el navegador, pero:
- ⚠️ Algunas funcionalidades pueden no funcionar (rutas relativas)
- ⚠️ El buscador puede tener problemas
- ⚠️ No es recomendado para desarrollo

---

## 📋 Requisitos

**No se necesita instalar nada** porque:
- ✅ Bootstrap 5 se carga desde CDN
- ✅ Bootstrap Icons se carga desde CDN
- ✅ Todo el JavaScript es vanilla (sin dependencias)
- ✅ No hay Node.js, npm, o paquetes requeridos

**Solo necesitas:**
- Un navegador moderno (Chrome, Firefox, Safari, Edge)
- Un servidor local (Live Server, Python, etc.) - **recomendado**

---

## 🎯 Recomendación

**Para desarrollo:** Usa **Live Server** en VS Code
- Es la opción más rápida y cómoda
- Recarga automática
- Sin configuración

**Para producción:** Usa cualquier servidor web estático (Apache, Nginx, etc.)

---

## 🔍 Verificar que Funciona

Una vez que el servidor esté corriendo:

1. Abre `http://localhost:8000` (o el puerto que uses)
2. Deberías ver la página principal con el logo del Gobierno Regional del Maule
3. Prueba el buscador (icono de lupa o presiona `/`)
4. Navega entre las páginas
5. Prueba el login (cualquier RUT de 7-8 dígitos funciona)

---

## ⚠️ Notas Importantes

- Este es un proyecto **solo frontend**
- No hay backend, todo es simulado
- El login es de demostración (no real)
- Las postulaciones no se envían a ningún servidor
- Los documentos no se descargan realmente

---

## 🐛 Solución de Problemas

### El buscador no funciona:
- Asegúrate de usar un servidor local (no abrir directamente el HTML)
- Verifica que Bootstrap JS esté cargado (consola del navegador)

### Las imágenes no se ven:
- Verifica que la ruta `assets/images/Logo.png` exista
- Asegúrate de usar un servidor local

### Los enlaces no funcionan:
- Usa un servidor local (Live Server, Python, etc.)
- No abras el HTML directamente

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:
1. Abre la consola del navegador (F12)
2. Revisa si hay errores en rojo
3. Verifica que estés usando un servidor local
4. Asegúrate de que todos los archivos estén en su lugar

