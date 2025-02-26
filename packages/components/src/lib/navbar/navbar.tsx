import { Link } from 'react-router-dom'
import { NavbarProps } from './navbar.types';

const Navbar = ({links}: NavbarProps) => {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.link}>
          <Link to={link.link}>{link.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Navbar