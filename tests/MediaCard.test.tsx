import React from 'react';
import { render, screen } from '@testing-library/react';
import { MediaCard } from '../components/core/MediaCard';

describe('MediaCard', () => {
  it('renders the image as a lazy <img> with its alt text', () => {
    render(<MediaCard title="Talk" image="/photo.jpg" imageAlt="Speaker on stage" />);
    const img = screen.getByRole('img', { name: 'Speaker on stage' });
    expect(img).toHaveAttribute('src', '/photo.jpg');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('treats the image as decorative by default', () => {
    const { container } = render(<MediaCard title="Talk" image="/photo.jpg" />);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('renders no image without one, leaving the gradient fallback', () => {
    const { container } = render(<MediaCard title="Talk" />);
    expect(container.querySelector('img')).toBeNull();
  });

  it('shows the category as a badge and the date as a meta line', () => {
    render(<MediaCard title="Talk" category="News" date="24 June" />);
    expect(screen.getByText('News')).toHaveClass('badge');
    expect(screen.getByText('24 June')).toHaveClass('meta');
  });
});
