import type { Meta, StoryObj } from 'storybook/internal/types';
import Image from './image';

const meta: Meta<typeof Image> = {
  component: Image,
  title: 'Image',
};
export default meta;
type Story = StoryObj<typeof Image>;

export const Primary = {
  args: {},
};
