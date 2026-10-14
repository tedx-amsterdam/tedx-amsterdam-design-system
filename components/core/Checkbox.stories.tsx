import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, type CheckboxProps } from './Checkbox';

const meta = { title: 'Form/Checkbox', component: Checkbox, tags: ['autodocs'] } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

function ControlledCheckbox(props: Partial<CheckboxProps> & { label: React.ReactNode }) {
  const [checked, setChecked] = React.useState(false);
  return <Checkbox {...props} checked={checked} onChange={setChecked} />;
}

export const Basic: Story = {
  args: { label: 'Email me event updates', checked: false },
  render: (args) => <ControlledCheckbox label={args.label} />,
};
export const Disabled: Story = {
  args: { label: 'Unavailable option', checked: false, disabled: true },
  render: (args) => <ControlledCheckbox label={args.label} disabled />,
};
export const ConsentLine: Story = {
  args: { label: 'consent', checked: false },
  render: () => (
    <div style={{ maxWidth: 440 }}>
      <ControlledCheckbox
        label={
          <>
            I agree to the processing of my personal data for the purpose of receiving emails from TEDxAmsterdam, in accordance with
            the <a href="#privacy">Privacy Policy</a>.
          </>
        }
      />
    </div>
  ),
};

