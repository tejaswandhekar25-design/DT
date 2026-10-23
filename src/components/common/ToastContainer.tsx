// ============================================
// MindMate — Toast Notification System
// ============================================

import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(toast => {
        let icon = <Info size={18} />;
        let className = 'toast toast-info';

        if (toast.type === 'success') {
          icon = <CheckCircle2 size={18} />;
          className = 'toast toast-success';
        } else if (toast.type === 'error') {
          icon = <AlertCircle size={18} />;
          className = 'toast toast-error';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle size={18} />;
          className = 'toast toast-warning';
        }

        return (
          <div key={toast.id} className={className} role="alert">
            <span style={{ flexShrink: 0 }}>{icon}</span>
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                color: 'currentColor',
                opacity: 0.7,
              }}
              aria-label="Dismiss alert"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
