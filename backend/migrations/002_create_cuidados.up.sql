CREATE TABLE IF NOT EXISTS cuidados (
    id UUID PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    frequencia TEXT NOT NULL,
    created_at TIMESTAMPTZ NULL,
    updated_at TIMESTAMPTZ NULL
);