
import { FooterProps } from './footer.types';
import styles from './footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Footer = ({ links }: FooterProps) => {
  return (
    <footer className={styles['footer']}>
      {links.map((item) => (
        <Link key={item.name} href={item.link} className={styles['footer-link']}>
          <Image src={item.imageUrl ?? ''} alt={item.name} width={30} height={30}/>
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
