import os

html_path = r'c:\Users\MSY\Desktop\Portpolio\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

ur_card_block = '''                    
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

new_section_block = '''
        <!-- UR Club Section -->
        <section id="ur-club" class="section bg-light">
            <div class="container">
                <h2 class="section-title slide-up">Extracurricular Activity</h2>
                
                <div class="ur-club-container slide-up" style="background: var(--bg-white); border-radius: 16px; box-shadow: var(--shadow-lg); border: 1px solid var(--border-color); overflow: hidden;">
                    <div style="background: var(--samsung-blue-dark); padding: 30px; text-align: center;">
                        <span style="display:inline-block; background:rgba(255,255,255,0.2); color:white; padding: 4px 12px; border-radius:20px; font-size:0.85rem; font-weight:600; margin-bottom:15px;">Robotics Teamwork & Leadership</span>
                        <h3 style="color: white; font-size: 1.8rem; font-weight: 800; margin:0;">UR 로봇 동아리 융합 프로젝트</h3>
                        <p style="color: rgba(255,255,255,0.8); margin-top:10px;">리더 (2024 - 2025)</p>
                    </div>
                    
                    <div style="padding: 40px;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-bottom: 30px;">
                            <div style="border-left: 4px solid var(--samsung-blue); padding-left: 20px;">
                                <h4 style="color: var(--text-main); font-size: 1.2rem; margin-bottom: 10px;">🎯 목표 및 성과</h4>
                                <p style="color: var(--text-light); line-height: 1.6; font-size: 0.95rem;">로봇공학 이론을 바탕으로 기계설계, 제어, AI 등 다학제적 배경의 팀원들과 융합 프로젝트를 기획하고 리드하여 성공적으로 완성했습니다.</p>
                            </div>
                            <div style="border-left: 4px solid #4caf50; padding-left: 20px;">
                                <h4 style="color: var(--text-main); font-size: 1.2rem; margin-bottom: 10px;">🛠️ 해결 과정</h4>
                                <p style="color: var(--text-light); line-height: 1.6; font-size: 0.95rem;">제작 중 발생하는 기술적 한계와 버그를 팀원들과 끈기 있게 추적하며 극복했고, 하드웨어와 소프트웨어(HW/SW)의 연동 원리를 실증적으로 체득했습니다.</p>
                            </div>
                        </div>

                        <div class="so-what-layer" style="background: var(--bg-light); padding: 25px; border-radius: 12px; border-left: 4px solid var(--samsung-blue);">
                            <h4 style="color: var(--text-main); margin-bottom: 10px; font-size: 1.1rem;">💡 Maintenance Philosophy</h4>
                            <p style="font-size: 0.95rem; color: var(--text-light); line-height: 1.6; margin:0;">단일 전공 지식을 넘어서 유관 부서(기구 설계, 소프트웨어 등)의 강점을 조율하는 <strong>융합적 협업(Teamwork) 리드 경험</strong>은 반도체 설비의 복합적 이슈를 유관자들과 원활히 소통하고 돌파하는 데 중대한 강점이 됩니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
'''

target_insertion_point = "<!-- PLC Simulator Section -->"

if ur_card_block in html:
    html = html.replace(ur_card_block, '')
else:
    print("Warning: UR card block not exactly matched. It might not be removed.")

if target_insertion_point in html:
    html = html.replace(target_insertion_point, new_section_block + "        " + target_insertion_point)
else:
    print("Insertion point not found.")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Section added.")
