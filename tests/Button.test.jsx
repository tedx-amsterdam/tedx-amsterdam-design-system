import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/core/Button.jsx';

describe('Button', () => {
  it('renders children inside a button element', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders as an anchor when href is provided', () => {
    render(<Button href="/about">About</Button>);
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('applies hover background via React state — not direct DOM mutation', () => {
    render(<Button variant="primary">Hover</Button>);
    const btn = screen.getByRole('button');

    // Track whether style was set via React (style prop) vs direct mutation
    const styleSetSpy = jest.spyOn(btn.style, 'setProperty');

    fireEvent.mouseEnter(btn);
    // React drives the style object — direct .style.setProperty must NOT be called
    expect(styleSetSpy).not.toHaveBeenCalled();
    // Background should now be the hover value (set via style prop by React)
    expect(btn.style.background).toBe('var(--accent-hover)');

    fireEvent.mouseLeave(btn);
    expect(btn.style.background).toBe('var(--tedx-red)');
  });

  it('applies press scale via React state', () => {
    render(<Button>Press</Button>);
    const btn = screen.getByRole('button');

    fireEvent.mouseDown(btn);
    expect(btn.style.transform).toBe('scale(0.97)');

    fireEvent.mouseUp(btn);
    expect(btn.style.transform).toBe('scale(1)');
  });

  it('does not change background on hover when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button');
    const bgBefore = btn.style.background;

    fireEvent.mouseEnter(btn);
    expect(btn.style.background).toBe(bgBefore);
  });

  it('does not apply press scale when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button');

    fireEvent.mouseDown(btn);
    expect(btn.style.transform).toBe('scale(1)');
  });

  it('resets press state on mouseleave without mouseup', () => {
    render(<Button>Test</Button>);
    const btn = screen.getByRole('button');

    fireEvent.mouseDown(btn);
    expect(btn.style.transform).toBe('scale(0.97)');

    fireEvent.mouseLeave(btn);
    expect(btn.style.transform).toBe('scale(1)');
  });

  it('secondary variant shows correct hover background', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole('button');

    fireEvent.mouseEnter(btn);
    // jsdom normalises #eaeaea -> rgb(234, 234, 234)
    expect(btn.style.background).toBe('rgb(234, 234, 234)');
  });

  it('ghost variant shows correct hover background', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole('button');

    fireEvent.mouseEnter(btn);
    // jsdom normalises rgba(255,255,255,0.08) -> rgba(255, 255, 255, 0.08)
    expect(btn.style.background).toBe('rgba(255, 255, 255, 0.08)');
  });
});
