import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = { title: 'Form/Input', component: Input, tags: ['autodocs'] } satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { label: 'Email', placeholder: 'you@example.com' } };
export const WithError: Story = { args: { label: 'Email', error: 'Enter a valid email address' } };
export const LightTone: Story = {
  args: { label: 'Email', tone: 'light' },
  globals: { backgrounds: { value: 'light' } },
};
