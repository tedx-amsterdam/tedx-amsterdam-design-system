import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from '../components/core/Tabs.jsx';

const TABS = [
  { label: 'Alpha', content: <p>Alpha content</p> },
  { label: 'Beta',  content: <p>Beta content</p> },
  { label: 'Gamma', content: <p>Gamma content</p> },
];

describe('Tabs — uncontrolled', () => {
  it('shows first tab by default', () => {
    render(<Tabs tabs={TABS} />);
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('aria-selected', 'true');
  });

  it('switches tab on click', () => {
    render(<Tabs tabs={TABS} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Beta' }));
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute('aria-selected', 'true');
  });
});

describe('Tabs — controlled', () => {
  it('respects selectedIndex prop', () => {
    render(<Tabs tabs={TABS} selectedIndex={2} onTabChange={() => {}} />);
    expect(screen.getByRole('tab', { name: 'Gamma' })).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onTabChange with clicked index', () => {
    const onTabChange = vi.fn();
    render(<Tabs tabs={TABS} selectedIndex={0} onTabChange={onTabChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Beta' }));
    expect(onTabChange).toHaveBeenCalledWith(1);
  });

  it('does not change active tab when controlled and parent does not update selectedIndex', () => {
    const onTabChange = vi.fn();
    render(<Tabs tabs={TABS} selectedIndex={0} onTabChange={onTabChange} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Beta' }));
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute('aria-selected', 'true');
  });
});
