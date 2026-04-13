// JavaScript for PLC Simulator & Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
    // --- PLC SIMULATOR ---
    const btnX1 = document.getElementById('btn-x1');
    const btnX2 = document.getElementById('btn-x2');
    const ledY0 = document.getElementById('led-y0');
    
    // Ladder Diagram Elements
    const ladderX1 = document.getElementById('ladder-x1');
    const ladderY0Contact = document.getElementById('ladder-y0-contact');
    const ladderX2 = document.getElementById('ladder-x2');
    const ladderY0Coil = document.getElementById('ladder-y0-coil');
    
    // Wires
    const wires = document.querySelectorAll('.wire-horizontal, .branch-top, .branch-bottom, .vertical-wire');

    // PLC State
    let isX1Pressed = false;
    let isX2Pressed = false; // X2 is E-Stop (NC). Pressed means breaking the circuit.
    let isY0On = false;

    function updatePLC() {
        // --- LOGIC EXECUTION ---
        // 자기 유지 회로 (Self-holding circuit)
        // Y0 (Output) = (X1 (Start) OR Y0 (Self-hold)) AND NOT X2 (Stop)
        
        if ((isX1Pressed || isY0On) && !isX2Pressed) {
            isY0On = true;
        } else {
            isY0On = false;
        }

        // --- UI UPDATE ---
        
        // 1. LED State
        if (ledY0) {
            if (isY0On) ledY0.classList.add('on');
            else ledY0.classList.remove('on');
        }

        // 2. Ladder Diagram Contacts & Coils
        if (ladderX1) ladderX1.classList.toggle('active', isX1Pressed);
        if (ladderY0Contact) ladderY0Contact.classList.toggle('active', isY0On);
        if (ladderX2) ladderX2.classList.toggle('active', !isX2Pressed); 
        if (ladderY0Coil) ladderY0Coil.classList.toggle('active', isY0On);

        // 3. Wires Animation
        wires.forEach(wire => {
            if (wire.classList.contains('branch-top')) {
                wire.classList.toggle('active', isX1Pressed);
            } else if (wire.classList.contains('branch-bottom')) {
                wire.classList.toggle('active', isY0On);
            } else if (wire.classList.contains('vertical-wire')) {
                wire.classList.toggle('active', isX1Pressed || isY0On);
            } else {
                if (isY0On) {
                    wire.classList.add('active');
                } else {
                    wire.classList.remove('active');
                }
            }
        });
    }

    // Event Listeners for X1 (Start)
    if (btnX1) {
        btnX1.addEventListener('pointerdown', () => { isX1Pressed = true; updatePLC(); });
        btnX1.addEventListener('pointerup', () => { isX1Pressed = false; updatePLC(); });
        btnX1.addEventListener('pointerleave', () => { isX1Pressed = false; updatePLC(); });
    }

    // Event Listeners for X2 (Stop/E-Stop)
    if (btnX2) {
        btnX2.addEventListener('pointerdown', () => { isX2Pressed = true; updatePLC(); });
        btnX2.addEventListener('pointerup', () => { isX2Pressed = false; updatePLC(); });
        btnX2.addEventListener('pointerleave', () => { isX2Pressed = false; updatePLC(); });
    }

    // Initial State Render
    updatePLC();

    // --- SCROLL ANIMATIONS (Slide Up) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach(el => observer.observe(el));

    // --- CHART.JS TRAJECTORY ---
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
                            color: '#e2e8f0',
                            font: { family: "'Noto Sans KR', sans-serif", size: 13 }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8', font: { family: "'Noto Sans KR', sans-serif" } },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }

    // --- BOARD INTERACTION (Simulated) ---
    const boardForm = document.getElementById('board-form');
    const boardInput = document.getElementById('board-input');
    const boardMessages = document.getElementById('board-messages');

    if (boardForm && boardInput && boardMessages) {
        boardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = boardInput.value.trim();
            if (text) {
                const msgDiv = document.createElement('div');
                msgDiv.className = 'msg';
                msgDiv.style.marginBottom = '10px';
                msgDiv.style.fontSize = '0.9rem';
                msgDiv.innerHTML = `<span style="font-weight: bold; color: var(--samsung-blue-light);">방문자:</span> ${text}`;
                boardMessages.appendChild(msgDiv);
                boardInput.value = '';
                boardMessages.scrollTop = boardMessages.scrollHeight;
            }
        });
    }

    // --- HERO MOUSE TRACKING ---
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            hero.style.setProperty('--mouse-x', `${x}px`);
            hero.style.setProperty('--mouse-y', `${y}px`);
        });
    }
});
