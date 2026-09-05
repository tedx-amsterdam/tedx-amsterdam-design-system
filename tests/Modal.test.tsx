import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../components/core/Modal';

describe('Modal', () => {
  it('renders through a portal into document.body, not the render container', () => {
    const { container } = render(
      <Modal isOpen onClose={() => {}} title="Portal test">Body</Modal>
    );
    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
  });

  it('labels the dialog with the title via aria-labelledby', () => {
    render(<Modal isOpen onClose={() => {}} title="My title">Body</Modal>);
    const dialog = screen.getByRole('dialog');
    const labelledBy = dialog.getAttribute('aria-labelledby')!;
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy)).toHaveTextContent('My title');
  });

  it('moves focus to the first focusable element on open', () => {
    render(
      <Modal isOpen onClose={() => {}} title="Focus">
        <button>Inside</button>
      </Modal>
    );
    // First focusable in DOM order is the × close button in the header
    expect(document.activeElement).toHaveAttribute('aria-label', 'Close dialog');
  });

  it('calls onClose on Escape', () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} title="Esc">Body</Modal>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on overlay click but not on dialog click', () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} title="Click">Body</Modal>);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('dialog').parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('restores focus to the previously focused element on close', () => {
    function Harness() {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Trigger</button>
          <Modal isOpen={open} onClose={() => setOpen(false)} title="Restore">
            <button onClick={() => setOpen(false)}>Close from inside</button>
          </Modal>
        </>
      );
    }
    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    trigger.focus();
    fireEvent.click(trigger);
    expect(document.activeElement).not.toBe(trigger);
    fireEvent.click(screen.getByRole('button', { name: 'Close from inside' }));
    expect(document.activeElement).toBe(trigger);
  });

  it('locks body scroll while open and restores it after close', () => {
    const { rerender } = render(<Modal isOpen onClose={() => {}} title="Scroll">B</Modal>);
    expect(document.body.style.overflow).toBe('hidden');
    rerender(<Modal isOpen={false} onClose={() => {}} title="Scroll">B</Modal>);
    expect(document.body.style.overflow).toBe('');
  });

  it('merges a consumer className onto the dialog', () => {
    render(<Modal isOpen onClose={() => {}} title="C" className="consumer">B</Modal>);
    expect(screen.getByRole('dialog').className).toContain('consumer');
  });

  it('has no axe violations', async () => {
    render(<Modal isOpen onClose={() => {}} title="Accessible">Body</Modal>);
    const overlay = screen.getByRole('dialog').parentElement;
    expect(await globalThis.axe(overlay)).toHaveNoViolations();
  });
});
