import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavigationBar } from './NavigationBar';

const meta = {
  title: 'Navigation/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof NavigationBar>;
export default meta;
type Story = StoryObj<typeof meta>;

const LINKS = [
  { label: 'Talks', href: '/talks' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
];

export const Basic: Story = {
  args: { links: LINKS, ctaLabel: 'Get tickets', ctaHref: '/tickets', activePath: '/talks' },
};
