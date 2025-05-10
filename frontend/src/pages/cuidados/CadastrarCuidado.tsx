import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { ApiError, Cuidado } from "../../types"
import { cuidadoService } from "../../services/cuidadoService"



export default function CadastrarCuidado() {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState<Omit<Cuidado, "id">>({
        nome: "",
        descricao: "",
        frequencia: "",
    })

    const [loading, setLoading] = useState(false)

    const frequencias = ["Diaria", "Semanal", "Quinzenal", "Mensal", "Trimestral", "Semestral", "Anual"]

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {

            await cuidadoService.create(formData)

            alert("Cuidado cadastrado com sucesso!")
            navigate("/cuidados")
        } catch (err) {
            console.error("Erro ao cadastrar cuidado:", err)
            setError((err as ApiError).message || "Erro ao cadastrar cuidado. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <header className="page-header">
                <h1>Cadastrar Novo Cuidado</h1>
                <button className="button secondary" onClick={() => navigate("/cuidados")}>
                    Voltar para Lista
                </button>
            </header>

            <div className="form-container">
                <h2>Formulario de Cadastro de Cuidado</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome do Cuidado</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Ex: Alimentação, Exame Veterinario, etc."
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
                            placeholder="Descreva detalhes sobre este cuidado"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="frequencia">Frequencia</label>
                        <select
                            id="frequencia"
                            name="frequencia"
                            value={formData.frequencia}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione a frequencia</option>
                            {frequencias.map((freq) => (
                                <option key={freq} value={freq}>
                                    {freq}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="button primary" disabled={loading}>
                            {loading ? "Cadastrando..." : "Cadastrar Cuidado"}
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
