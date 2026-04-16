import { NavbarProps } from '@components/navbar/navbar.types';
import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';
import './global.css';
import styles from './page.module.scss';

const navbarLinks = {
  links: [
    {
      link: '/',
      name: 'Home',
    },
    {
      link: '/recipes',
      name: 'Recipes',
    },
    {
      link: '/admin',
      name: 'Admin',
    },
  ],
} as NavbarProps;

const footerLinks = [
  {
    name: 'GitHub',
    link: 'https://github.com/NorskJoe',
    imageUrl: '/icons/github.png',
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/joseph-johnson-284510126/',
    imageUrl: '/icons/linkedin.png',
  },
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles['body']}>
        <Navbar links={navbarLinks.links} />
        <div className="root-container">{children}</div>
        <Footer links={footerLinks} />
      </body>
    </html>
  );
}
