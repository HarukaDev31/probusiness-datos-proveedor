import { ref, watch } from 'vue'

export const useFormPersistence = (formType: 'lima' | 'provincia', consolidadoId: string | number) => {
  const storageKey = `form_${formType}_${consolidadoId}`
  
  // Función para guardar estado en localStorage
  const saveFormState = (formData: any, currentStep: number) => {
    if (process.client) {
      try {
        const state = {
          formData,
          currentStep,
          timestamp: Date.now()
        }
        localStorage.setItem(storageKey, JSON.stringify(state))
      } catch (error) {
        console.warn('Error al guardar estado del formulario:', error)
      }
    }
  }
  
  // Función para cargar estado desde localStorage
  const loadFormState = () => {
    if (process.client) {
      try {
        const saved = localStorage.getItem(storageKey)
        if (saved) {
          const state = JSON.parse(saved)
          // Verificar que el estado no sea muy antiguo (24 horas)
          const maxAge = 24 * 60 * 60 * 1000 // 24 horas en ms
          if (Date.now() - state.timestamp < maxAge) {
            return state
          } else {
            // Limpiar estado expirado
            clearFormState()
          }
        }
      } catch (error) {
        console.warn('Error al cargar estado del formulario:', error)
      }
    }
    return null
  }
  
  // Función para limpiar estado del localStorage
  const clearFormState = () => {
    if (process.client) {
      try {
        localStorage.removeItem(storageKey)
      } catch (error) {
        console.warn('Error al limpiar estado del formulario:', error)
      }
    }
  }
  
  // Función para limpiar todos los estados de formularios
  const clearAllFormStates = () => {
    if (process.client) {
      try {
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
          if (key.startsWith('form_lima_') || key.startsWith('form_provincia_')) {
            localStorage.removeItem(key)
          }
        })
      } catch (error) {
        console.warn('Error al limpiar todos los estados de formularios:', error)
      }
    }
  }
  
  return {
    saveFormState,
    loadFormState,
    clearFormState,
    clearAllFormStates,
    storageKey
  }
}
