import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal, type ModalProps } from './Modal';
import { Button } from './Button';

const meta = { title: 'Feedback/Modal', component: Modal, tags: ['autodocs'] } satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<typeof meta>;

function ModalDemo(props: Partial<ModalProps>) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal
        title="Reserve your seat"
        {...props}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        Registration for TEDxAmsterdam 2026 opens soon. Close with Escape,
        the × button, or by clicking the overlay — focus returns to the trigger.
      </Modal>
    </>
  );
}

export const Basic: Story = {
  args: { isOpen: false, onClose: () => {}, title: 'Reserve your seat' },
  render: () => <ModalDemo />,
};
export const Small: Story = {
  args: { ...Basic.args, size: 'sm' },
  render: () => <ModalDemo size="sm" />,
};
