import React from 'react';
import { cn } from '../utils/cn';
import styles from './Tabs.module.css';

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  /** Initially active tab index (uncontrolled). @default 0 */
  defaultIndex?: number;
  /** Active tab index (controlled). Provide onTabChange alongside this. */
  selectedIndex?: number;
  /** Called with the new index when a tab is activated. */
  onTabChange?: (index: number) => void;
  style?: React.CSSProperties;
}

/** Tabbed switcher. Active tab: red bottom border. Arrow keys navigate between tabs. */
export function Tabs({ tabs = [], defaultIndex = 0, selectedIndex, onTabChange, style }: TabsProps): React.ReactElement {
  const [internalActive, setInternalActive] = React.useState(defaultIndex);
  const uid = React.useId();
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const isControlled = selectedIndex !== undefined;
  const active = isControlled ? selectedIndex : internalActive;

  const setActive = (i: number) => {
    if (!isControlled) setInternalActive(i);
    onTabChange?.(i);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === 'ArrowRight') {
      const next = (i + 1) % tabs.length;
      setActive(next);
      tabRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      const prev = (i - 1 + tabs.length) % tabs.length;
      setActive(prev);
      tabRefs.current[prev]?.focus();
    }
  };

  return (
    <div style={style}>
      <div role="tablist" className={styles.tablist}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            ref={(el) => { tabRefs.current[i] = el; }}
            role="tab"
            aria-selected={active === i}
            aria-controls={`tabpanel-${uid}-${i}`}
            id={`tab-btn-${uid}-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(styles.tab, active === i && styles.active)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={i}
          id={`tabpanel-${uid}-${i}`}
          role="tabpanel"
          aria-labelledby={`tab-btn-${uid}-${i}`}
          className={cn(styles.panel, active === i && styles.active)}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
