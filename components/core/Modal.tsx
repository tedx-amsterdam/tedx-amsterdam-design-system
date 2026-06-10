import React from 'react';
import styles from './Modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  /** Called on overlay click or Escape key. */
  onClose: () => void;
  /** Dialog heading. Rendered as `<h2>` and linked via `aria-labelledby`. */
  title?: string;
  children?: React.ReactNode;
  /** Dialog width. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Hide the × close button. @default false */
  hideCloseButton?: boolean;
  style?: React.CSSProperties;
}

const maxWidths: Record<NonNullable<ModalProps['size']>, number> = {
  sm: 480,
  md: 640,
  lg: 800,
};

/**
 * Overlay dialog. Traps focus, locks scroll, closes on Escape or overlay click.
 * Red top border signals brand dialog.
 */
export function Modal({ isOpen, onClose, title, children, size = 'md', hideCloseButton = false, style }: ModalProps): React.ReactElement | null {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const titleId = `modal-title-${React.useId()}`;

  // Body scroll lock + Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  // Focus trap
  React.useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const getFirst = () => dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )[0];
    getFirst()?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onClick={(e) => e.stopPropagation()}
        className={styles.dialog}
        style={{ maxWidth: maxWidths[size], ...style }}
      >
        <div className={styles.header}>
          {title && (
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          )}
          {!hideCloseButton && (
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className={styles.closeBtn}
            >
              ×
            </button>
          )}
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>
  );
}
