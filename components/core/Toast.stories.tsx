import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';

const meta = { title: 'Feedback/Toast', component: Toast, tags: ['autodocs'] } satisfies Meta<typeof Toast>;
export default meta;
type Story = StoryObj<typeof meta>;

// duration: 0 keeps toasts on screen for inspection.
export const Info: Story = { args: { message: 'Schedule updated.', duration: 0 } };
export const Success: Story = { args: { message: 'Your seat is reserved.', type: 'success', duration: 0 } };
export const ErrorToast: Story = { args: { message: 'Payment failed.', type: 'error', duration: 0 } };
export const Warning: Story = { args: { message: 'Only 4 seats left.', type: 'warning', duration: 0 } };
