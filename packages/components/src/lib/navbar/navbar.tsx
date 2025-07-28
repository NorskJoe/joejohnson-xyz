import { Link } from 'react-router-dom';
import { NavbarProps } from './navbar.types';
import styles from './navbar.module.scss';

const Navbar = ({ links }: NavbarProps) => {
  return (
    <ul className={styles['navbar-list']}>
      {links.map((link) => (
        <li key={link.link} className={styles['navbar-list-item']}>
          <Link to={link.link}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
