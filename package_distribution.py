import os
import shutil
import zipfile
import subprocess
import sys

def package_distribution():
    print("Starting Windows Distribution Packaging...")
    
    version = "v1.0.0"
    dist_dir = "dist"
    exe_name = "ProspectPulse-AI-Standalone.exe"
    exe_path = os.path.join(dist_dir, exe_name)
    
    # Check if the exe exists, if not run build_exe.py
    if not os.path.exists(exe_path):
        print(f"{exe_name} not found. Running build_exe.py...")
        subprocess.run([sys.executable, "build_exe.py"], check=True)
    
    if not os.path.exists(exe_path):
        print("Error: Executable still not found after build attempt.")
        sys.exit(1)
        
    package_dir = os.path.join(dist_dir, f"ProspectPulse-AI-{version}-Windows-x64")
    
    # Clean previous directory if exists
    if os.path.exists(package_dir):
        shutil.rmtree(package_dir)
    os.makedirs(package_dir)
    
    # Copy executable
    shutil.copy(exe_path, os.path.join(package_dir, "ProspectPulse-AI.exe"))
    
    # Create README.txt
    readme_content = """ProspectPulse AI Beta
1. Double-click ProspectPulse-AI.exe or Launch-ProspectPulse.bat to start.
2. Ensure you have internet connection for AI features.
3. Use the Beta Feedback button in the app to report issues."""
    with open(os.path.join(package_dir, "README.txt"), "w") as f:
        f.write(readme_content)
        
    # Create Launch-ProspectPulse.bat
    bat_content = """@echo off
start "" "ProspectPulse-AI.exe"
"""
    with open(os.path.join(package_dir, "Launch-ProspectPulse.bat"), "w") as f:
        f.write(bat_content)
        
    # Zip it up
    zip_path = os.path.join(dist_dir, f"ProspectPulse-AI-{version}-Windows-x64.zip")
    print(f"Creating zip archive at {zip_path}...")
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(package_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, os.path.dirname(package_dir))
                zipf.write(file_path, arcname)
                
    print(f"Packaging complete! Distribution saved to {zip_path}")

if __name__ == "__main__":
    package_distribution()
