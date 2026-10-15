import type { Meta, StoryObj } from '@storybook/react-vite';
import { MediaCard } from './MediaCard';

const meta = { title: 'Content/MediaCard', component: MediaCard, tags: ['autodocs'] } satisfies Meta<typeof MediaCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    image: 'assets/sample-image.svg',
    category: 'News',
    title: 'Speaker line-up announced',
    description: 'Meet the twelve voices taking the stage this June.',
    date: '12 June',
    style: { maxWidth: 360 },
  },
};

export const GradientFallback: Story = {
  args: {
    category: 'Podcast',
    title: 'Speaker line-up announced',
    description: 'Meet the twelve voices taking the stage this June.',
    date: '12 June',
    style: { maxWidth: 360 },
  },
};
