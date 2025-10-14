<template>
  <div
    class="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
      <h2 class="text-base font-semibold text-gray-900 dark:text-gray-100 text-center">
        Consolidado #{{ container?.carga }}
      </h2>
    </div>

    <!-- Body -->
    <div class="p-4 sm:p-6">
      <div class="flex flex-col gap-4">
        <!-- Container Details and Progress Section -->
        <div class="flex items-center justify-between md:gap-4 gap-0">
          <!-- Container Details -->
          <div class="flex flex-col space-y-3 flex-1">
            <div class="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-sm">
              <img src="/assets/icon/close-container.svg" alt="Contenedor" class="w-4 h-4 sm:w-auto sm:h-auto" />
              <span class="text-gray-600 dark:text-gray-400">Cierre:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">
                {{ formatDate(container.closeDate) }}
              </span>
            </div>

            

            <div class="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-sm">
              <img src="/assets/icon/arrival-container.svg" alt="Contenedor" class="w-4 h-4 sm:w-auto sm:h-auto" />
              <span class="text-gray-600 dark:text-gray-400">Arribo:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">
                {{ formatDate(container.arrivalDate) }}
              </span>
            </div>

            <div class="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-sm">
              <img src="/assets/icon/delivery-container.svg" alt="Contenedor" class="w-4 h-4 sm:w-auto sm:h-auto" />
              <span class="text-gray-600 dark:text-gray-400">Entrega:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">
                {{ formatDate(container.deliveryDate) }}
              </span>
            </div>
          </div>

          <!-- Progress Circle and Container -->
          <div class="flex flex-col items-center gap-2 flex-shrink-0">
            <WaveProgressBar :percentage="currentProgress" class="scale-75 sm:scale-90" />
            
            <!-- Status Badge -->
            <div class="text-center flex items-center gap-1">
              <div class="text-xs text-gray-500 dark:text-gray-400">Contenedor al</div>
              <div class="text-lg font-bold text-primary">{{ Math.round(currentProgress) }}%</div>
            </div>
          </div>
        </div>

        <!-- Participate Button -->
        <div class="w-full flex justify-center mt-2">
          <UButton v-if="!container.userIsPresent" 
            class="w-4/5 text-center flex justify-center items-center py-2 px-4"
            color="primary" size="sm" @click="toggleParticipate">
            Participar
          </UButton>
          <div v-else class="text-xs text-green-600 dark:text-green-400 font-medium text-center">
            ✓ Participando
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import type { Container } from "../../types/containers";
import WaveProgressBar from './WaveProgressBar.vue';

// Props
const props = defineProps({
  container: {
    type: Object as () => Container,
    required: true,
  },
});

// Estado reactivo
const currentProgress = ref(0);
const animationInterval = ref<ReturnType<typeof setInterval> | null>(null);

// Computed properties
const circumference = computed(() => 2 * Math.PI * 60); // radio = 60

// Métodos
const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short'
  });
};

const toggleParticipate = () => {
  if (props.container.userIsPresent) {
    // Lógica para participar
    console.log('Participando en contenedor:', props.container.id);
  }
};

const animateProgress = (targetProgress: number) => {
  console.log('Animando progreso:', targetProgress);
  if (animationInterval.value) {
    clearInterval(animationInterval.value);
  }

  currentProgress.value = 0;

  animationInterval.value = setInterval(() => {
    if (currentProgress.value < targetProgress) {
      currentProgress.value += 1;
    } else {
      if (animationInterval.value) {
        clearInterval(animationInterval.value);
        animationInterval.value = null;
      }
    }
  }, 20);
};

// Lifecycle hooks
onMounted(() => {
  const targetProgress = props.container.progress;
  console.log('Target progress:', targetProgress);
  animateProgress(targetProgress);
});

onBeforeUnmount(() => {
  if (animationInterval.value) {
    clearInterval(animationInterval.value);
  }
});
</script>
