import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';

const meta = { title: 'Form/RadioGroup', component: RadioGroup, tags: ['autodocs'] } satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  const [value, setValue] = React.useState('standard');
  return (
    <RadioGroup name="ticket" legend="Ticket type" value={value} onChange={setValue}>
      <RadioGroup.Option value="standard" label="Standard" />
      <RadioGroup.Option value="plus" label="Plus" />
      <RadioGroup.Option value="patron" label="Patron" />
    </RadioGroup>
  );
}

export const Basic: Story = {
  args: { name: 'ticket', value: 'standard', onChange: () => {}, children: null },
  render: () => <Demo />,
};
