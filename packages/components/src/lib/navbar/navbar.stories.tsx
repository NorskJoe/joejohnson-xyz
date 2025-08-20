import type { Meta, StoryObj } from '@storybook/react-vite';
import Navbar from './navbar';
import { NavbarProps } from './navbar.types';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  title: 'Navbar',
  argTypes: {
    links: {
      control: 'object',
      description: 'Array of links to display in the navbar',
    },
  },
  render: (args: NavbarProps) => {
    return (
      <BrowserRouter>
        <Navbar {...args} />
      </BrowserRouter>
    );
  },
};

export default meta;
type Story = StoryObj<NavbarProps>;

export const Default: Story = {
  args: {
    links: [
      { name: 'Home', link: '/' },
      { name: 'About', link: '/about' },
      { name: 'Contact', link: '/contact' },
    ],
  },
};
