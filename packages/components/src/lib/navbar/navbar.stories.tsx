import type { Meta, StoryObj } from 'storybook/internal/types';
import Navbar from './navbar';

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  title: 'Navbar',
};
export default meta;
type Story = StoryObj<typeof Navbar>;

export const Primary = {
  args: {},
};
