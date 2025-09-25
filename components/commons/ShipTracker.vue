<template>
    <div class="h-1/2  w-full flex items-center justify-center relative overflow-hidden">
      <div class="w-full relative">

        <!-- Map Container -->
        <div ref="mapContainerRef" class="relative w-full bg-white/80 rounded-xl p-4 h-[400px] overflow-hidden">
          <!-- World Map Background -->
          <img 
            src="/assets/img/map.png"
            alt="World Map"
            class="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          
          <!-- SVG container para todo: path, barco y marcadores -->
          <svg class="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
            <!-- Path for the ship to follow -->
            <path
              ref="pathRef"
              d="M 80,130 C 500,180 500,180 750,320"
              fill="none"
              stroke="black"
              stroke-width="3"
              stroke-dasharray="10,10"
              class="drop-shadow-md"
              vector-effect="non-scaling-stroke"
            />
            
            <!-- Origin Marker -->
            <g class="origin-marker" transform="translate(80, 130)">
              <circle cx="0" cy="0" r="6" fill="#e53e3e" />
              <text x="0" y="-12" font-size="14" text-anchor="middle" fill="#374151">China</text>
            </g>
            
            <!-- Destination Marker -->
            <g class="destination-marker" transform="translate(750, 320)">
              <circle cx="0" cy="0" r="6" fill="#10b981" />
              <text x="0" y="-12" font-size="14" text-anchor="middle" fill="#374151">Perú</text>
            </g>
            
            <!-- Ship (inicialmente invisible) -->
            <g ref="shipRef" opacity="0" transform="translate(80, 130)">
              <image href="/assets/icon/ship.svg" width="40" height="40" x="-10" y="-10" />
            </g>
          </svg>
        </div>
  
        <!-- Status Information -->
        
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Import from #imports in Nuxt 3
  const { $anime } = useNuxtApp();
  
  const props = defineProps({
    progress: {
      type: Number,
      default: 0,
      validator: (value: number) => {
        return value >= 0 && value <= 100
      }
    }
  });
  
  // Referencias
  const shipRef = ref<SVGGElement | null>(null);
  const pathRef = ref<SVGPathElement | null>(null);
  const mapContainerRef = ref<HTMLDivElement | null>(null);
  
  // Estado para las animaciones
  const pathAnimation = ref<any | null>(null);
  const shipAnimation = ref<any | null>(null);
  const animationInitialized = ref(false);
  const currentProgress = ref(props.progress);
  const isResetInProgress = ref(false);
  const resizeObserver = ref<ResizeObserver | null>(null);
  
  // Extraer los puntos de inicio y fin del path
  const extractPathEndpoints = () => {
    if (!pathRef.value) return { start: null, end: null };
    
    const pathD = pathRef.value.getAttribute('d');
    if (!pathD) return { start: null, end: null };
    
    // Extraer el punto inicial y final del path
    const startMatch = pathD.match(/M\s+(\d+),\s*(\d+)/);
    const endMatch = pathD.match(/(\d+),\s*(\d+)\s*$/);
    
    const start = startMatch ? { x: parseFloat(startMatch[1]), y: parseFloat(startMatch[2]) } : null;
    const end = endMatch ? { x: parseFloat(endMatch[1]), y: parseFloat(endMatch[2]) } : null;
    
    return { start, end };
  };
  
  // Limpiar completamente las animaciones actuales
  const cleanupAnimations = () => {
    if (pathAnimation.value) {
      pathAnimation.value.pause();
      pathAnimation.value = null;
    }
    
    if (shipAnimation.value) {
      shipAnimation.value.pause();
      shipAnimation.value = null;
    }
    
    // Restablecer los elementos SVG a su estado inicial
    if (shipRef.value) {
      shipRef.value.setAttribute('opacity', '0');
      shipRef.value.setAttribute('transform', 'translate(80, 130)'); // Posición inicial
    }
    
    if (pathRef.value) {
      pathRef.value.style.strokeDashoffset = '';
      pathRef.value.style.strokeDasharray = '';
    }
    
    animationInitialized.value = false;
  };
  
  // Inicializar la secuencia de animaciones
  const initAnimations = () => {
    if (!shipRef.value || !pathRef.value || isResetInProgress.value) return;
    
    // Limpiar animaciones previas
    cleanupAnimations();
    
    // Obtener punto inicial del path
    const { start } = extractPathEndpoints();
    if (start) {
      // Posicionar el barco en el punto inicial del path
      shipRef.value.setAttribute('transform', `translate(${start.x}, ${start.y})`);
    }
    
    // Calcular el dashoffset para la animación del path
    const pathLength = pathRef.value.getTotalLength();
    pathRef.value.style.strokeDasharray = `${pathLength} ${pathLength}`;
    pathRef.value.style.strokeDashoffset = `${pathLength}`;
    
    // 1. Primero animamos el trazado del path
    pathAnimation.value = $anime({
      targets: pathRef.value,
      strokeDashoffset: [pathLength, 0],
      easing: 'easeInOutSine',
      duration: 2000,
      complete: () => {
        if (!isResetInProgress.value) {
          // 2. Después de que se dibuje el path, configuramos la animación del barco
          setupShipAnimation();
        }
      }
    });
  };
  
  // Configurar la animación del barco después de que se dibuje el path
  const setupShipAnimation = () => {
    if (!shipRef.value || !pathRef.value || isResetInProgress.value) return;
    
    // Crear un nuevo path para la animación
    const path = $anime.path(pathRef.value);
    
    // Mostrar el barco
    $anime({
      targets: shipRef.value,
      opacity: 1,
      duration: 400,
      easing: 'easeInOutQuad'
    });
  
    // Configurar la animación del barco
    shipAnimation.value = $anime({
      targets: shipRef.value,
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      duration: 8000,
      easing: 'linear',
      autoplay: false
    });
    
    // Marcar la animación como inicializada
    animationInitialized.value = true;
    
    // Animar el barco hasta la posición del progreso
    nextTick(() => {
      animateShipToProgress(currentProgress.value);
    });
  };
  
  // Animar el barco desde su posición inicial hasta la posición del progreso
  const animateShipToProgress = (targetProgress: number) => {
    if (!shipAnimation.value || isResetInProgress.value) return;
    
    // Guardar el progreso actual
    currentProgress.value = targetProgress;
    
    // Asegurarnos de que el barco comience desde el principio
    shipAnimation.value.seek(0);
    
    // Animar desde el inicio hasta la posición de progreso
    $anime({
      targets: { progress: 0 },
      progress: targetProgress,
      duration: 1500,
      easing: 'easeInOutSine',
      update: function(anim: any) {
        if (shipAnimation.value && !isResetInProgress.value) {
          const currentValue = anim.animations[0].currentValue;
          const position = shipAnimation.value.duration * (currentValue / 100);
          shipAnimation.value.seek(position);
        }
      }
    });
  };
  
  // Actualizar la posición del barco cuando cambia el progreso
  const updateShipProgress = (newProgress: number) => {
    if (!animationInitialized.value || !shipAnimation.value || isResetInProgress.value) return;
    
    // Guardar el nuevo progreso
    currentProgress.value = newProgress;
    
    // Determinar el progreso actual en la animación
    const currentProgressPct = shipAnimation.value.progress * 100;
    
    // Animar desde la posición actual hasta la nueva posición
    $anime({
      targets: { progress: currentProgressPct },
      progress: newProgress,
      duration: 1500,
      easing: 'easeInOutSine',
      update: function(anim: any) {
        if (shipAnimation.value && !isResetInProgress.value) {
          const currentValue = anim.animations[0].currentValue;
          const position = shipAnimation.value.duration * (currentValue / 100);
          shipAnimation.value.seek(position);
        }
      }
    });
  };
  
  // Reiniciar las animaciones con un retraso para permitir que se actualice el DOM
  const resetAnimationsWithDelay = () => {
    // Marcar que estamos en proceso de reseteo
    isResetInProgress.value = true;
    
    // Limpiar animaciones existentes
    cleanupAnimations();
    
    // Esperar a que el DOM se actualice completamente
    setTimeout(() => {
      // Restablecer la bandera
      isResetInProgress.value = false;
      
      // Reiniciar las animaciones
      initAnimations();
    }, 200);
  };
  
  // Inicializar el observador de cambio de tamaño
  const setupResizeObserver = () => {
    if (typeof ResizeObserver === 'undefined' || !mapContainerRef.value) return;
    
    // Crear un nuevo ResizeObserver
    resizeObserver.value = new ResizeObserver((entries) => {
      // Solo nos preocupamos por el contenedor del mapa
      for (const entry of entries) {
        if (entry.target === mapContainerRef.value) {
          resetAnimationsWithDelay();
          break;
        }
      }
    });
    
    // Comenzar a observar el contenedor del mapa
    resizeObserver.value.observe(mapContainerRef.value);
  };
  
  onMounted(() => {
    // Iniciar secuencia de animaciones cuando el componente se monta
    nextTick(() => {
      initAnimations();
      setupResizeObserver();
    });
  });
  
  onUnmounted(() => {
    // Limpiar el observador de cambio de tamaño
    if (resizeObserver.value) {
      resizeObserver.value.disconnect();
      resizeObserver.value = null;
    }
    
    // Limpiar animaciones
    cleanupAnimations();
  });
  
  // Observar cambios en el prop progress
  watch(() => props.progress, (newValue) => {
    currentProgress.value = newValue;
    
    if (animationInitialized.value && !isResetInProgress.value) {
      updateShipProgress(newValue);
    }
  });
  </script>