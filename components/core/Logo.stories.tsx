import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta = { title: 'Primitives/Logo', component: Logo, tags: ['autodocs'] } satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const LightOnDark: Story = {};
export const DarkOnLight: Story = {
  args: { tone: 'dark-on-light' },
  globals: { backgrounds: { value: 'light' } },
};
export const AsLink: Story = { args: { href: '/' } };
