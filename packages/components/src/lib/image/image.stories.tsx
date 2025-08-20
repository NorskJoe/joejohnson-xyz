import type { Meta, StoryObj } from '@storybook/react-vite';
import Image from './image';
import { ImageProps } from './image.types';
import { ImageType } from '../shared/shared.types';

const meta: Meta<typeof Image> = {
  component: Image,
  title: 'Image',
  argTypes: {
    imageUrl: {
      control: 'text',
      description: 'URL of the image to display',
    },
    imageType: {
      control: {
        type: 'select',
        labels: {
          [ImageType.ROUND]: 'Round',
          [ImageType.LOGO]: 'Logo',
          [ImageType.SQUARE_ZOOM]: 'Square Zoom',
        },
      },
      options: [ImageType.ROUND, ImageType.LOGO, ImageType.SQUARE_ZOOM],
      description: 'Type of image to display',
    },
    altText: {
      control: 'text',
      description: 'Alternative text for the image',
    },
  },
  render: (args: ImageProps) => {
    return (
      <div style={{margin: '4em'}}>
        <Image {...args} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<ImageProps>;

export const Round: Story = {
  args: {
    imageUrl: 'https://placehold.jp/3d4070/ffffff/150x150.png',
    imageType: ImageType.ROUND,
    altText: 'rounder',
  } as ImageProps,
};

export const SquareZoom: Story = {
  args: {
    imageUrl: 'https://placehold.jp/3d4070/ffffff/150x150.png',
    imageType: ImageType.SQUARE_ZOOM,
    altText: 'zoomer',
  } as ImageProps,
};

export const Logo: Story = {
  args: {
    imageUrl: 'https://placehold.jp/3d4070/ffffff/150x150.png',
    imageType: ImageType.LOGO,
    altText: 'logo-er',
  } as ImageProps,
};
