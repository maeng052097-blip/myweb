import os

html_path = r'c:\Users\MSY\Desktop\Portpolio\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('Robotics Teamwork & Leadership', 'Robotics Teamwork')
html = html.replace('리더 (2024 - 2025)', '팀원 (2026 - 진행중)')
html = html.replace('기획하고 리드하여', '함께 기획하고 협업하여')
html = html.replace('융합적 협업(Teamwork) 리드 경험', '융합적 협업(Teamwork) 경험')

if 'chart.js' not in html:
    html = html.replace('</head>', '    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n</head>')

canvas_html = '''
                        <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid var(--border-color);">
                            <h4 style="color: var(--text-main); font-size: 1.2rem; margin-bottom: 20px; text-align: center;">📈 성장 지표 (Growth Metrics)</h4>
                            <div style="position: relative; height: 300px; width: 100%; max-width: 800px; margin: 0 auto;">
                                <canvas id="growthChart"></canvas>
                            </div>
                        </div>'''

if 'id="growthChart"' not in html:
    end_layer = '</div>\n                    </div>\n                </div>'
    if end_layer in html:
        html = html.replace(end_layer, '</div>' + canvas_html + '\n                    </div>\n                </div>')
    else:
        print("Failed to find insertion point.")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

js_path = r'c:\Users\MSY\Desktop\Portpolio\script.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

chart_js_code = '''
    // Chart.js Initialization
    const ctx = document.getElementById('growthChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['프로젝트 투입 전', '기획/설계 단계', '구현 및 디버깅', '현재 (2026)'],
                datasets: [
                    {
                        label: '하드웨어 & 제어 이해도',
                        data: [20, 50, 75, 90],
                        borderColor: '#60a5fa',
                        backgroundColor: 'rgba(96, 165, 250, 0.2)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: '소프트웨어 및 트러블슈팅 역량',
                        data: [40, 55, 80, 95],
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.2)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#94a3b8',
                            font: { family: "'Noto Sans KR', sans-serif", size: 13 }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8', font: { family: "'Noto Sans KR', sans-serif" } },
                        grid: { color: '#334155' }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { color: '#94a3b8' },
                        grid: { color: '#334155' }
                    }
                }
            }
        });
    }
'''

if 'getElementById("growthChart")' not in js:
    js = js.replace('const slideUpElements = document.querySelectorAll(".slide-up");', chart_js_code + '\n    const slideUpElements = document.querySelectorAll(".slide-up");')
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js)

print("Done")
