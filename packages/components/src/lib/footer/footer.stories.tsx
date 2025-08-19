import type { Meta, StoryObj } from 'storybook/internal/types';
import { Footer } from './footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'Footer',
};
export default meta;
type Story = StoryObj<typeof Footer>;

export const Primary = {
  args: {},
};
