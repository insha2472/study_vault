import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  mockChatHistory,
  mockSuggestedQuestions,
  mockContextPanelData
} from '../data/mockData';
import {
  Send,
  Paperclip,
  Sparkles,
  User,
  Bot,
  BookOpen,
  FileText,
  CheckSquare,
  HelpCircle
} from 'lucide-react';

export function Chat() {
  const { profile } = useApp();
  const [messages, setMessages] = useState(mockChatHistory);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const feedEndRef = useRef(null);

  const scrollToBottom = () => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = `Here is a detailed explanation of "${query}": Based on your indexed documents (DBMS Module 3 & 4), normalization minimizes data duplication and prevents anomaly states. Keep practicing candidate key identification.`;

      if (query.includes('normalization') || query.includes('simply')) {
        aiText = "Normalization is like organizing your study desk! Instead of putting all notes in one huge messy drawer (which causes duplicates and confusion), you split them into labeled folders. 1NF removes duplicate columns, 2NF eliminates partial dependencies, and 3NF ensures every non-key attribute directly depends only on the primary key.";
      } else if (query.includes('Summarize Module 3')) {
        aiText = "Summary of DBMS Module 3:\n1. Functional Dependencies (FDs): Rules expressing relationships between attributes.\n2. Normal Forms: 1NF, 2NF, 3NF, BCNF.\n3. Lossless Decomposition: Ensures no information is lost when splitting relations.\n4. Dependency Preservation: Guarantees constraint checks can be enforced locally.";
      } else if (query.includes('exam questions')) {
        aiText = "Top 3 Frequently Asked Exam Questions:\n1. Differentiate between 3NF and BCNF with a suitable relational schema example.\n2. Prove that every 3NF relation is in 2NF.\n3. Explain Insertion, Deletion, and Update Anomalies with unnormalized tables.";
      }

      const aiMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: [
          { docName: 'DBMS_Module_3.pdf', page: 14, snippet: 'Normalization fundamentals and 1NF definition.' },
          { docName: 'DBMS_Module_3.pdf', page: 22, snippet: 'Boyce-Codd Normal Form decomposition rules.' }
        ]
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header" style={{ marginBottom: '1.25rem' }}>
        <h1>AI Study Assistant</h1>
        <p className="page-subtitle">Ask questions about your study materials and get instant, grounded explanations.</p>
      </div>

      <div className="chat-container">
        {/* Main Chat Conversation */}
        <div className="chat-main">
          {/* Messages Feed */}
          <div className="chat-feed">
            {messages.map(msg => (
              <div key={msg.id} className={`message-row ${msg.sender}`}>
                <div
                  className="message-avatar"
                  style={{
                    backgroundColor: msg.sender === 'user' ? 'var(--accent)' : 'var(--accent-light)',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--accent)'
                  }}
                >
                  {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className="message-bubble">
                  <p style={{ whiteSpace: 'pre-line', color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)' }}>
                    {msg.text}
                  </p>

                  {/* Sources pills for AI messages */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div style={{ marginTop: '0.875rem', paddingTop: '0.625rem', borderTop: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>
                        Sources:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                        {msg.sources.map((src, idx) => (
                          <span key={idx} className="badge badge-neutral" style={{ fontSize: '0.71875rem' }}>
                            <FileText size={12} /> {src.docName} — Page {src.page}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <span style={{ fontSize: '0.6875rem', color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', display: 'block', marginTop: '0.375rem', textAlign: 'right' }}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message-row ai">
                <div className="message-avatar" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
                  <Bot size={18} />
                </div>
                <div className="message-bubble" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem' }}>
                  <Sparkles size={16} className="text-accent" style={{ animation: 'spin 2s linear infinite' }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Retrieving context & generating answer...</span>
                </div>
              </div>
            )}
            <div ref={feedEndRef} />
          </div>

          {/* Suggested Questions Chips */}
          <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
            {mockSuggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', fontSize: '0.78125rem' }}
              >
                <HelpCircle size={13} /> {q}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div className="chat-input-area">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" className="btn btn-ghost btn-icon" title="Attach Document Context">
                <Paperclip size={18} />
              </button>
              <input
                type="text"
                className="input-field"
                placeholder="Ask anything about your study notes..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-icon" disabled={!input.trim()}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Side Study Context Panel */}
        <div className="context-panel">
          <div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Current Study Context</h3>
            <p style={{ fontSize: '0.78125rem', color: 'var(--text-muted)' }}>RAG Indexing Active</p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Selected Documents ({mockContextPanelData.selectedDocuments.length})
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {mockContextPanelData.selectedDocuments.map((doc, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                  <CheckSquare size={14} style={{ color: 'var(--success)' }} />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Retrieved Sources
            </h4>
            <span className="badge badge-info">{mockContextPanelData.retrievedSectionsCount} relevant sections matched</span>
          </div>

          <div>
            <h4 style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Detected Key Topics
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {mockContextPanelData.topics.map((t, idx) => (
                <span key={idx} className="badge badge-neutral">
                  <BookOpen size={11} /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
