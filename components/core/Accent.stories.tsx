import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accent } from './Accent';

const meta = { title: 'Primitives/Accent', component: Accent, tags: ['autodocs'] } satisfies Meta<typeof Accent>;
export default meta;
type Story = StoryObj<typeof meta>;

export const InHeading: Story = {
  args: { children: 'Speakers' },
  render: (args) => (
    <h2 className="tedx-h2">
      Our <Accent {...args} />
    </h2>
  ),
};
