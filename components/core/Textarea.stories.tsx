import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = { title: 'Form/Textarea', component: Textarea, tags: ['autodocs'] } satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { label: 'Message', placeholder: 'Tell us your idea…' } };
export const WithError: Story = { args: { label: 'Message', error: 'Message is too short' } };
