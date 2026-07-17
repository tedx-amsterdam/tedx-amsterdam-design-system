import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '../components/core/Accordion';

const ITEMS = [
  { q: 'What is TEDx?', a: 'Independently organised TED events.' },
  { q: 'When is the event?', a: 'June 2026.' },
];

describe('Accordion', () => {
  it('opens the defaultOpen item and closes others', () => {
    render(<Accordion items={ITEMS} defaultOpen={0} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
  });

  it('clicking a closed item opens it and closes the previous one', () => {
    render(<Accordion items={ITEMS} defaultOpen={0} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });

  it('clicking an open item closes it', () => {
    render(<Accordion items={ITEMS} defaultOpen={0} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
  });

  it('wires aria-controls to a panel labelled by the button', () => {
    render(<Accordion items={ITEMS} defaultOpen={0} />);
    const btn = screen.getAllByRole('button')[0];
    const panelId = btn.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    expect(panel).not.toBeNull();
    expect(panel).toHaveAttribute('aria-labelledby', btn.id);
  });

  it('two accordions on one page produce no duplicate ids', () => {
    render(
      <>
        <Accordion items={ITEMS} />
        <Accordion items={ITEMS} />
      </>
    );
    const ids = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has no axe violations', async () => {
    const { container } = render(<Accordion items={ITEMS} defaultOpen={0} />);
    expect(await global.axe(container)).toHaveNoViolations();
  });
});
