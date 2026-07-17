import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';
import { Input } from './Input';

const meta = { title: 'Form/FormField', component: FormField, tags: ['autodocs'] } satisfies Meta<typeof FormField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  args: { label: 'Your email', hint: 'We only use this for ticket updates.' },
  render: (args) => (
    <FormField {...args}>
      <Input label="Email" />
    </FormField>
  ),
};
export const WithErrorAndRequired: Story = {
  args: { label: 'Your email', error: 'Required field', required: true },
  render: (args) => (
    <FormField {...args}>
      <Input label="Email" />
    </FormField>
  ),
};
