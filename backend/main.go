package main

import (
	"github.com/Kuroshi7/zoomanager/backend/database"
	"github.com/Kuroshi7/zoomanager/backend/routes"
	"github.com/gin-gonic/gin"
	"log"
	"os"
	"github.com/gin-contrib/cors"
	"time"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Erro ao carregar .env")
	}

	if err := database.Connect(); err != nil {
		log.Fatal("Erro ao conectar com o banco:", err)
	}

	r := gin.Default()

	
		r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
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
