import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta = { title: 'Primitives/Tag', component: Tag, tags: ['autodocs'] } satisfies Meta<typeof Tag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Red: Story = { args: { children: 'EVENT' } };
export const White: Story = { args: { children: 'PODCAST', color: 'white' } };
export const WithDot: Story = { args: { children: '12 JUNE 2026', dot: true } };
