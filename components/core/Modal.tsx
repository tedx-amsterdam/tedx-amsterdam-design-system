import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../utils/cn';
import styles from './Modal.module.css';

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
}

const maxWidths: Record<NonNullable<ModalProps['size']>, number> = {
  sm: 480,
  md: 640,
  lg: 800,
};

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Overlay dialog rendered through a portal to document.body.
 * Traps focus, restores focus to the trigger on close, locks scroll
 * (with scrollbar-width compensation), closes on Escape or overlay click.
 */
export function Modal({ isOpen, onClose, title, children, size = 'md', hideCloseButton = false, className, style, ...rest }: ModalProps): React.ReactElement | null {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const restoreFocusRef = React.useRef<HTMLElement | null>(null);
  const titleId = `modal-title-${React.useId()}`;

  // Body scroll lock (with scrollbar compensation) + Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  // Focus trap + focus restore
  React.useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)[0]?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', trap);
    return () => {
      document.removeEventListener('keydown', trap);
      restoreFocusRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        {...rest}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onClick={(e) => e.stopPropagation()}
        className={cn(styles.dialog, className)}
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
    </div>,
    document.body,
  );
}
