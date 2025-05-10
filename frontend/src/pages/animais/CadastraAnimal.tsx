import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { animalService } from "../../services/animalService"
import type { ApiError } from "../../types"

export default function CadastrarAnimal() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        dataNascimento: "",
        especie: "",
        habitat: "",
        paisOrigem: "",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const animalData = {
                nome: formData.nome,
                descricao: formData.descricao || null,
                dataNascimento: formData.dataNascimento
                    ? `${formData.dataNascimento}T00:00:00Z`
                    : null,
                especie: formData.especie,
                habitat: formData.habitat || null,
                paisOrigem: formData.paisOrigem || null,
            }

            await animalService.create(animalData)
            alert("Animal cadastrado com sucesso!")
            navigate("/animais")
        } catch (err) {
            console.error("Erro ao cadastrar animal:", err)
            setError((err as ApiError).message || "Erro ao cadastrar animal. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <header className="page-header">
                <h1>Cadastrar Novo Animal</h1>
                <Link to="/animais" className="button secondary">
                    Voltar para Lista
                </Link>
            </header>

            <div className="form-container">
                <h2>Formulario de Cadastro de Animal</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome *</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Digite o nome do animal"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            placeholder="Descreva características do animal"
                            rows={3}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            name="dataNascimento"
                            value={formData.dataNascimento}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="especie">Especie *</label>
                        <input
                            type="text"
                            id="especie"
                            name="especie"
                            value={formData.especie}
                            onChange={handleChange}
                            placeholder="Ex: Leão, Tigre, Girafa"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="habitat">Habitat</label>
                        <input
                            type="text"
                            id="habitat"
                            name="habitat"
                            value={formData.habitat}
                            onChange={handleChange}
                            placeholder="Ex: Savana, Floresta Tropical"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="paisOrigem">Pais de Origem</label>
                        <input
                            type="text"
                            id="paisOrigem"
                            name="paisOrigem"
                            value={formData.paisOrigem}
                            onChange={handleChange}
                            placeholder="Ex: Brasil, África do Sul"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="button primary" disabled={loading}>
                            {loading ? "Cadastrando..." : "Cadastrar Animal"}
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
