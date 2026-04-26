import re

css_path = r'c:\Users\MSY\Desktop\Portpolio\style.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

new_root = '''\:root {
    --samsung-blue: #3b82f6;
    --samsung-blue-light: #60a5fa;
    --samsung-blue-dark: #1e3a8a;
    --text-main: #f1f5f9;
    --text-light: #94a3b8;
    --bg-white: #0f172a;
    --bg-light: #1e293b;
    --bg-gray: #334155;
    --border-color: #334155;
    --shadow-sm: 0 2px 4px rgba(0,0,0,0.3);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.5);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.6);
    --shadow-blue: 0 10px 25px rgba(59, 130, 246, 0.15);
    --transition: all 0.3s ease;
}'''
new_root = new_root.replace('\:', ':')

css = re.sub(r':root\s*\{.*?--transition:\s*all\s*0\.3s\s*ease;\s*\}', new_root, css, flags=re.DOTALL)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

html_path = r'c:\Users\MSY\Desktop\Portpolio\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

new_hero = '''        <div class="hero-content slide-up">
            <h1 class="hero-title" style="font-size: 3.5rem; letter-spacing: -1px; margin-bottom: 5px;">에이전틱 아키텍트</h1>
            <h2 class="hero-subtitle" style="font-size: 1.2rem; text-transform: none; color: var(--text-light); font-weight: 500; letter-spacing: 1px;">시스템 유지보수 지원자 맹세영</h2>
            <p class="hero-slogan" style="margin-top: 25px;">"시스템의 의도를 설계하고, 가동률의 한계를 돌파하겠습니다."</p>
            <p style="margin-top:20px; font-size:1.1rem; color:var(--text-light); max-width:800px; margin-left:auto; margin-right:auto;">
                저는 하드웨어의 메커니즘을 이해하는 것을 넘어, AI와 클라우드를 융합하여 장비의 결함을 예측하고 극복하는 현대적인 'DX 기반 유지보수 아키텍트'를 지향합니다.
            </p>
        </div>'''

html = re.sub(r'<div class="hero-content slide-up">.*?</div>\s*<div class="hero-background">', new_hero + '\n        <div class="hero-background">', html, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print('Done!')
