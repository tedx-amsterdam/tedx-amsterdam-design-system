import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Agenda } from '../components/core/Agenda';

const items = [
  { time: '14:00', title: 'Doors open' },
  { time: '15:00', title: 'Talks start', description: 'The first five talks', label: 'No entry after start' },
];

describe('Agenda', () => {
  it('renders one list item per entry, in order', () => {
    render(<Agenda items={items} />);
    const rows = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveTextContent('Doors open');
  });

  it('uses h3 for titles by default and headingLevel when given', () => {
    const { rerender } = render(<Agenda items={items} />);
    expect(screen.getByRole('heading', { level: 3, name: 'Doors open' })).toBeInTheDocument();
    rerender(<Agenda items={items} headingLevel={4} />);
    expect(screen.getByRole('heading', { level: 4, name: 'Doors open' })).toBeInTheDocument();
  });

  it('renders description and label only when given', () => {
    render(<Agenda items={items} />);
    const [first, second] = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(first.querySelector('p')).toBeNull();
    expect(first).not.toHaveTextContent('No entry after start');
    expect(second).toHaveTextContent('The first five talks');
    expect(second).toHaveTextContent('No entry after start');
  });

  it('sets datetime for HH:MM times only', () => {
    render(<Agenda items={[{ time: '09:30', title: 'A' }, { time: '2pm', title: 'B' }]} />);
    expect(screen.getByText('09:30')).toHaveAttribute('datetime', '09:30');
    expect(screen.getByText('2pm')).not.toHaveAttribute('datetime');
  });

  it('reads a range as "14:00 to 15:00" when an end time is given', () => {
    render(<Agenda items={[{ time: '14:00', endTime: '15:00', title: 'Doors open' }, { time: '18:30', title: 'Afterparty' }]} />);
    const [first, second] = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(first).toHaveTextContent(/14:00\s*to\s*15:00/);
    expect(screen.getByText('15:00')).toHaveAttribute('datetime', '15:00');
    expect(second).not.toHaveTextContent(/to\s/);
  });

  it('shows the speakers of an item only when given', () => {
    render(<Agenda items={[{ time: '15:00', title: 'Talks start', speakers: 'Fieke Opdam, Joe Wilson' }, { time: '16:30', title: 'Break' }]} />);
    const [first, second] = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(first).toHaveTextContent('Fieke Opdam, Joe Wilson');
    expect(second.querySelector('p')).toBeNull();
  });

  it('renders duplicate entries without a key warning', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<Agenda items={[{ time: '14:00', title: 'Break' }, { time: '14:00', title: 'Break' }]} />);
    expect(within(screen.getByRole('list')).getAllByRole('listitem')).toHaveLength(2);
    expect(error).not.toHaveBeenCalled();
    error.mockRestore();
  });

  it('keeps its list role for Safari VoiceOver, which drops it with list-style none', () => {
    render(<Agenda items={items} />);
    expect(screen.getByRole('list')).toHaveAttribute('role', 'list');
  });

  it('renders an empty list without items', () => {
    render(<Agenda items={[]} />);
    expect(screen.getByRole('list')).toBeEmptyDOMElement();
  });
});
