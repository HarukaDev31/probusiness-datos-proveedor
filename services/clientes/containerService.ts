import type { Container } from '~/types/containers'

interface ContainerResponse {
  success: boolean
  data: Container[]
  message?: string
}

export class ContainerService {
  /**
   * Obtener lista de contenedores del cliente
   * GET /api/clientes/containers
   */
  static async getContainers(): Promise<ContainerResponse> {
    try {
      const { $api } = useNuxtApp()
      
      const response = await $api.call<ContainerResponse>('/api/clientes/containers', {
        method: 'GET'
      })
      
      return {
        success: true,
        data: response.data || []
      }
    } catch (error: any) {
      console.error('Error al obtener contenedores:', error)
      throw error
    }
  }
}

