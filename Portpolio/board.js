// board.js - Advanced CRUD Logic for Free Board
document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postList = document.getElementById('post-list');
    const postCount = document.getElementById('post-count');
    const noPostsMsg = document.getElementById('no-posts');
    const modal = document.getElementById('board-modal');
    const modalTitle = document.getElementById('modal-title');
    
    let posts = JSON.parse(localStorage.getItem('portfolio_posts')) || [];
    const TEXT_LIMIT = 150; // Character limit for truncation

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
            [...topLevelPosts].reverse().forEach(post => {
                const postWrapper = document.createElement('div');
                postWrapper.className = 'post-wrapper';
                
                // Render Parent Post
                const mainPostHtml = createPostHtml(post, false);
                postWrapper.innerHTML = mainPostHtml;
                
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
        
        return `
            <div id="card-${post.id}" class="${isReply ? 'reply-card' : 'post-card'} slide-up visible">
                <div class="post-header">
                    <span class="post-author">${escapeHtml(post.author)}</span>
                    <span class="post-date">${post.date}</span>
                </div>
                <div class="content-wrapper">
                    <div id="content-${post.id}" class="content-body ${collapsedClass}">${escapeHtml(post.content).replace(/\n/g, '<br>')}</div>
                    ${isLong ? `<button class="toggle-btn" onclick="toggleContent('${post.id}')">더보기</button>` : ''}
                </div>
                <div class="post-actions" style="display: flex; gap: 10px; align-items: center;">
                    ${!isReply ? `<button class="reply-btn" onclick="replyToPost('${post.id}')" style="margin-right: auto;">답글 달기</button>` : '<div style="margin-right: auto;"></div>'}
                    <button class="action-btn edit-btn" onclick="editPost('${post.id}')">수정</button>
                    <button class="action-btn delete-btn" onclick="deletePost('${post.id}')">삭제</button>
                </div>
            </div>
        `;
    }

    // Handle Form Submission (Create/Update/Reply)
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('post-id').value;
        const parentId = document.getElementById('parent-id').value;
        const author = document.getElementById('post-author-input').value;
        const content = document.getElementById('post-content-input').value;
        const now = new Date();
        const dateString = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

        if (id) {
            // Update
            const index = posts.findIndex(p => p.id === id);
            if (index !== -1) {
                posts[index].author = author;
                posts[index].content = content;
                posts[index].date = dateString + ' (수정됨)';
            }
        } else {
            // Create New or Reply
            const newPost = {
                id: Date.now().toString(),
                author,
                content,
                date: dateString,
                parentId: parentId || null
            };
            posts.push(newPost);
        }

        savePosts();
        closeModal();
    });

    // Global UI functions
    window.openWriteModal = function() {
        modalTitle.textContent = '글 남기기';
        postForm.reset();
        document.getElementById('post-id').value = '';
        document.getElementById('parent-id').value = '';
        modal.style.display = 'flex';
    };

    window.replyToPost = function(parentId) {
        modalTitle.textContent = '답글 남기기';
        postForm.reset();
        document.getElementById('post-id').value = '';
        document.getElementById('parent-id').value = parentId;
        modal.style.display = 'flex';
    };

    window.closeModal = function() {
        modal.style.display = 'none';
        postForm.reset();
    };

    window.deletePost = function(id) {
        if (confirm('정말 삭제하시겠습니까? 관련 답글도 모두 삭제됩니다.')) {
            // Delete post and its replies
            posts = posts.filter(p => p.id !== id && p.parentId !== id);
            savePosts();
        }
    };

    window.editPost = function(id) {
        const post = posts.find(p => p.id === id);
        if (post) {
            modalTitle.textContent = post.parentId ? '답글 수정하기' : '글 수정하기';
            document.getElementById('post-id').value = post.id;
            document.getElementById('parent-id').value = post.parentId || '';
            document.getElementById('post-author-input').value = post.author;
            document.getElementById('post-content-input').value = post.content;
            modal.style.display = 'flex';
        }
    };

    window.toggleContent = function(id) {
        const contentDiv = document.getElementById(`content-${id}`);
        const btn = contentDiv.nextElementSibling;
        
        if (contentDiv.classList.contains('collapsed')) {
            contentDiv.classList.remove('collapsed');
            btn.textContent = '간략히 보기';
        } else {
            contentDiv.classList.add('collapsed');
            btn.textContent = '더보기';
        }
    };

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // --- MOUSE TRACKING ---
    window.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    renderPosts();
});
