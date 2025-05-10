import axios from "axios"
import type { Cuidado } from "../types"


const API_BASE_URL = "http://localhost:8080/api"

export const cuidadoService = {
    async getAll(): Promise<Cuidado[]> {
      const response = await axios.get(`${API_BASE_URL}/cuidados`)
      return response.data
    },

    async getById(id: string): Promise<Cuidado> {
      const response = await axios.get(`${API_BASE_URL}/cuidados/${id}`)
      return response.data
    },

    async create(cuidado: Omit<Cuidado, "id">): Promise<Cuidado> {
      const response = await axios.post(`${API_BASE_URL}/cuidados`, cuidado)
      return response.data
    },

    async update(id: string, cuidado: Partial<Cuidado>): Promise<Cuidado> {
      const response = await axios.put(`${API_BASE_URL}/cuidados/${id}`, cuidado)
      return response.data
    },

    async delete(id: string): Promise<void> {
      await axios.delete(`${API_BASE_URL}/cuidados/${id}`)
    },
}
