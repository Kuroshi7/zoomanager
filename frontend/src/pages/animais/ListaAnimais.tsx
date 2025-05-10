/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { animalService } from "../../services/animalService"
import type { Animal } from "../../types"
import { Filter, Search } from "lucide-react"

export default function ListaAnimais() {
  const [animais, setAnimais] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [habitatFiltro, setHabitatFiltro] = useState<string>("")

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        setLoading(true)
        const data = await animalService.getAll()

        const animaisValidados = data.filter((animal: Animal) => {
          return animal.nome && animal.especie && typeof animal.nome === "string"
        })

        setAnimais(animaisValidados)
      } catch (err) {
        console.error("Erro ao buscar animais:", err)
        setError("Erro ao carregar os dados dos animais")
      } finally {
        setLoading(false)
      }
    }

    fetchAnimais()
  }, [])

  const handleRemover = async (id: string) => {
    if (window.confirm("Tem certeza que deseja remover este animal?")) {
      try {
        await animalService.delete(id)
        setAnimais(animais.filter((animal) => animal.id !== id))
      } catch (err) {
        alert("Erro ao remover o animal")
      }
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleHabitatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHabitatFiltro(e.target.value)
  }

  const animaisFiltrados = animais.filter((animal) =>
    animal.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (habitatFiltro === "" || animal.habitat === habitatFiltro)
  )

  const habitatsUnicos = Array.from(new Set(animais.map((animal) => animal.habitat))).sort()

  if (loading) return <div className="container">Carregando...</div>
  if (error) return <div className="container">{error}</div>

  return (
    <div className="container">
      <header className="page-header">
        <h1>Lista de Animais</h1>
        <Link to="/animais/cadastrar" className="button primary">
          Cadastrar Novo Animal
        </Link>
      </header>

      <div className="filter-container">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar por nome do animal..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-box">
          <Filter />
          <select id="habitatFiltro" value={habitatFiltro} onChange={handleHabitatChange}>
            <option value="">Todos os habitats</option>
            {habitatsUnicos.map((habitat, index) => (
              <option key={index} value={habitat || ""}>
                {habitat}
              </option>
            ))}
          </select>
        </div>
      </div>



      {animais.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum animal cadastrado.</p>
        </div>
      ) : animaisFiltrados.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum animal encontrado com o termo "{searchTerm}".</p>
          <button className="button secondary" onClick={() => setSearchTerm("")}>
            Limpar Busca
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Especie</th>
                <th>Habitat</th>
                <th>Pais de Origem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {animaisFiltrados.map((animal) => (
                <tr key={animal.id}>
                  <td data-label="Nome">{animal.nome}</td>
                  <td data-label="Especie">{animal.especie}</td>
                  <td data-label="Habitat">{animal.habitat || "-"}</td>
                  <td data-label="Pais de origem">{animal.paisOrigem || "-"}</td>
                  <td className="actions">
                    <Link to={`/animais/detalhes/${animal.id}`} className="button small">
                      Detalhes
                    </Link>
                    <Link to={`/animais/editar/${animal.id}`} className="button small secondary">
                      Editar
                    </Link>
                    <button onClick={() => handleRemover(animal.id)} className="button small danger">
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
