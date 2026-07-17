import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxGroup } from './CheckboxGroup';
import { Checkbox } from './Checkbox';

const meta = { title: 'Form/CheckboxGroup', component: CheckboxGroup, tags: ['autodocs'] } satisfies Meta<typeof CheckboxGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  const [topics, setTopics] = React.useState<Record<string, boolean>>({});
  const toggle = (key: string) => (v: boolean) => setTopics((t) => ({ ...t, [key]: v }));
  return (
    <CheckboxGroup legend="Topics you follow">
      <Checkbox label="Design" checked={!!topics.design} onChange={toggle('design')} />
      <Checkbox label="Science" checked={!!topics.science} onChange={toggle('science')} />
      <Checkbox label="Society" checked={!!topics.society} onChange={toggle('society')} />
    </CheckboxGroup>
  );
}

export const Basic: Story = {
  args: { legend: 'Topics you follow', children: null },
  render: () => <Demo />,
};
