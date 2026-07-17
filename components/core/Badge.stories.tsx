import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = { title: 'Primitives/Badge', component: Badge, tags: ['autodocs'] } satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Red: Story = { args: { label: 'New' } };
export const White: Story = { args: { label: 'Live', color: 'white' } };
export const MutedSmall: Story = { args: { label: 'Archive', color: 'muted', size: 'sm' } };
