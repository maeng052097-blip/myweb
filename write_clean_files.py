import os

html_content = '''<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>맹세영 | 에이전틱 유지보수 아키텍트 포트폴리오</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="code-watermark">
        > SYSTEM_INIT: FSE_AGENT_LOADED<br>
        > CONNECTING_TO: EQUIP_NODE_01... OK<br>
        > ML_CALIBRATION_ALGO: RUNNING... OPTIMIZED (+30%)<br>
        > SAFETY_INTERLOCK_CHK: VERIFIED<br>
        > WAITING_FOR_COMMAND...
    </div>

    <header class="hero">
        <div class="hero-content slide-up">
            <h1 class="hero-title" style="font-size: 3.5rem; letter-spacing: -1px; margin-bottom: 5px;">에이전틱 아키텍트</h1>
            <h2 class="hero-subtitle" style="font-size: 1.2rem; text-transform: none; color: var(--text-light); font-weight: 500; letter-spacing: 1px;">시스템 유지보수 지원자 맹세영</h2>
            <p class="hero-slogan" style="margin-top: 25px;">"시스템의 의도를 설계하고, 가동률의 한계를 돌파하겠습니다."</p>
            <p style="margin-top:20px; font-size:1.1rem; color:var(--text-light); max-width:800px; margin-left:auto; margin-right:auto;">
                저는 하드웨어의 메커니즘을 이해하는 것을 넘어, AI와 클라우드를 융합하여 장비의 결함을 예측하고 극복하는 현대적인 'DX 기반 유지보수 아키텍트'를 지향합니다.
            </p>
        </div>
        <div class="hero-background"></div>
    </header>

    <main>
        <!-- 3 Core Strengths Section (New) -->
        <section id="vision" class="section">
            <div class="container">
                <h2 class="section-title slide-up">에이전틱 아키텍트의 3가지 핵심 역량</h2>
                <div class="vision-grid slide-up" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
                    
                    <div class="vision-card" style="background: var(--bg-white); padding: 35px 30px; border-radius: 16px; box-shadow: var(--shadow-md); border-top: 4px solid var(--samsung-blue);">
                        <div style="font-size: 2.5rem; margin-bottom: 20px;">🤖</div>
                        <h3 style="color: var(--text-main); margin-bottom: 15px; font-size: 1.3rem;">1. 에이전틱 아키텍트 (Agentic Architect)</h3>
                        <p style="color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">단순히 코드를 타이핑하는 '코더'를 넘어, AI 에이전트에게 명확한 설계 지침을 하달하고 복잡한 시스템을 구축하는 <strong>시스템 지휘자</strong>입니다. IAFA 프롬프트 아키텍팅(정체성, 사용자, 기능, 미학)을 활용하여 AI가 정교한 결과물을 산출하도록 유도하며, 에이전트의 자율성과 인간의 통제권 사이에서 최적의 균형을 설계합니다.</p>
                    </div>

                    <div class="vision-card" style="background: var(--bg-white); padding: 35px 30px; border-radius: 16px; box-shadow: var(--shadow-md); border-top: 4px solid var(--samsung-blue-light);">
                        <div style="font-size: 2.5rem; margin-bottom: 20px;">☁️</div>
                        <h3 style="color: var(--text-main); margin-bottom: 15px; font-size: 1.3rem;">2. 융합형 개발자 (Full-stack Integrator)</h3>
                        <p style="color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">로봇소프트웨어학 전공으로 디지털 논리회로, 전자 실습, Python, CAD 등의 <strong>탄탄한 공학적 기초 지식</strong>을 보유하고 있습니다. 여기에 Firebase Studio, AppSheet, Cloud Run을 활용한 풀스택 배포 실무 능력을 더해, 하드웨어적 사고와 현대적인 클라우드 기반 서비스 구축 능력을 동시에 발휘합니다.</p>
                    </div>

                    <div class="vision-card" style="background: var(--bg-white); padding: 35px 30px; border-radius: 16px; box-shadow: var(--shadow-md); border-top: 4px solid #4caf50;">
                        <div style="font-size: 2.5rem; margin-bottom: 20px;">🎯</div>
                        <h3 style="color: var(--text-main); margin-bottom: 15px; font-size: 1.3rem;">3. 결과 중심적 문제 해결사 (Problem Solver)</h3>
                        <p style="color: var(--text-main); line-height: 1.6; font-size: 0.95rem;">기술적 구현 자체에 매몰되지 않고, <span style="background:var(--bg-light); padding:2px 6px; border-radius:4px; font-weight:bold;">"이 기능이 왜 필요한가? (So What?)"</span> 관점에서 가치를 고민합니다. 생성된 산출물(Artifacts)을 정밀하게 검증하여 프로젝트의 직무 완성도와 경험(UX)을 극대화하며, 단순한 코드가 아닌 <strong>설계와 기획 의도(Vibe)가 살아있는 솔루션</strong>을 구현합니다.</p>
                    </div>

                </div>

                <!-- Infographic Image -->
                <div class="infographic-container slide-up" style="margin-top: 50px; text-align: center;">
                    <img src="images/infographic.jpg" alt="맹세영 에이전틱 아키텍트 인포그래픽" style="max-width: 100%; border-radius: 16px; box-shadow: var(--shadow-lg); border: 1px solid var(--border-color);">
                </div>

            </div>
        </section>

        <!-- Core Competencies Section -->
        <section id="competencies" class="section bg-light relative-sec">
            <div class="container">
                <h2 class="section-title slide-up">5 Core Competencies</h2>
                <div class="competencies-grid" id="competencies-grid">
                    
                    <div class="competency-card slide-up highlight-border">
                        <div class="comp-icon">🤖</div>
                        <h3>1. AI 기반 시스템 최적화 역량</h3>
                        <p><strong>AI 보정 알고리즘 설계:</strong> 캡스톤 디자인 프로젝트에서 로봇 팔의 정밀도 문제를 해결하기 위해 하드웨어 교체 대신 AI 기반 보정 알고리즘을 제안하여 정밀도를 30% 향상시킨 경험이 있습니다.</p>
                        <p class="impact"><strong>유지보수 가치:</strong> 노후 장비나 기계적 오차를 소프트웨어적 아키텍팅으로 보완하여 장비 수명을 연장하고 비용을 절감하는 삼성전자의 '창의적 인재' 상에 부합합니다.</p>
                    </div>

                    <div class="competency-card slide-up">
                        <div class="comp-icon">⚙️</div>
                        <h3>2. 반도체 자동화 및 PLC 전문성</h3>
                        <p><strong>GX-Works3 숙련도:</strong> 반도체 부트캠프와 전공 수업을 통해 GX-Works3를 활용한 시퀀스 제어 및 래더 다이어그램 작성 능력을 확보했습니다.</p>
                        <p class="impact"><strong>안전 로직 설계:</strong> 반도체 공정 안정성을 위해 필수적인 '자기 유지 회로(Self-holding)'와 '인터록 회로(Interlock)' 논리를 완벽히 설계할 수 있습니다.</p>
                    </div>

                    <div class="competency-card slide-up">
                        <div class="comp-icon">🧠</div>
                        <h3>3. 에이전틱 아키텍팅 및 DX 역량</h3>
                        <p><strong>IAFA 프롬프트 설계:</strong> AI 에이전트를 넘어 IAFA 4요소를 활용해 명확한 설계 지침을 하달하는 시스템 지휘자 역량을 갖추었습니다.</p>
                        <p class="impact"><strong>Artifacts 검증:</strong> 산출물(코드, 로그)을 직접 분석하고 'So What?' 관점에서 UX와 완성도를 정밀 검증할 수 있습니다.</p>
                    </div>

                    <div class="competency-card slide-up">
                        <div class="comp-icon">🔎</div>
                        <h3>4. 데이터 기반 문제 해결 (Troubleshooting)</h3>
                        <p><strong>논리적 디버깅:</strong> PLC 실습 중 발생한 타이머 오류와 통신 간섭 문제를 회로도 기반으로 끝까지 추적하여 해결한 끈기가 있습니다.</p>
                        <p class="impact"><strong>실시간 모니터링:</strong> C#을 이용한 윈도우 프로그래밍으로 로봇 및 장비 상태를 실시간 관리하는 시스템 추적 경험이 있습니다.</p>
                    </div>

                    <div class="competency-card slide-up">
                        <div class="comp-icon">☁️</div>
                        <h3>5. 하이브리드 서비스 구현 (Cloud)</h3>
                        <p><strong>풀스택 배포 실무:</strong> Firebase와 AppSheet를 연동하여 데이터베이스가 통합된 하이브리드 서비스를 실제 클라우드에 배포하고 관리해본 경험이 있습니다.</p>
                        <p class="impact"><strong>유지보수 혁신:</strong> 장비 로그 데이터를 클라우드로 관리하여 예지보전(Predictive Maintenance) 시스템을 구축할 수 있는 기반 역량입니다.</p>
                    </div>

                </div>
            </div>
        </section>

        <!-- Career Story Section -->
        <section id="career" class="section">
            <div class="container">
                <h2 class="section-title slide-up">Career Timeline</h2>
                <div class="timeline">
                    <!-- Event 1 -->
                    <div class="timeline-item slide-up">
                        <div class="timeline-icon">🎖️</div>
                        <div class="timeline-content">
                            <span class="timeline-date">2023 - 2024</span>
                            <h3 class="timeline-title">육군 만기 전역</h3>
                            <p class="timeline-desc">예측 불가능한 상황에서도 규정과 매뉴얼에 기반한 대응 역량을 체득했습니다. 팀 기반의 작업 환경에서 굳건한 책임감과 조직 협업 능력을 함양했습니다.</p>
                        </div>
                    </div>
                    <!-- Event 3 -->
                    <div class="timeline-item slide-up">
                        <div class="timeline-icon">💻</div>
                        <div class="timeline-content">
                            <span class="timeline-date">2025</span>
                            <h3 class="timeline-title">전공 심화 및 AI 에이전틱 아키텍팅 연구</h3>
                            <p class="timeline-desc">전통적인 엔지니어링 툴에 생성형 AI 모델 협업 기술을 접목시키는 방법을 연구하며, 현장에 필요한 최신 DX 역량을 길렀습니다.</p>
                        </div>
                    </div>
                    <!-- Event 4 -->
                    <div class="timeline-item slide-up">
                        <div class="timeline-icon">🎓</div>
                        <div class="timeline-content">
                            <span class="timeline-date">2026.01</span>
                            <h3 class="timeline-title">동양미래대학교 반도체 부트캠프 이수</h3>
                            <p class="timeline-desc">제어/계측 심화 교육을 수료하며, GX-Works3 실무 자동화 시스템 구축 역량을 마스터했습니다. 통신 간섭 등의 현업 문제점을 데이터로 추적하고 논리적으로 디버깅하는 경험을 쌓았습니다.</p>
                        </div>
                    </div>
                </div>

                <!-- Growth Chart placed inside Career Timeline -->
                <div class="growth-chart-wrapper slide-up" style="margin-top: 60px; background: var(--bg-white); padding: 40px; border-radius: 16px; box-shadow: var(--shadow-lg); border: 1px solid var(--border-color);">
                    <h3 style="text-align:center; color: var(--text-main); margin-bottom: 30px; font-size: 1.5rem;">📈 역량 성장 곡선 (Growth Trajectory)</h3>
                    <div style="position: relative; height: 350px; width: 100%;">
                        <canvas id="growthChart"></canvas>
                    </div>
                </div>
            </div>
        </section>

        <!-- Academic Curriculum Section -->
        <section id="academic" class="section bg-light relative-sec">
            <div class="container">
                <h2 class="section-title slide-up">Technical Arsenal</h2>
                <div class="academic-grid" id="academic-grid">
                    <div class="academic-card slide-up">
                        <div class="academic-img-wrapper">
                            <img src="images/cad.png" alt="CAD Design">
                        </div>
                        <div class="academic-content">
                            <h3>기계설계 역량</h3>
                            <p>SolidWorks를 활용하여 장비 부품의 기구학적 특성을 파악하고 결함 포인트를 역설계할 수 있는 기술적 시야를 확보했습니다.</p>
                        </div>
                    </div>
                    <div class="academic-card slide-up">
                        <div class="academic-img-wrapper">
                            <img src="images/bjt.png" alt="BJT Electronics">
                        </div>
                        <div class="academic-content">
                            <h3>전자회로 분석 역량</h3>
                            <p>반도체 센서 신호부의 노이즈 원인을 BJT 스위칭 관점에서 파악하며, 하드웨어 레벨의 오류 단락을 치밀하게 분석할 수 있습니다.</p>
                        </div>
                    </div>
                    <div class="academic-card slide-up highlight-card">
                        <div class="academic-img-wrapper">
                            <img src="images/PLC.png" alt="PLC Automation">
                        </div>
                        <div class="academic-content">
                            <h3>제어공학 및 IT 융합</h3>
                            <p>단순 시퀀스 제어를 넘어 <strong>C#과 Firebase</strong>를 활용하여 하위 설비단과 상위 클라우드 통신 시스템을 연동할 수 있습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Major Projects Section -->
        <section id="projects" class="section">
            <div class="container">
                <h2 class="section-title slide-up">Engineering Case Study</h2>
                <div class="projects-grid" id="projects-grid">
                    <div class="project-card slide-up">
                        <div class="project-header">
                            <span class="project-tag">AI/하드웨어 융합 솔루션</span>
                            <h3>로봇 정밀도 보정 알고리즘 적용 경험</h3>
                        </div>
                        <div class="project-body">
                            <ul class="project-details">
                                <li><strong>해결 목표:</strong> 캡스톤 디자인 진행 중 발생한 구동부 노후화에 따른 치수 오차 해결</li>
                                <li><strong>해결 과정:</strong> 값비싼 하드웨어 교체 대신 제어 로그 데이터를 분석 및 머신러닝 회귀 학습. 소프트웨어 오프셋을 조절해 정밀도 30% 향상</li>
                            </ul>
                            <div class="so-what-layer">
                                <h4>💡 Maintenance Philosophy</h4>
                                <p>저는 부품을 단순히 교체하는 '수리공'이 아닙니다. 원인을 데이터로 규명하고 소프트웨어적 아키텍팅으로 설비 수명을 연장시켜 막대한 코스트(예산)를 절감할 수 있는 <strong>원인 분석가이자 해결사</strong>입니다.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="project-card slide-up">
                        <div class="project-header">
                            <span class="project-tag">Logic Control / Troubleshooting</span>
                            <h3>상태 천이 기반 타이머 디버깅 경험</h3>
                        </div>
                        <div class="project-body">
                            <ul class="project-details">
                                <li><strong>해결 목표:</strong> 제어 실습 중 발생한 미세 오작동 및 타이밍 통신 간섭 문제 대응</li>
                                <li><strong>해결 과정:</strong> 복잡한 동작을 상태 천이표로 논리화 및 카르노 맵 최적화 구현. 로그 데이터를 한줄씩 스니핑(Sniffing)하여 통신 병목을 찾아내고 해결함</li>
                            </ul>
                            <div class="so-what-layer">
                                <h4>💡 Maintenance Philosophy</h4>
                                <p>반도체 장비의 셧다운은 초당 막대한 손실을 야기합니다. 저는 <strong>끝까지 파고드는 끈기와 논리 회로 분석 역량</strong>으로 시퀀스 오류(Time-out, Interlock)의 최심부를 추적하고 예측할 자신이 있습니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- UR Club Section -->
        <section id="ur-club" class="section bg-light relative-sec">
            <div class="container">
                <h2 class="section-title slide-up">Extracurricular Activity</h2>
                
                <div class="ur-club-container slide-up" style="background: var(--bg-white); border-radius: 16px; box-shadow: var(--shadow-lg); border: 1px solid var(--border-color); overflow: hidden;">
                    <div style="background: var(--samsung-blue-dark); padding: 30px; text-align: center;">
                        <span style="display:inline-block; background:rgba(255,255,255,0.2); color:white; padding: 4px 12px; border-radius:20px; font-size:0.85rem; font-weight:600; margin-bottom:15px;">Robotics Teamwork</span>
                        <h3 style="color: white; font-size: 1.8rem; font-weight: 800; margin:0;">UR 로봇 동아리 융합 프로젝트</h3>
                        <p style="color: rgba(255,255,255,0.8); margin-top:10px;">팀원 (2026 - 진행중)</p>
                    </div>
                    
                    <div style="padding: 40px;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-bottom: 30px;">
                            <div style="border-left: 4px solid var(--samsung-blue); padding-left: 20px;">
                                <h4 style="color: var(--text-main); font-size: 1.2rem; margin-bottom: 10px;">🎯 목표 및 성과</h4>
                                <p style="color: var(--text-light); line-height: 1.6; font-size: 0.95rem;">로봇공학 이론을 바탕으로 기계설계, 제어, AI 등 다학제적 배경의 팀원들과 융합 프로젝트를 함께 기획하고 협업하여 성공적으로 완성해가고 있습니다.</p>
                            </div>
                            <div style="border-left: 4px solid #4caf50; padding-left: 20px;">
                                <h4 style="color: var(--text-main); font-size: 1.2rem; margin-bottom: 10px;">🛠️ 해결 과정</h4>
                                <p style="color: var(--text-light); line-height: 1.6; font-size: 0.95rem;">제작 중 발생하는 기술적 한계와 버그를 팀원들과 끈기 있게 추적하며 극복했고, 하드웨어와 소프트웨어(HW/SW)의 연동 원리를 실증적으로 체득하고 있습니다.</p>
                            </div>
                        </div>

                        <div class="so-what-layer" style="background: var(--bg-light); padding: 25px; border-radius: 12px; border-left: 4px solid var(--samsung-blue);">
                            <h4 style="color: var(--text-main); margin-bottom: 10px; font-size: 1.1rem;">💡 Maintenance Philosophy</h4>
                            <p style="font-size: 0.95rem; color: var(--text-light); line-height: 1.6; margin:0;">단일 전공 지식을 넘어서 유관 부서(기구 설계, 소프트웨어 등)의 강점을 조율하는 <strong>융합적 협업(Teamwork) 경험</strong>은 반도체 설비의 복합적 이슈를 유관자들과 원활히 소통하고 돌파하는 데 중대한 강점이 됩니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- PLC Simulator Section -->
        <section id="simulator" class="section bg-samsung-blue text-white">
            <div class="container">
                <h2 class="section-title text-white slide-up">Safety Interlock Simulation</h2>
                <p class="text-white slide-up" style="text-align:center; margin-bottom:40px; opacity:0.9;">
                    제가 반도체 제어 프로세스를 얼마나 실질적으로 숙지하고 있는지 시연하기 위해 직접 코딩한 인터랙티브 PLC 시뮬레이터입니다.
                </p>
                <div class="simulator-container slide-up">
                    <div class="simulator-info relative group">
                        <div class="info-icon">ℹ️ 공정 연속성을 위한 안전 로직 제안</div>
                        <div class="tooltip">
                            <strong>자기 유지 및 인터록 시스템 설계</strong><br>
                            일시적인 신호 끊김에도 '시스템 가동'을 유지하고, 오직 허가된 비상 정지(b접점) 조작 시에만 시스템을 중단시켜 웨이퍼 손실을 막는 필수적인 설비 로직입니다.
                        </div>
                    </div>
                    
                    <div class="plc-layout">
                        <!-- Control Panel -->
                        <div class="control-panel">
                            <h3>HMI Control Panel</h3>
                            <div class="buttons">
                                <button id="btn-x1" class="btn btn-start">Start (X1)<br><small>a접점 (NO)</small></button>
                                <button id="btn-x2" class="btn btn-stop">E-Stop (X2)<br><small>b접점 (NC)</small></button>
                            </div>
                            <div class="status-indicator">
                                <span>시스템 상태 (Y0): </span>
                                <div id="led-y0" class="led off"></div>
                            </div>
                        </div>

                        <div class="ladder-diagram">
                            <h3>Ladder Logic</h3>
                            <div class="ladder-circuit">
                                <div class="rung">
                                    <div class="rail left-rail"></div>
                                    <div class="wire-horizontal"></div>
                                    
                                    <div class="parallel-branch">
                                        <div class="branch-top">
                                            <div class="contact x1" id="ladder-x1"><span>X1</span><div class="symbol">| |</div></div>
                                        </div>
                                        <div class="branch-bottom">
                                            <div class="contact y0-contact" id="ladder-y0-contact"><span>Y0</span><div class="symbol">| |</div></div>
                                        </div>
                                        <div class="vertical-wire left"></div>
                                        <div class="vertical-wire right"></div>
                                    </div>
                                    
                                    <div class="wire-horizontal"></div>
                                    <div class="contact x2 closed" id="ladder-x2"><span>X2</span><div class="symbol">|/|</div></div>
                                    <div class="wire-horizontal"></div>
                                    
                                    <div class="coil y0" id="ladder-y0-coil"><span>Y0</span><div class="symbol">( )</div></div>
                                    
                                    <div class="wire-horizontal"></div>
                                    <div class="rail right-rail"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Contact Section -->
        <section id="contact" class="section bg-light">
            <div class="container text-center">
                <h2 class="section-title slide-up">Contact Me</h2>
                <p class="slide-up" style="margin-bottom: 40px; color: var(--text-light); font-size: 1.1rem;">
                    가동률의 한계를 돌파할 준비가 되어 있습니다. 언제든지 연락 주시기 바랍니다.
                </p>
                <div class="contact-wrapper slide-up">
                    <div class="contact-info">
                        <a href="mailto:maengsy0520@naver.com" class="contact-card">
                            <div class="contact-icon">📧</div>
                            <h3>Email</h3>
                            <p>maengsy0520@naver.com</p>
                        </a>
                        <a href="tel:010-4618-8449" class="contact-card">
                            <div class="contact-icon">📱</div>
                            <h3>Phone</h3>
                            <p>010-4618-8449</p>
                        </a>
                    </div>
                    
                    <div class="contact-form-container">
                        <h3>방문자 메세지 전송</h3>
                        <p style="margin-bottom:20px; font-size:0.9rem; color:var(--text-light);">
                            작성해주신 메세지는 제 이메일로 즉시 전달됩니다.
                        </p>
                        <!-- Formspree or Mailto form -->
                        <form action="mailto:maengsy0520@naver.com" method="POST" enctype="text/plain" class="contact-form">
                            <div class="form-group">
                                <label for="name">성함 (Name)</label>
                                <input type="text" id="name" name="name" required placeholder="이름을 입력해주세요">
                            </div>
                            <div class="form-group">
                                <label for="contact-info">연락처/소속 (Contact/Company)</label>
                                <input type="text" id="contact-info" name="contact-info" required placeholder="이메일 또는 전화번호/소속">
                            </div>
                            <div class="form-group">
                                <label for="message">메세지 (Message)</label>
                                <textarea id="message" name="message" rows="4" required placeholder="질문이나 남기실 말씀을 적어주세요"></textarea>
                            </div>
                            <button type="submit" class="btn btn-submit">메일 보내기</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 맹세영 | AI 시대의 시스템 유지보수 아키텍트 지원자. All Rights Reserved.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>'''

import pathlib
html_path = r'c:\Users\MSY\Desktop\Portpolio\index.html'
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

js_path = r'c:\Users\MSY\Desktop\Portpolio\script.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

chart_code = '''
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

if "new Chart(ctx" not in js_content:
    # We append it right before the slide-up intersection observer part
    js_content = js_content.replace('const slideUpElements = document.querySelectorAll(\\'.slide-up\\');', chart_code + '\n    const slideUpElements = document.querySelectorAll(\\'.slide-up\\');')
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_content)

print("success")
