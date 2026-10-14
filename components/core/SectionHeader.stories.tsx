import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accent } from './Accent';
import { SectionHeader } from './SectionHeader';

const meta = { title: 'Content/SectionHeader', component: SectionHeader, tags: ['autodocs'] } satisfies Meta<typeof SectionHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    eyebrow: 'Talks',
    title: <>Ideas worth <Accent>spreading</Accent></>,
    description: 'Watch every talk from our latest edition.',
    link: 'All talks',
    linkHref: '#',
  },
};
export const Centered: Story = { args: { title: <>Our <Accent>partners</Accent></>, align: 'center' } };
