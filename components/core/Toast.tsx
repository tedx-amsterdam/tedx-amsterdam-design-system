import React from 'react';
import { cn } from '../utils/cn';
import styles from './Toast.module.css';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  /** @default "info" */
  type?: 'info' | 'success' | 'error' | 'warning';
  /** Auto-dismiss delay in ms. 0 = persist until manually dismissed. @default 4000 */
  duration?: number;
  /** Called when the toast finishes its exit animation. Use to remove it from state. */
  onDismiss?: () => void;
}

/**
 * Transient bottom-right notification. Slides in from right, auto-dismisses.
 * Caller renders/unrenders via state; use `onDismiss` to clean up.
 * error/warning use `role="alert"` (assertive); info/success use `role="status"` (polite).
 */
export function Toast({ message, type = 'info', duration = 4000, onDismiss, className, style, ...rest }: ToastProps): React.ReactElement {
  const [visible, setVisible] = React.useState(false);
  const onDismissRef = React.useRef(onDismiss);
  React.useEffect(() => { onDismissRef.current = onDismiss; });

  React.useEffect(() => {
    const enter = setTimeout(() => setVisible(true), 16);
    if (duration > 0) {
      const dismiss = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onDismissRef.current?.(), 300);
      }, duration);
      return () => { clearTimeout(enter); clearTimeout(dismiss); };
    }
    return () => clearTimeout(enter);
  }, [duration]);

  const isUrgent = type === 'error' || type === 'warning';

  return (
    <div
      {...rest}
      role={isUrgent ? 'alert' : 'status'}
      aria-live={isUrgent ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={cn(styles.toast, visible && styles.visible, isUrgent && styles.urgent, className)}
      style={style}
    >
      <p className={styles.message}>
        {message}
      </p>
      <button
        onClick={() => { setVisible(false); setTimeout(() => onDismissRef.current?.(), 300); }}
        aria-label="Dismiss notification"
        className={styles.dismissBtn}
      >
        ×
      </button>
    </div>
  );
}
