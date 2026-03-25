import os
import glob
import mammoth
from markdownify import markdownify as md

def convert_docx_to_md(directory):
    files = glob.glob(os.path.join(directory, '**', '*.docx'), recursive=True)
    for file_path in files:
        if "~$" in file_path: continue # skip temp files
        
        md_file_path = file_path.replace('.docx', '.md')
        print(f"Converting {file_path} -> {md_file_path}")
        
        try:
            with open(file_path, "rb") as docx_file:
                result = mammoth.convert_to_html(docx_file)
                html = result.value
                markdown_text = md(html)
                
            with open(md_file_path, "w", encoding="utf-8") as md_file:
                md_file.write(markdown_text)
                
            print(f"Successfully converted. Removing original docx...")
            os.remove(file_path)
            
        except Exception as e:
            print(f"Failed to convert {file_path}: {e}")

if __name__ == "__main__":
    import sys
    directory = sys.argv[1] if len(sys.argv) > 1 else "."
    convert_docx_to_md(directory)
