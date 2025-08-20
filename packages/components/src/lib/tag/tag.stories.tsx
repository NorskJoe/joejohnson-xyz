import type { Meta, StoryObj } from '@storybook/react-vite';
import Tag from './tag';
import { TagProps } from './tag.types';

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: 'Tag',
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the tag to display',
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
  },
  render: (args: TagProps) => (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#252525',
        color: 'white',
        width: '15rem',
        padding: '1rem',
      }}
    >
      <Tag {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<TagProps>;

export const Small: Story = {
  args: {
    name: 'Small Tag',
    size: 'small',
  } as TagProps,
};

export const Medium: Story = {
  args: {
    name: 'Medium Tag',
    size: 'medium',
  } as TagProps,
};

export const Large: Story = {
  args: {
    name: 'Large Tag',
    size: 'large',
  } as TagProps,
};
