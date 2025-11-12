import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';
import './global.css';

const navbarLinks = [
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
];

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar links={navbarLinks} />
        <div className="root-container">{children}</div>
        <Footer links={footerLinks} />
      </body>
    </html>
  );
}
