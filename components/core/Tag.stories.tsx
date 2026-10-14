import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta = { title: 'Primitives/Tag', component: Tag, tags: ['autodocs'] } satisfies Meta<typeof Tag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Eyebrow: Story = { args: { children: 'About speakers' } };
export const Red: Story = { args: { children: 'Event', color: 'red' } };
export const MetaLine: Story = { args: { children: '12 June', dot: true } };
