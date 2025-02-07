// Chat functionality
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-message');

// Sample responses for the AI (in a real implementation, these would come from an AI model)
const responses = {
    greetings: [
        "Hello! How are you feeling today?",
        "Hi there! I'm here to listen and support you.",
        "Welcome! What's on your mind?"
    ],
    anxiety: [
        "I hear that you're feeling anxious. Let's try a simple breathing exercise together. Would you like that?",
        "Anxiety can be overwhelming. Remember that you're not alone in this. Would you like to talk about what's causing your anxiety?",
        "I understand anxiety can be difficult. Let's break down what you're feeling and work through it together."
    ],
    depression: [
        "I'm sorry you're feeling this way. Remember that your feelings are valid, and it's okay to not be okay.",
        "Depression can make everything feel heavy. Would you like to talk about what you're experiencing?",
        "You're showing strength by reaching out. Let's explore some ways to help you feel better."
    ],
    stress: [
        "Stress can be overwhelming. Would you like to try a quick mindfulness exercise?",
        "I understand you're feeling stressed. Let's identify what's causing this and work on some coping strategies.",
        "It's normal to feel stressed sometimes. Let's work on breaking down these feelings together."
    ]
};

// Add a message to the chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = message ${isUser ? 'user' : 'bot'};
    
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

// Get AI response based on user input
function getAIResponse(input) {
    input = input.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
        return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
    } else if (input.includes('anxiety') || input.includes('anxious') || input.includes('worried')) {
        return responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)];
    } else if (input.includes('depress') || input.includes('sad') || input.includes('down')) {
        return responses.depression[Math.floor(Math.random() * responses.depression.length)];
    } else if (input.includes('stress') || input.includes('overwhelm')) {
        return responses.stress[Math.floor(Math.random() * responses.stress.length)];
    } else {
        return "I'm here to listen and support you. Could you tell me more about what you're feeling?";
    }
}

// Handle sending messages
function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        
        // Simulate AI thinking with a slight delay
        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage(response);
        }, 1000);
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});