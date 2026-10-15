import React from 'react';
import { render, screen } from '@testing-library/react';
import { Accent } from '../components/core/Accent';

describe('Accent', () => {
  it('keeps the words part of the heading name', () => {
    render(<h2>Snapshots from <Accent color="white">our past events</Accent></h2>);
    expect(screen.getByRole('heading', { name: 'Snapshots from our past events' })).toBeInTheDocument();
  });
});
