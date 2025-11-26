import React, { useEffect } from 'react';
import clsx from 'clsx';
import { subscribeToToasts, removeToast, type ToastMessage } from '@/utils/toastService';

/**
 * Westworld 风格 Toast 提示组件
 */
export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  const styles = {
    success: 'from-green-500/20 to-emerald-500/20 border-green-500/40 text-green-900',
    error: 'from-red-500/20 to-rose-500/20 border-red-500/40 text-red-900',
    info: 'from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-900',
    warning: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-900',
  };

  return (
    <div
      className={clsx(
        'fixed top-20 right-4 z-50 px-6 py-4 rounded-xl shadow-lg',
        'glass-strong border backdrop-blur-xl',
        'animate-slide-in-right',
        styles[type]
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icons[type]}</span>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};

/**
 * Toast 容器组件，用于管理多个 Toast
 */
export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  useEffect(() => {
    return subscribeToToasts(setToasts);
  }, []);

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
};

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: () => void;
}
