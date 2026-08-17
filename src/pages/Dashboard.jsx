import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  FileText,
  BookOpen,
  Award,
  Database,
  Brain,
  Network,
  MessageSquare,
  ArrowRight,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Upload,
  BookMarked
} from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const { profile, documents, topics, quizScore } = useApp();

  const getSubjectIcon = (iconName) => {
    switch (iconName) {
      case 'Database': return Database;
      case 'Brain': return Brain;
      case 'Network': return Network;
      default: return BookMarked;
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Processed') {
      return (
        <span className="badge badge-success">
          <CheckCircle size={12} /> Processed
        </span>
      );
    }
    if (status === 'Processing') {
      return (
        <span className="badge badge-warning">
          <Clock size={12} /> Processing
        </span>
      );
    }
    return (
      <span className="badge badge-danger">
        <AlertTriangle size={12} /> Failed
      </span>
    );
  };

  // 3 Statistics Cards reset to dynamic user state
  const dashboardStats = [
    { id: 1, title: "Documents", value: documents.length, subtitle: "Uploaded materials", icon: FileText, color: "#6366f1" },
    { id: 2, title: "Topics", value: topics.length, subtitle: "Topics discovered", icon: BookOpen, color: "#10b981" },
    { id: 3, title: "Quiz Score", value: quizScore, subtitle: "Average performance", icon: Award, color: "#f59e0b" }
  ];

  return (
    <div className="animate-fade-in">
      {/* Welcome Banner */}
      <div className="dashboard-welcome">
        <div>
          <h1 className="welcome-title">Good morning, {profile.name} 👋</h1>
          <p className="page-subtitle">Ready to continue learning and ace your exams today?</p>
        </div>
        <button onClick={() => navigate('/chat')} className="btn btn-primary btn-lg">
          <MessageSquare size={18} /> Ask AI Assistant
        </button>
      </div>

      {/* 3 Statistics Cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {dashboardStats.map(stat => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.id} className="card stat-card card-hover">
              <div
                className="stat-icon-wrapper"
                style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
              >
                <IconComponent size={24} />
              </div>
              <div>
                <div className="stat-val">{stat.value}</div>
                <div className="stat-label">{stat.title}</div>
                <div className="stat-sub">{stat.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Learning Section */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Continue Learning</h2>
          <button onClick={() => navigate('/topics')} className="btn btn-ghost btn-sm">
            View All Topics <ArrowRight size={14} />
          </button>
        </div>

        {topics.length === 0 ? (
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <BookMarked size={36} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.05rem' }}>No active learning modules yet</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              Upload notes or study materials to automatically discover topics and track progress.
            </p>
            <button onClick={() => navigate('/documents')} className="btn btn-primary btn-sm">
              <Upload size={14} /> Upload Study Materials
            </button>
          </div>
        ) : (
          <div className="continue-grid">
            {topics.map(course => {
              const SubIcon = getSubjectIcon(course.icon);
              return (
                <div key={course.id} className="card continue-card card-hover">
                  <div className="continue-header">
                    <div
                      className="subject-icon-box"
                      style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}
                    >
                      <SubIcon size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem' }}>{course.name}</h3>
                      <p style={{ fontSize: '0.78125rem', color: 'var(--text-muted)' }}>{course.subject}</p>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Overall Progress</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{course.progress}%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/topics/${course.id}`)}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', marginTop: '0.25rem' }}
                  >
                    Continue <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recent Documents Section */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Recent Documents</h2>
          <button onClick={() => navigate('/documents')} className="btn btn-ghost btn-sm">
            Manage Documents <ArrowRight size={14} />
          </button>
        </div>

        {documents.length === 0 ? (
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <FileText size={36} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.05rem' }}>No study materials uploaded yet</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              Upload your documents on the Documents page to start building your vault.
            </p>
            <button onClick={() => navigate('/documents')} className="btn btn-primary btn-sm">
              <Upload size={14} /> Upload Documents
            </button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Type</th>
                  <th>Upload Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.slice(0, 5).map(doc => (
                  <tr key={doc.id}>
                    <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
                      <FileText size={18} style={{ color: 'var(--accent)' }} />
                      {doc.name}
                    </td>
                    <td>
                      <span className="badge badge-neutral">{doc.type}</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{doc.uploadedAt}</td>
                    <td>{getStatusBadge(doc.status)}</td>
                    <td>
                      <button
                        onClick={() => navigate('/documents')}
                        className="btn btn-ghost btn-sm btn-icon"
                        title="View document preview"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
