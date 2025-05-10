package routes

import (
	"github.com/Kuroshi7/zoomanager/backend/handlers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	//animais
	r.GET("/api/animais/:id", handlers.GetAnimalByID)

	r.GET("/api/animais", handlers.GetAnimais)
	
	r.POST("/api/animais", handlers.CreateAnimal)

	r.DELETE("/api/animais/:id", handlers.DeleteAnimal)

	r.PUT("/api/animais/:id", handlers.UpdateAnimal)

	

	//cuidados
	r.GET("/api/cuidados/:id", handlers.GetCuidadoById)

	r.GET("/api/cuidados", handlers.GetCuidados)

	r.POST("/api/cuidados", handlers.CreateCuidado)

	r.DELETE("/api/cuidados/:id", handlers.DeleteCuidado)

	r.PUT("/api/cuidados/:id", handlers.UpdateCuidado)
}
