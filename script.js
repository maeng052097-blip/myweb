// =============================================
// Enhanced Portfolio JS — Particles, Typing, Tilt, Counters, etc.
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // 1. FULL-PAGE PARTICLE CANVAS (Antigravity style)
    // =============================================
    const canvas = document.getElementById('particle-canvas');
    const cursorGlow = document.getElementById('cursor-glow');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let isMouseOnPage = false;

    // Full-page mouse tracking with smooth lerp
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseOnPage = true;
        if (cursorGlow) cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        isMouseOnPage = false;
        if (cursorGlow) cursorGlow.classList.remove('active');
    });

    // Smooth glow position update with requestAnimationFrame
    function updateGlowPosition() {
        // Lerp for smooth following
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;

        if (cursorGlow) {
            cursorGlow.style.setProperty('--glow-x', `${glowX}px`);
            cursorGlow.style.setProperty('--glow-y', `${glowY}px`);
        }
        requestAnimationFrame(updateGlowPosition);
    }
    updateGlowPosition();

    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.baseSpeedX = (Math.random() - 0.5) * 0.4;
                this.baseSpeedY = (Math.random() - 0.5) * 0.4;
                this.speedX = this.baseSpeedX;
                this.speedY = this.baseSpeedY;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.hue = Math.random() > 0.5 ? 188 : 217; // cyan or blue
            }
            update() {
                // Mouse repulsion effect (Antigravity style)
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const repulseRadius = 150;

                if (dist < repulseRadius && isMouseOnPage) {
                    const force = (repulseRadius - dist) / repulseRadius;
                    const angle = Math.atan2(dy, dx);
                    this.speedX += Math.cos(angle) * force * 0.8;
                    this.speedY += Math.sin(angle) * force * 0.8;
                }

                // Friction to slow down after repulsion
                this.speedX *= 0.97;
                this.speedY *= 0.97;

                // Drift back to base speed
                this.speedX += (this.baseSpeedX - this.speedX) * 0.01;
                this.speedY += (this.baseSpeedY - this.speedY) * 0.01;

                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around edges
                if (this.x < -10) this.x = canvas.width + 10;
                if (this.x > canvas.width + 10) this.x = -10;
                if (this.y < -10) this.y = canvas.height + 10;
                if (this.y > canvas.height + 10) this.y = -10;
            }
            draw() {
                // Particles near cursor glow brighter
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const proximityBoost = isMouseOnPage ? Math.max(0, 1 - dist / 300) * 0.4 : 0;
                const finalOpacity = this.opacity + proximityBoost;

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${finalOpacity})`;
                ctx.fill();
            }
        }

        // Create particles
        const numParticles = Math.min(90, Math.floor(canvas.width * canvas.height / 12000));
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        // Lines near cursor are brighter
                        const midX = (particles[i].x + particles[j].x) / 2;
                        const midY = (particles[i].y + particles[j].y) / 2;
                        const mouseDist = Math.sqrt((midX - mouseX) ** 2 + (midY - mouseY) ** 2);
                        const mouseBoost = isMouseOnPage ? Math.max(0, 1 - mouseDist / 250) * 0.15 : 0;
                        const opacity = (1 - dist / 140) * 0.1 + mouseBoost;

                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Lines from cursor to nearby particles
            if (isMouseOnPage) {
                particles.forEach(p => {
                    const dx = p.x - mouseX;
                    const dy = p.y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 180) {
                        const opacity = (1 - dist / 180) * 0.12;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
                        ctx.lineWidth = 0.3;
                        ctx.moveTo(mouseX, mouseY);
                        ctx.lineTo(p.x, p.y);
                        ctx.stroke();
                    }
                });
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawLines();
            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    // =============================================
    // 2. TYPING EFFECT
    // =============================================
    const sloganEl = document.querySelector('.hero-slogan');
    if (sloganEl) {
        const originalText = sloganEl.textContent.trim();
        sloganEl.textContent = '';
        
        // Create cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        
        let charIndex = 0;
        const typingSpeed = 50;
        
        function typeCharacter() {
            if (charIndex < originalText.length) {
                sloganEl.textContent = originalText.substring(0, charIndex + 1);
                sloganEl.appendChild(cursor);
                charIndex++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Keep cursor blinking at end
                sloganEl.appendChild(cursor);
                setTimeout(() => {
                    cursor.style.display = 'none';
                }, 3000);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeCharacter, 800);
    }

    // =============================================
    // 3. SCROLL PROGRESS BAR
    // =============================================
    const scrollProgressBar = document.getElementById('scroll-progress');
    if (scrollProgressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgressBar.style.width = scrollPercent + '%';
        }, { passive: true });
    }

    // =============================================
    // 4. NAVBAR SCROLL EFFECTS + ACTIVE LINK
    // =============================================
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('.section, .hero');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height && id) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        // Navbar background on scroll
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        updateActiveNav();
    }, { passive: true });

    // =============================================
    // 5. MOBILE MENU TOGGLE
    // =============================================
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('mobile-active');
        });

        // Close menu when a link is clicked
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinksContainer.classList.remove('mobile-active');
            });
        });
    }

    // =============================================
    // 6. SCROLL ANIMATIONS (Enhanced Slide Up with Stagger)
    // =============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach(el => observer.observe(el));

    // Add stagger classes to grid children
    function addStaggerToGrids() {
        const gridSelectors = [
            '.vision-grid',
            '.competencies-grid',
            '.projects-grid',
            '.bootcamp-grid',
            '.cert-grid',
            '.academic-grid',
            '.subject-grid'
        ];

        gridSelectors.forEach(selector => {
            const grids = document.querySelectorAll(selector);
            grids.forEach(grid => {
                const children = grid.querySelectorAll('.slide-up');
                children.forEach((child, index) => {
                    child.classList.add(`stagger-${Math.min(index + 1, 8)}`);
                });
            });
        });
    }
    addStaggerToGrids();

    // =============================================
    // 7. 3D TILT EFFECT ON CARDS
    // =============================================
    function initTiltEffect() {
        const tiltCards = document.querySelectorAll(
            '.competency-card, .project-card, .bootcamp-card, .academic-card'
        );

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // Only enable tilt on desktop
    if (window.innerWidth > 768) {
        initTiltEffect();
    }

    // =============================================
    // 8. COUNTER ANIMATION (for GPA and numbers)
    // =============================================
    function animateCounter(element, target, duration = 1500, decimals = 0) {
        let startTime = null;
        const startValue = 0;

        function updateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const currentValue = startValue + (target - startValue) * easeOut;
            element.textContent = currentValue.toFixed(decimals);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toFixed(decimals);
            }
        }
        requestAnimationFrame(updateCounter);
    }

    // Observe elements with data-counter attribute  
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const target = parseFloat(entry.target.dataset.counter);
                const decimals = parseInt(entry.target.dataset.decimals || '0');
                animateCounter(entry.target, target, 1500, decimals);
            }
        });
    }, { threshold: 0.5 });

    // Auto-detect GPA numbers for counter animation
    document.querySelectorAll('[data-counter]').forEach(el => {
        counterObserver.observe(el);
    });

    // =============================================
    // 9. PARALLAX EFFECTS
    // =============================================
    function initParallax() {
        const heroContent = document.querySelector('.hero-content');
        const codeWatermark = document.querySelector('.code-watermark');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
            }
            
            if (codeWatermark) {
                codeWatermark.style.transform = `translateY(${scrolled * 0.03}px)`;
            }
        }, { passive: true });
    }
    initParallax();

    // =============================================
    // 10. (Mouse tracking now handled globally in section 1)
    // =============================================

    // =============================================
    // 11. PLC SIMULATOR
    // =============================================
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
    let isX2Pressed = false;
    let isY0On = false;

    function updatePLC() {
        // 자기 유지 회로 (Self-holding circuit)
        // Y0 (Output) = (X1 (Start) OR Y0 (Self-hold)) AND NOT X2 (Stop)
        
        if ((isX1Pressed || isY0On) && !isX2Pressed) {
            isY0On = true;
        } else {
            isY0On = false;
        }

        // UI UPDATE
        if (ledY0) {
            if (isY0On) ledY0.classList.add('on');
            else ledY0.classList.remove('on');
        }

        if (ladderX1) ladderX1.classList.toggle('active', isX1Pressed);
        if (ladderY0Contact) ladderY0Contact.classList.toggle('active', isY0On);
        if (ladderX2) ladderX2.classList.toggle('active', !isX2Pressed); 
        if (ladderY0Coil) ladderY0Coil.classList.toggle('active', isY0On);

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

    if (btnX1) {
        btnX1.addEventListener('pointerdown', () => { isX1Pressed = true; updatePLC(); });
        btnX1.addEventListener('pointerup', () => { isX1Pressed = false; updatePLC(); });
        btnX1.addEventListener('pointerleave', () => { isX1Pressed = false; updatePLC(); });
    }

    if (btnX2) {
        btnX2.addEventListener('pointerdown', () => { isX2Pressed = true; updatePLC(); });
        btnX2.addEventListener('pointerup', () => { isX2Pressed = false; updatePLC(); });
        btnX2.addEventListener('pointerleave', () => { isX2Pressed = false; updatePLC(); });
    }

    updatePLC();

    // =============================================
    // 12. CHART.JS TRAJECTORY
    // =============================================
    const chartCtx = document.getElementById('growthChart');
    if (chartCtx) {
        new Chart(chartCtx, {
            type: 'line',
            data: {
                labels: ['군 복무 (2023~24)', '1학년 1학기', '1학년 2학기', '2학년 1학기 (현재)', '졸업 목표 (2028)'],
                datasets: [
                    {
                        label: '설비/HW 이해도 (CAD, 전자회로, 기구학)',
                        data: [10, 35, 60, 70, 95],
                        borderColor: '#60a5fa',
                        backgroundColor: 'rgba(96, 165, 250, 0.1)',
                        borderWidth: 2.5,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointBackgroundColor: '#60a5fa',
                        pointBorderColor: '#0a0f1e',
                        pointBorderWidth: 2,
                        pointHoverRadius: 8,
                        pointHoverBorderWidth: 3
                    },
                    {
                        label: 'SW/AI 역량 (Python, PLC, AI개론)',
                        data: [5, 20, 45, 65, 90],
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        borderWidth: 2.5,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointBackgroundColor: '#4caf50',
                        pointBorderColor: '#0a0f1e',
                        pointBorderWidth: 2,
                        pointHoverRadius: 8,
                        pointHoverBorderWidth: 3
                    },
                    {
                        label: '자동화/제어 역량 (PLC, MCU, 센서)',
                        data: [5, 15, 30, 60, 90],
                        borderColor: '#ff9800',
                        backgroundColor: 'rgba(255, 152, 0, 0.1)',
                        borderWidth: 2.5,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointBackgroundColor: '#ff9800',
                        pointBorderColor: '#0a0f1e',
                        pointBorderWidth: 2,
                        pointHoverRadius: 8,
                        pointHoverBorderWidth: 3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#e2e8f0',
                            font: { family: "'Noto Sans KR', sans-serif", size: 13 },
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 15, 30, 0.9)',
                        titleColor: '#22d3ee',
                        bodyColor: '#e2e8f0',
                        borderColor: 'rgba(34, 211, 238, 0.2)',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        titleFont: { family: "'Noto Sans KR', sans-serif", weight: 'bold' },
                        bodyFont: { family: "'Noto Sans KR', sans-serif" }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8', font: { family: "'Noto Sans KR', sans-serif" } },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    }
                }
            }
        });
    }

    // =============================================
    // 13. BOARD INTERACTION (Simulated)
    // =============================================
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

    // =============================================
    // 14. SMOOTH SCROLL for NAV LINKS
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                const navHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = targetEl.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

}); // end DOMContentLoaded
