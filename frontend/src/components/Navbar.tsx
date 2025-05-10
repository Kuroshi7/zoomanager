import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          ZooCare
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li className="dropdown">
            <span>Animais ▾</span>
            <div className="dropdown-content">
              <Link to="/animais">Listar</Link>
              <Link to="/animais/cadastrar">Cadastrar</Link>
            </div>
          </li>
          <li className="dropdown">
            <span>Cuidados ▾</span>
            <div className="dropdown-content">
              <Link to="/cuidados">Listar</Link>
              <Link to="/cuidados/cadastrar">Cadastrar</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}
