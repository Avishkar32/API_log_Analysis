import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [logs, setLogs] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize or retrieve session ID
  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = 'session-' + Date.now();
      localStorage.setItem('sessionId', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !logs.trim()) return;
    
    setIsLoading(true);
    setError(null);
    const userMessage = { 
      role: 'user', 
      content: input + (logs.trim() ? '\n\nLogs:\n' + logs : '')
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: input,
          logs: logs ? logs.split('\n').filter(line => line.trim()) : []
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.reply
      }]);
      setLogs('');
      setIsLogsOpen(false);
      
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingAnimation = () => (
    <div className="loading-container">
      <div className="dot-typing">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="glass-container">
        <header className="app-header">
          <div className="logo">
            <span className="logo-icon">📊</span>
            <h1>Log Analysis Assistant</h1>
          </div>
          <p className="subtitle">Intelligent API log analysis</p>
        </header>
        
        <div className="chat-container">
          <div className="messages">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <div className="welcome-header">
                  <span className="welcome-icon">👋</span>
                  <h2>Hello, I'm your log analysis assistant</h2>
                </div>
                <p>I can help you with:</p>
                <div className="feature-grid">
                  <div className="feature-card">
                    <span className="feature-icon">🔍</span>
                    <p>Analyzing API logs</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">🔧</span>
                    <p>Troubleshooting issues</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">🧩</span>
                    <p>Root cause analysis</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">📈</span>
                    <p>Performance insights</p>
                  </div>
                </div>
                <p className="start-prompt">Get started by typing a message or pasting logs below.</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role}`}>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="sender-name">{msg.role === 'user' ? 'You' : 'Assistant'}</span>
                      <span className="message-time">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className="message-text">
                      {msg.role === 'assistant' ? (
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      ) : (
                        msg.content.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="avatar">
                    {msg.role === 'user' ? '👤' : '🤖'}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="message assistant">
                <div className="message-content">
                  <div className="message-header">
                    <span className="sender-name">Assistant</span>
                    <span className="message-time">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <LoadingAnimation />
                </div>
                <div className="avatar">🤖</div>
              </div>
            )}
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="input-wrapper">
            {isLogsOpen && (
              <div className="logs-input">
                <textarea
                  id="logs"
                  value={logs}
                  onChange={(e) => setLogs(e.target.value)}
                  placeholder="Paste your log entries here..."
                  rows={4}
                />
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="input-area">
              <button 
                type="button" 
                className={`logs-toggle ${isLogsOpen ? 'active' : ''}`}
                onClick={() => setIsLogsOpen(!isLogsOpen)}
                title="Toggle logs input"
              >
                📋
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="send-button" 
                disabled={isLoading || (!input.trim() && !logs.trim())}
              >
                {isLoading ? '⏳' : '📤'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;