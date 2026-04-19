// board.js — Enhanced CRUD with Password Protection & Visual Effects
document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');
    const postCount = document.getElementById('post-count');
    const noPostsMsg = document.getElementById('no-posts');
    const modal = document.getElementById('board-modal');
    const modalTitle = document.getElementById('modal-title');
    const verifyModal = document.getElementById('verify-modal');
    const verifyPasswordInput = document.getElementById('verify-password');
    const verifyError = document.getElementById('verify-error');
    const toastEl = document.getElementById('toast');

    let posts = JSON.parse(localStorage.getItem('portfolio_posts')) || [];
    const TEXT_LIMIT = 150;

    // Pending action for password verification
    let pendingAction = null; // { type: 'edit' | 'delete', postId: string }

    // =============================================
    // Simple hash function for password storage
    // =============================================
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString(36);
    }

    // =============================================
    // Avatar color generator (consistent per author)
    // =============================================
    function getAvatarColor(name) {
        const colors = [
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #f093fb, #f5576c)',
            'linear-gradient(135deg, #4facfe, #00f2fe)',
            'linear-gradient(135deg, #43e97b, #38f9d7)',
            'linear-gradient(135deg, #fa709a, #fee140)',
            'linear-gradient(135deg, #a18cd1, #fbc2eb)',
            'linear-gradient(135deg, #fccb90, #d57eeb)',
            'linear-gradient(135deg, #30cfd0, #330867)',
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }

    function getInitials(name) {
        return name.charAt(0).toUpperCase();
    }

    // =============================================
    // Toast Notification
    // =============================================
    function showToast(message, type = 'success') {
        toastEl.textContent = type === 'success' ? `✅ ${message}` : `❌ ${message}`;
        toastEl.className = `toast ${type}`;
        // Trigger reflow
        toastEl.offsetHeight;
        toastEl.classList.add('show');
        setTimeout(() => {
            toastEl.classList.remove('show');
        }, 2500);
    }

    // =============================================
    // Save & Render
    // =============================================
    function savePosts() {
        localStorage.setItem('portfolio_posts', JSON.stringify(posts));
        renderPosts();
    }

    function renderPosts() {
        if (!postList) return;
        postList.innerHTML = '';
        
        const topLevelPosts = posts.filter(p => !p.parentId);
        postCount.textContent = topLevelPosts.length;

        if (topLevelPosts.length === 0) {
            noPostsMsg.style.display = 'block';
        } else {
            noPostsMsg.style.display = 'none';
            // Newest first
            [...topLevelPosts].reverse().forEach((post, index) => {
                const postWrapper = document.createElement('div');
                postWrapper.className = 'post-wrapper';
                postWrapper.style.animationDelay = `${index * 0.05}s`;
                
                postWrapper.innerHTML = createPostHtml(post, false);
                
                // Render Replies
                const replies = posts.filter(p => p.parentId === post.id);
                if (replies.length > 0) {
                    const replyContainer = document.createElement('div');
                    replyContainer.className = 'reply-container';
                    replies.forEach(reply => {
                        replyContainer.innerHTML += createPostHtml(reply, true);
                    });
                    postWrapper.appendChild(replyContainer);
                }
                
                postList.appendChild(postWrapper);
            });
        }
    }

    function createPostHtml(post, isReply) {
        const isLong = post.content.length > TEXT_LIMIT;
        const collapsedClass = isLong ? 'collapsed' : '';
        const likeCount = post.likes || 0;
        const avatarColor = getAvatarColor(post.author);
        const initial = getInitials(post.author);
        const editedBadge = post.edited ? '<span class="post-badge badge-owner">수정됨</span>' : '';
        
        return `
            <div id="card-${post.id}" class="${isReply ? 'reply-card' : 'post-card'}">
                <div class="post-header">
                    <div class="post-author-info">
                        <div class="author-avatar" style="background: ${avatarColor};">${initial}</div>
                        <div class="author-details">
                            <span class="post-author">${escapeHtml(post.author)} ${editedBadge}</span>
                            <span class="post-date">${post.date}</span>
                        </div>
                    </div>
                </div>
                <div class="content-wrapper">
                    <div id="content-${post.id}" class="content-body post-content ${collapsedClass}">${escapeHtml(post.content).replace(/\n/g, '<br>')}</div>
                    ${isLong ? `<button class="toggle-btn" onclick="toggleContent('${post.id}')">더보기 ▼</button>` : ''}
                </div>
                <div class="post-actions">
                    <button class="like-btn" onclick="likePost('${post.id}')">
                        <span class="like-icon">❤️</span> <span class="like-count">${likeCount}</span>
                    </button>
                    ${!isReply ? `<button class="reply-btn" onclick="replyToPost('${post.id}')">💬 답글</button>` : ''}
                    <div style="margin-left: auto;"></div>
                    <button class="action-btn edit-btn" onclick="requestEdit('${post.id}')">✏️ 수정</button>
                    <button class="action-btn delete-btn" onclick="requestDelete('${post.id}')">🗑️ 삭제</button>
                </div>
            </div>
        `;
    }

    // =============================================
    // Form Submission (Create / Update / Reply)
    // =============================================
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('post-id').value;
        const parentId = document.getElementById('parent-id').value;
        const author = document.getElementById('post-author-input').value.trim();
        const content = document.getElementById('post-content-input').value.trim();
        const password = document.getElementById('post-password-input').value;
        const now = new Date();
        const dateString = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        if (id) {
            // Update existing post
            const index = posts.findIndex(p => p.id === id);
            if (index !== -1) {
                posts[index].author = author;
                posts[index].content = content;
                posts[index].date = dateString;
                posts[index].edited = true;
                // Update password if changed
                if (password) {
                    posts[index].passwordHash = simpleHash(password);
                }
            }
            showToast('글이 수정되었습니다');
        } else {
            // Create new post or reply
            const newPost = {
                id: Date.now().toString(),
                author,
                content,
                date: dateString,
                parentId: parentId || null,
                passwordHash: simpleHash(password),
                likes: 0,
                edited: false
            };
            posts.push(newPost);
            showToast(parentId ? '답글이 등록되었습니다' : '글이 등록되었습니다');
        }

        savePosts();
        closeModal();
    });

    // =============================================
    // Password Verification for Edit/Delete
    // =============================================
    window.requestEdit = function(id) {
        pendingAction = { type: 'edit', postId: id };
        openVerifyModal();
    };

    window.requestDelete = function(id) {
        pendingAction = { type: 'delete', postId: id };
        openVerifyModal();
    };

    function openVerifyModal() {
        verifyModal.style.display = 'flex';
        verifyPasswordInput.value = '';
        verifyError.style.display = 'none';
        setTimeout(() => verifyPasswordInput.focus(), 100);
    }

    window.closeVerifyModal = function() {
        verifyModal.style.display = 'none';
        verifyPasswordInput.value = '';
        verifyError.style.display = 'none';
        pendingAction = null;
    };

    window.confirmVerify = function() {
        if (!pendingAction) return;

        const post = posts.find(p => p.id === pendingAction.postId);
        if (!post) return;

        const inputHash = simpleHash(verifyPasswordInput.value);

        if (inputHash !== post.passwordHash) {
            verifyError.style.display = 'block';
            // Re-trigger shake animation
            verifyError.style.animation = 'none';
            verifyError.offsetHeight;
            verifyError.style.animation = 'shake 0.4s ease';
            verifyPasswordInput.value = '';
            verifyPasswordInput.focus();
            return;
        }

        // Password matched!
        if (pendingAction.type === 'edit') {
            closeVerifyModal();
            editPost(post.id);
        } else if (pendingAction.type === 'delete') {
            closeVerifyModal();
            deletePost(post.id);
        }
    };

    // Enter key to confirm verify
    verifyPasswordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            confirmVerify();
        }
    });

    // =============================================
    // CRUD Operations (after password verified)
    // =============================================
    function editPost(id) {
        const post = posts.find(p => p.id === id);
        if (post) {
            modalTitle.textContent = post.parentId ? '✏️ 답글 수정하기' : '✏️ 글 수정하기';
            document.getElementById('post-id').value = post.id;
            document.getElementById('parent-id').value = post.parentId || '';
            document.getElementById('post-author-input').value = post.author;
            document.getElementById('post-content-input').value = post.content;
            document.getElementById('post-password-input').value = '';
            document.getElementById('post-password-input').required = false;
            modal.style.display = 'flex';
        }
    }

    function deletePost(id) {
        // Delete post and its replies
        posts = posts.filter(p => p.id !== id && p.parentId !== id);
        savePosts();
        showToast('글이 삭제되었습니다');
    }

    // =============================================
    // Modal Controls
    // =============================================
    window.openWriteModal = function() {
        modalTitle.textContent = '✏️ 글 남기기';
        postForm.reset();
        document.getElementById('post-id').value = '';
        document.getElementById('parent-id').value = '';
        document.getElementById('post-password-input').required = true;
        modal.style.display = 'flex';
        setTimeout(() => document.getElementById('post-author-input').focus(), 100);
    };

    window.replyToPost = function(parentId) {
        modalTitle.textContent = '💬 답글 남기기';
        postForm.reset();
        document.getElementById('post-id').value = '';
        document.getElementById('parent-id').value = parentId;
        document.getElementById('post-password-input').required = true;
        modal.style.display = 'flex';
    };

    window.closeModal = function() {
        modal.style.display = 'none';
        postForm.reset();
    };

    // Click outside modal to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    verifyModal.addEventListener('click', (e) => {
        if (e.target === verifyModal) closeVerifyModal();
    });

    // =============================================
    // Like Post (with local duplicate prevention)
    // =============================================
    window.likePost = function(id) {
        const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
        
        if (likedPosts.includes(id)) {
            showToast('이미 추천한 글입니다', 'error');
            return;
        }

        const index = posts.findIndex(p => p.id === id);
        if (index !== -1) {
            posts[index].likes = (posts[index].likes || 0) + 1;
            likedPosts.push(id);
            localStorage.setItem('liked_posts', JSON.stringify(likedPosts));
            savePosts();
            showToast('❤️ 추천되었습니다!');
        }
    };

    // =============================================
    // Content Toggle
    // =============================================
    window.toggleContent = function(id) {
        const contentDiv = document.getElementById(`content-${id}`);
        const btn = contentDiv.parentElement.querySelector('.toggle-btn');
        
        if (contentDiv.classList.contains('collapsed')) {
            contentDiv.classList.remove('collapsed');
            btn.textContent = '간략히 보기 ▲';
        } else {
            contentDiv.classList.add('collapsed');
            btn.textContent = '더보기 ▼';
        }
    };

    // =============================================
    // Escape HTML
    // =============================================
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // =============================================
    // PARTICLE SYSTEM (for board page)
    // =============================================
    const canvas = document.getElementById('board-particles');
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
                this.size = Math.random() * 1.5 + 0.3;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.3 + 0.05;
                this.color = Math.random() > 0.6
                    ? `rgba(34, 211, 238, ${this.opacity})`
                    : `rgba(96, 165, 250, ${this.opacity})`;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const numParticles = Math.min(50, Math.floor(window.innerWidth * window.innerHeight / 25000));
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const opacity = (1 - dist / 120) * 0.08;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            drawLines();
            requestAnimationFrame(animate);
        }
        animate();
    }

    // =============================================
    // MOUSE TRACKING
    // =============================================
    window.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // Initial render
    renderPosts();
});
