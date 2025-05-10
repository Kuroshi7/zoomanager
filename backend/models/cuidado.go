package models

import (
	"time"

	"github.com/google/uuid"
)

type Cuidado struct {
	ID             uuid.UUID  `json:"id"`
	Nome           string     `json:"nome"`
	Descricao      string    `json:"descricao"`
	Frequencia     string 	  `json:"frequencia"`	
	CreatedAt      time.Time  `json:"createdAt"`
	UpdatedAt 	   time.Time  `json:"updatedAt"`
}