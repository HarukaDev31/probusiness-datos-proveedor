<template>
  <ClientOnly>
    <PageHeader title="" subtitle="" icon="" :hide-back-button="false" @back="
            navigateTo(`/importaciones/trayecto`)
            " />

    <!-- Mostrar datos específicos del trayecto -->
    <h2 class="text-3xl font-bold text-start mt-10 mb-1">
      Tu carga está en camino a Perú
    </h2>
    <div class="grid grid-cols-2 gap-4 items-start justify-center h-auto ">
      <ShipTrackerSkeleton v-if="isLoadingShipTracker" />
      <ShipTracker :progress="progress" v-else />
      <CommonsTimeLineComponent v-if="!isLoadingTimeline" :events="events" class="w-3/4  mx-auto overflow-y-auto" style="height: 75vh;" />
      <CommonsTimeLineSkeleton v-else class="w-3/4 min-h-screen mx-auto" />


    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import ShipTracker from '@/components/commons/ShipTracker.vue';
import ShipTrackerSkeleton from '~/components/commons/ShipTrackerSkeleton.vue';
import type { ContainerJourneyStatus } from '~/types/containers';

// Obtener el ID de la URL
const route = useRoute();
const id = route.params.id;
const currentRouteArray = ref<string[]>([]);

const events = ref([] as ContainerJourneyStatus[]);
const progress = ref(0);
const isLoadingShipTracker = ref(true);
const isLoadingTimeline = ref(true);
// Simular carga de datos (en un caso real, usa `useFetch` o `useAsyncData`)


onMounted(() => {
  currentRouteArray.value = route.path.split("/").filter((item) => item !== "");
  watch(
    route,
    (to) => {
      currentRouteArray.value = to.path.split("/").filter((item) => item !== "");
    },
    { immediate: true }
  );
  // Simular eventos de seguimiento
  events.value = [
    { id: 1, status: 0, date: "2023-10-01", containerId: 1, title: "Entregado",icon: "i-heroicons-check-circle",description: "Entregado" },
    { id: 2, status: 0, date: "2023-10-05", containerId: 1, title: "Pago",icon: "i-heroicons-check-circle",description: "Pago" },
    { id: 3, status: 0, date: "2023-10-07", containerId: 1, title: "Levante",icon: "i-heroicons-check-circle",description: "Levante" },
    { id: 4, status: 1, date: "2023-10-08", containerId: 1, title: "Declaración aduanera",icon: "i-heroicons-check-circle",description: "Declaración aduanera" },
    { id: 5, status: 1, date: "2023-10-09", containerId: 1, title: "Arribo",icon: "i-heroicons-check-circle",description: "Arribo" },
    { id: 6, status: 1, date: "2023-10-09", containerId: 1, title: "En trayecto",icon: "i-heroicons-check-circle",description: "En trayecto"   },
    { id: 7, status: 1, date: "2023-10-09", containerId: 1, title: "Zarpe",icon: "i-heroicons-check-circle",description: "Zarpe" },
    { id: 8, status: 1, date: "2023-10-09", containerId: 1, title: "Llenado de contenedor",icon: "i-heroicons-check-circle",description: "Llenado de contenedor" },
    { id: 9, status: 1, date: "2023-10-09", containerId: 1, title: "Carga recibida",icon: "i-heroicons-check-circle",description: "Carga recibida" },
  ];
  // Simular carga de datos
  setTimeout(() => {
    isLoadingShipTracker.value = false;
  }, 2000);
  progress.value =//if all status on events are 1, set progress to 100
    events.value.every((event) => event.status === 1)
      ? 100
      : Math.round(
        (events.value.filter((event) => event.status === 1).length /
          events.value.length) *
        100
      );
  setTimeout(() => {
    isLoadingTimeline.value = false;
  }, 2000);
});
useHead({
  title: `Seguimiento #${id}`,
});
</script>
