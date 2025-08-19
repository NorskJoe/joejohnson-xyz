import type { Meta, StoryObj } from 'storybook/internal/types';
import { Tag } from './tag';

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: 'Tag',
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Primary = {
  args: {},
};
