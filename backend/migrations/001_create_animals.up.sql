CREATE TABLE IF NOT EXISTS animals(
    id UUID PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_nascimento DATE,
    especie VARCHAR(100) NOT NULL,
    habitat VARCHAR(255),
    pais_origem VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
