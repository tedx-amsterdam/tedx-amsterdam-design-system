import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationBar } from '../components/core/NavigationBar';

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/speakers', label: 'Speakers' },
];

describe('NavigationBar — skip link', () => {
  it('renders a skip-to-main-content link', () => {
    render(<NavigationBar links={LINKS} />);
    const skip = screen.getByRole('link', { name: /skip to main content/i });
    expect(skip).toBeInTheDocument();
    expect(skip).toHaveAttribute('href', '#main-content');
  });

  it('accepts a custom skipTarget', () => {
    render(<NavigationBar links={LINKS} skipTarget="#content" />);
    expect(screen.getByRole('link', { name: /skip to main content/i }))
      .toHaveAttribute('href', '#content');
  });
});

describe('NavigationBar — SSR-safe responsive', () => {
  it('renders nav links without window.innerWidth', () => {
    const original = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { value: undefined, writable: true, configurable: true });

    render(<NavigationBar links={LINKS} />);
    expect(screen.getAllByRole('link', { name: 'About' }).length).toBeGreaterThan(0);

    Object.defineProperty(window, 'innerWidth', { value: original, writable: true, configurable: true });
  });

  it('renders hamburger button without window.innerWidth', () => {
    const original = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { value: undefined, writable: true, configurable: true });

    render(<NavigationBar links={LINKS} />);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();

    Object.defineProperty(window, 'innerWidth', { value: original, writable: true, configurable: true });
  });
});

describe('NavigationBar — hamburger toggle', () => {
  it('toggles aria-expanded on click', () => {
    render(<NavigationBar links={LINKS} />);
    const btn = screen.getByRole('button', { name: /open menu/i });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes menu on Escape', () => {
    render(<NavigationBar links={LINKS} />);
    const btn = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(btn);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });
});
