import React from 'react';
import { render } from '@testing-library/react';
import fs from 'node:fs';
import path from 'node:path';
import { Logo } from '../components/core';
import {
  TEDX_DISCLAIMER,
  TEDX_ABOUT_TEDX,
  TEDX_ABOUT_TED,
  TEDX_HOMEPAGE_DESCRIPTION,
} from '../components/core';

/* ============================================================
   TEDx Brand Guidelines — Compliance Tests
   Validates that design tokens and components conform to the
   TEDx Organizer Guide requirements.
   ============================================================ */

// --------------- helpers ---------------

function readCSSFile(name: string): string {
  return fs.readFileSync(path.resolve(__dirname, '..', 'tokens', name), 'utf8');
}

// --------------- Token compliance ---------------

describe('TEDx token compliance', () => {
  const colorCSS = readCSSFile('colors.css');
  const fontCSS = readCSSFile('fonts.css');

  it('--tedx-red is TED Red (#eb0028, Pantone 185)', () => {
    expect(colorCSS).toMatch(/--tedx-red:\s*#eb0028/);
  });

  it('--font-sans contains Helvetica', () => {
    expect(fontCSS).toMatch(/--font-sans:.*Helvetica/);
  });

  it('--font-display contains Helvetica', () => {
    expect(fontCSS).toMatch(/--font-display:.*Helvetica/);
  });

  it('logo background tokens are limited to solid black and white', () => {
    // --tedx-black must be pure black, --tedx-white must be pure white
    expect(colorCSS).toMatch(/--tedx-black:\s*#000000/);
    expect(colorCSS).toMatch(/--tedx-white:\s*#ffffff/);
  });
});

// --------------- Logo component ---------------

describe('TEDx Logo component', () => {
  it('renders an <img> with alt text containing "TEDx"', () => {
    const { container } = render(<Logo />);
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img!.alt).toContain('TEDx');
  });

  it('tone="light-on-dark" renders the white variant', () => {
    const { container } = render(<Logo tone="light-on-dark" />);
    const img = container.querySelector('img')!;
    expect(img.src).toContain('white');
  });

  it('tone="dark-on-light" renders the standard variant', () => {
    const { container } = render(<Logo tone="dark-on-light" />);
    const img = container.querySelector('img')!;
    expect(img.src).toContain('logo-tedxamsterdam.svg');
  });

  it('wrapper has no own background-color style', () => {
    const { container } = render(<Logo />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.backgroundColor).toBe('');
  });
});

// --------------- Required content constants ---------------

describe('TEDx required content constants', () => {
  it('TEDX_DISCLAIMER exists and contains the required text', () => {
    expect(TEDX_DISCLAIMER).toBe(
      'This independent TEDx event is operated under license from TED.',
    );
  });

  it('TEDX_ABOUT_TEDX contains key phrases', () => {
    expect(TEDX_ABOUT_TEDX).toContain('ideas worth spreading');
    expect(TEDX_ABOUT_TEDX).toContain('TEDx is a program of local, self-organized events');
    expect(TEDX_ABOUT_TEDX).toContain('x = independently organized TED event');
  });

  it('TEDX_ABOUT_TED contains key phrases', () => {
    expect(TEDX_ABOUT_TED).toContain('TED is a nonprofit');
    expect(TEDX_ABOUT_TED).toContain('ideas');
    expect(TEDX_ABOUT_TED).toContain('curiosity, reason, wonder');
  });

  it('TEDX_HOMEPAGE_DESCRIPTION uses [name] placeholder', () => {
    expect(TEDX_HOMEPAGE_DESCRIPTION).toContain('[name]');
    expect(TEDX_HOMEPAGE_DESCRIPTION).toContain('self-organized event');
    expect(TEDX_HOMEPAGE_DESCRIPTION).toContain('TED-like experience');
  });
});
