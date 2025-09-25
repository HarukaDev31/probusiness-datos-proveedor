<template>
  <div class="timeline-container">
    <UTimeline 
      :items="timelineItems" 
      :default-value="activeItemIndex"
      color="success"
      size="md"
      orientation="vertical"
      class="w-full max-w-2xl mx-auto"
    />
  </div>
</template>

<script setup lang="ts">
import type { ContainerJourneyStatus } from '~/types/containers'
import type { TimelineItem } from '@nuxt/ui'

const props = defineProps({
  events: {
    type: Array as () => ContainerJourneyStatus[],
    default: () => [] as ContainerJourneyStatus[],
  },
  completed: {
    type: Boolean,
    default: false,
  }
})

// Mapear los eventos al formato que espera UTimeline
const timelineItems = computed<TimelineItem[]>(() => {
  return props.events.map((event, index) => ({
    date: formatDate(event.date),
    title: event.title,
    description: event.description || `${event.name} - ${event.status === 1 ? 'Completado' : 'Pendiente'}`,
    icon: getStatusIcon(event.status, event.icon),
    value: index,
    class: getItemClass(event.status)
  }))
})

// Calcular el índice del elemento activo (último completado)
const activeItemIndex = computed(() => {
  const lastCompletedIndex = props.events.findLastIndex(event => event.status === 1)
  return lastCompletedIndex >= 0 ? lastCompletedIndex : 0
})

// Función para formatear fechas
const formatDate = (dateString: string) => {
  if (!dateString) return 'Fecha no disponible'
  
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Función para obtener el icono según el estado
const getStatusIcon = (status: number, defaultIcon: string) => {
  if (status === 1) {
    return 'i-heroicons-check-circle'
  } else if (status === 0) {
    return 'i-heroicons-clock'
  }
  return defaultIcon || 'i-heroicons-circle-stack'
}

// Función para obtener clases CSS según el estado
const getItemClass = (status: number) => {
  if (status === 1) {
    return 'text-green-600 dark:text-green-400'
  } else if (status === 0) {
    return 'text-gray-500 dark:text-gray-400'
  }
  return 'text-blue-600 dark:text-blue-400'
}
</script>

<style scoped>
.timeline-container {
  padding: 1rem;
}

/* Personalización adicional para el timeline */
:deep(.timeline-item) {
  transition: all 0.3s ease;
}

:deep(.timeline-item:hover) {
  transform: translateX(4px);
}

/* Estilos para diferentes estados */
:deep(.timeline-item.completed) {
  opacity: 1;
}

:deep(.timeline-item.pending) {
  opacity: 0.7;
}
</style>