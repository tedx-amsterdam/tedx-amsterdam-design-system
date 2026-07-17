import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';

const meta = { title: 'Navigation/Breadcrumb', component: Breadcrumb, tags: ['autodocs'] } satisfies Meta<typeof Breadcrumb>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Talks', href: '/talks' },
      { label: 'The power of quiet' },
    ],
  },
};
