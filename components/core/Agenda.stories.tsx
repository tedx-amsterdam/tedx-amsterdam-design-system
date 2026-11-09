import type { Meta, StoryObj } from '@storybook/react-vite';
import { Agenda } from './Agenda';

const meta = { title: 'Primitives/Agenda', component: Agenda, tags: ['autodocs'] } satisfies Meta<typeof Agenda>;
export default meta;
type Story = StoryObj<typeof meta>;

const mainEvent = [
  { time: '14:00', endTime: '15:00', title: 'Doors open' },
  { time: '15:00', endTime: '16:30', title: 'Talks start', speakers: 'Amira Haddad, Jonas de Vries, Mei Lin Tan', label: 'No entry after start' },
  { time: '16:30', endTime: '17:00', title: 'Break' },
  { time: '17:00', endTime: '18:30', title: 'Talks resume', speakers: 'Sofia Ruiz, Daan Bakker', label: 'No entry after start' },
  { time: '18:30', title: 'Afterparty' },
];

export const MainEvent: Story = { args: { items: mainEvent } };

export const Salon: Story = {
  args: {
    items: [
      { time: '19:00', title: 'Walk-in', description: 'Walk-in and drinks' },
      { time: '19:30', title: 'Conversation', description: 'Talks and a moderated conversation' },
      { time: '21:00', title: 'Drinks', description: 'Drinks with the speakers' },
    ],
  },
};

export const WithoutLabels: Story = {
  args: { items: mainEvent.map(({ time, title }) => ({ time, title })) },
};
