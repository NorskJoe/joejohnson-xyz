import { render } from '@testing-library/react';
import Footer from './footer';
import { FooterProps } from './footer.types';
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
} as FooterProps;

describe('footer component', () => {
  it('should render', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Footer links={mockProps.links} />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
