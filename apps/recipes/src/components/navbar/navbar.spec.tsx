import { render } from '@testing-library/react';
import Navbar from './navbar';
import { NavbarProps } from './navbar.types';
import { BrowserRouter } from 'react-router-dom';

const mockProps = {
  links: [
    {
      name: 'link one',
      link: '/link-one',
    },
    {
      name: 'link two',
      link: '/link-two',
    },
  ],
} as NavbarProps;

describe('footer component', () => {
  it('should render', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Navbar links={mockProps.links} />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
