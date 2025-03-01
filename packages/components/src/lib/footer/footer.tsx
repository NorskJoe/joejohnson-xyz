import { Link } from 'react-router-dom';
import { FooterProps } from './footer.types';
import styles from './footer.module.scss';

const Footer = ({ links }: FooterProps) => {
  return (
    <footer className={styles['footer']}>
      {links.map((item) => (
        <Link key={item.name} to={item.link} className={styles['footer-link']}>
          <img src={`icons/${item.name.toLowerCase()}.png`} alt={item.name} />
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
