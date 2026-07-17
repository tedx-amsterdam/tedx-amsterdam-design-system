import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta = { title: 'Content/Tabs', component: Tabs, tags: ['autodocs'] } satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    tabs: [
      { label: 'Program', content: 'Talks, performances, and breaks.' },
      { label: 'Speakers', content: 'Twelve speakers across four themes.' },
      { label: 'Venue', content: 'Royal Theatre Carré, Amsterdam.' },
    ],
  },
};
