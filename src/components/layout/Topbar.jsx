import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { Search, Bell, Sun, Moon, Menu, User } from 'lucide-react';

export function Topbar({ setMobileOpen }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { profile, searchQuery, setSearchQuery } = useApp();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/documents')) return 'Documents';
    if (path.startsWith('/chat')) return 'AI Study Assistant';
    if (path.startsWith('/quiz')) return 'Quiz Center';
    if (path.startsWith('/flashcards')) return 'Flashcards';
    if (path.startsWith('/planner')) return 'Study Planner';
    if (path.startsWith('/topics')) return 'Topics';
    if (path.startsWith('/settings')) return 'Settings';
    return 'StudyVault AI';
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="btn btn-ghost btn-icon mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <Menu size={22} />
        </button>
        <div className="topbar-title-group">
          <h1 className="topbar-title">{getPageTitle()}</h1>
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-search">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search documents, topics, quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <button onClick={toggleTheme} className="btn btn-ghost btn-icon" title="Toggle Theme">
          {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <button className="btn btn-ghost btn-icon topbar-notification-btn" title="Notifications">
          <Bell size={19} />
          <span className="notification-badge" />
        </button>

        {/* Shadow person avatar badge */}
        <div className="topbar-profile">
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--surface-hover)',
            border: '1px solid var(--accent-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)'
          }}>
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}
