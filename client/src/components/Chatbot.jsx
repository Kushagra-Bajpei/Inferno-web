import { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm Inferno Help Assist. How can I help you with our events today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (text) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    setMessages(prev => [...prev, { text: messageText, sender: 'user' }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/gemini/prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText })
      });

      const data = await response.json();
      setIsTyping(false);

      if (response.ok) {
        setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
      } else {
        setMessages(prev => [...prev, { text: data.error || 'Sorry, I encountered an error. Please try again.', sender: 'bot' }]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'bot' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sampleQuestions = [
    "When is the next hackathon?",
    "How can I join Inferno?",
    "What events are coming up?",
    "Tell me about the team structure",
    "Who is the faculty facilitator?"
  ];

  return (
    <div className="chatbot-container">
      <div className="chatbot-toggle" onClick={toggleChatbot}>
        <i>💬</i>
      </div>
      <div className={`chatbot-interface ${isOpen ? 'active' : ''}`}>
        <div className="chatbot-header">
          <h3>Inferno Help Assist</h3>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}-message`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="message bot-message typing-indicator">
              <span></span><span></span><span></span>
            </div>
          )}
          {!isTyping && messages.length === 1 && sampleQuestions.map((q, idx) => (
            <div 
              key={idx} 
              className="message bot-message sample-question" 
              style={{ cursor: 'pointer', margin: '0.5rem 0', padding: '0.5rem', borderRadius: '15px', backgroundColor: 'rgba(255, 77, 0, 0.1)', transition: 'all 0.3s ease' }}
              onClick={() => sendMessage(q)}
            >
              {q}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input">
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            onKeyPress={handleKeyPress}
            placeholder="Ask me about Inferno events..." 
          />
          <button onClick={() => sendMessage()}><i>➤</i></button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
