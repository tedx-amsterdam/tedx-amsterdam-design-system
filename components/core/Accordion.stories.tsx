import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const meta = { title: 'Content/Accordion', component: Accordion, tags: ['autodocs'] } satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FAQ: Story = {
  args: {
    items: [
      { q: 'What is TEDxAmsterdam?', a: 'An independently organised TED event in Amsterdam.' },
      { q: 'When is the next edition?', a: 'June 2026, at the Royal Theatre Carré.' },
      { q: 'How do I get tickets?', a: 'Registration opens three months before the event.' },
    ],
  },
};
export const AllClosed: Story = { args: { ...FAQ.args, defaultOpen: -1 } };
