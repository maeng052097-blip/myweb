import os

html_path = r'c:\Users\MSY\Desktop\Portpolio\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

ur_timeline_block = '''                    <!-- Event 2 (New) UR Club Activity -->
                    <div class="timeline-item slide-up">
                        <div class="timeline-icon">🤖</div>
                        <div class="timeline-content" style="border-left: 4px solid var(--samsung-blue-light);">
                            <span class="timeline-date">2024 - 2025</span>
                            <h3 class="timeline-title">UR 로봇 동아리 융합 프로젝트 리드</h3>
                            <div class="timeline-desc" style="font-size:0.95rem;">
                                <ul style="padding-left: 20px; list-style-type: none; margin-bottom: 0;">
                                    <li style="margin-bottom:8px; position:relative;"><span style="color:var(--samsung-blue); position:absolute; left:-18px;">▪</span><strong>이론과 실습의 가교 (Theory to Practice):</strong> 로봇공학 이론을 실제 설계와 제작에 적용하며 HW/SW 연동 원리를 체득했습니다.</li>
                                    <li style="margin-bottom:8px; position:relative;"><span style="color:var(--samsung-blue); position:absolute; left:-18px;">▪</span><strong>융합적 협업 능력 (Teamwork):</strong> 기계설계, 제어, AI 등 다양한 배경의 팀원들과 협업하여 다학제적 프로젝트를 완성했습니다.</li>
                                    <li style="position:relative;"><span style="color:var(--samsung-blue); position:absolute; left:-18px;">▪</span><strong>창의적 문제 해결 (Troubleshooting):</strong> 팀워크를 기반으로 제작 중 발생하는 기술적 한계와 버그를 끈기 있게 추적하여 극복했습니다.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
'''

new_project_card = '''                    
                    <div class="project-card slide-up">
                        <div class="project-header">
                            <span class="project-tag">Robotics Teamwork</span>
                            <h3>UR 로봇 동아리 융합 프로젝트 (리더)</h3>
                        </div>
                        <div class="project-body">
                            <ul class="project-details">
                                <li><strong>목표 및 성과:</strong> 로봇공학 이론을 바탕으로 기계설계, 제어, AI 등 다학제적 배경의 팀원들과 융합 프로젝트(2024-2025) 리드 및 완성</li>
                                <li><strong>해결 과정:</strong> 제작 중 발생하는 기술적 한계와 버그를 끈기 있게 추적하고 극복하며 하드웨어/소프트웨어(HW/SW) 연동 원리를 실증적으로 체득</li>
                            </ul>
                            <div class="so-what-layer">
                                <h4>💡 Maintenance Philosophy</h4>
                                <p>단일 전공 지식을 넘어서 유관 부서(기구 설계, 소프트웨어 등)의 강점을 조율하는 <strong>융합적 협업(Teamwork) 리드 경험</strong>은 반도체 설비의 복합적 이슈를 유관자들과 원활히 소통하고 돌파하는 데 중대한 강점이 됩니다.</p>
                            </div>
                        </div>
                    </div>
'''

projects_end = '                </div>\n            </div>\n        </section>'

# Remove UR block from timeline
if ur_timeline_block in html:
    html = html.replace(ur_timeline_block, '')
else:
    print("Warning: UR timeline block not found exactly as string. It might have been modified.")

# Insert new project card at the end of the projects grid
# We look for the end of the projects grid
html = html.replace(projects_end, new_project_card + projects_end)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Update completed successfully.")
