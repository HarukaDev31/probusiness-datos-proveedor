<template>
  <div class="min-h-screen  mt-[100px]">
    <!-- Hero Section -->
    <div class="w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8">
      <div class="w-full mx-auto">
        <div
          class="bg-cover bg-center bg-no-repeat w-full h-[250px] xs:h-[200px] sm:h-[200px] lg:h-[420px] rounded-2xl flex justify-start items-center relative shadow-lg overflow-hidden lg:overflow-visible"
          style="background-image: url('/assets/img/home.png')"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-blue-300/78 to-blue-300/40 rounded-2xl"></div>
          <h1 class="relative z-10 text-2xl sm:text-3xl lg:text-4xl text-white text-left max-w-xs sm:max-w-md ml-6 sm:ml-8 lg:ml-12 drop-shadow-2xl leading-tight">
            ¡Bienvenido a la comunidad de importadores!
          </h1>
          <img
            class="absolute bottom-0 right-[-20%] h-[200px]  sm:right-[-15%] sm:h-[380px] lg:right-0 lg:h-[480px] object-right-bottom"
            src="/assets/img/home_sincielo.png"
            alt="Hero Image"
          />
        </div>
      </div>
    </div>

    <!-- Container List Section -->
    <ContainerListNuxtUI :containers="containers" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { useContainers } from '~/composables/clientes/useContainers'
import ContainerListNuxtUI from '@/components/cargaconsolidada/ContainerListNuxtUI.vue'
// Usará el layout default automáticamente (con sidebar)
const { containers, loading, error, getContainers } = useContainers()

// Cargar contenedores al montar el componente
onMounted(async () => {
  await getContainers()
})
</script>
