import { Link } from 'react-router-dom'

const navbarLinks = [
  {
    link: '/',
    name: 'Home',
  },
  {
    link: '/projects',
    name: 'Projects',
  },
  {
    link: '/experience',
    name: 'Experience',
  },
];

const Navbar = () => {
  return (
    <ul>
      {navbarLinks.map((link) => (
        <li key={link.link}>
          <Link to={link.link}>{link.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Navbar