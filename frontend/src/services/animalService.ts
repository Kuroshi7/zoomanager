import axios from "axios"
import type { Animal } from "../types"


const API_BASE_URL = "http://localhost:8080/api"

export const animalService = {
    async getAll(): Promise<Animal[]> {
      const response = await axios.get(`${API_BASE_URL}/animais`)
      return response.data
    },

    async getById(id: string): Promise<Animal> {
      const response = await axios.get(`${API_BASE_URL}/animais/${id}`)
      return response.data
    },

    async create(animal: Omit<Animal, "id">): Promise<Animal> {
      const response = await axios.post(`${API_BASE_URL}/animais`, animal)
      return response.data
    },

    async update(id: string, animal: Partial<Animal>): Promise<Animal> {
      const response = await axios.put(`${API_BASE_URL}/animais/${id}`, animal)
      return response.data
    },

    async delete(id: string): Promise<void> {
      await axios.delete(`${API_BASE_URL}/animais/${id}`)
    },
}
