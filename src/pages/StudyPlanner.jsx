import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Sparkles,
  Clock,
  CheckCircle,
  Circle,
  BookOpen
} from 'lucide-react';

export function StudyPlanner() {
  const { studyPlan, setStudyPlan, addToast } = useApp();
  const [examDate, setExamDate] = useState('2026-08-30');
  const [dailyHours, setDailyHours] = useState('3.0');
  const [preference, setPreference] = useState('Balanced');
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleDayCompletion = (dayNum) => {
    setStudyPlan(prev => ({
      ...prev,
      days: prev.days.map(d => d.dayNumber === dayNum ? { ...d, completed: !d.completed } : d)
    }));
    addToast('Schedule progress updated!', 'success');
  };

  const handleGeneratePlan = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      const generated = {
        title: "Your 7-Day Personalized Study Schedule",
        totalHours: Number(dailyHours) * 7,
        days: [
          { dayNumber: 1, dayName: "Day 1", subject: "Core Concepts Review", topics: ["Module Overview", "Key Terminology"], duration: `${dailyHours} hours`, priority: "High", completed: false },
          { dayNumber: 2, dayName: "Day 2", subject: "In-depth Theory", topics: ["Definitions", "Architectural Rules"], duration: `${dailyHours} hours`, priority: "High", completed: false },
          { dayNumber: 3, dayName: "Day 3", subject: "Practical Applications", topics: ["Solved Examples", "Formula Derivations"], duration: `${dailyHours} hours`, priority: "Medium", completed: false },
          { dayNumber: 4, dayName: "Day 4", subject: "Active Recall Practice", topics: ["Flashcards Recall", "Self-testing"], duration: `${dailyHours} hours`, priority: "Medium", completed: false },
          { dayNumber: 5, dayName: "Day 5", subject: "Mock Assessment", topics: ["Timed Quiz", "Weak Areas Drill"], duration: `${dailyHours} hours`, priority: "High", completed: false },
          { dayNumber: 6, dayName: "Day 6", subject: "Targeted Revision", topics: ["Incorrect Answers Review", "Summary Notes"], duration: `${dailyHours} hours`, priority: "Medium", completed: false },
          { dayNumber: 7, dayName: "Day 7", subject: "Final Exam Preparation", topics: ["Comprehensive Review", "Key Points Sweep"], duration: `${dailyHours} hours`, priority: "High", completed: false }
        ]
      };
      setStudyPlan(generated);
      setIsGenerating(false);
      addToast('New 7-Day Study Plan created successfully!', 'success');
    }, 600);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div className="page-header">
        <h1>AI Study Planner</h1>
        <p className="page-subtitle">Generate an optimized study schedule tailored to your upcoming exam dates and target topics.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.75rem' }}>
        {/* Left Form: Plan Configuration */}
        <div className="card glass-card" style={{ height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} style={{ color: 'var(--accent)' }} /> Generator Settings
          </h3>

          <form onSubmit={handleGeneratePlan} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Upcoming Exam Date</label>
              <input
                type="date"
                value={examDate}
                onChange={e => setExamDate(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Available Hours / Day</label>
              <select value={dailyHours} onChange={e => setDailyHours(e.target.value)} className="select-field">
                <option value="1.5">1.5 Hours</option>
                <option value="2.5">2.5 Hours</option>
                <option value="3.0">3.0 Hours</option>
                <option value="4.5">4.5 Hours</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Study Preference Strategy</label>
              <select value={preference} onChange={e => setPreference(e.target.value)} className="select-field">
                <option value="Balanced">Balanced (Theory + Practice)</option>
                <option value="Exam-focused">Exam-focused (High Weightage)</option>
                <option value="Revision-heavy">Revision-heavy (Flashcards & Quizzes)</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }} disabled={isGenerating}>
              <Sparkles size={16} /> {isGenerating ? 'Generating Schedule...' : 'Create Study Plan'}
            </button>
          </form>
        </div>

        {/* Right Output: Interactive Schedule Timeline */}
        <div>
          <div className="section-header">
            <h2 className="section-title">{studyPlan.title}</h2>
            {studyPlan.days && studyPlan.days.length > 0 && (
              <span className="badge badge-neutral">Total: {studyPlan.totalHours} Hours</span>
            )}
          </div>

          {!studyPlan.days || studyPlan.days.length === 0 ? (
            <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
              <Calendar size={44} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.1rem' }}>No active study plan</h3>
              <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                Configure your exam date and available hours on the left to build a personalized study schedule.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {studyPlan.days.map((day) => (
                <div
                  key={day.dayNumber}
                  className="card card-hover"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    borderLeft: `4px solid ${day.completed ? 'var(--success)' : 'var(--accent)'}`,
                    opacity: day.completed ? 0.75 : 1
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                      onClick={() => toggleDayCompletion(day.dayNumber)}
                      className="btn btn-ghost btn-icon"
                      style={{ padding: '0', color: day.completed ? 'var(--success)' : 'var(--text-muted)' }}
                    >
                      {day.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
                    </button>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        <strong style={{ fontSize: '1rem', textDecoration: day.completed ? 'line-through' : 'none' }}>
                          {day.dayName}: {day.subject}
                        </strong>
                        <span className={`badge ${day.priority === 'High' ? 'badge-danger' : 'badge-info'}`}>
                          {day.priority} Priority
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.375rem' }}>
                        {day.topics.map((t, idx) => (
                          <span key={idx} className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>
                            <BookOpen size={10} /> {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap', fontSize: '0.84375rem', color: 'var(--text-secondary)' }}>
                    <Clock size={15} /> {day.duration}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
