<template>
  <ClientOnly>
    <PageHeader title="" subtitle="" icon="" :hide-back-button="false" @back="
            navigateTo(`/importaciones/entregados`)
            " />

    <!-- Mostrar datos específicos del entregados -->
    <h2 class="text-3xl font-bold text-start mt-10 mb-1">
      Tu carga está en camino a Perú
    </h2>
    <div class="grid grid-cols-2 gap-4 items-start justify-center h-auto ">
      <ShipTrackerSkeleton v-if="isLoadingShipTracker" />
      <ShipTracker :progress="progress" v-else />
      <CommonsTimeLineComponent v-if="!isLoadingTimeline" :events="seguimientos" class="w-3/4  mx-auto overflow-y-auto" style="height: 75vh;" />
      <CommonsTimeLineSkeleton v-else class="w-3/4 min-h-screen mx-auto" />


    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
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
onMounted(async () => {
  isLoadingShipTracker.value = true;
  isLoadingTimeline.value = true;
  await getSeguimiento(uuid as string)
  isLoadingShipTracker.value = false; 
  isLoadingTimeline.value = false;
  progress.value = (seguimientos.value.filter((event) => event.status === 'COMPLETADO').length / (6)) * 100

});
useHead({
  title: `Seguimiento #${uuid}`,
});

</script>
