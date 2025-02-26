import { Link } from "react-router-dom"

const data = [
  {
    name: "GitHub",
    link: 'https://github.com/NorskJoe'
  },
  {
    name: "LinkedIn",
    link: 'https://www.linkedin.com/in/joseph-johnson-284510126/'
  }
]

const Footer = () => {
  return (
    <footer>
      {data.map((item) => (
        <Link key={item.name} to={item.link}>
          <img src={`icons/${item.name.toLowerCase()}.png`} alt={item.name} />
        </Link>
      ))}
    </footer>
  )
}

export default Footer