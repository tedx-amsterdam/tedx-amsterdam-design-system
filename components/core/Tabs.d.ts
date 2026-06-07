import React from "react";

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  /** Initially active tab index. @default 0 */
  defaultIndex?: number;
  style?: React.CSSProperties;
}

/** Tabbed switcher. Active tab: red bottom border. Arrow keys navigate between tabs. */
export function Tabs(props: TabsProps): JSX.Element;
