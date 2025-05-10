import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import type { Animal, ApiError } from "../../types"
import { animalService } from "../../services/animalService"

export default function EditarAnimal() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [formData, setFormData] = useState<Partial<Animal>>({
        nome: "",
        descricao: "",
        dataNascimento: "",
        especie: "",
        habitat: "",
        paisOrigem: "",
    })

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const data = await animalService.getById(id!)


                const formattedData = {
                    ...data,
                    dataNascimento: data.dataNascimento ? new Date(data.dataNascimento).toISOString().split("T")[0] : "",
                }

                setFormData(formattedData)
                setError(null)
            } catch (err) {
                console.error("Erro ao buscar dados do animal:", err)
                setError((err as ApiError).message || "Erro ao carregar dados do animal")
            } finally {
                setLoading(false)
            }
        }

        fetchAnimal()
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

            const animalData = {
                nome: formData.nome || "",
                descricao: formData.descricao || null,
                dataNascimento: formData.dataNascimento
                    ? `${formData.dataNascimento}T00:00:00Z`
                    : null,
                especie: formData.especie || "",
                habitat: formData.habitat || null,
                paisOrigem: formData.paisOrigem || null,
            }

            await animalService.update(id!, animalData)
            alert("Animal atualizado com sucesso!")
            navigate("/animais")
        } catch (err) {
            console.error("Erro ao atualizar animal:", err)
            setError((err as ApiError).message || "Erro ao atualizar animal. Tente novamente.")
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
                        <button className="button secondary" onClick={() => navigate("/animais")}>
                            Voltar para Lista
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <header className="page-header">
                <h1>Editar Animal</h1>
                <button className="button secondary" onClick={() => navigate("/animais")}>
                    Voltar para Lista
                </button>
            </header>

            <div className="form-container">
                <h2>Formulario de Edição</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome *</label>
                        <input type="text" id="nome" name="nome" value={formData.nome || ""} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao || ""}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            name="dataNascimento"
                            value={formData.dataNascimento || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="especie">Espécie *</label>
                        <input
                            type="text"
                            id="especie"
                            name="especie"
                            value={formData.especie || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="habitat">Habitat</label>
                        <input type="text" id="habitat" name="habitat" value={formData.habitat || ""} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="paisOrigem">País de Origem</label>
                        <input
                            type="text"
                            id="paisOrigem"
                            name="paisOrigem"
                            value={formData.paisOrigem || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="button primary" disabled={saving}>
                            {saving ? "Salvando..." : "Salvar Alterações"}
                        </button>
                        <Link to="/animais" className="button text">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
