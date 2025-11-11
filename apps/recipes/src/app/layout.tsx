import Footer from '../components/footer/footer';
import './global.css';

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
        <header>My header</header>
        {children}
        <Footer links={footerLinks} />
      </body>
    </html>
  );
}
