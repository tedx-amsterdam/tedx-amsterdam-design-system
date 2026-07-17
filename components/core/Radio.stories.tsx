import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta = { title: 'Form/Radio', component: Radio, tags: ['autodocs'] } satisfies Meta<typeof Radio>;
export default meta;
type Story = StoryObj<typeof meta>;

const OPTIONS = [
  { value: 'inperson', label: 'In person' },
  { value: 'online', label: 'Online stream' },
];

function Demo() {
  const [value, setValue] = React.useState('inperson');
  return <Radio name="attendance" legend="How will you attend?" options={OPTIONS} value={value} onChange={setValue} />;
}

export const Basic: Story = {
  args: { name: 'attendance', options: OPTIONS },
  render: () => <Demo />,
};
