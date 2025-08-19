import type { Meta, StoryObj } from 'storybook/internal/types';
import { ContentTile } from './content-tile';

const meta: Meta<typeof ContentTile> = {
  component: ContentTile,
  title: 'ContentTile',
};
export default meta;
type Story = StoryObj<typeof ContentTile>;

export const Primary = {
  args: {},
};
