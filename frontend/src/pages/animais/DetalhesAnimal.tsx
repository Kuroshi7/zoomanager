import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { animalService } from "../../services/animalService";
import type { Animal } from "../../types";


const DetalhesAnimal = () => {
    const { id } = useParams<{ id: string }>(); // Obter o ID da URL
    const navigate = useNavigate(); // Usar useNavigate ao invés de useHistory
    const [animal, setAnimal] = useState<Animal | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimal = async () => {
            try {

            const data = await animalService.getById(id!)
            setAnimal(data)
            } catch (error) {
                console.error("Erro ao buscar dados do animal:", error);
                alert("Erro ao carregar dados do animal");
                navigate("/animais");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAnimal();
        }
    }, [id, navigate]);

    const handleRemover = async () => {
        if (window.confirm("Tem certeza que deseja remover este animal?")) {
            try {
                await animalService.delete(id!)
                alert("Animal removido com sucesso!")
                navigate("/animais")
            } catch (error) {
                console.error("Erro ao remover animal:", error)
                alert("Erro ao remover animal. Tente novamente.")
            }
        }
    };

    const formatarData = (data: string | undefined | null): string => {
    if (!data) return "Data não informada";
    return new Date(data).toLocaleDateString("pt-BR");
    };

    if (loading) {
        return <div className="container loading">Carregando...</div>;
    }

    if (!animal) {
        return <div className="container">Animal não encontrado</div>;
    }

    return (
        <div className="container">
            <header className="page-header">
                <h1>Detalhes do Animal</h1>
                <div className="button-group">
                    <button className="button secondary" onClick={() => navigate("/animais")}>
                        Voltar para Lista
                    </button>
                    <button className="button primary" onClick={() => navigate(`/animais/editar/${animal.id}`)}>
                        Editar
                    </button>
                    <button onClick={handleRemover} className="button danger">
                        Remover
                    </button>
                </div>
            </header>

            <div className="detail-card">
                <div className="detail-header">
                    <h2>{animal.nome}</h2>
                    <span className="badge">{animal.especie}</span>
                </div>

                <div className="detail-content">
                    <div className="detail-item">
                        <strong>Descrição:</strong>
                        <p>{animal.descricao}</p>
                    </div>

                    <div className="detail-row">
                        <div className="detail-item">
                            <strong>Data de Nascimento:</strong>
                            <p>{formatarData(animal.dataNascimento)}</p>
                        </div>

                        <div className="detail-item">
                            <strong>Habitat:</strong>
                            <p>{animal.habitat}</p>
                        </div>

                        <div className="detail-item">
                            <strong>Pais de Origem:</strong>
                            <p>{animal.paisOrigem}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalhesAnimal;
