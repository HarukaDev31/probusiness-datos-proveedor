
<template>
    <div class="container-item">
      <div class="container-item__header">
        <h3 class="container-item__title">Contenedor #{{ container?.carga }}</h3>
        <div class="container-item__divider"></div>
      </div>
      <div class="container-item__body">
        <div class="container-item__details">
          <p class="container-item__description">
            <img src="/assets/icon/close-container.svg" alt="Contenedor" />
            <span
              >Zarpe:<strong>{{ container.closeDate }}</strong></span
            >
          </p>
          <p class="container-item__description">
            <img src="/assets/icon/ship-container.svg" alt="Contenedor" />
            <span
              >Arribo: <strong>{{ container.shipDate }}</strong></span
            >
          </p>
          <p class="container-item__description">
            <img src="/assets/icon/arrival-container.svg" alt="Contenedor" />
            <span
              >Entrega: <strong>{{ container.arrivalDate }}</strong>
            </span>
          </p>
          <p class="container-item__description">
            <img src="/assets/icon/delivery-container.svg" alt="Contenedor" />
            <span
              >Cierre: <strong>{{ container.deliveryDate }}</strong>
            </span>
          </p>
        </div>
        <div class="container-item__progress">
          <CommonsWaveProgressBar
            :percentage="currentProgress * 100"
            :width="180"
            :height="150"
            :lineCount="7"
            :backgroundColor="'#d9d9d9'"
            :fillColor="'#2ecc71'"
            :showLabel="true"
          />
          <div
            class="primary-button mt-2"
            :class="container.userIsPresent ? '' : 'visibility-hidden'"
            @click="toggleParticipate"
          >
            Participar
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script setup lang="ts">
  import type { Container } from "@/types/containers"; // Esto todavía debe importarse
  import { defineProps, defineEmits } from "vue";
  const currentProgress = ref(0);
  const animationInterval = ref<ReturnType<typeof setInterval> | null>(null);
  
  const props = defineProps({
    container: {
      type: Object as () => Container,
      required: true,
    },
  });
  const toggleParticipate = () => {
    if (props.container.userIsPresent) {
      
    }
  };
  const animateProgress = (targetProgress: number) => {
    if (animationInterval.value) {
      clearInterval(animationInterval.value);
    }
  
    currentProgress.value = 0; // Reiniciar el progreso
  
    animationInterval.value = setInterval(() => {
      if (currentProgress.value < targetProgress) {
        currentProgress.value += 0.01;
      } else {
        // Importante: limpiar el intervalo cuando alcanza el objetivo
        if (animationInterval.value) {
          clearInterval(animationInterval.value);
          animationInterval.value = null;
        }
      }
    }, 20);
  };
  
  onMounted(() => {
    const targetProgress = props.container.progress;
    animateProgress(targetProgress);
  });
  
  onBeforeUnmount(() => {
    if (animationInterval.value) {
      clearInterval(animationInterval.value);
    }
  });
  </script>
    
  