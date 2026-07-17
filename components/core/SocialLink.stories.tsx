import type { Meta, StoryObj } from '@storybook/react-vite';
import { SocialLink } from './SocialLink';

const meta = { title: 'Navigation/SocialLink', component: SocialLink, tags: ['autodocs'] } satisfies Meta<typeof SocialLink>;
export default meta;
type Story = StoryObj<typeof meta>;

export const LinkedIn: Story = { args: { network: 'linkedin', label: 'LinkedIn' } };
export const Instagram: Story = { args: { network: 'instagram', label: 'Instagram' } };
export const YouTube: Story = { args: { network: 'youtube', label: 'YouTube' } };
