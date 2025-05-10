import { Link } from "react-router-dom"
import "../styles/global.css"

export default function Home() {
  return (
    <div className="container">
      <header>
        <h1>Gerenciamento de Zoológico</h1>
        <p>Gerencie animais e cuidados</p>
      </header>

      <main className="home-grid">
        <div className="card">
          <h2>Animais</h2>
          <p>Gerencie o cadastro de animais</p>
          <div className="button-group">
            <Link to="/animais" className="button primary">
              Listar Animais
            </Link>
            <Link to="/animais/cadastrar" className="button secondary">
              Cadastrar Novo Animal
            </Link>
          </div>
        </div>

        <div className="card">
          <h2>Cuidados</h2>
          <p>Gerencie os cuidados para os animais</p>
          <div className="button-group">
            <Link to="/cuidados" className="button primary">
              Listar Cuidados
            </Link>
            <Link to="/cuidados/cadastrar" className="button secondary">
              Cadastrar Novo Cuidado
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
