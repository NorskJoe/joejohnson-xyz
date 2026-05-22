'use client';

import { NavbarProps } from './navbar.types';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './navbar.module.scss';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const cx = classNames.bind(styles);

const Navbar = ({ links }: NavbarProps) => {
  const path = usePathname();

  const activeLink = links.findIndex((link) => link.link === path);
  const [activeIndex, setActiveIndex] = useState<number>(
    activeLink !== -1 ? activeLink : 0
  );

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <header className={styles['navbar-list']}>
      {links.map((link, i) => (
        <Link
          key={link.link}
          href={link.link}
          className={cx(
            styles['navbar-link'],
            i === activeIndex && styles['active']
          )}
          onClick={() => handleClick(i)}
        >
          {link.name}
        </Link>
      ))}
    </header>
  );
};

export default Navbar;
