import { Link } from "react-router-dom"
import { FooterProps } from "./footer.types"



const Footer = ({links}: FooterProps) => {
  return (
    <footer>
      {links.map((item) => (
        <Link key={item.name} to={item.link}>
          <img src={`icons/${item.name.toLowerCase()}.png`} alt={item.name} />
        </Link>
      ))}
    </footer>
  )
}

export default Footer