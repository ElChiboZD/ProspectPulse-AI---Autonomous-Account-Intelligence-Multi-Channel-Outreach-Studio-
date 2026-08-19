# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['C:/Users/travi/Desktop/Prospect---Outreach-Console-portfolio-sanitized/app.py'],
    pathex=[],
    binaries=[],
    datas=[('C:/Users/travi/Desktop/Prospect---Outreach-Console-portfolio-sanitized/static', 'static'), ('C:/Users/travi/Desktop/Prospect---Outreach-Console-portfolio-sanitized/prompts', 'prompts')],
    hiddenimports=['edge_tts', 'aiohttp', 'cachetools', 'requests', 'dns.resolver', 'dns.rdatatype', 'webview', 'webview.platforms.winforms', 'clr_loader', 'pythonnet', 'server', 'db', 'demo_data'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='ProspectPulse-AI',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='ProspectPulse-AI',
)
