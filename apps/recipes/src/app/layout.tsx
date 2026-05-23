import { NavbarProps } from '@components/navbar/navbar.types';
import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';
import './global.css';
import styles from './page.module.scss';
import { auth } from '@libs/auth';
import { SessionProvider } from 'next-auth/react';

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
  const session = await auth();

  return (
    <html lang="en">
      <body className={styles['body']}>
        <SessionProvider session={session}>
          <Navbar links={navbarLinks.links} />
          <div className="root-container">{children}</div>
          <Footer links={footerLinks} />
        </SessionProvider>
      </body>
    </html>
  );
}
