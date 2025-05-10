import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Filter } from "lucide-react"
import type { Cuidado } from "../../types"
import { cuidadoService } from "../../services/cuidadoService"


export default function ListaCuidados() {
    const [cuidados, setCuidados] = useState<Cuidado[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [frequenciaFiltro, setFrequenciaFiltro] = useState("")


    useEffect(() => {
        const fetchCuidados = async () => {
            try {
                const data = await cuidadoService.getAll()
                setCuidados(data)
            } catch (err) {
                console.error("Erro ao carregar cuidados:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchCuidados()
    }, [])


    const handleRemover = async (id: string) => {
        if (window.confirm("Tem certeza que deseja remover este cuidado?")) {
            try {
                await cuidadoService.delete(id);
                setCuidados((prevCuidados) => prevCuidados.filter((cuidado) => cuidado.id !== id));
            } catch (err) {
                alert("Erro ao remover cuidado");
                console.error(err);
            }
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleFrequenciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFrequenciaFiltro(e.target.value)
    }

    const limparFiltros = () => {
        setSearchTerm("")
        setFrequenciaFiltro("")
    }


    const frequenciasUnicas = Array.from(new Set(cuidados.map((cuidado) => cuidado.frequencia))).sort()


    const cuidadosFiltrados = cuidados.filter(
        (cuidado) =>
            cuidado.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (frequenciaFiltro === "" || cuidado.frequencia === frequenciaFiltro),
    )

    if (loading) {
        return <div className="container loading">Carregando...</div>
    }

    return (
        <div className="container">
            <header className="page-header">
                <h1>Lista de Cuidados</h1>
                <Link to="/cuidados/cadastrar" className="button primary">
                    Cadastrar Novo Cuidado
                </Link>
            </header>

            <div className="filter-container">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nome do cuidado..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="filter-box">
                    <Filter size={20} />
                    <select value={frequenciaFiltro} onChange={handleFrequenciaChange}>
                        <option value="">Todas as frequencias</option>
                        {frequenciasUnicas.map((freq) => (
                            <option key={freq} value={freq}>
                                {freq}
                            </option>
                        ))}
                    </select>
                </div>

                {(searchTerm || frequenciaFiltro) && (
                    <button className="button small secondary" onClick={limparFiltros}>
                        Limpar Filtros
                    </button>
                )}
            </div>

            {cuidados.length === 0 ? (
                <div className="empty-state">
                    <p>Nenhum cuidado cadastrado.</p>
                    <Link to="/cuidados/cadastrar" className="button primary">
                        Cadastrar Cuidado
                    </Link>
                </div>
            ) : cuidadosFiltrados.length === 0 ? (
                <div className="empty-state">
                    <p>Nenhum cuidado encontrado com os filtros aplicados.</p>
                    <button className="button secondary" onClick={limparFiltros}>
                        Limpar Filtros
                    </button>
                </div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Frequencia</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cuidadosFiltrados.map((cuidado) => (
                                <tr key={cuidado.id}>
                                    <td data-label="Nome">{cuidado.nome}</td>
                                    <td data-label="Descrição">{cuidado.descricao}</td>
                                    <td data-label="Frequencia">{cuidado.frequencia}</td>
                                    <td className="actions">
                                        <Link to={`/cuidados/detalhes/${cuidado.id}`} className="button small">
                                            Detalhes
                                        </Link>
                                        <Link to={`/cuidados/editar/${cuidado.id}`} className="button small secondary">
                                            Editar
                                        </Link>
                                        <button onClick={() => handleRemover(cuidado.id)} className="button small danger">
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
