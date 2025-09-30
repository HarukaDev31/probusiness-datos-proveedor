import { onUnmounted } from 'vue'

/**
 * Composable para manejar la limpieza de memoria y prevenir memory leaks
 */
export const useMemoryCleanup = () => {
  const cleanupTasks: (() => void)[] = []
  const timers: Set<NodeJS.Timeout | number> = new Set()
  const intervals: Set<NodeJS.Timeout | number> = new Set()
  const eventListeners: Array<{
    element: EventTarget
    event: string
    handler: EventListener
    options?: boolean | AddEventListenerOptions
  }> = []

  /**
   * Registra una tarea de limpieza que se ejecutará al desmontar el componente
   */
  const addCleanupTask = (task: () => void) => {
    cleanupTasks.push(task)
  }

  /**
   * Registra un timer que será limpiado automáticamente
   */
  const addTimer = (timer: NodeJS.Timeout | number) => {
    timers.add(timer)
    return timer
  }

  /**
   * Registra un interval que será limpiado automáticamente
   */
  const addInterval = (interval: NodeJS.Timeout | number) => {
    intervals.add(interval)
    return interval
  }

  /**
   * Registra un event listener que será removido automáticamente
   */
  const addEventListener = (
    element: EventTarget,
    event: string,
    handler: EventListener,
    options?: boolean | AddEventListenerOptions
  ) => {
    element.addEventListener(event, handler, options)
    eventListeners.push({ element, event, handler, options })
  }

  /**
   * Crea un timer con limpieza automática
   */
  const createTimer = (callback: () => void, delay: number) => {
    const timer = setTimeout(() => {
      timers.delete(timer)
      callback()
    }, delay)
    timers.add(timer)
    return timer
  }

  /**
   * Crea un interval con limpieza automática
   */
  const createInterval = (callback: () => void, delay: number) => {
    const interval = setInterval(callback, delay)
    intervals.add(interval)
    return interval
  }

  /**
   * Limpia todos los recursos registrados
   */
  const cleanup = () => {
    console.log('🧹 Iniciando limpieza de memoria...')

    // Limpiar timers
    timers.forEach(timer => {
      clearTimeout(timer)
    })
    timers.clear()

    // Limpiar intervals
    intervals.forEach(interval => {
      clearInterval(interval)
    })
    intervals.clear()

    // Remover event listeners
    eventListeners.forEach(({ element, event, handler, options }) => {
      element.removeEventListener(event, handler, options)
    })
    eventListeners.length = 0

    // Ejecutar tareas de limpieza personalizadas
    cleanupTasks.forEach(task => {
      try {
        task()
      } catch (error) {
        console.warn('⚠️ Error en tarea de limpieza:', error)
      }
    })
    cleanupTasks.length = 0

    console.log('✅ Limpieza de memoria completada')
  }

  // Limpiar automáticamente al desmontar
  onUnmounted(() => {
    cleanup()
  })

  return {
    addCleanupTask,
    addTimer,
    addInterval,
    addEventListener,
    createTimer,
    createInterval,
    cleanup
  }
}
