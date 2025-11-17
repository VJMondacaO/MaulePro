# Gemfile para Jekyll en GitHub Pages
source "https://rubygems.org"

# Jekyll y plugins soportados por GitHub Pages
gem "jekyll", "~> 4.3"
gem "jekyll-feed", "~> 0.12"
gem "jekyll-sitemap", "~> 1.4"
gem "jekyll-seo-tag", "~> 2.8"

# Plataforma
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Windows no incluye zoneinfo files, por lo que necesita el gem tzinfo-data
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Reducir el tamaño del bundle
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

