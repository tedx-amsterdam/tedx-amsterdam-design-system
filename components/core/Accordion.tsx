import React from 'react';
import { cn } from '../utils/cn';
import styles from './Accordion.module.css';

export interface AccordionItem {
  q: React.ReactNode;
  a: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Index open on mount; -1 for all closed. @default 0 */
  defaultOpen?: number;
  style?: React.CSSProperties;
}

/** FAQ-style disclosure list; one row open at a time, red active question. */
export function Accordion({ items = [], defaultOpen = 0, style }: AccordionProps): React.ReactElement {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div style={style}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const btnId = `accordion-btn-${i}`;
        const panelId = `accordion-panel-${i}`;
        return (
          <div key={i} className={styles.item}>
            <button
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className={styles.btn}
            >
              <span className={cn(styles.question, isOpen && styles.open)}>
                {it.q}
              </span>
              <span aria-hidden="true" className={cn(styles.icon, isOpen && styles.open)}>
                <span className={styles.iconH} />
                <span className={cn(styles.iconV, isOpen && styles.open)} />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              aria-hidden={!isOpen}
              className={cn(styles.panel, isOpen && styles.open)}
            >
              <p className={styles.answer}>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
