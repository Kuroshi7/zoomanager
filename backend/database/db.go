package database

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func Connect() error {
	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		return fmt.Errorf("DATABASE_URL não configurada")
	}

	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		return fmt.Errorf("erro ao abrir conexão: %w", err)
	}

	// Testa a conexão com o banco
	if err := DB.Ping(); err != nil {
		return fmt.Errorf("erro ao conectar ao banco: %w", err)
	}

	fmt.Println("✅ Conectado ao banco de dados com sucesso.")
	return nil
}
