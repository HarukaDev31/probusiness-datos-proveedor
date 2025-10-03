<template>
  <div class="timeline-container">
    <UTimeline 
      :items="timelineItems" 
      :default-value="activeItemIndex"
      color="success"
      size="md"
      :orientation="orientation"
      
      :class="orientation === 'horizontal' ? 'w-full overflow-x-auto' : 'w-full max-w-2xl mx-auto'"
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
  },
  orientation: {
    type: String as () => 'vertical' | 'horizontal',
    default: 'vertical',
  }
})

// Mapear los eventos al formato que espera UTimeline
const timelineItems = computed<TimelineItem[]>(() => {
  return props.events.map((event, index) => ({
    date: formatDate(event.date),
    title: event.name,
    description: event.description || `${event.name} `,
    icon: getStatusIcon(event.status, 'i-heroicons-clock'),
    value: index,
    class: getItemClass(event.status)
  }))
})

//obtener indices activos de los eventos PENDIENTE y COMPLETADO
const activeItemIndex = computed(() => {
 //last item with status COMPLETADO
  const lastCompletedIndex = props.events.findLastIndex(event => event.status === 'COMPLETADO')
  return lastCompletedIndex >= 0 ? lastCompletedIndex : -1
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
  const getStatusIcon = (status: string, defaultIcon: string) => {
  if (status === 'COMPLETADO') {
    return 'i-heroicons-check-circle'
  } else if (status === 'PENDIENTE') {
    return 'i-heroicons-clock'
  } 
  return defaultIcon || 'i-heroicons-clock  '
}

// Función para obtener clases CSS según el estado
const getItemClass = (status: string) => {
  if (status === 'COMPLETADO') {
    return 'text-green-600 dark:text-green-400'
  } else if (status === 'PENDIENTE') {
    return 'text-gray-500 dark:text-gray-400'
  } else if (status === 'COMPLETADO') {
    return 'text-green-600 dark:text-green-400'
  }
  return 'text-blue-600 dark:text-blue-400'
}
</script>

<style scoped>
.timeline-container {
  padding: 1rem;
}

/* Estilos para timeline horizontal */
.timeline-container:has(.overflow-x-auto) {
  padding: 1rem 0;
}

/* Personalización adicional para el timeline */
:deep(.timeline-item) {
  transition: all 0.3s ease;
}

:deep(.timeline-item:hover) {
  transform: translateX(4px);
}

/* Estilos específicos para timeline horizontal */
:deep(.overflow-x-auto .timeline-item) {
  min-width: 200px;
  text-align: center;
}

:deep(.overflow-x-auto .timeline-item:hover) {
  transform: translateY(-2px);
}

/* Estilos para diferentes estados */
:deep(.timeline-item.completed) {
  opacity: 1;
}

:deep(.timeline-item.pending) {
  opacity: 0.7;
}
</style>