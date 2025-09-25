import { useSession } from '../composables/auth/useSession'
export default defineNuxtPlugin(() => {
  const { handleSessionExpired } = useSession()

  const INACTIVITY_TIMEOUT = 24 * 100 * 60 * 100
  let inactivityTimer: NodeJS.Timeout | null = null

  // Función para reiniciar el timer de inactividad
  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }

    inactivityTimer = setTimeout(() => {
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

  // Agregar listeners para detectar actividad
  activityEvents.forEach(event => {
    document.addEventListener(event, resetInactivityTimer, true)
  })

  // Iniciar el timer cuando se carga la página
  resetInactivityTimer()

  // Limpiar timer cuando se desmonte el plugin
  onUnmounted(() => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }

    activityEvents.forEach(event => {
      document.removeEventListener(event, resetInactivityTimer, true)
    })
  })
}) 