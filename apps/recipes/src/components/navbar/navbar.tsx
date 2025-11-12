import { NavbarProps } from './navbar.types';
import styles from './navbar.module.scss';
import Link from 'next/link';

const Navbar = ({ links }: NavbarProps) => {
  return (
    <header className={styles['navbar-list']}>
      {links.map((link) => (
        <Link
          key={link.link}
          href={link.link}
          className={styles['navbar-list-item']}
        >
          {link.name}
        </Link>
      ))}
    </header>
  );
};

export default Navbar;
