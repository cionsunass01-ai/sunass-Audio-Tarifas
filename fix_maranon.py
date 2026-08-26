import os
import uuid
import re

base_dir = r"c:\Users\Usuario Legal\Documents\carpetas de escritorio\Proyectos Software de sunass para continuar y programar y probar localmente\sunass-portal\sunass-plus---sunassplus\web-pages\eps-maranon"
content_dir = os.path.join(base_dir, "content-pages")

# Generate new IDs
new_root_id = str(uuid.uuid4())
new_content_id = str(uuid.uuid4())

# 1. Rename root files
for file in os.listdir(base_dir):
    if file.startswith("Emapa-Huaral"):
        old_path = os.path.join(base_dir, file)
        new_name = file.replace("Emapa-Huaral", "Eps-Maranon")
        new_path = os.path.join(base_dir, new_name)
        os.rename(old_path, new_path)

# 2. Update root yml
root_yml = os.path.join(base_dir, "Eps-Maranon.webpage.yml")
if os.path.exists(root_yml):
    with open(root_yml, "r", encoding="utf-8") as f:
        content = f.read()
    content = content.replace("adx_name: Emapa Huaral", "adx_name: Eps Maranon")
    content = content.replace("adx_partialurl: Emapa-Huaral", "adx_partialurl: eps-maranon")
    content = content.replace("adx_title: Emapa Huaral", "adx_title: EPS Marañón S.A.")
    # Replace ID
    content = re.sub(r'adx_webpageid: .*', f'adx_webpageid: {new_root_id}', content)
    with open(root_yml, "w", encoding="utf-8") as f:
        f.write(content)

# 3. Update content yml
content_yml = os.path.join(content_dir, "Eps-Maranon.es-ES.webpage.yml")
if os.path.exists(content_yml):
    with open(content_yml, "r", encoding="utf-8") as f:
        content = f.read()
    content = content.replace("adx_name: Emapa Huaral", "adx_name: Eps Maranon")
    content = content.replace("adx_title: Emapa Huaral", "adx_title: EPS Marañón S.A.")
    # Replace IDs
    content = re.sub(r'adx_rootwebpageid: .*', f'adx_rootwebpageid: {new_root_id}', content)
    content = re.sub(r'adx_webpageid: .*', f'adx_webpageid: {new_content_id}', content)
    with open(content_yml, "w", encoding="utf-8") as f:
        f.write(content)

# 4. Update the content HTML (we want to show something nice)
content_html = os.path.join(content_dir, "Eps-Maranon.es-ES.webpage.copy.html")
if os.path.exists(content_html):
    with open(content_html, "r", encoding="utf-8") as f:
        content = f.read()
    content = content.replace("EMAPA HUARAL S.A.", "EPS MARAÑÓN S.A.")
    content = content.replace("Huaral", "Marañón")
    with open(content_html, "w", encoding="utf-8") as f:
        f.write(content)

print("Fixed maranon files and ids")
