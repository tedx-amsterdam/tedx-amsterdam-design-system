import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, type SelectProps } from './Select';

const meta = { title: 'Form/Select', component: Select, tags: ['autodocs'] } satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

const CITIES = [
  { value: 'ams', label: 'Amsterdam' },
  { value: 'rtm', label: 'Rotterdam' },
  { value: 'utr', label: 'Utrecht' },
];

function ControlledSelect(props: Partial<SelectProps>) {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  return <Select label="City" options={CITIES} {...props} value={value} onChange={setValue} />;
}

export const Basic: Story = {
  args: { label: 'City', options: CITIES },
  render: () => <ControlledSelect />,
};
export const WithError: Story = {
  args: { label: 'City', options: CITIES, error: 'Choose a city' },
  render: (args) => <ControlledSelect error={args.error} />,
};
export const Disabled: Story = {
  args: { label: 'City', options: CITIES, disabled: true },
  render: (args) => <ControlledSelect disabled={args.disabled} />,
};
