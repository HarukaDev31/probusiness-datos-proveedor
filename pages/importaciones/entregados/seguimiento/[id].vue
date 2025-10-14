<template>
  <ClientOnly>
    <div class="px-4 lg:px-0">
      <PageHeader title="" subtitle="" icon="" :hide-back-button="false" @back="
              navigateTo(`/importaciones/trayecto`)
              " />
    </div>

    <!-- SectionHeader con breadcrumbs -->
    <div class="px-4 lg:px-0 mb-4">
      <SectionHeader 
        title="Mis importaciones"
        :headers="sectionHeaders"
        :loading="isLoadingTimeline"
      />
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
      
      <!-- Timeline - Siempre vertical -->
      <div class="w-full lg:w-1/2 mt-4 lg:mt-0">
        <CommonsTimeLineComponent 
          v-if="!isLoadingTimeline" 
          :events="seguimientos" 
          orientation="vertical"
          :allGray="true"
          class="w-full"
        />
        <CommonsTimeLineSkeleton v-else class="w-full min-h-48 lg:min-h-screen" />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
definePageMeta({
    middleware: 'auth'
})
import ShipTracker from '@/components/commons/ShipTracker.vue';
import ShipTrackerSkeleton from '~/components/commons/ShipTrackerSkeleton.vue';
import SectionHeader from '@/components/commons/SectionHeader.vue';
import type { ContainerJourneyStatus } from '~/types/containers';
import type { Header } from '~/types/data-table';
import { useTrayecto } from '~/composables/clientes/importaciones/useTrayecto';
const { getSeguimiento, seguimientos, cargaInfo } = useTrayecto();
// Obtener el ID de la URL
const route = useRoute();
const uuid = route.params.id;
const currentRouteArray = ref<string[]>([]);

const events = ref([] as ContainerJourneyStatus[]);
const progress = ref(0);
const isLoadingShipTracker = ref(true);
const isLoadingTimeline = ref(true);

// Headers para el SectionHeader
const sectionHeaders = computed<Header[]>(() => [
  {
    label: "Entregado",
    value: undefined, // Sin value para que no muestre badge
    icon: undefined
  },
  {
    label: `Consolidado #${cargaInfo.value?.carga || uuid}`,
    value: undefined, // Sin value para que no muestre badge
    icon: undefined
  },
  {
    label: "Finalizado",
    value: undefined, // Sin value para que no muestre badge
    icon: "gravity-ui:circle-fill"
  }
]);

onMounted(async () => {
  isLoadingShipTracker.value = true;
  isLoadingTimeline.value = true;
  
  await getSeguimiento(uuid as string)
  isLoadingShipTracker.value = false; 
  isLoadingTimeline.value = false;
  // Incluir elementos COMPLETADO y ENTREGADO en el cálculo del progreso
  progress.value = (seguimientos.value.filter((event) => event.status === 'COMPLETADO' || event.status === 'ENTREGADO').length / (6)) * 100
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
