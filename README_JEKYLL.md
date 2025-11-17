# Configuración de Jekyll para GitHub Pages

Este proyecto está configurado para funcionar con Jekyll en GitHub Pages.

## 📋 Requisitos

- Ruby 2.7 o superior
- Bundler gem

## 🚀 Instalación Local

1. **Instalar dependencias:**
   ```bash
   bundle install
   ```

2. **Ejecutar servidor local:**
   ```bash
   bundle exec jekyll serve
   ```

3. **Acceder al sitio:**
   ```
   http://localhost:4000
   ```

## 📁 Estructura de Jekyll

```
MaulePro/
├── _config.yml          # Configuración de Jekyll
├── Gemfile              # Dependencias de Ruby
├── index.html           # Página principal
├── assets/              # Recursos estáticos
│   ├── css/
│   ├── js/
│   └── images/
├── pages/               # Páginas HTML
└── components/          # Componentes reutilizables
```

## 🔧 Configuración

### Variables en `_config.yml`

- `title`: Título del sitio
- `description`: Descripción del sitio
- `baseurl`: Ruta base (vacío para raíz)
- `url`: URL del sitio en producción

### Personalización

Edita `_config.yml` para personalizar:
- Información del sitio
- Plugins habilitados
- Configuración de SEO
- Navegación

## 📦 Despliegue en GitHub Pages

1. **Hacer commit de los archivos:**
   ```bash
   git add _config.yml Gemfile .gitignore
   git commit -m "Add Jekyll configuration"
   git push
   ```

2. **Configurar GitHub Pages:**
   - Ve a Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
   - Save

3. **GitHub Pages procesará automáticamente:**
   - Jekyll generará el sitio estático
   - Los archivos HTML se servirán correctamente
   - Los assets se mantendrán en sus rutas

## ⚠️ Notas Importantes

### Archivos Estáticos

Si prefieres servir archivos HTML estáticos sin procesamiento de Jekyll:
1. Crea un archivo `.nojekyll` en la raíz
2. Esto deshabilitará Jekyll y servirá los archivos directamente

### Rutas Relativas

Todas las rutas en el proyecto usan rutas relativas desde la raíz:
- ✅ `assets/css/main.css`
- ✅ `pages/programas/fndr-8.html`
- ✅ `index.html`

### Plugins Soportados

GitHub Pages soporta plugins limitados. Los configurados son:
- `jekyll-feed`: Genera feed RSS
- `jekyll-sitemap`: Genera sitemap.xml
- `jekyll-seo-tag`: Mejora SEO

## 🔍 Solución de Problemas

### Error: "Could not locate Gemfile"
```bash
bundle install
```

### Error: "Jekyll not found"
```bash
gem install jekyll bundler
bundle install
```

### Los cambios no se reflejan
```bash
bundle exec jekyll serve --force_polling
```

### Limpiar caché
```bash
bundle exec jekyll clean
```

## 📚 Recursos

- [Documentación de Jekyll](https://jekyllrb.com/docs/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Jekyll en GitHub Pages](https://jekyllrb.com/docs/github-pages/)

---

**Última actualización**: Diciembre 2025

