import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.tsx"
import ListaAnimais from "./pages/animais/ListaAnimais.tsx"
import CadastrarAnimal from "./pages/animais/CadastraAnimal.tsx"
import EditarAnimal from "./pages/animais/EditarAnimal.tsx"
import DetalhesAnimal from "./pages/animais/DetalhesAnimal.tsx"
import Navbar from "./components/Navbar.tsx"
import ListaCuidados from "./pages/cuidados/ListaCuidados.tsx"
import CadastrarCuidado from "./pages/cuidados/CadastrarCuidado.tsx"
import EditarCuidado from "./pages/cuidados/EditarCuidado.tsx"
import DetalhesCuidado from "./pages/cuidados/DetalhesCuidado.tsx"


export default function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/animais" element={<ListaAnimais />} />
      <Route path="/animais/cadastrar" element={<CadastrarAnimal />} />
      <Route path="/animais/editar/:id" element={<EditarAnimal />} />
      <Route path="/animais/detalhes/:id" element= {<DetalhesAnimal />} />

      <Route path="/cuidados" element={<ListaCuidados />} />
      <Route path="/cuidados/cadastrar" element={<CadastrarCuidado />} />
      <Route path="/cuidados/editar/:id" element={<EditarCuidado />} />
      <Route path="/cuidados/detalhes/:id" element= {<DetalhesCuidado />} />
    </Routes>
    </>
  )
}
