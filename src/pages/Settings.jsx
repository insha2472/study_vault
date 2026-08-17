import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import {
  User,
  Sun,
  Moon,
  Bell,
  Sparkles,
  Save,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export function Settings() {
  const { profile, setProfile, addToast } = useApp();
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({ ...profile });

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    addToast('Settings preferences saved successfully!', 'success');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="page-header">
        <h1>Settings</h1>
        <p className="page-subtitle">Customize your account, theme preferences, and AI study defaults.</p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Profile Settings */}
        <div className="card glass-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} style={{ color: 'var(--accent)' }} /> Profile Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Course / Degree</label>
              <input
                type="text"
                value={formData.course}
                onChange={e => setFormData({ ...formData, course: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Academic Year</label>
              <select
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
                className="select-field"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year / Final">4th Year / Final</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sun size={20} style={{ color: 'var(--warning)' }} /> Appearance & Interface
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>Theme Mode</strong>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Active mode: <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{theme}</span>
              </p>
            </div>
            <button type="button" onClick={toggleTheme} className="btn btn-secondary">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} Switch Theme Mode
            </button>
          </div>
        </div>

        {/* AI & Study Preferences */}
        <div className="card glass-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} style={{ color: 'var(--accent)' }} /> AI Assistant Preferences
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div className="input-group">
              <label className="input-label">AI Response Style</label>
              <select
                value={formData.aiResponseStyle}
                onChange={e => setFormData({ ...formData, aiResponseStyle: e.target.value })}
                className="select-field"
              >
                <option value="Simple">Simple (Concise explanations)</option>
                <option value="Balanced">Balanced (Standard academic detail)</option>
                <option value="Detailed">Detailed (In-depth breakdown)</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Daily Study Goal (Hours)</label>
              <input
                type="number"
                step="0.5"
                value={formData.dailyGoalHours}
                onChange={e => setFormData({ ...formData, dailyGoalHours: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <div>
              <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>Show RAG Sources with Answers</strong>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Display document citations and page numbers under AI responses</p>
            </div>
            <input
              type="checkbox"
              checked={formData.showSourcesToggle}
              onChange={e => setFormData({ ...formData, showSourcesToggle: e.target.checked })}
              style={{ width: '20px', height: '20px', accentColor: 'var(--accent)', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Submit Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary btn-lg">
            <Save size={18} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
