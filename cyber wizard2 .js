// const axios = require('axios');

// // Define the API endpoint
// const apiUrl = 'https://api.openai.com/v1/chat/completions';
// const apiKey = process.env.OPENAI_API_KEY; // API key should be in environment variables

// // Chat functionality
// const chatMessages = document.getElementById('chat-messages');
// const userInput = document.getElementById('user-input');
// const sendButton = document.getElementById('send-message');

// // Add a message to the chat
// function addMessage(message, isUser = false) {
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `message ${isUser ? 'user' : 'bot'}`; // Fixed template literal syntax
    
//     const messageContent = document.createElement('div');
//     messageContent.className = 'message-content';
    
//     if (!isUser) {
//         const icon = document.createElement('i');
//         icon.className = 'fas fa-brain';
//         messageContent.appendChild(icon);
//     }
    
//     const text = document.createElement('p');
//     text.textContent = message;
//     messageContent.appendChild(text);
    
//     messageDiv.appendChild(messageContent);
//     chatMessages.appendChild(messageDiv);
    
//     // Scroll to bottom
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// // Get AI response from OpenAI API
// async function getAIResponse(input) {
//     try {
//         if (!apiKey) {
//             throw new Error('API key not configured');
//         }

//         const headers = {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiKey}`
//         };

//         const requestBody = {
//             model: 'gpt-3.5-turbo', // Updated to use the chat model
//             messages: [
//                 { role: 'system', content: 'You are a helpful assistant.' },
//                 { role: 'user', content: input }
//             ],
//             temperature: 0.7,
//             max_tokens: 150
//         };

//         const response = await axios.post(apiUrl, requestBody, { headers });
//         return response.data.choices[0].message.content;
//     } catch (error) {
//         console.error('API Error:', error.message);
//         if (error.response) {
//             console.error('API Response:', error.response.data);
//         }
//         return "Sorry, I encountered an error. Please try again later.";
//     }
// }

// // Handle sending messages
// async function sendMessage() {
//     const message = userInput.value.trim();
//     if (message) {
//         addMessage(message, true);
//         userInput.value = '';
        
//         // Add loading indicator
//         const loadingDiv = document.createElement('div');
//         loadingDiv.className = 'message bot loading';
//         loadingDiv.textContent = 'Thinking...';
//         chatMessages.appendChild(loadingDiv);

//         try {
//             const response = await getAIResponse(message);
//             chatMessages.removeChild(loadingDiv);
//             addMessage(response);
//         } catch (error) {
//             chatMessages.removeChild(loadingDiv);
//             addMessage('Sorry, something went wrong. Please try again.');
//         }
//     }
// }

// // Initialize chat with a welcome message
// document.addEventListener('DOMContentLoaded', () => {
//     addMessage("Hello! I'm Cyber Wizard, your AI assistant. How can I help you today?", false);
// });

// // Event listeners
// sendButton.addEventListener('click', sendMessage);
// userInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') {
//         sendMessage();
//     }
// });

// // Smooth scrolling for navigation links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         if (target) {
//             target.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//         }
//     });
// });

// // Navigation scroll effect
// window.addEventListener('scroll', function() {
//     const nav = document.querySelector('nav');
//     if (window.scrollY > 50) {
//         nav.classList.add('scrolled');
//         nav.style.background = 'rgba(255, 255, 255, 0.98)';
//         nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
//     } else {
//         nav.classList.remove('scrolled');
//         nav.style.background = 'rgba(255, 255, 255, 0.95)';
//         nav.style.boxShadow = 'none';
//     }
// });

// Define the API endpoint and key
const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const apiKey = "AIzaSyD__frLa4knZCkRTxY70-TTnXT3ClTKVxc"; 

// Get chat elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-message');

// Function to add a message to chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ${isUser ? 'user' : 'bot'}';

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

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to fetch AI response from Google Gemini API
async function getAIResponse(input) {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

        const requestBody = {
            contents: [
                {
                    parts: [{ text: input }]
                }
            ]
        };

        const response = await fetch(${apiUrl}?key=${apiKey}, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error("Invalid response from API.");
        }
    } catch (error) {
        console.error("API Error:", error);
        return "Sorry, I encountered an error. Please try again later.";
    }
}

// Function to send user message and get AI response
async function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = "";

        // Add loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message bot loading';
        loadingDiv.textContent = "Thinking...";
        chatMessages.appendChild(loadingDiv);

        try {
            const response = await getAIResponse(message);
            chatMessages.removeChild(loadingDiv);
            addMessage(response);
        } catch (error) {
            chatMessages.removeChild(loadingDiv);
            addMessage("Sorry, something went wrong. Please try again.");
        }
    }
}

// Initialize chat with a welcome message
document.addEventListener("DOMContentLoaded", () => {
    addMessage("Hello! I'm MindfulAI, your mental health companion. How are you feeling today?", false);
});

// Event listeners
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});
