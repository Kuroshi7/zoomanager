package handlers

import (
	"net/http"
	"time"

	"github.com/Kuroshi7/zoomanager/backend/database"
	"github.com/Kuroshi7/zoomanager/backend/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetCuidados(c *gin.Context) {

	rows, err := database.DB.Query("SELECT id, nome, descricao, frequencia, created_at, updated_at FROM cuidados")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var cuidados []models.Cuidado
	for rows.Next() {
		var cuidado models.Cuidado
		if err := rows.Scan(&cuidado.ID, &cuidado.Nome, &cuidado.Descricao, &cuidado.Frequencia, &cuidado.CreatedAt, &cuidado.UpdatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		cuidados = append(cuidados, cuidado)
	}

	c.JSON(http.StatusOK, cuidados)
}

func CreateCuidado(c *gin.Context) {
	var novoCuidado models.Cuidado


	if err := c.ShouldBindJSON(&novoCuidado); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "JSON inválido", "details": err.Error()})
		return
	}


	novoCuidado.ID = uuid.New()


	novoCuidado.CreatedAt = time.Now()
	novoCuidado.UpdatedAt = time.Now()


	_, err := database.DB.Exec(`
		INSERT INTO cuidados (id, nome, descricao, frequencia, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6)`,
		novoCuidado.ID,
		novoCuidado.Nome,
		novoCuidado.Descricao,
		novoCuidado.Frequencia,
		novoCuidado.CreatedAt,
		novoCuidado.UpdatedAt,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao criar cuidado", "details": err.Error()})
		return
	}


	c.JSON(http.StatusCreated, novoCuidado)
}

func DeleteCuidado(c *gin.Context) {

	idParam := c.Param("id")


	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}


	result, err := database.DB.Exec("DELETE FROM cuidados WHERE id = $1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao excluir cuidado", "details": err.Error()})
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao verificar exclusão", "details": err.Error()})
		return
	}


	if rowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cuidado não encontrado"})
		return
	}


	c.JSON(http.StatusOK, gin.H{"message": "Cuidado excluído com sucesso"})
}

func UpdateCuidado(c *gin.Context) {

	idParam := c.Param("id")


	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}


	var cuidado models.Cuidado
	if err := c.ShouldBindJSON(&cuidado); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos", "details": err.Error()})
		return
	}


	_, err = database.DB.Exec(`
		UPDATE cuidados 
		SET nome = $1, descricao = $2, frequencia = $3, updated_at = $4
		WHERE id = $5
	`, 
		cuidado.Nome, 
		cuidado.Descricao, 
		cuidado.Frequencia, 
		time.Now(), 
		id,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar cuidado", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Cuidado atualizado com sucesso"})
}

func GetCuidadoById(c *gin.Context) {

	idParam := c.Param("id")


	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	var cuidado models.Cuidado

	
	err = database.DB.QueryRow(`
		SELECT id, nome, descricao, frequencia, created_at, updated_at
		FROM cuidados
		WHERE id = $1
	`, id).Scan(
		&cuidado.ID,
		&cuidado.Nome,
		&cuidado.Descricao,
		&cuidado.Frequencia,
		&cuidado.CreatedAt,
		&cuidado.UpdatedAt,
	)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cuidado não encontrado", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, cuidado)
}