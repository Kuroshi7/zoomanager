import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import type { ApiError, Cuidado } from "../../types"
import { cuidadoService } from "../../services/cuidadoService"


export default function DetalhesCuidado() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const [cuidado, setCuidado] = useState<Cuidado | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCuidado = async () => {
            try {
                const data = await cuidadoService.getById(id!)
                setCuidado(data)
                setError(null)
            } catch (err) {
                console.error("Erro ao buscar dados do cuidado:", err)
                setError((err as ApiError).message || "Erro ao carregar dados do cuidado")
            } finally {
                setLoading(false)
            }
        }

        fetchCuidado()
    }, [id])

    const handleRemover = async () => {
        if (window.confirm("Tem certeza que deseja remover este cuidado?")) {
            try {
                await cuidadoService.delete(id!)
                alert("Cuidado removido com sucesso!")
                navigate("/cuidados")
            } catch (err) {
                console.error("Erro ao remover cuidado:", err)
                alert((err as ApiError).message || "Erro ao remover cuidado. Tente novamente.")
            }
        }
    }

    const formatarData = (dataString: string) => {
        return new Date(dataString).toLocaleDateString("pt-BR")
    }

    if (loading) {
        return <div className="container loading">Carregando...</div>
    }

    if (error) {
        return (
            <div className="container">
                <div className="error-message">
                    <h2>Erro ao carregar dados</h2>
                    <p>{error}</p>
                    <div className="button-group">
                        <button className="button primary" onClick={() => window.location.reload()}>
                            Tentar novamente
                        </button>
                        <Link to="/cuidados" className="button secondary">
                            Voltar para Lista
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    if (!cuidado) {
        return <div className="container">Cuidado não encontrado</div>
    }

    return (
        <div className="container">
            <header className="page-header">
                <h1>Detalhes do Cuidado</h1>
                <div className="button-group">
                    <Link to="/cuidados" className="button secondary">
                        Voltar para Lista
                    </Link>
                    <Link to={`/cuidados/editar/${id}`} className="button primary">
                        Editar
                    </Link>
                    <button onClick={handleRemover} className="button danger">
                        Remover
                    </button>
                </div>
            </header>

            <div className="detail-card">
                <div className="detail-header">
                    <h2>{cuidado.nome}</h2>
                    <span className="badge">{cuidado.frequencia}</span>
                </div>

                <div className="detail-content">
                    <div className="detail-item">
                        <strong>Descrição:</strong>
                        <p>{cuidado.descricao}</p>
                    </div>

                    <div className="detail-row">
                        <div className="detail-item">
                            <strong>Frequência:</strong>
                            <p>{cuidado.frequencia}</p>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-item">
                            <strong>Cadastrado em:</strong>
                            <p>{formatarData(cuidado.createdAt)}</p>
                        </div>

                        <div className="detail-item">
                            <strong>Última atualização:</strong>
                            <p>{formatarData(cuidado.updatedAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
