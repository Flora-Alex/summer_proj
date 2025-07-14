document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-button');
    const chatContainer = document.querySelector('.chat-container');
    const welcomeMessage = document.querySelector('.welcome-message');

    // 自动调整输入框高度
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        const newHeight = Math.min(this.scrollHeight, 200); // 限制最大高度
        this.style.height = newHeight + 'px';
    });

    // 发送消息功能
    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        // 隐藏欢迎消息
        if (welcomeMessage) {
            welcomeMessage.remove();
        }

        // 添加用户消息
        addMessageToChat(message, 'user');

        // 清空输入框
        messageInput.value = '';
        messageInput.style.height = 'auto';

        // 模拟AI回复
        setTimeout(() => {
            addMessageToChat('这是一条模拟回复。在实际应用中，这里会连接到后端API获取真实回复。', 'ai');
        }, 1000);
    }

    // 添加消息到聊天窗口
    function addMessageToChat(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `
            <div class="message-avatar">${sender === 'user' ? '<i class="bi bi-person"></i>' : '🦉'}</div>
            <div class="message-content">${text}</div>
        `;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // 绑定发送按钮点击事件
    sendButton.addEventListener('click', sendMessage);

    // 绑定回车键发送消息
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 添加消息样式
    const style = document.createElement('style');
    style.textContent = `
        .message {
            display: flex;
            margin-bottom: 20px;
            max-width: 80%;
            align-self: ${sender === 'user' ? 'flex-end' : 'flex-start'};
        }
        .user-message {
            align-self: flex-end;
        }
        .ai-message {
            align-self: flex-start;
        }
        .message-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: ${sender === 'user' ? '#6d6d6d' : 'var(--accent-color)' };
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: ${sender === 'user' ? '0' : '10px'};
            margin-left: ${sender === 'user' ? '10px' : '0'};
            flex-shrink: 0;
        }
        .message-content {
            background-color: ${sender === 'user' ? 'var(--accent-color)' : 'var(--bg-secondary)' };
            padding: 12px 16px;
            border-radius: 18px;
            line-height: 1.5;
        }
        .user-message .message-content {
            border-top-right-radius: 4px;
        }
        .ai-message .message-content {
            border-top-left-radius: 4px;
        }
    `;
    document.head.appendChild(style);
});