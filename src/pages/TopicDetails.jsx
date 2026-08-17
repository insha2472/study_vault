import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTopics } from '../data/mockData';
import {
  BookMarked,
  MessageSquare,
  HelpCircle,
  Layers,
  ArrowLeft,
  CheckCircle,
  FileText,
  Key
} from 'lucide-react';

export function TopicDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const topic = mockTopics.find(t => t.id === id) || mockTopics[0];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={() => navigate('/topics')} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem' }}>
        <ArrowLeft size={16} /> Back to Topics
      </button>

      {/* Header Banner */}
      <div className="card glass-card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '0.5rem' }}>{topic.subject}</span>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{topic.name}</h1>
            <p className="page-subtitle">{topic.overview}</p>
          </div>

          <div style={{ minWidth: '180px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.375rem' }}>
              <span>Topic Mastery</span>
              <strong>{topic.progress}%</strong>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${topic.progress}%` }} />
            </div>
          </div>
        </div>

        {/* Action Shortcut Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/chat')} className="btn btn-primary">
            <MessageSquare size={16} /> Ask AI
          </button>
          <button onClick={() => navigate('/quiz')} className="btn btn-secondary">
            <HelpCircle size={16} /> Take Quiz
          </button>
          <button onClick={() => navigate('/flashcards')} className="btn btn-secondary">
            <Layers size={16} /> Generate Flashcards
          </button>
        </div>
      </div>

      {/* Detailed Breakdown Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Key Concepts */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={18} style={{ color: 'var(--success)' }} /> Key Concepts
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {topic.keyConcepts.map((concept, idx) => (
              <li key={idx} style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                {concept}
              </li>
            ))}
          </ul>
        </div>

        {/* Important Terms */}
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={18} style={{ color: 'var(--accent)' }} /> Important Terms
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {topic.importantTerms.map((term, idx) => (
              <span key={idx} className="badge badge-neutral" style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}>
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
