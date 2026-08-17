import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  BookMarked,
  Database,
  Brain,
  Network,
  ArrowRight,
  Upload
} from 'lucide-react';

export function Topics() {
  const navigate = useNavigate();
  const { topics } = useApp();

  const getTopicIcon = (name) => {
    switch (name) {
      case 'Database': return Database;
      case 'Brain': return Brain;
      case 'Network': return Network;
      default: return BookMarked;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Topics</h1>
        <p className="page-subtitle">Explore everything you've learned organized by core academic domains.</p>
      </div>

      {topics.length === 0 ? (
        <div className="card" style={{ padding: '3rem 1.5rem', textAlign: 'center', maxWidth: '600px', margin: '2rem auto' }}>
          <BookMarked size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No topics discovered yet</h3>
          <p style={{ marginTop: '0.25rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
            Upload your study notes or course materials to automatically discover topics and concepts.
          </p>
          <button onClick={() => navigate('/documents')} className="btn btn-primary">
            <Upload size={16} /> Upload Study Materials
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {topics.map(topic => {
            const TopicIcon = getTopicIcon(topic.icon);
            return (
              <div
                key={topic.id}
                className="card continue-card card-hover"
                onClick={() => navigate(`/topics/${topic.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="continue-header">
                  <div className="subject-icon-box" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
                    <TopicIcon size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem' }}>{topic.name}</h3>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{topic.subject}</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {topic.overview}
                </p>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{topic.topicsCount} Concepts Covered</span>
                    <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{topic.progress}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${topic.progress}%` }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.78125rem', color: 'var(--text-secondary)' }}>
                    {topic.relatedDocsCount} Related Docs
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    View Details <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
