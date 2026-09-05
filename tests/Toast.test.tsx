import React from 'react';
import { render, screen } from '@testing-library/react';
import { Toast } from '../components/core/Toast';

describe('Toast', () => {
  it('has aria-atomic="true" on the live region', () => {
    render(<Toast message="Saved!" type="info" duration={0} />);
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-atomic', 'true');
  });

  it('uses role="status" and aria-live="polite" for info type', () => {
    render(<Toast message="Info" type="info" duration={0} />);
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
  });

  it('uses role="alert" and aria-live="assertive" for error type', () => {
    render(<Toast message="Error" type="error" duration={0} />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('aria-live', 'assertive');
    expect(toast).toHaveAttribute('aria-atomic', 'true');
  });

  it('uses role="alert" for warning type', () => {
    render(<Toast message="Warning" type="warning" duration={0} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="status" for success type', () => {
    render(<Toast message="Done" type="success" duration={0} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders the message text', () => {
    render(<Toast message="File saved" duration={0} />);
    expect(screen.getByText('File saved')).toBeInTheDocument();
  });
});
