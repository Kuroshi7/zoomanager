package main

import (
	"log"
	"os"
	"time"

	"github.com/Kuroshi7/zoomanager/backend/database"
	"github.com/Kuroshi7/zoomanager/backend/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func runMigrations() {
	db := database.DB

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		log.Fatalf("Erro criando driver de migration: %v", err)
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://./migrations", // Caminho relativo para sua pasta de migrations
		"postgres", driver,
	)
	if err != nil {
		log.Fatalf("Erro iniciando migrations: %v", err)
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatalf("Erro ao aplicar migrations: %v", err)
	}

	log.Println("✅ Migrations aplicadas com sucesso")
}

func main() {
	if os.Getenv("ENV") != "production" {
		if err := godotenv.Load(); err != nil {
			log.Println("Nenhum arquivo .env encontrado")
		}
	}

	if err := database.Connect(); err != nil {
		log.Fatal("Erro ao conectar com o banco:", err)
	}

	runMigrations() // ⬅️ Roda as migrations automaticamente

	r := gin.Default()

	allowOrigins := []string{"http://localhost:5173"}
	if os.Getenv("ENV") == "production" {
		allowOrigins = []string{"*"}
	}

	r.Use(cors.New(cors.Config{
		AllowOrigins:     allowOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routes.SetupRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}
