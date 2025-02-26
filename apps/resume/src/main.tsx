import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { BrowserRouter, Outlet } from 'react-router-dom';
import Navbar from './layout/navbar/navbar';
import Footer from './layout/footer/footer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <App />
      <Outlet />
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
