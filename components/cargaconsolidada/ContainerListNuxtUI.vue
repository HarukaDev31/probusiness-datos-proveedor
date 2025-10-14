<template>
  <div class="w-full px-2 sm:px-4 lg:px-8 pb-8 sm:pb-12">
    <div class="w-full mx-auto">
      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <ContainerItemSkeletonNuxtUI v-for="i in 3" :key="i" />
      </div>
      
      <!-- Containers Grid -->
      <div v-else-if="containers.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <ContainerCardNuxtUI
          v-for="container in containers"
          :key="container.id"
          :container="container"
        />
      </div>
      
      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center py-16">
        <UIcon name="i-heroicons-inbox" class="w-20 h-20 text-gray-400 mb-4" />
        <p class="text-gray-500 text-lg font-medium">No hay contenedores disponibles</p>
        <p class="text-gray-400 text-sm mt-2">Los contenedores aparecerán aquí cuando estén disponibles</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Container } from '../../types/containers'
import ContainerItemSkeletonNuxtUI from './ContainerItemSkeletonNuxtUI.vue'
import ContainerCardNuxtUI from './ContainerCardNuxtUI.vue'

// Props
interface Props {
  containers: Container[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})
</script>
