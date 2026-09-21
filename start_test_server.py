import http.server
import socketserver
import webbrowser
import os
import socket
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'site')

def find_free_port(start_port=5500):
    port = start_port
    while port < 6500:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('localhost', port)) != 0:
                return port
            port += 1
    return 5500

PORT = find_free_port()

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

print("=" * 60)
print("  [SERVIDOR DE TESTES LOCAL] - VICTOR FINANCAS")
print(f"  Porta selecionada: {PORT}")
print(f"  Acesse no navegador: http://localhost:{PORT}/login.html")
print("=" * 60)
print("Pressione Ctrl+C para encerrar o teste a qualquer momento.\n")

try:
    webbrowser.open(f"http://localhost:{PORT}/login.html")
except Exception:
    pass

socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("localhost", PORT), CustomHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor de testes encerrado.")
