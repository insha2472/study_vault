import React, { useState } from 'react';
import { mockFlashcards } from '../data/mockData';
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export function Flashcards() {
  const [cards, setCards] = useState(mockFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState('All');

  const activeCards = cards.filter(c => subjectFilter === 'All' || c.subject === subjectFilter);
  const currentCard = activeCards[currentIndex] || activeCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < activeCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <h1>Flashcards</h1>
        <p className="page-subtitle">Learn faster with spaced repetition and active recall techniques.</p>
      </div>

      {/* Top Filter Controls */}
      <div className="card glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Layers style={{ color: 'var(--accent)' }} size={20} />
          <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Subject:</span>
          <select value={subjectFilter} onChange={e => { setSubjectFilter(e.target.value); setCurrentIndex(0); setIsFlipped(false); }} className="select-field" style={{ width: 'auto', padding: '0.375rem 0.75rem' }}>
            <option value="All">All Subjects</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Database Management Systems">Database Management Systems</option>
            <option value="Computer Networks">Computer Networks</option>
            <option value="Machine Learning">Machine Learning</option>
          </select>
        </div>

        <span className="badge badge-info">
          Card {currentIndex + 1} of {activeCards.length}
        </span>
      </div>

      {/* 3D Flip Flashcard */}
      {currentCard && (
        <div style={{ perspective: '1000px', marginBottom: '2rem' }}>
          <div
            onClick={() => setIsFlipped(prev => !prev)}
            style={{
              width: '100%',
              minHeight: '280px',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              cursor: 'pointer'
            }}
          >
            {/* Front Side */}
            <div
              className="card glass-card"
              style={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-neutral">{currentCard.subject}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Click card to flip</span>
              </div>

              <h2 style={{ fontSize: '1.4rem', lineHeight: '1.4', margin: '1.5rem 0' }}>
                {currentCard.front}
              </h2>

              <div>
                <button className="btn btn-secondary btn-sm">
                  <RotateCw size={14} /> Reveal Answer
                </button>
              </div>
            </div>

            {/* Back Side */}
            <div
              className="card"
              style={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--accent-light)',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-success">Answer</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Click to see question</span>
              </div>

              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-primary)', margin: '1.5rem 0' }}>
                {currentCard.back}
              </p>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Did you get it right?</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={handlePrev} disabled={currentIndex === 0} className="btn btn-secondary">
          <ChevronLeft size={18} /> Previous Card
        </button>

        <button onClick={handleNext} disabled={currentIndex === activeCards.length - 1} className="btn btn-primary">
          Next Card <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
