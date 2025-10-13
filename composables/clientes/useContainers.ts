import { ref } from 'vue'
import { ContainerService } from '~/services/clientes/containerService'
import type { Container } from '~/types/containers'

export const useContainers = () => {
  const containers = ref<Container[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Obtener contenedores del cliente
   */
  const getContainers = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await ContainerService.getContainers()
      containers.value = response.data
    } catch (err: any) {
      error.value = err.message || 'Error al cargar los contenedores'
      console.error('Error en getContainers:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    containers,
    loading,
    error,
    getContainers
  }
}

