import { useSession } from '../composables/auth/useSession'
import { useMemoryCleanup } from '../composables/commons/useMemoryCleanup'

export default defineNuxtPlugin(() => {
  const { handleSessionExpired } = useSession()
  const { createTimer, addEventListener } = useMemoryCleanup()

  const INACTIVITY_TIMEOUT = 24 * 100 * 60 * 100
  let inactivityTimer: NodeJS.Timeout | null = null

  // Función para reiniciar el timer de inactividad
  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }

    inactivityTimer = createTimer(() => {
      console.log('Inactividad detectada, expirando sesión...')
      handleSessionExpired()
    }, INACTIVITY_TIMEOUT)
  }

  // Eventos que indican actividad del usuario
  const activityEvents = [
    'mousedown',
    'mousemove',
    'keypress',
    'scroll',
    'touchstart',
    'click',
    'focus'
  ]

  // Agregar listeners para detectar actividad con limpieza automática
  activityEvents.forEach(event => {
    addEventListener(document, event, resetInactivityTimer, true)
  })

  // Iniciar el timer cuando se carga la página
  resetInactivityTimer()
}) 