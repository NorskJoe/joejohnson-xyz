import type { Meta, StoryObj } from 'storybook/internal/types';
import Footer from './footer';
import { FooterProps } from './footer.types';
import { Link } from '../shared/shared.types';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'Footer',
  argTypes: {
    links: {
      control: 'object',
      description: 'Array of links to display in the footer',
    },
  },
  render: (args: FooterProps) => {
    // Ensure the footer is at the bottom of the page 
    return (
      <div style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <BrowserRouter>
        <Footer {...args} />
      </BrowserRouter>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<FooterProps>;

export const Default: Story = {
  args: {
    links: [
      {
        name: 'About',
        link: '/about',
        imageUrl: 'https://placehold.jp/3d4070/ffffff/50x50.png',
      },
      {
        name: 'Contact',
        link: '/contact',
        imageUrl: 'https://placehold.jp/3d4070/ffffff/50x50.png',
      },
      {
        name: 'Privacy Policy',
        link: '/privacy-policy',
        imageUrl: 'https://placehold.jp/3d4070/ffffff/50x50.png',
      },
      {
        name: 'Terms of Service',
        link: '/terms-of-service',
        imageUrl: 'https://placehold.jp/3d4070/ffffff/50x50.png',
      },
    ] as Link[],
  } as FooterProps,
};
