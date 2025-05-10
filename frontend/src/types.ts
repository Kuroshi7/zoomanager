/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Animal {
  nome: string
  descricao?: string | null
  dataNascimento?: string | null
  especie: string
  habitat?: string | null  
  paisOrigem?: string | null
  [key: string]: any 
}

export interface Cuidado {
  nome: string
  descricao?: string 
  frequencia: string
  [key: string]: any // Ignora campos API id, created_at, updated_at
}

export interface ApiError {
  message: string
  status?: number
}