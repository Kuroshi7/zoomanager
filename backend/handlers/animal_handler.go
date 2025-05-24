package handlers

import (
	"net/http"
	"time"

	"github.com/Kuroshi7/zoomanager/backend/database"
	"github.com/Kuroshi7/zoomanager/backend/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetAnimais(c *gin.Context) {
	rows, err := database.DB.Query("SELECT id, nome, descricao, data_nascimento, especie, habitat, pais_origem FROM animals")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var animais []models.Animal
	for rows.Next() {
		var a models.Animal
		if err := rows.Scan(&a.ID, &a.Nome, &a.Descricao, &a.DataNascimento, &a.Especie, &a.Habitat, &a.PaisOrigem); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		animais = append(animais, a)
	}
	c.JSON(http.StatusOK, animais)
}

func CreateAnimal(c *gin.Context) {
	var novoAnimal models.Animal

	if err := c.ShouldBindJSON(&novoAnimal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "JSON inválido", "details": err.Error()})
		return
	}

	// ID timestamp
	novoAnimal.ID = uuid.New()
	novoAnimal.CreatedAt = time.Now()

	
	_, err := database.DB.Exec(`
		INSERT INTO animals (id, nome, descricao, data_nascimento, especie, habitat, pais_origem, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
		novoAnimal.ID,
		novoAnimal.Nome,
		novoAnimal.Descricao,
		novoAnimal.DataNascimento,
		novoAnimal.Especie,
		novoAnimal.Habitat,
		novoAnimal.PaisOrigem,
		novoAnimal.CreatedAt,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao inserir animal", "details": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, novoAnimal)
}

func DeleteAnimal(c *gin.Context) {
	// animal id
	idParam := c.Param("id")

	// Converte  ID uuid.UUID
	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	// query
	result, err := database.DB.Exec("DELETE FROM animals WHERE id = $1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao excluir animal"})
		return
	}

	//  registro afetado
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao verificar exclusão"})
		return
	}

	if rowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Animal não encontrado"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Animal excluído com sucesso"})
}

func UpdateAnimal(c *gin.Context) {
	idParam := c.Param("id")

	
	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}

	// estrutura armazena dados
	var animal models.Animal
	if err := c.ShouldBindJSON(&animal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos"})
		return
	}

	now := time.Now()
	animal.UpdatedAt = &now
	
	_, err = database.DB.Exec(
		"UPDATE animals SET nome = $1, descricao = $2, data_nascimento = $3, especie = $4, habitat = $5, pais_origem = $6, updated_at = $7 WHERE id = $8",
		animal.Nome, animal.Descricao, animal.DataNascimento, animal.Especie, animal.Habitat, animal.PaisOrigem, animal.UpdatedAt, id,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao atualizar animal"})
		return
	}

	
	c.JSON(http.StatusOK, gin.H{"message": "Animal atualizado com sucesso"})
}

func GetAnimalByID(c *gin.Context) {

	idParam := c.Param("id")


	id, err := uuid.Parse(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}


	var a models.Animal
	row := database.DB.QueryRow("SELECT id, nome, descricao, data_nascimento, especie, habitat, pais_origem FROM animals WHERE id = $1", id)


	err = row.Scan(&a.ID, &a.Nome, &a.Descricao, &a.DataNascimento, &a.Especie, &a.Habitat, &a.PaisOrigem)
	if err != nil {
		if err.Error() == "no rows in result set" {

			c.JSON(http.StatusNotFound, gin.H{"error": "Animal não encontrado"})
		} else {

			c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao buscar animal", "details": err.Error()})
		}
		return
	}


	c.JSON(http.StatusOK, a)
}