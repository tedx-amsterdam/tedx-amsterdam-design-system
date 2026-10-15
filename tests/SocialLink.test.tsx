import React from 'react';
import { render, screen } from '@testing-library/react';
import { SocialLink } from '../components/core/SocialLink';

describe('SocialLink', () => {
  it('is named by its label, with a decorative icon', () => {
    render(<SocialLink network="instagram" label="Instagram" href="https://instagram.com/tedxamsterdam" />);
    const link = screen.getByRole('link', { name: 'Instagram' });
    expect(link).toHaveAttribute('href', 'https://instagram.com/tedxamsterdam');
    expect(link.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('gives the icon explicit dimensions, so it is never unsized', () => {
    render(<SocialLink network="linkedin" label="LinkedIn" size="sm" />);
    const icon = screen.getByRole('link', { name: 'LinkedIn' }).querySelector('img');
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
  });
});
