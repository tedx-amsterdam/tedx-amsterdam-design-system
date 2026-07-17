import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowLink } from './ArrowLink';

const meta = { title: 'Primitives/ArrowLink', component: ArrowLink, tags: ['autodocs'] } satisfies Meta<typeof ArrowLink>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Red: Story = { args: { children: 'All talks', href: '#' } };
export const White: Story = { args: { children: 'Read the story', href: '#', color: 'white' } };
