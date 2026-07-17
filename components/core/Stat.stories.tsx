import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stat } from './Stat';

const meta = { title: 'Content/Stat', component: Stat, tags: ['autodocs'] } satisfies Meta<typeof Stat>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = { args: { value: '2009', label: 'Founded in Amsterdam' } };
export const ExtraLarge: Story = { args: { value: '20K', label: 'Attendees to date', size: 'xl' } };
export const Medium: Story = { args: { value: '350+', label: 'Talks published', size: 'md' } };
