/**
 * Toast 消息类型
 */
export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

let toastId = 0;
const listeners = new Set<(messages: ToastMessage[]) => void>();
let messages: ToastMessage[] = [];

/**
 * 显示 Toast 提示
 * @param message 提示消息
 * @param type 提示类型
 */
export const showToast = (message: string, type?: ToastMessage['type']) => {
  const id = `toast-${toastId++}`;
  messages = [...messages, { id, message, type: type || 'info' }];
  listeners.forEach(listener => listener(messages));
  
  // 自动移除
  setTimeout(() => {
    messages = messages.filter(m => m.id !== id);
    listeners.forEach(listener => listener(messages));
  }, 3000);
};

/**
 * 订阅 Toast 消息变化
 */
export const subscribeToToasts = (listener: (messages: ToastMessage[]) => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/**
 * 获取当前所有 Toast 消息
 */
export const getToastMessages = () => messages;

/**
 * 移除指定 ID 的 Toast
 */
export const removeToast = (id: string) => {
  messages = messages.filter(m => m.id !== id);
  listeners.forEach(listener => listener(messages));
};
