package models

import (
	"time"

	"github.com/google/uuid"
)

type Animal struct {
	ID             uuid.UUID  `json:"id"`
	Nome           string     `json:"nome"`
	Descricao      *string    `json:"descricao"`      //  ponteiro permite null
	DataNascimento *time.Time `json:"dataNascimento"` 
	Especie        string     `json:"especie"`
	Habitat        *string    `json:"habitat"`        
	PaisOrigem     *string    `json:"paisOrigem"`     
	CreatedAt      time.Time  `json:"createdAt"`
	UpdatedAt 	   time.Time  `json:"updatedAt"`
}