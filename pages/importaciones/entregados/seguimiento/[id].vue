<template>
  <ClientOnly>
    <div class="px-4 lg:px-0">
      <PageHeader title="" subtitle="" icon="" :hide-back-button="false" @back="
              navigateTo(`/importaciones/trayecto`)
              " />
    </div>

    <!-- Mostrar datos específicos del trayecto -->
    <h2 class="text-2xl md:text-3xl font-bold text-start mt-6 md:mt-10 mb-4 px-4 md:px-0">
      Tu carga está en camino a Perú
    </h2>
    
    <!-- Layout responsive: vertical en móvil y tablet, horizontal solo en desktop -->
    <div class="flex flex-col lg:flex-row gap-4 lg:gap-6 px-2 lg:px-0">
      <!-- ShipTracker - Más pequeño en móvil y tablet -->
      <div class="w-full lg:w-1/2">
        <ShipTrackerSkeleton v-if="isLoadingShipTracker" />
        <ShipTracker :progress="progress" v-else />
      </div>
      
      <!-- Timeline - Horizontal en móvil y tablet, vertical en desktop -->
      <div class="w-full lg:w-1/2 mt-4 lg:mt-0">
        <CommonsTimeLineComponent 
          v-if="!isLoadingTimeline" 
          :events="seguimientos" 
          :orientation="timelineOrientation"
          class="w-full"
        />
        <CommonsTimeLineSkeleton v-else class="w-full min-h-48 lg:min-h-screen" />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
definePageMeta({
    middleware: 'auth'
})
import ShipTracker from '@/components/commons/ShipTracker.vue';
import ShipTrackerSkeleton from '~/components/commons/ShipTrackerSkeleton.vue';
import type { ContainerJourneyStatus } from '~/types/containers';
import { useTrayecto } from '~/composables/clientes/importaciones/useTrayecto';
const { getSeguimiento, seguimientos } = useTrayecto();
// Obtener el ID de la URL
const route = useRoute();
const uuid = route.params.id;
const currentRouteArray = ref<string[]>([]);

const events = ref([] as ContainerJourneyStatus[]);
const progress = ref(0);
const isLoadingShipTracker = ref(true);
const isLoadingTimeline = ref(true);

// Detectar orientación del timeline basada en el tamaño de pantalla
const timelineOrientation = ref<'vertical' | 'horizontal'>('vertical');

// Función para actualizar orientación basada en el tamaño de pantalla
const updateTimelineOrientation = () => {
  if (process.client) {
    timelineOrientation.value = window.innerWidth < 1024 ? 'horizontal' : 'vertical';
  }
};

onMounted(async () => {
  isLoadingShipTracker.value = true;
  isLoadingTimeline.value = true;
  
  // Configurar orientación inicial
  updateTimelineOrientation();
  
  // Agregar listener para cambios de tamaño
  if (process.client) {
    window.addEventListener('resize', updateTimelineOrientation);
  }
  
  await getSeguimiento(uuid as string)
  isLoadingShipTracker.value = false; 
  isLoadingTimeline.value = false;
  progress.value = (seguimientos.value.filter((event) => event.status === 'COMPLETADO').length / (6)) * 100
});

// Cleanup
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', updateTimelineOrientation);
  }
});

useHead({
  title: `Seguimiento #${uuid}`,
});

</script>

<style scoped>
/* Mejoras generales para móvil */
@media (max-width: 1023px) {
  h2 {
    font-size: 1.5rem;
    line-height: 1.3;
    margin-bottom: 1rem;
  }
}

@media (max-width: 640px) {
  h2 {
    font-size: 1.25rem;
    padding: 0 0.5rem;
  }
}
</style>
