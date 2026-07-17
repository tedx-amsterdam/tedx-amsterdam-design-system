import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { children: 'Get tickets' } };
export const Secondary: Story = { args: { children: 'Learn more', variant: 'secondary' } };
export const Ghost: Story = { args: { children: 'Watch talks', variant: 'ghost' } };
export const WithArrow: Story = { args: { children: 'Explore program', arrow: true } };
export const Disabled: Story = { args: { children: 'Sold out', disabled: true } };
export const AsLink: Story = { args: { children: 'Visit TED.com', href: 'https://ted.com' } };
