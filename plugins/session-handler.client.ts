import { useSession } from '../composables/auth/useSession'
export default defineNuxtPlugin(() => {
  const { clearSession } = useSession()

  // Función para manejar sesión expirada
  const handleSessionExpired = () => {
    clearSession()
  }

  // Escuchar el evento de sesión expirada globalmente
  if (process.client) {
    window.addEventListener('session-expired', handleSessionExpired)
  }

  // Limpiar listeners cuando se desmonte el plugin
  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('session-expired', handleSessionExpired)
    }
  })
}) 