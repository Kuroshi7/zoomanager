import React, { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import type { ApiError, Cuidado } from "../../types"
import { cuidadoService } from "../../services/cuidadoService"


export default function EditarCuidado() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [formData, setFormData] = useState<Partial<Cuidado>>({
        nome: "",
        descricao: "",
        frequencia: "",
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const frequencias = ["Diária", "Semanal", "Quinzenal", "Mensal", "Trimestral", "Semestral", "Anual"]

    useEffect(() => {
        const fetchCuidado = async () => {
            try {
                if (id) {
                    const data = await cuidadoService.getById(id)
                    setFormData(data)
                }
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError(null)

        try {
            const cuidadoData = {
                nome: formData.nome || "",
                descricao: formData.descricao || "",
                frequencia: formData.frequencia || "",
            }

            await cuidadoService.update(id!, cuidadoData)
            alert("Cuidado atualizado com sucesso!")
            navigate("/cuidados")
        } catch (err) {
            console.error("Erro ao atualizar cuidado:", err)
            setError((err as ApiError).message || "Erro ao atualizar cuidado. Tente novamente.")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div className="container loading">Carregando...</div>
    }

    if (error && !formData.nome) {
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

    return (
        <div className="container">
            <header className="page-header">
                <h1>Editar Cuidado</h1>
                <Link to="/cuidados" className="button secondary">
                    Voltar para Lista
                </Link>
            </header>

            <div className="form-container">
                <h2>Formulário de Edição</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome do Cuidado *</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descricao">Descrição *</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao || ""}
                            onChange={handleChange}
                            rows={3}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="frequencia">Frequência *</label>
                        <select
                            id="frequencia"
                            name="frequencia"
                            value={formData.frequencia || ""}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione a frequência</option>
                            {frequencias.map((freq) => (
                                <option key={freq} value={freq}>
                                    {freq}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="button primary" disabled={saving}>
                            {saving ? "Salvando..." : "Salvar Alterações"}
                        </button>
                        <Link to="/cuidados" className="button text">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
