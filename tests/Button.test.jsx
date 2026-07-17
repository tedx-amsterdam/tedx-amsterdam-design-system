import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/core/Button';

describe('Button', () => {
  it('renders children inside a button element', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders as an anchor when href is provided', () => {
    render(<Button href="/about">About</Button>);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });

  it('applies variant and size classes; state styling lives in CSS, not inline styles', () => {
    render(<Button variant="secondary" size="lg">Go</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('btn');
    expect(btn.className).toContain('secondary');
    expect(btn.className).toContain('lg');
    expect(btn.style.background).toBe('');
    expect(btn.style.transform).toBe('');
  });

  it('merges a consumer className', () => {
    render(<Button className="consumer">Go</Button>);
    expect(screen.getByRole('button').className).toContain('consumer');
  });

  it('fires onClick when enabled', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does NOT fire onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Nope</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('sets aria-disabled and the disabled class when disabled', () => {
    render(<Button disabled>Nope</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-disabled', 'true');
    expect(btn.className).toContain('disabled');
  });

  it('renders a disabled link without href so it is not navigable', () => {
    render(<Button href="/x" disabled>Link</Button>);
    const el = screen.getByText('Link').closest('a');
    expect(el).not.toHaveAttribute('href');
    expect(el).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders the arrow glyph as aria-hidden when arrow is set', () => {
    render(<Button arrow>Next</Button>);
    const arrow = screen.getByText('→');
    expect(arrow).toHaveAttribute('aria-hidden', 'true');
  });
});
