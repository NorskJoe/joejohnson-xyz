import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { BrowserRouter, Outlet } from 'react-router-dom';
import { Footer, Navbar } from '@joejohnson-xyz/components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const navbarLinks = [
  {
    link: '/',
    name: 'Home',
  },
  {
    link: '/projects',
    name: 'Projects',
  },
  {
    link: '/experience',
    name: 'Experience',
  },
];

const footerLinks = [
  {
    name: 'GitHub',
    link: 'https://github.com/NorskJoe',
    imageUrl: 'icons/github.png',
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/joseph-johnson-284510126/',
    imagUrl: 'icons/linkedin.png',
  },
];

root.render(
  <StrictMode>
    <BrowserRouter>
      <Navbar links={navbarLinks} />
      <App />
      <Outlet />
      <Footer links={footerLinks} />
    </BrowserRouter>
  </StrictMode>
);
