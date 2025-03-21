// Remove: const axios = require('axios');
// We'll use a CDN instead - add this to your HTML:
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
    
    // For browser, you'll need to set API key differently
    // You could hardcode it (not recommended for production) or use a config
    const apiKey = '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'; // Replace with your actual key
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    if (!chatMessages || !userInput || !sendButton) {
        console.error('Required DOM elements are missing');
        return;
    }

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        if (!isUser) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-brain';
            messageContent.appendChild(icon);
        }
        
        const text = document.createElement('p');
        text.textContent = message;
        messageContent.appendChild(text);
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function getAIResponse(input) {
        try {
            if (!apiKey) {
                throw new Error('API key not configured');
            }

            const response = await axios.post(apiUrl, {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: input }
                ],
                temperature: 0.7,
                max_tokens: 150
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('API Error:', error.message);
            return "Sorry, I encountered an error. Please try again later.";
        }
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'message bot loading';
            loadingDiv.textContent = 'Thinking...';
            chatMessages.appendChild(loadingDiv);

            const response = await getAIResponse(message);
            chatMessages.removeChild(loadingDiv);
            addMessage(response);
        }
    }

       
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
});