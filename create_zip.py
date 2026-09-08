import os
import zipfile

SITE_DIR = r"C:\Users\user0636\.gemini\antigravity-ide\scratch\financeiro\site"
OUTPUT_ZIP = r"C:\Users\user0636\.gemini\antigravity-ide\scratch\financeiro\zionsites_financeiro.zip"

def make_zip():
    with zipfile.ZipFile(OUTPUT_ZIP, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(SITE_DIR):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, SITE_DIR)
                zipf.write(file_path, arcname)
                print(f"Compactado: {arcname}")
    print(f"\nArquivo ZIP criado com sucesso em:\n{OUTPUT_ZIP}")

if __name__ == "__main__":
    make_zip()
