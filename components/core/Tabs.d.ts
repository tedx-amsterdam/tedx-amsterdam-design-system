import React from "react";

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
export function Tabs(props: TabsProps): JSX.Element;
