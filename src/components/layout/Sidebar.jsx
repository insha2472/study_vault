import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  BookOpenCheck,
  LayoutDashboard,
  FileText,
  MessageSquareCode,
  HelpCircle,
  Layers,
  Calendar,
  BookMarked,
  Settings,
  LogOut,
  User,
  X
} from 'lucide-react';

export function Sidebar({ mobileOpen, setMobileOpen }) {
  const { profile, logout } = useApp();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Documents', path: '/documents', icon: FileText },
    { label: 'AI Chat', path: '/chat', icon: MessageSquareCode },
    { label: 'Quiz', path: '/quiz', icon: HelpCircle },
    { label: 'Flashcards', path: '/flashcards', icon: Layers },
    { label: 'Study Planner', path: '/planner', icon: Calendar },
    { label: 'Topics', path: '/topics', icon: BookMarked },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 998,
            display: 'block'
          }}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? 'mobile-visible' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <BookOpenCheck size={22} color="#ffffff" />
            </div>
            <div className="brand-text">
              <span className="brand-name">StudyVault</span>
              <span className="brand-badge">AI</span>
            </div>
          </div>
          {mobileOpen && (
            <button className="btn btn-ghost btn-icon mobile-close-btn" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={19} className="nav-icon" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <NavLink
            to="/settings"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <Settings size={19} className="nav-icon" />
            <span>Settings</span>
          </NavLink>

          <div className="sidebar-profile" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Shadow person avatar badge */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--surface-hover)',
                border: '1px solid var(--border-hover)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}>
                <User size={19} />
              </div>
              <div className="profile-info">
                <span className="profile-name">{profile.name}</span>
                <span className="profile-role">{profile.role}</span>
              </div>
            </div>

            <button
              onClick={logout}
              className="btn btn-ghost btn-icon"
              title="Sign Out"
              style={{ color: 'var(--danger)', padding: '4px' }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
