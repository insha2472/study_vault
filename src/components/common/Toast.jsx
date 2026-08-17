import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      maxWidth: '380px'
    }}>
      {toasts.map(toast => {
        let icon = <Info size={18} className="text-info" />;
        let badgeClass = 'badge-info';
        if (toast.type === 'success') {
          icon = <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />;
          badgeClass = 'badge-success';
        } else if (toast.type === 'warning' || toast.type === 'error') {
          icon = <AlertCircle size={18} style={{ color: 'var(--danger)' }} />;
          badgeClass = 'badge-danger';
        }

        return (
          <div
            key={toast.id}
            className="card animate-fade-in"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              background: 'var(--surface)',
              borderLeft: `4px solid ${toast.type === 'success' ? 'var(--success)' : toast.type === 'warning' ? 'var(--danger)' : 'var(--accent)'}`,
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              {icon}
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="btn btn-ghost btn-icon"
              style={{ padding: '2px' }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
