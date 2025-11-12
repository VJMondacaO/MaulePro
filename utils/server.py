#!/usr/bin/env python3
"""
Simple HTTP Server for MaulePro Portal Clone
Run this script to start a local web server
"""

import http.server
import socketserver
import webbrowser
import os
from pathlib import Path

# Configuration
PORT = 8000
# Serve from project root (parent of utils directory)
DIRECTORY = Path(__file__).parent.parent

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def main():
    # Change to the directory containing this script
    os.chdir(DIRECTORY)
    
    # Create server
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print("╔═══════════════════════════════════════════════════════════╗")
        print("║           MaulePro Portal - Servidor Local              ║")
        print("╚═══════════════════════════════════════════════════════════╝")
        print()
        print(f"✅ Servidor iniciado en el puerto {PORT}")
        print()
        print(f"🌐 Abre tu navegador en:")
        print(f"   http://localhost:{PORT}")
        print(f"   http://127.0.0.1:{PORT}")
        print()
        print("⚡ Presiona Ctrl+C para detener el servidor")
        print("═" * 61)
        print()
        
        # Automatically open browser
        try:
            webbrowser.open(f'http://localhost:{PORT}')
            print("🚀 Abriendo navegador automáticamente...")
        except:
            print("💡 Por favor, abre manualmente tu navegador")
        
        print()
        
        # Start serving
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Servidor detenido.")
            print("   ¡Gracias por usar MaulePro Portal!")

if __name__ == "__main__":
    main()

