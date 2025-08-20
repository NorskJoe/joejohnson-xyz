import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { BrowserRouter, Outlet } from 'react-router-dom';
import { Footer, Navbar } from '@joejohnson-xyz/components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Navbar links={[]} />
      <App />
      <Outlet />
      <Footer links={[]} />
    </BrowserRouter>
  </StrictMode>
);
