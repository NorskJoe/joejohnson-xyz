import type { Meta, StoryObj } from '@storybook/react-vite';
import ContentTile from './content-tile';
import { ContentTileProps } from './content-tiles.types';
import { ImageType } from '../shared/shared.types';
import { TagProps } from '../tag/tag.types';

const meta: Meta<typeof ContentTile> = {
  component: ContentTile,
  title: 'ContentTile',
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title of the content tile',
      defaultValue: 'Content Tile Title',
    },
    imageUrl: {
      control: 'text',
      description: 'URL of the image to display in the content tile',
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
      defaultValue: ImageType.ROUND,
      description: 'Type of image to display',
    },
    subTitle: {
      control: 'text',
      description: 'Subtitle for the content tile',
    },
    bodyText: {
      control: 'text',
      description: 'Main body text of the content tile',
    },
    ctaUrl: {
      control: 'text',
      description: 'URL for the call-to-action button',
    },
    summary: {
      control: 'text',
      description: 'Summary text for the content tile',
    },
  },
};

export default meta;
type Story = StoryObj<ContentTileProps>;

export const RoundImage: Story = {
  args: {
    bodyText:
      'This is the body text of the content tile. It provides additional information about the content.',
    ctaUrl: 'https://joejohnson.xyz',
    imageType: ImageType.ROUND,
    imageUrl: 'https://placehold.jp/3d4070/ffffff/150x150.png',
    subTitle: 'Subtitle Example',
    summary:
      'This is a summary of the content tile. It gives a brief overview of what the content is about.',
    tags: [
      { name: 'Tag1', size: 'small' },
      { name: 'Tag2', size: 'small' },
    ] as TagProps[],
    title: 'Content Tile Example',
  } as ContentTileProps,
};

export const SquareImage: Story = {
  args: {
    bodyText:
      'This is the body text of the content tile. It provides additional information about the content.',
    ctaUrl: 'https://joejohnson.xyz',
    imageType: ImageType.SQUARE_ZOOM,
    imageUrl: 'https://placehold.jp/160x80.png',
    subTitle: 'Subtitle Example',
    summary:
      'This is a summary of the content tile. It gives a brief overview of what the content is about.',
    tags: [
      { name: 'Tag1', size: 'small' },
      { name: 'Tag2', size: 'small' },
    ] as TagProps[],
    title: 'Content Tile Example',
  } as ContentTileProps,
};

export const LogoImage: Story = {
  args: {
    bodyText:
      'This is the body text of the content tile. It provides additional information about the content.',
    ctaUrl: 'https://joejohnson.xyz',
    imageType: ImageType.LOGO,
    imageUrl: 'https://placehold.jp/100x50.png',
    subTitle: 'Subtitle Example',
    summary:
      'This is a summary of the content tile. It gives a brief overview of what the content is about.',
    tags: [
      { name: 'Tag1', size: 'small' },
      { name: 'Tag2', size: 'small' },
    ] as TagProps[],
    title: 'Content Tile Example',
  } as ContentTileProps,
};

export const Minimal: Story = {
  args: {
    bodyText:
      'This is the body text of the content tile. It provides additional information about the content.',
    title: 'Content Tile Example',
  } as ContentTileProps,
};
