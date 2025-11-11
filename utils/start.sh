#!/bin/bash

# MaulePro Portal - Script de Inicio
# Este script inicia un servidor local para visualizar el portal

clear

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║           MaulePro Portal - Servidor Local              ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Verificar si Python está instalado
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 encontrado"
    echo "🚀 Iniciando servidor..."
    echo ""
    python3 server.py
elif command -v python &> /dev/null; then
    echo "✅ Python encontrado"
    echo "🚀 Iniciando servidor..."
    echo ""
    python -m http.server 8000
else
    echo "❌ Python no encontrado"
    echo ""
    echo "Por favor instala Python o abre el archivo index.html"
    echo "directamente en tu navegador."
    echo ""
    echo "Descarga Python en: https://www.python.org/downloads/"
    exit 1
fi

