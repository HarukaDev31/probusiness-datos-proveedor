import { useUserRole } from '../composables/auth/useUserRole'
export default defineNuxtPlugin(() => {
  // Solo ejecutar en el cliente
  if (process.server) return

  // Crear una instancia global del composable
  const { fetchCurrentUser } = useUserRole()

  // Función para manejar cambios en localStorage
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'auth_user') {
      fetchCurrentUser()
    }
  }

  // Cargar datos del usuario al iniciar la aplicación
  fetchCurrentUser()

  // Escuchar cambios en localStorage
  if (process.client) {
    window.addEventListener('storage', handleStorageChange)
  }

  // Limpiar listeners cuando se desmonte el plugin
  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('storage', handleStorageChange)
    }
  })
}) 