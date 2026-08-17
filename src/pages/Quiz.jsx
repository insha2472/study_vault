import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockQuizQuestions, mockQuizResults } from '../data/mockData';
import {
  HelpCircle,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Award
} from 'lucide-react';

export function Quiz() {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState('setup'); // 'setup', 'in_progress', 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Setup form parameters
  const [subject, setSubject] = useState('Database Management Systems');
  const [topic, setTopic] = useState('Database Normalization');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState(5);

  const currentQ = mockQuizQuestions[currentQuestionIndex];
  const totalQuestions = mockQuizQuestions.length;

  const handleSelectOption = (optIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setQuizState('results');
  };

  const handleTryAgain = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setQuizState('setup');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="page-header">
        <h1>Quiz Center</h1>
        <p className="page-subtitle">Test your understanding and identify target area improvements.</p>
      </div>

      {/* STEP 1: Quiz Setup Form */}
      {quizState === 'setup' && (
        <div className="card glass-card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HelpCircle style={{ color: 'var(--accent)' }} size={22} /> Configure Your Quiz
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div className="input-group">
              <label className="input-label">Select Subject</label>
              <select value={subject} onChange={e => setSubject(e.target.value)} className="select-field">
                <option value="Database Management Systems">Database Management Systems</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Computer Networks">Computer Networks</option>
                <option value="Full Stack Development">Full Stack Development</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Select Topic</label>
              <select value={topic} onChange={e => setTopic(e.target.value)} className="select-field">
                <option value="Database Normalization">Database Normalization</option>
                <option value="Functional Dependencies">Functional Dependencies</option>
                <option value="SQL Queries & Joins">SQL Queries & Joins</option>
                <option value="Supervised Learning Models">Supervised Learning Models</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Difficulty</label>
              <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="select-field">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Number of Questions</label>
              <select value={questionCount} onChange={e => setQuestionCount(Number(e.target.value))} className="select-field">
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={20}>20 Questions</option>
              </select>
            </div>
          </div>

          <button onClick={() => setQuizState('in_progress')} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            <Play size={18} /> Start Quiz
          </button>
        </div>
      )}

      {/* STEP 2: Interactive Quiz View */}
      {quizState === 'in_progress' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="badge badge-info">{difficulty} Difficulty</span>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar-bg" style={{ marginBottom: '1.5rem' }}>
            <div
              className="progress-bar-fill"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question text */}
          <h3 style={{ fontSize: '1.2rem', lineHeight: '1.4', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            {currentQ.question}
          </h3>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="card"
                  style={{
                    textAlign: 'left',
                    padding: '1rem 1.25rem',
                    backgroundColor: isSelected ? 'var(--accent-light)' : 'var(--surface)',
                    borderColor: isSelected ? 'var(--accent)' : 'var(--border-color)',
                    color: isSelected ? 'var(--accent)' : 'var(--text-primary)',
                    fontWeight: isSelected ? 600 : 400,
                    cursor: 'pointer'
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="btn btn-secondary"
            >
              Previous
            </button>

            {currentQuestionIndex === totalQuestions - 1 ? (
              <button onClick={handleSubmit} className="btn btn-primary">
                Submit Quiz
              </button>
            ) : (
              <button onClick={handleNext} className="btn btn-primary">
                Next Question
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: Quiz Results Screen */}
      {quizState === 'results' && (
        <div className="card glass-card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <Award size={36} />
          </div>

          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>🎉 Quiz Completed!</h2>
          <p className="page-subtitle" style={{ marginBottom: '1.5rem' }}>You performed great on this module assessment.</p>

          <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--accent)', marginBottom: '0.25rem' }}>
            {mockQuizResults.scorePercentage}%
          </div>
          <p style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {mockQuizResults.correctCount} / {mockQuizResults.totalCount} Correct Answers
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
            <div className="card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Correct</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)', marginTop: '0.25rem' }}>
                <CheckCircle size={16} inline /> {mockQuizResults.correctCount}
              </div>
            </div>
            <div className="card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Incorrect</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--danger)', marginTop: '0.25rem' }}>
                <XCircle size={16} inline /> {mockQuizResults.totalCount - mockQuizResults.correctCount}
              </div>
            </div>
            <div className="card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Time Elapsed</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--info)', marginTop: '0.25rem' }}>
                <Clock size={16} inline /> {mockQuizResults.timeTaken}
              </div>
            </div>
          </div>

          {/* Weak Topics Analysis */}
          <div className="card" style={{ textAlign: 'left', marginBottom: '2rem', backgroundColor: 'var(--bg-secondary)' }}>
            <h4 style={{ fontSize: '0.9375rem', marginBottom: '0.5rem', color: 'var(--warning)' }}>Weak Topics Identified:</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {mockQuizResults.weakTopics.map((topic, idx) => (
                <span key={idx} className="badge badge-warning">{topic}</span>
              ))}
            </div>
            <p style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)' }}>
              <strong>Recommendation:</strong> {mockQuizResults.recommendation}
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={handleTryAgain} className="btn btn-secondary">
              <RotateCcw size={16} /> Try Again
            </button>
            <button onClick={() => navigate('/documents')} className="btn btn-primary">
              <BookOpen size={16} /> Study Weak Topics
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
